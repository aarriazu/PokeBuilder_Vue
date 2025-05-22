<template>
  <div>
    <!-- Botón para abrir/cerrar la barra lateral -->
    <button @click="toggleSidebar" class="toggle-button">
      {{ sidebarOpen ? '<<' : '>>' }}
    </button>

    <!-- Contenedor de la barra lateral -->
    <div class="sidebar md:w-64 bg-gray-50 border-r border-gray-200 md:block transition-all duration-300"
         :class="{'hidden': !sidebarOpen, 'absolute z-50 w-3/4 h-full bg-white': sidebarOpen}">
      <!-- Perfil en sidebar -->
      <div v-if="user">
        <div class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
          <div class="sidebar-content">
            <h2>Menú</h2>
            <ul>
              <li v-for="category in categories" :key="category.id" :style="{ color: category.color }">
                {{ category.name }}
              </li>
            </ul>
            <button @click="logout">Cerrar sesión</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No usuario</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/classes/User';

const props = defineProps({
  sidebarOpen: Boolean,
  //currentForum: String
});

const emit = defineEmits(['toggle-sidebar']);
const sidebarOpen = ref(false); 

const router = useRouter();

const user = ref<User | null>(null);

const categories = ref([
  { id: 1, name: 'General', color: 'blue' },
  { id: 2, name: 'Ayuda', color: 'green' },
  { id: 3, name: 'Torneos', color: 'red' },
  { id: 4, name: 'Spinoff', color: 'purple' },
  { id: 5, name: 'Offtopic', color: 'yellow' }
]);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value; // Cambia el estado de la barra lateral
  emit('toggle-sidebar', sidebarOpen.value); // Notifica al componente padre
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-ES');
};

const logout = () => {
  sessionStorage.removeItem('session');
  router.push('/login');
};

onMounted(() => {
  const session = sessionStorage.getItem('session');

  if (session) {
    try {
      // Decodifica el token JWT
      const decodedToken = jwtDecode(session) as User;

      user.value = decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      user.value = null;
    }
  } else {
    console.error('No se encontró el token en el almacenamiento');
    user.value = null;
  }
});
</script>
<style scoped>
/* Estilo general del botón */
.toggle-button {
  position: fixed;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1100;
  transition: all 0.3s ease;
}

/* Posición del botón en pantallas grandes (PC) */
@media (min-width: 768px) {
  .toggle-button {
    top: 50%; /* Centrado verticalmente */
    left: 0; /* Pegado al borde izquierdo */
    transform: translateY(-50%); /* Ajusta el centrado */
  }
}

/* Posición del botón en pantallas pequeñas (móvil) */
@media (max-width: 767px) {
  .toggle-button {
    top: 20px; /* Parte superior */
    left: 20px; /* Pegado al borde izquierdo */
  }
}
</style>