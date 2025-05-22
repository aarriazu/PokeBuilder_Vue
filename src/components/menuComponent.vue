<template>
  <!-- Menú lateral -->
  <ion-menu content-id="main-content" side="start">
    <ion-header>
      <ion-toolbar>
          <div class="flex items-center p-4 border-b border-gray-200">
          <img 
            class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200" 
            :src="profilePic! || ''"
          >
          <div>
            <h5 class="text-blue-600 font-semibold text-sm">{{ userController.getUsername() }}</h5>
            <p class="text-gray-500 text-xs">Miembro desde 10/02/2024</p>
            <a @click="userController.logout(router)" class="text-red-500 hover:text-red-700 text-sm mt-1 inline-block">Exit</a>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Contenido del menú -->
      <ion-list>
        <ion-item button>
          <ion-label>Perfil</ion-label>
        </ion-item>
        <ion-item button>
          <ion-label>Configuración</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  
  <!-- Página principal -->
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <!-- Botón para abrir el menú -->
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Contenido principal de la página -->
      <p>Este es el contenido principal de la página.</p>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import * as userController from '@/controllers/userController';
    
    import type { Router } from 'vue-router';

    defineProps({
      router: {
        type: Object as () => Router,
        required: true,
      },
    });

    const profilePic = ref<any>(null);

    onMounted(() => {
        userController.getUser();
        profilePic.value = userController.getProfilePic();
        console.log('Imagen de perfil:', profilePic.value);
    });
</script>
  
<style scoped>
  /* Puedes agregar estilos personalizados aquí si es necesario */
</style>