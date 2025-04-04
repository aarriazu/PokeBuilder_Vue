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
                    <p class="text-gray-800 font-semibold">Spin-off</p>
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
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Duda PTCG</h2> <!-- Titulo del post -->
                <div class="border-2 border-gray-200 p-4 rounded-lg mb-4">
                  <p class="text-gray-600 text-sm"> <!-- Contenido/ TODO que se puedan añadir imagenes -->
                    Este es el contenido del post. Aquí puedes leer los detalles y comentarios relacionados con este tema.
                  </p>
                </div>

                <!-- Botón para responder -->
                <div class="mb-6">
                  <a 
                    href="/home/newPost" 
                    class="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Responder
                  </a>
                </div>

                <!-- Línea divisora -->
                <hr class="border-t border-gray-300 mb-6">

                <!-- Comentarios -->
                <div class="space-y-4">
                  <div class="bg-gray-100 rounded-lg p-4 shadow-sm">
                    <h5 class="text-gray-800 font-semibold">Usuario1</h5>
                    <p class="text-gray-600 text-sm mt-2">
                      Este es un comentario de ejemplo. Aquí el usuario comparte su opinión sobre el tema.
                    </p>
                  </div>
                  <div class="bg-gray-100 rounded-lg p-4 shadow-sm">
                    <h5 class="text-gray-800 font-semibold">Usuario2</h5>
                    <p class="text-gray-600 text-sm mt-2">
                      Otro comentario de ejemplo. Este usuario también participa en la discusión.
                    </p>
                  </div>
                  <div class="bg-gray-100 rounded-lg p-4 shadow-sm">
                    <h5 class="text-gray-800 font-semibold">Usuario3</h5>
                    <p class="text-gray-600 text-sm mt-2">
                      Este es un tercer comentario para mostrar cómo se ven múltiples respuestas.
                    </p>
                  </div>
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