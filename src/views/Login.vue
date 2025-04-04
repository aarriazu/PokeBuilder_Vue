<template>
  <ion-page>
    <navbarCustom/>
    <ion-content :fullscreen="true">
      <!-- Título principal -->
      <div class="absolute top-0 w-full text-center mt-16">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">
          Pokebuilder
        </h1>
      </div>
      
      <ion-grid class="flex items-center justify-center min-h-screen bg-white m-2">
        <!-- Contenedor principal dividido en dos columnas -->
        <ion-row class="w-full max-w-6xl">
          <!-- Sección de Login -->
          <ion-col size="12" size-md="6" class="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center">
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
          </ion-col>

          <!-- Sección de Actividad Reciente -->
          <ion-col size="12" size-md="6" class="flex flex-col justify-center">
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
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-modal ref="registerModal" trigger="login-trigger" trigger-action="click" alignment="center">
  <ion-content class="ion-padding">
    <div class="bg-white rounded-lg p-6 max-w-md mx-auto">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Crear cuenta</h2>
      
      <form class="space-y-4">
        <!-- Nombre de usuario -->
        <div>
          <label for="registerUserName" class="block text-gray-800 font-semibold mb-2">Nombre de usuario</label>
          <input 
            type="text" 
            id="registerUserName" 
            name="registerUserName" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Escribe tu nombre de usuario"
          >
        </div>

        <!-- Correo electrónico -->
        <div>
          <label for="registerEmail" class="block text-gray-800 font-semibold mb-2">Correo electrónico</label>
          <input 
            type="email" 
            id="registerEmail" 
            name="registerEmail" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Escribe tu correo electrónico"
          >
        </div>

        <!-- Contraseña -->
        <div>
          <label for="registerPassword" class="block text-gray-800 font-semibold mb-2">Contraseña</label>
          <input 
            type="password" 
            id="registerPassword" 
            name="registerPassword" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Escribe tu contraseña"
          >
        </div>

        <!-- Confirmar contraseña -->
        <div>
          <label for="registerPasswordConfirm" class="block text-gray-800 font-semibold mb-2">Confirmar contraseña</label>
          <input 
            type="password" 
            id="registerPasswordConfirm" 
            name="registerPasswordConfirm" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Confirma tu contraseña"
          >
        </div>

        <!-- Botón para crear cuenta -->
        <div class="text-center">
          <ion-button 
            href="/home/profile" 
            @click="createAccount" 
            class="text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Crear cuenta
          </ion-button>
        </div>
      </form>
    </div>
  </ion-content>
</ion-modal>
      
      <!-- Footer -->
      <footerCustom/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';
import navbarCustom from '@/components/navbarComponent.vue';
import footerCustom from '@/components/footerComponent.vue';

const registerModal = ref();

const createAccount = () => {
  registerModal.value.dismiss();
};
</script>

<style scoped>

</style>