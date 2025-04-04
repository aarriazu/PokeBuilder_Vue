<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main">
        <!-- Perfil -->
        <div class="flex items-center mt-6 ml-6">
          <img 
            class="w-20 h-20 rounded-lg object-cover mr-4 border-2 border-gray-200" 
            src="/src/assets/images/profile/profilePic.png"
          >
          <div>
            <h5 class="text-blue-600 font-semibold text-lg">Pokefan33</h5>
            <h5 class="text-gray-600 text-sm mt-1">Miembro desde 10/02/2024</h5>
            <a href="/login" class="text-red-500 hover:text-red-700 text-sm mt-1 inline-block">Salir</a>
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
                  <a href="/home/forumGeneral" class="block">
                    <p class="text-gray-800 font-semibold">General</p>
                  </a>
                </div>
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumTorneos" class="block">
                    <p class="text-gray-800 font-semibold">Torneos</p>
                  </a>
                </div>
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumAyuda" class="block">
                    <p class="text-gray-800 font-semibold">Ayuda</p>
                  </a>
                </div>
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumSpinoff" class="block">
                    <p class="text-gray-800 font-semibold">Spin Off</p>
                  </a>
                </div>
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumOfftopic" class="block">
                    <p class="text-gray-800 font-semibold">Off-topic</p>
                  </a>
                </div>
              </div>
            </ion-col>

            <!-- Contenido principal -->
            <ion-col size="12" size-md="9" class="pl-0 md:pl-4">
              <div class="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Crear un nuevo post</h2>
                <p class="text-gray-600 text-sm mb-4">
                  Comparte tus ideas, preguntas o cualquier tema relacionado con Pokémon en este foro.
                </p>

                <!-- Formulario para crear un post -->
                <form class="space-y-4">
                  <!-- Título del post -->
                  <div>
                    <label for="postTitle" class="block text-gray-800 font-semibold mb-2">Título del post</label>
                    <input 
                      type="text" 
                      id="postTitle" 
                      name="postTitle" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Escribe el título aquí"
                    >
                  </div>

                  <!-- Contenido del post -->
                  <div>
                    <label for="postContent" class="block text-gray-800 font-semibold mb-2">Contenido</label>
                    <textarea 
                      id="postContent" 
                      name="postContent" 
                      rows="6" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Escribe el contenido aquí"
                    ></textarea>
                  </div>

                  <!-- Botón para publicar -->
                  <div class="text-right">
                    <button 
                      type="submit" 
                      class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Publicar
                    </button>
                  </div>
                </form>
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