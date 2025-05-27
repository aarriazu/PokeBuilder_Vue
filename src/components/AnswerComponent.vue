<template>
    <div class="bg-white rounded-lg p-4 mb-4">
      <!-- Información del autor y fecha -->
      <div class="flex items-center justify-between mb-2">
        <div>
          <h4 class="text-sm font-semibold text-gray-800">{{ author }}</h4>
          <p class="text-xs text-gray-500">
            Publicado el {{ new Date(createdAt).toLocaleString() }}
          </p>
        </div>
      </div>
  
      <!-- Contenido del comentario -->
      <p class="text-gray-700 text-sm leading-relaxed">
        {{ content }}
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  // Props para recibir los datos del comentario
  defineProps({
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>