import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/classes/User';

const user = ref<User | null>(null);

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

export function getUser() {
  const session = sessionStorage.getItem('session');

  if (session) {
    try {
      // Decodifica el token JWT
      user.value = jwtDecode(session) as User; 
      console.log('Usuario decodificado:', user.value.profilePicture);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  } else {
    console.error('No se encontró el token en el almacenamiento');
  }
}

export function getUsername(): String  {
  return user.value?.username || "nousername";
}

export function getProfilePic(): String  {
    return user.value?.profilePicture || "noimg";
}

/*
export function getJoinDate(): String  {
    return user.value?.createdAt.toString || "noimg";
}
*/
