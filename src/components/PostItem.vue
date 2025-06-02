<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
    <div class="flex items-center mb-4">
      <img 
        :src="authorProfilePic" 
        alt="User Icon" 
        class="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <h4 class="text-lg font-semibold text-gray-800">{{ title }}</h4>
        <p class="text-sm text-gray-500">By {{ author }}</p>
        <p class="text-sm text-gray-400">{{ formattedDate }}</p> <!-- Fecha de publicación -->
      </div>
    </div>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { getProfilePicByUsername } from '@/controllers/userController';


const props = defineProps({
  title: String, // Título del post
  author: String, // Autor del post
  description: String, // Descripción del post
  createdAt: String, // Fecha de creación del post
});

const authorProfilePic = ref('/src/assets/images/guest.jpg');
// Carga la imagen cuando el componente se monta o cambia el autor
const loadProfilePic = async () => {
  if (props.author) {
    authorProfilePic.value = await getProfilePicByUsername(props.author);
  }
};
onMounted(loadProfilePic);
watch(() => props.author, loadProfilePic);

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

</style>