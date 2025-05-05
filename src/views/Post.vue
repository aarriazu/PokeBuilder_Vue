<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main flex flex-col md:flex-row h-full">
        <!-- Sidebar para categorías -->
        <div class="sidebar md:w-64 bg-gray-50 border-r border-gray-200 md:block transition-all duration-300"
             :class="{'hidden': !sidebarOpen, 'absolute z-50 w-3/4 h-full bg-white': sidebarOpen}">
          
          <button @click="toggleSidebar" class="md:hidden p-4 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex items-center p-4 border-b border-gray-200">
            <img class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200" 
                 src="/src/assets/images/profile/profilePic.png">
            <div>
              <h5 class="text-blue-600 font-semibold text-sm">Pokefan33</h5>
              <p class="text-gray-500 text-xs">Miembro desde 10/02/2024</p>
            </div>
          </div>

          <div class="p-4 space-y-2">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categorías</h3>
            
            <router-link to="/home/forumGeneral" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-blue-100 text-blue-800': currentForum === 'general', 'text-gray-700 hover:bg-gray-100': currentForum !== 'general'}">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">General</span>
            </router-link>

            <router-link to="/home/forumTorneos" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-red-100 text-red-800': currentForum === 'torneos', 'text-gray-700 hover:bg-gray-100': currentForum !== 'torneos'}">
              <div class="bg-red-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Torneos</span>
            </router-link>

            <router-link to="/home/forumAyuda" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-green-100 text-green-800': currentForum === 'ayuda', 'text-gray-700 hover:bg-gray-100': currentForum !== 'ayuda'}">
              <div class="bg-green-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Ayuda</span>
            </router-link>

            <router-link to="/home/forumSpinoff" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-purple-100 text-purple-800': currentForum === 'spinoff', 'text-gray-700 hover:bg-gray-100': currentForum !== 'spinoff'}">
              <div class="bg-purple-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
              </div>
              <span class="font-medium">Spin-off</span>
            </router-link>

            <router-link to="/home/forumOfftopic" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-yellow-100 text-yellow-800': currentForum === 'offtopic', 'text-gray-700 hover:bg-gray-100': currentForum !== 'offtopic'}">
              <div class="bg-yellow-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Off-topic</span>
            </router-link>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="content flex-1 overflow-auto">
          <div class="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:justify-start">
            <button @click="toggleSidebar" class="md:hidden text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 class="text-2xl font-bold text-indigo-600 ml-4">Duda PTCG</h1>
          </div>

          <div class="p-4 md:p-6">
            <div class="max-w-4xl mx-auto">
              <!-- Inputs de archivo ocultos -->
              <input 
                type="file" 
                id="file-upload" 
                ref="fileInput"
                class="hidden" 
                accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                @change="handleFileUpload"
              >
              
              <input 
                type="file" 
                id="image-upload" 
                ref="imageInput"
                class="hidden" 
                accept="image/*"
                @change="handleImageUpload"
              >

              <!-- Post principal -->
              <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <div class="flex items-center mb-4">
                  <img src="/src/assets/images/profile/otherProfile.png" 
                       alt="User Icon" 
                       class="w-10 h-10 rounded-full mr-3">
                  <div>
                    <h3 class="font-semibold text-gray-800">Pokefan43</h3>
                    <p class="text-xs text-gray-500">Publicado el 10/02/2024</p>
                  </div>
                </div>
                
                <div class="prose max-w-none text-gray-700 mb-6">
                  <p>Este es el contenido del post. Aquí puedes leer los detalles y comentarios relacionados con este tema.</p>
                  <p>Puede incluir múltiples párrafos, imágenes o cualquier otro contenido relevante para la discusión.</p>
                </div>
                
                <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div class="flex space-x-4">
                    <button class="flex items-center text-gray-500 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>25 votos</span>
                    </button>
                    <button class="flex items-center text-gray-500 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>12 comentarios</span>
                    </button>
                  </div>
                  <button class="text-red-500 hover:text-red-700 text-sm">
                    Reportar post
                  </button>
                </div>
              </div>

              <!-- Divisor y label para respuesta -->
              <div class="relative mb-8">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center">
                  <button 
                    @click="showReplyForm = !showReplyForm"
                    class="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                    </svg>
                    Escribir respuesta
                  </button>
                </div>
              </div>

              <!-- Formulario de respuesta -->
              <div v-if="showReplyForm" class="mb-8 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Escribe tu respuesta</h3>
                <form @submit.prevent="submitReply">
                  <div class="w-full mb-4">
                    <div class="px-4 py-2 bg-white rounded-t-lg">
                      <label for="comment" class="sr-only">Tu respuesta</label>
                      <textarea 
                        id="comment" 
                        rows="6" 
                        v-model="replyContent"
                        class="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 placeholder-gray-400 resize-none focus:outline focus:outline-2 focus:outline-blue-500" 
                        placeholder="Escribe tu respuesta aquí..." 
                        required
                      ></textarea>
                    </div>
                    <div class="flex items-center justify-between px-3 py-2 border-t border-gray-200">
                      <div class="flex space-x-1">
                        <button 
                          type="button" 
                          @click="getFileInput()?.click()"
                          class="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                        >
                          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                          </svg>
                          <span class="sr-only">Adjuntar archivo</span>
                        </button>
                        <button 
                          type="button" 
                          @click="imageInput?.click()"
                          class="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                        >
                          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                          </svg>
                          <span class="sr-only">Subir imagen</span>
                        </button>
                      </div>
                      <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                        Publicar respuesta
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500">Recuerda, las contribuciones a este tema deben seguir nuestras <a href="#" class="text-blue-600 hover:underline">Normas de la Comunidad</a>.</p>
                </form>
              </div>

              <!-- Lista de respuestas -->
              <div class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Respuestas (3)</h3>
                
                <!-- Respuesta 1 -->
                <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div class="flex items-start">
                    <img src="/src/assets/images/profile/otherProfile.png" 
                         alt="User Icon" 
                         class="w-10 h-10 rounded-full mr-4 flex-shrink-0">
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="font-semibold text-gray-800">Usuario1</h4>
                        <span class="text-xs text-gray-500">Hace 2 horas</span>
                      </div>
                      <div class="prose max-w-none text-gray-700 mb-4">
                        <p>Este es un comentario de ejemplo. Aquí el usuario comparte su opinión sobre el tema.</p>
                      </div>
                      <div class="flex items-center space-x-4 text-sm">
                        <button class="flex items-center text-gray-500 hover:text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span>5 votos</span>
                        </button>
                        <button class="text-red-500 hover:text-red-700">
                          Reportar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Respuesta 2 -->
                <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div class="flex items-start">
                    <img src="/src/assets/images/profile/otherProfile.png" 
                         alt="User Icon" 
                         class="w-10 h-10 rounded-full mr-4 flex-shrink-0">
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="font-semibold text-gray-800">Usuario2</h4>
                        <span class="text-xs text-gray-500">Hace 5 horas</span>
                      </div>
                      <div class="prose max-w-none text-gray-700 mb-4">
                        <p>Otro comentario de ejemplo. Este usuario también participa en la discusión.</p>
                        <p>Puede incluir múltiples párrafos si es necesario para explicar su punto de vista.</p>
                      </div>
                      <div class="flex items-center space-x-4 text-sm">
                        <button class="flex items-center text-gray-500 hover:text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span>3 votos</span>
                        </button>
                        <button class="text-red-500 hover:text-red-700">
                          Reportar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Respuesta 3 -->
                <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div class="flex items-start">
                    <img src="/src/assets/images/profile/otherProfile.png" 
                         alt="User Icon" 
                         class="w-10 h-10 rounded-full mr-4 flex-shrink-0">
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="font-semibold text-gray-800">Usuario3</h4>
                        <span class="text-xs text-gray-500">Ayer, 14:30</span>
                      </div>
                      <div class="prose max-w-none text-gray-700 mb-4">
                        <p>Este es un tercer comentario para mostrar cómo se ven múltiples respuestas.</p>
                      </div>
                      <div class="flex items-center space-x-4 text-sm">
                        <button class="flex items-center text-gray-500 hover:text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span>8 votos</span>
                        </button>
                        <button class="text-red-500 hover:text-red-700">
                          Reportar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';

const sidebarOpen = ref(false);
const currentForum = ref('general');
const showReplyForm = ref(false);
const replyContent = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

// Ensure $refs.fileInput is typed correctly
const getFileInput = (): HTMLInputElement | null => fileInput.value;
const imageInput = ref<HTMLInputElement | null>(null);

// Ensure $refs.imageInput is typed correctly
const getImageInput = (): HTMLInputElement | null => imageInput.value;

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const submitReply = () => {
  console.log('Respuesta enviada:', replyContent.value);
  replyContent.value = '';
  showReplyForm.value = false;
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log('Archivo seleccionado:', file);
    // Aquí puedes manejar el archivo
  }
};

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const image = input.files[0];
    console.log('Imagen seleccionada:', image);
    // Aquí puedes manejar la imagen
  }
};
</script>

<style scoped>
.main {
  min-height: 100vh;
}

@media (min-width: 768px) {
  .sidebar {
    height: calc(100vh - 60px);
    position: sticky;
    top: 0;
  }
  
  .content {
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
}

.sidebar {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.prose {
  line-height: 1.6;
}

.prose p {
  margin-bottom: 1rem;
}

.prose p:last-child {
  margin-bottom: 0;
}
</style>