import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/classes/User';
import API from './api';
import * as routerController from './routerController';
import { userState } from './stateController';
import { useTeamStore } from '@/stores/teamStore';
import { API_BASE_URL } from '@/controllers/api';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
}

let isGettingUser = false;

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

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

// Logout
export function logout(router: ReturnType<typeof useRouter>) {
  const teamStore = useTeamStore();
  teamStore.setTeams([]);
  userState.value = null;
  sessionStorage.removeItem('session');
  routerController.navigateToAndClose(router, '/login');
}

export async function getUser(): Promise<User | null> {
  console.log('🚨 getUser() called - Stack trace:', new Error().stack);
  sessionStorage.removeItem('token');
  localStorage.removeItem('token');

  // Evitar múltiples llamadas simultáneas
    if (isGettingUser) {
        console.log('getUser already in progress, waiting...');
        // Esperar a que termine la llamada actual
        while (isGettingUser) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return userState.value;
    }

    isGettingUser = true;
    
    try {
        const session = sessionStorage.getItem('session');
        console.log('Token de sesión:', session);
        
        if (!session) {
            console.log('No session token found');
            userState.value = null;
            return null;
        }

        // ✅ SOLUCIÓN: Decodificar en variable temporal primero
        let decodedUser: User;
        try {
            decodedUser = jwtDecode(session) as User;
            console.log('Usuario decodificado:', decodedUser.username);
        } catch (decodeError) {
            console.error('Error decodificando token:', decodeError);
            sessionStorage.removeItem('session');
            userState.value = null;
            return null;
        }

        // Configurar timeout para evitar que se cuelgue
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.log('Request timeout, aborting...');
            controller.abort();
        }, 3000); // Reducir timeout a 3 segundos

        // Obtener los equipos del usuario
        const teamStore = useTeamStore();
        try {
            console.log('Fetching user teams...');
            const response = await fetch(`${API_BASE_URL}:3000/api/teams/${decodedUser._id}`, {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Authorization': `Bearer ${session}` // Agregar autorización
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    console.log('Token invalid while fetching teams, removing from sessionStorage');
                    sessionStorage.removeItem('session');
                    userState.value = null;
                    return null;
                }
                console.warn(`Teams request failed with status ${response.status}, continuing without teams`);
                teamStore.setTeams([]);
            } else {
                const teams = await response.json();
                teamStore.setTeams(teams);
                console.log('Teams loaded successfully');
            }
            
        } catch (teamError) {
            clearTimeout(timeoutId);
            if (teamError instanceof Error && teamError.name === 'AbortError') {
                console.error('Teams request aborted due to timeout');
                sessionStorage.removeItem('session');
                userState.value = null;
                return null;
            } else {
                console.error('Error al obtener los equipos del usuario:', teamError);
                teamStore.setTeams([]);
            }
        }

        userState.value = decodedUser;
        return userState.value;

    } catch (error) {
        console.error('Error general en getUser:', error);
        sessionStorage.removeItem('session');
        userState.value = null;
        return null;
    } finally {
      isGettingUser = false;
    }
}
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

// Actualizar usuario
export const updateUser = async (
  username: string,
  updateData: {
    newUsername?: string;
    newEmail?: string;
    newPassword?: string;
    currentPassword: string;
  }
): Promise<UpdateUserResponse> => {
  try {
    const { data } = await API.put<UpdateUserResponse>('/user/update', {
      username,
      ...updateData
    });

    /*
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
      */
    if (data.token) {
      sessionStorage.setItem('session', data.token);
      // Decodifica el token actualizado y actualiza userState
      userState.value = jwtDecode(data.token) as User;
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

export function getUsername(): String  {
  return userState.value?.username || "nousername";
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

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
export async function getProfilePicById(userId: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}:3000/api/user/profilePic/id/${userId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al obtener la imagen de perfil');
    }
    
    return data.profilePic || '/src/assets/images/guest.jpg';
  } catch (error) {
    console.error('Error al obtener la imagen de perfil por ID:', error);
    return '/src/assets/images/guest.jpg';
  }
}

// Función para construir la URL completa de la imagen de perfil
export const getProfilePicUrl = (profilePic?: string) => {
  if (!profilePic) {
    return '/src/assets/images/guest.jpg';
  }
  
  // Si la imagen ya viene con la URL completa del servidor
  if (profilePic.startsWith('http')) {
    return profilePic;
  }
  
  // Si es una ruta relativa del servidor, construir URL completa
  if (profilePic.startsWith('/uploads/')) {
    return `${API_BASE_URL}:3000${profilePic}`;
  }
  
  // Si es otra cosa, usar imagen por defecto
  return '/src/assets/images/guest.jpg';
};

// Función para manejar errores de carga de imagen
export const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = '/src/assets/images/guest.jpg'; // Imagen de fallback
};

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
