<template>
  <div class="sidebar md:w-64 bg-gray-50 border-r border-gray-200 md:block transition-all duration-300"
       :class="{'hidden': !sidebarOpen, 'absolute z-50 w-3/4 h-full bg-white': sidebarOpen}">
    <!-- Botón para cerrar sidebar en móvil -->
    <button @click="toggleSidebar" class="md:hidden p-4 text-gray-500 hover:text-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Perfil en sidebar -->
    <div class="flex items-center p-4 border-b border-gray-200">
      <img 
        class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200" 
        :src="user.profilePic || '/src/assets/images/profile/profilePic.png'"
      >
      <div>
        <h5 class="text-blue-600 font-semibold text-sm">{{ user.username }}</h5>
        <p class="text-gray-500 text-xs">Miembro desde {{ formatDate(user.joinDate) }}</p>
        <button
          @click="logout"
          class="text-red-500 text-xs mt-1 hover:underline focus:outline-none"
        >
          Cerrar sesión
        </button>
      </div>
    </div>

    <!-- Categorías del foro -->
    <div class="p-4 space-y-2">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categorías</h3>
      <ul>
        <li
          v-for="category in categories"
          :key="category.id"
          class="flex items-center p-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
        >
          <span :class="`text-${category.color}-800 font-medium`">{{ category.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserData } from '@/api/userApi'; // Asume que tienes un servicio API para cargar datos del usuario

const props = defineProps({
  sidebarOpen: Boolean,
  currentForum: String
});

const emit = defineEmits(['toggle-sidebar']);

const router = useRouter();

const user = ref(null);

const categories = ref([
  { id: 1, name: 'General', color: 'blue' },
  { id: 2, name: 'Ayuda', color: 'green' },
  { id: 3, name: 'Torneos', color: 'red' },
  { id: 4, name: 'Spinoff', color: 'purple' },
  { id: 5, name: 'Offtopic', color: 'yellow' }
]);

const toggleSidebar = () => {
  emit('toggle-sidebar');
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-ES');
};

const logout = async () => {
  try {
    await fetch('/api/logout.php', { method: 'POST' });
    router.push('/login');
  } catch (e) {
    alert('Error al cerrar sesión');
  }
};

// Cargar datos del usuario
onMounted(async () => {
  try {
    const userData = await getUserData();
    user.value = userData;
  } catch (error) {
    console.error('Error al cargar datos del usuario:', error);
  }
});
</script>