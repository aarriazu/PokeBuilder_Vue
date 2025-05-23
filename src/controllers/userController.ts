import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/classes/User';
import axios, { get } from 'axios';

const username = ref<string | null>(null);
const user = ref<User | null>(null);
const token = ref<User | null>(null);

export const login = async (userName: string, password: string, router: ReturnType<typeof useRouter>) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, password: password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        //errorMsg.value = errorData.message || 'Server error';
        return;
      }
  
      const data = await response.json();
      console.log('Token recibido:', data.token);
  
      // Guarda el token en sessionStorage
      sessionStorage.setItem('session', data.token);
      username.value = userName;

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
      router.push('/home/profile');
    } catch (e) {
      //errorMsg.value = 'Wrong username or password';
      console.error(e);
    } finally {
      //loading.value = false;
    }
  };
  
export function logout(router: ReturnType<typeof useRouter>) {
  user.value = null;
  sessionStorage.removeItem('session'); 
  router.push('/login');
}

export async function getUser() {
  const session = sessionStorage.getItem('session');
  console.log('Token de sesión:', session);
  if (session) {
    user.value = jwtDecode(session) as User;
    console.log('Usuario:', user.value.username);
    console.log('Token decodificado:', user.value);
    return user.value;
  } else {
    console.error('No session token found');
    return null;
  }
}

export function getUsername(): String  {
  getUser();
  return user.value?.username || "nousername";
}

export function getProfilePic(): string {
  if (!user.value) {
    console.error('El usuario no está definido');
    return 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'; // Devuelve una imagen predeterminada
  }

  return user.value.profilePic || 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'; // Devuelve la imagen del perfil o una predeterminada
}

/*
export function getJoinDate(): String  {
    return user.value?.createdAt.toString || "noimg";
}
*/
