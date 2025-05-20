<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
    <div class="flex items-center mb-4">
      <img 
        :src="authorImage" 
        alt="User Icon" 
        class="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <h4 class="text-lg font-semibold text-gray-800">{{ title }}</h4>
        <p class="text-sm text-gray-500">Por {{ author }}</p>
        <p class="text-sm text-gray-400">{{ formattedDate }}</p> <!-- Fecha de publicación -->
      </div>
    </div>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: String, // Título del post
  author: String, // Autor del post
  description: String, // Descripción del post
  createdAt: String, // Fecha de creación del post
  authorImage: {
    type: String,
    default: '/src/assets/images/profile/otherProfile.png', // Imagen del autor
  },
});

// Computed property para formatear la fecha
const formattedDate = computed(() => {
  if (!props.createdAt) return '';
  const date = new Date(props.createdAt);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>