import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/classes/User';
import API from './api';
import * as routerController from './routerController';
import { userState } from './stateController';
import { useTeamStore } from '@/stores/teamStore';
import { Team } from '@/classes/Team';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
}

interface UpdateUserResponse {
  token?: string;
  user?: User;  
  message: string;
  error?: string;
}

interface ProfilePicResponse {
  profilePic: string;
}

//Login
export const login = async (userName: string, password: string, router: ReturnType<typeof useRouter>) => {
  try {
    const response = await API.post<LoginResponse>('/login', {
      username: userName,
      password: password,
    });

    const token = response.data.token;
    sessionStorage.setItem('session', token);
    userState.value = jwtDecode(token) as User;

    await API.put('/user/lastLogin', {
      username: userName,
    });

    routerController.navigateToAndClose(router, '/profile');
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Registro de nuevo usuario
export const signin = async (username: string, email: string, password: string, confirmPassword: string) => {
  try {
    const { data } = await API.post('/signin', {
      username,
      email,
      password,
      confirmPassword
    });
    return data;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};


// Logout
export function logout(router: ReturnType<typeof useRouter>) {
  const teamStore = useTeamStore();
  teamStore.setTeams([]);
  userState.value = null;
  sessionStorage.removeItem('session');
  routerController.navigateToAndClose(router, '/login');
}

// Obtener usuario actual desde token
export async function getUser() {
  const session = sessionStorage.getItem('session');
  
  if (!session) {
    console.error('No session token found');
    return null;
  }

  try {
    // Decodificar el token para obtener el _id del usuario
    const decodedToken = jwtDecode(session) as any;
    const userId = decodedToken._id; // Asegúrate de que el token incluya el _id
    
    if (!userId) {
      throw new Error('User ID not found in token');
    }

    // Obtener los datos completos del usuario
    const { data: userData } = await API.get<User>(`/users/${userId}`);
    userState.value = userData;
    
    // Obtener los equipos usando el _id del usuario
    const { data } = await API.get<Team[]>(`/teams/${userId}`);
    
    const teamStore = useTeamStore();
    
    // Convertir los datos a instancias de Team
    const teams = data.map(team => 
      Team.fromFullData(
        team._id,
        team.pokemon,
        team.name,
        team.ownerId,
        team.favorite,
        new Date(team.createdAt),
        new Date(team.updatedAt)
      )
    );
    
    teamStore.setTeams(teams);
    return userState.value;
    
  } catch (error) {
    console.error('Error getting user data:', error);
    const teamStore = useTeamStore();
    teamStore.setTeams([]);
    return null;
  }
}


// Actualizar usuario
export const updateUser = async (
  username: string,
  updateData: {
    newUsername?: string;
    newEmail?: string;
    newPassword?: string;
    newProfilePic?: string;
    currentPassword: string;
  }
): Promise<UpdateUserResponse> => {
  try {
    const { data } = await API.put<UpdateUserResponse>('/user/update', {
      username,
      ...updateData
    });

    if (data.token && data.user) {
      sessionStorage.setItem('session', data.token);
      
      // Crear una instancia de User con los datos actualizados
      const updatedUser = new User(
        data.user._id,
        data.user.username,
        data.user.password,
        data.user.email
      );
      
      // Actualizar propiedades adicionales
      updatedUser.setProfilePic = data.user.profilePic;
      updatedUser.setUpdatedAt = new Date(data.user.lastLogin);
      
      userState.value = updatedUser;
    }

    return {
      token: data.token,
      user: data.user,
      message: data.message || 'User updated successfully'
    };
    
  } catch (error: any) {
    console.error('Update user error:', error);
    return {
      message: 'Error updating user',
      error: error.response?.data?.error || 'Unknown error'
    };
  }
};

// Obtener username
export function getUsername(): string {
  return userState.value?.username || 'nousername';
}

// Imagen de perfil del usuario actual
export function getProfilePic(): string {
  if (!userState.value) {
    return '/src/assets/images/guest.jpg';
  }
  return userState.value.profilePic || '/src/assets/images/guest.jpg';
}

// Imagen de perfil por nombre de usuario
export async function getProfilePicByUsername(username: string): Promise<string> {
  try {
    const response = await API.get<ProfilePicResponse>(`/user/profilePic/${username}`);
    return response.data.profilePic || '/src/assets/images/guest.jpg';
  } catch {
    return '/src/assets/images/guest.jpg';
  }
}
