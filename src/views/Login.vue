<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Título principal -->
      <div class="absolute top-0 w-full text-center mt-4">
        <h1 class="text-7xl font-bold text-black">Pokebuilder</h1>
      </div>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <!-- Contenedor principal dividido en dos columnas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          <!-- Sección de Login -->
          <div class="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Acceder</h2>
            <p class="text-gray-600 mb-2">Nombre de usuario o correo electrónico</p>
            <input 
              type="text" 
              id="userName" 
              name="userName" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-white"
            >
            <p class="text-gray-600 mb-2">Contraseña</p>
            <input 
              type="password" 
              id="password" 
              name="password" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-white"
            >
            <ion-button 
              router-link="/home/profile" 
              class="w-full text-white py-2 px-4 rounded-lg"
            >
              Acceder
            </ion-button>
            <p class="text-gray-600 mt-4 flex items-center">
              ¿No tienes cuenta?
              <span id="login-trigger" class="text-indigo-600 cursor-pointer hover:underline ml-2">
                Regístrate aquí
              </span>
            </p>
          </div>

          <!-- Sección de Actividad Reciente -->
          <div class="flex flex-col justify-center">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Actividad reciente</h2>
            <a href="/postGuest" class="block mb-4">
              <img 
                src="/src/assets/images/forum/loginForumPost1.png" 
                alt="Post 1" 
                class="w-full rounded-lg shadow-md"
              >
            </a>
            <a href="/postGuest" class="block">
              <img 
                src="/src/assets/images/forum/loginForumPost2.png" 
                alt="Post 2" 
                class="w-full rounded-lg shadow-md"
              >
            </a>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonContent, IonPage } from '@ionic/vue';

const registerModal = ref();

const createAccount = () => {
  registerModal.value.dismiss();
};
</script>

<style scoped>
</style>