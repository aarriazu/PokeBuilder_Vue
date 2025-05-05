<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main">
        <!-- Perfil del usuario en la parte superior izquierda -->
        <div class="flex items-center mt-6 ml-6">
          <img 
            class="w-20 h-20 rounded-lg object-cover mr-4 border-2 border-gray-200" 
            src="/src/assets/images/profile/profilePic.png"
            alt="User Icon"
          >
          <div>
            <h5 class="text-blue-600 font-semibold text-lg">Pokefan33</h5>
            <h5 class="text-gray-600 text-sm mt-1">Miembro desde 10/02/2024</h5>
            <a href="/login" class="text-red-500 hover:text-red-700 text-sm mt-1 inline-block">Salir</a>
          </div>
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
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Duda PTCG</h2> <!-- Título del post -->

                <!-- Contenedor del contenido principal -->
                <div class="flex items-start border-2 border-gray-200 p-4 rounded-lg mb-4">
                  <!-- Icono de usuario y nombre -->
                  <div class="flex-shrink-0 mr-4 text-center">
                    <img 
                      src="/src/assets/images/profile/otherProfile.png" 
                      alt="User Icon" 
                      class="w-16 h-16 rounded-lg"
                    />
                    <p class="text-sm font-semibold text-blue-600 mt-2">Pokefan43</p>
                  </div>

                  <!-- Contenido del post -->
                  <div>
                    <p class="text-gray-600 text-sm">
                      Este es el contenido del post. Aquí puedes leer los detalles y comentarios relacionados con este tema.
                    </p>
                    <!-- Fecha del post -->
                    <p class="text-gray-500 text-xs mt-4">Publicado el: 10/02/2024</p>
                  </div>
                </div>

                <!-- Botón para responder -->
                <div class="mb-6">
                  <button
                    @click="showReplyForm = !showReplyForm"
                    class="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Responder
                  </button>
                </div>

                <!-- Formulario de respuesta (se muestra al hacer clic en Responder) -->
                <div v-if="showReplyForm" class="mb-6">
                  <form @submit.prevent="submitReply">
                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div class="px-4 py-2 bg-white rounded-t-lg">
                        <label for="comment" class="sr-only">Tu comentario</label>
                        <textarea 
                          id="comment" 
                          rows="4" 
                          v-model="replyContent"
                          class="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 placeholder-gray-400" 
                          placeholder="Escribe un comentario..." 
                          required
                        ></textarea>
                      </div>
                      <div class="flex items-center justify-between px-3 py-2 border-t border-gray-200">
                        <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                          Publicar comentario
                        </button>
                        <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                          <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                            </svg>
                            <span class="sr-only">Adjuntar archivo</span>
                          </button>
                          <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                            <span class="sr-only">Subir imagen</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <p class="ms-auto text-xs text-gray-500">Recuerda, las contribuciones a este tema deben seguir nuestras <a href="#" class="text-blue-600 hover:underline">Normas de la Comunidad</a>.</p>
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
import { ref } from 'vue';

const showReplyForm = ref(false);
const replyContent = ref('');

const submitReply = () => {
  // Aquí puedes manejar el envío del comentario
  console.log('Comentario enviado:', replyContent.value);
  // Limpiar el formulario después del envío
  replyContent.value = '';
  // Ocultar el formulario si lo deseas
  showReplyForm.value = false;
};
</script>

<style scoped>
</style>