import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/classes/User';
import axios, { get } from 'axios';
import * as routerController from '@/controllers/routerController';
import { userState } from '@/controllers/stateController';
import { useTeamStore } from '@/stores/teamStore';


//const username = ref<string | null>(null);
//const user = ref<User | null>(null);
//const token = ref<User | null>(null);
let isGettingUser = false;

export const login = async (userName: string, password: string, router: ReturnType<typeof useRouter>) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, password: password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }
  
      const data = await response.json();
      console.log('Token recibido:', data.token);
  
      // Guarda el token en sessionStorage
      sessionStorage.setItem('session', data.token);

      // Actualiza el estado global del usuario
      userState.value = jwtDecode(data.token) as User;
      console.log('userState: ', userState.value);


      // Actualiza el campo lastLogin en la base de datos
      await fetch('http://localhost:3000/api/user/lastLogin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`, // Envía el token si es necesario
        },
        body: JSON.stringify({ username: userName }),
      });

      console.log('Campo lastLogin actualizado');

  
      // Redirige al perfil del usuario
      routerController.navigateToAndClose(router, '/profile');
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  export const signin = async ( username: string, email: string, password: string, confirmPassword: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Server error');
    }

    const data = await response.json();
    console.log('Usuario registrado:', data);
    return data;
  } catch (error) {
    console.error('Error en signIn:', error);
    throw error;
  }
};
  
export function logout(router: ReturnType<typeof useRouter>) {
  const teamStore = useTeamStore();
  teamStore.setTeams([]);

  userState.value = null;
  console.log('Estado del usuario después de logout:', userState.value);
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
            const response = await fetch(`http://localhost:3000/api/teams/${decodedUser._id}`, {
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
                // Si es otro error, continuar sin equipos
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
                // Continuar sin equipos en lugar de fallar completamente
            }
        }

        // ✅ Solo establecer userState cuando todo esté OK
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
/*
export async function getUser() {
  const session = sessionStorage.getItem('session');
  console.log('Token de sesión:', session);
  if (session) {
    userState.value = jwtDecode(session) as User;
    console.log('Usuario:', userState.value.username);
    console.log('Token decodificado:', userState.value);

    const teamStore = useTeamStore();
    try {
      const response = await fetch(`http://localhost:3000/api/teams/${userState.value._id}`);
      const teams = await response.json();
      teamStore.setTeams(teams); // Actualiza el store con los equipos obtenidos
    } catch (error) {
      console.error('Error al obtener los equipos del usuario:', error);
      teamStore.setTeams([]); // Vacía el store si ocurre un error
    }

    return userState.value;
  } else {
    console.error('No session token found');
    return null;
  }
}
  */

export const updateUser = async (
  username: string,
  updateFields: any,
  currentPassword: string
) => {
  const response = await fetch('http://localhost:3000/api/user/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      ...updateFields,
      currentPassword,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Error updating user');
  }
  // Guarda el nuevo token si existe
  if (data.token) {
    sessionStorage.setItem('session', data.token);
  }
  return data;
};

export function getUsername(): String  {
  return userState.value?.username || "nousername";
}

export function getProfilePic(): string {
  if (!userState.value) {
    console.error('El usuario no está definido');
    return 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'; // Devuelve una imagen predeterminada
  }

  return userState.value.profilePic || 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'; // Devuelve la imagen del perfil o una predeterminada
}

export async function getProfilePicByUsername(username: string): Promise<string> {
  try {
    const response = await fetch(`http://localhost:3000/api/user/profilePic/${username}`);
    const data = await response.json();
    return data.profilePic || '/src/assets/images/guest.jpg';
  } catch {
    return '/src/assets/images/guest.jpg';
  }
}

export async function getProfilePicById(userId: string): Promise<string> {
  try {
    const response = await fetch(`http://localhost:3000/api/user/profilePic/id/${userId}`);
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
    return `http://localhost:3000${profilePic}`;
  }
  
  // Si es otra cosa, usar imagen por defecto
  return '/src/assets/images/guest.jpg';
};

// Función para manejar errores de carga de imagen
export const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = '/src/assets/images/guest.jpg'; // Imagen de fallback
};
