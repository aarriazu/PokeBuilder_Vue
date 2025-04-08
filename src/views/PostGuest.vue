<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main">
        <!-- Perfil del invitado -->
        <div class="flex items-center mt-6 ml-6">
          <img 
            class="w-20 h-20 rounded-lg object-cover mr-4 border-2 border-gray-200" 
            src="/src/assets/images/profile/guestProfile.png"
            alt="Guest Icon"
          >
          <div>
            <h5 class="text-blue-600 font-semibold text-lg">Invitado</h5>
            <a href="/login" class="text-red-500 hover:text-red-700 text-sm mt-1 inline-block">Iniciar sesión</a>
          </div>
        </div>

        <!-- Título -->
        <div class="text-center mt-8">
          <h1 class="text-4xl font-bold text-indigo-600">Pokebuilder</h1>
        </div>

        <!-- Grid principal -->
        <ion-grid class="container px-4 mt-8">
          <ion-row>
            <!-- Categorías del foro -->
            <ion-col size="12" size-md="3" class="pr-0 md:pr-4">
              <div class="space-y-4">
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/forumGuestGeneral" class="block">
                    <p class="text-gray-800 font-semibold">General</p>
                  </a>
                </div>
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/forumGuestTorneos" class="block">
                    <p class="text-gray-800 font-semibold">Torneos</p>
                  </a>
                </div>
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/forumGuestAyuda" class="block">
                    <p class="text-gray-800 font-semibold">Ayuda</p>
                  </a>
                </div>
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/forumGuestSpinoff" class="block">
                    <p class="text-gray-800 font-semibold">Spin-off</p>
                  </a>
                </div>
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/forumGuestOfftopic" class="block">
                    <p class="text-gray-800 font-semibold">Off-topic</p>
                  </a>
                </div>
              </div>
            </ion-col>

            <!-- Contenido principal -->
            <ion-col size="12" size-md="9" class="pl-0 md:pl-4">
              <div class="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Bienvenido al foro</h2>
                <p class="text-gray-600 text-sm mb-4">
                  Explora las publicaciones del foro. Para participar en las conversaciones, inicia sesión o crea una cuenta.
                </p>

                <!-- Publicaciones -->
                <div class="space-y-4">
                  <a href="/home/post" class="block">
                    <img 
                      src="/src/assets/images/forum/forumPostGeneral.png" 
                      alt="Publicación 1" 
                      class="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                  </a>
                  <a href="/home/post" class="block">
                    <img 
                      src="/src/assets/images/forum/forumPostGeneral.png" 
                      alt="Publicación 2" 
                      class="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                  </a>
                  <a href="/home/post" class="block">
                    <img 
                      src="/src/assets/images/forum/forumPostGeneral.png" 
                      alt="Publicación 3" 
                      class="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                  </a>
                  <a href="/home/post" class="block">
                    <img 
                      src="/src/assets/images/forum/forumPostGeneral.png" 
                      alt="Publicación 4" 
                      class="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                  </a>
                </div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';
</script>

<style scoped>
/* Mantén tus estilos existentes aquí si es necesario */
</style>