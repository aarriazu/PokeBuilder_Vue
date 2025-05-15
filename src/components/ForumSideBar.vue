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
      
      <router-link 
        v-for="category in categories" 
        :key="category.id"
        :to="category.route" 
        class="flex items-center p-3 rounded-lg transition-colors"
        :class="getCategoryClasses(category.id)"
      >
        <div :class="`bg-${category.color}-100 p-2 rounded-lg mr-3`">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="`text-${category.color}-600`" viewBox="0 0 20 20" fill="currentColor">
            <path :d="category.icon" />
          </svg>
        </div>
        <span class="font-medium">{{ category.name }}</span>
        <span :class="`ml-auto bg-${category.color}-100 text-${category.color}-800 text-xs px-2 py-1 rounded-full`">
          {{ category.postCount }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getForumStats } from '@/api/forumApi'; // Asume que tienes un servicio API

const props = defineProps({
  sidebarOpen: Boolean,
  currentForum: String
});

const emit = defineEmits(['toggle-sidebar']);

const router = useRouter();

const user = ref({
  username: 'Cargando...',
  joinDate: new Date(),
  profilePic: ''
});

const categories = ref([
  {
    id: 'general',
    name: 'General',
    route: '/home/forumGeneral',
    color: 'blue',
    icon: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z',
    postCount: 0
  },
  // ... otras categorías con estructura similar
]);

const toggleSidebar = () => {
  emit('toggle-sidebar');
};

const getCategoryClasses = (categoryId: string) => {
  return {
    [`bg-${categories.value.find(c => c.id === categoryId)?.color}-100`]: props.currentForum === categoryId,
    [`text-${categories.value.find(c => c.id === categoryId)?.color}-800`]: props.currentForum === categoryId,
    'text-gray-700 hover:bg-gray-100': props.currentForum !== categoryId
  };
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

// Cargar datos del usuario y estadísticas del foro
onMounted(async () => {
  try {
    const stats = await getForumStats();
    user.value = stats.user;
    
    // Actualizar conteos de posts
    categories.value.forEach(category => {
      const categoryStats = stats.categories.find((c: any) => c.id === category.id);
      if (categoryStats) {
        category.postCount = categoryStats.postCount;
      }
    });
  } catch (error) {
    console.error('Error al cargar estadísticas del foro:', error);
  }
});
</script>