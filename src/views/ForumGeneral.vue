<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main flex flex-col md:flex-row h-full">
        <!-- Sidebar para categorías - Oculto en móvil por defecto -->
        <div class="sidebar md:w-64 bg-gray-50 border-r border-gray-200 md:block transition-all duration-300"
             :class="{'hidden': !sidebarOpen, 'absolute z-50 w-3/4 h-full bg-white': sidebarOpen}">
          <!-- Botón para cerrar sidebar en móvil -->
          <button @click="toggleSidebar" class="md:hidden p-4 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Perfil en sidebar -->
          <div class="flex items-center p-4 border-b border-gray-200">
            <img 
              class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200" 
              src="/src/assets/images/profile/profilePic.png"
            >
            <div>
              <h5 class="text-blue-600 font-semibold text-sm">Pokefan33</h5>
              <p class="text-gray-500 text-xs">Miembro desde 10/02/2024</p>
            </div>
          </div>

          <!-- Categorías del foro -->
          <div class="p-4 space-y-2">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categorías</h3>
            
            <router-link 
              to="/home/forumGeneral" 
              class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-blue-100 text-blue-800': currentForum === 'general', 'text-gray-700 hover:bg-gray-100': currentForum !== 'general'}"
            >
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">General</span>
              <span class="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">24</span>
            </router-link>

            <router-link 
              to="/home/forumTorneos" 
              class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-red-100 text-red-800': currentForum === 'torneos', 'text-gray-700 hover:bg-gray-100': currentForum !== 'torneos'}"
            >
              <div class="bg-red-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Torneos</span>
              <span class="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">12</span>
            </router-link>

            <router-link 
              to="/home/forumAyuda" 
              class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-green-100 text-green-800': currentForum === 'ayuda', 'text-gray-700 hover:bg-gray-100': currentForum !== 'ayuda'}"
            >
              <div class="bg-green-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Ayuda</span>
              <span class="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">8</span>
            </router-link>

            <router-link 
              to="/home/forumSpinoff" 
              class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-purple-100 text-purple-800': currentForum === 'spinoff', 'text-gray-700 hover:bg-gray-100': currentForum !== 'spinoff'}"
            >
              <div class="bg-purple-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
              </div>
              <span class="font-medium">Spin-off</span>
              <span class="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">5</span>
            </router-link>

            <router-link 
              to="/home/forumOfftopic" 
              class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-yellow-100 text-yellow-800': currentForum === 'offtopic', 'text-gray-700 hover:bg-gray-100': currentForum !== 'offtopic'}"
            >
              <div class="bg-yellow-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Off-topic</span>
              <span class="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">3</span>
            </router-link>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="content flex-1 overflow-auto">
          <!-- Barra superior con botón para mostrar sidebar en móvil -->
          <div class="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:justify-center">
            <button @click="toggleSidebar" class="md:hidden text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 class="text-2xl font-bold text-indigo-600">Pokebuilder</h1>
            
            <div class="md:hidden w-6"></div> <!-- Espaciador para centrar el título -->
          </div>

          <!-- Área de contenido -->
          <div class="p-4 md:p-6">
            <div class="max-w-4xl mx-auto">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Bienvenido al foro general</h2>
              <p class="text-gray-600 mb-6">
                Aquí puedes discutir temas generales relacionados con Pokémon. Participa en las conversaciones y comparte tus ideas con otros entrenadores.
              </p>

              <!-- Botón Crear Post -->
              <div class="mb-6">
                <router-link 
                  to="/home/newPost" 
                  class="inline-flex items-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Crear Post
                </router-link>
              </div>

              <!-- Publicaciones -->
              <div class="space-y-4">
                <!-- Post 1 -->
                <div class="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition">
                  <div class="w-16 h-16 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg text-gray-800 truncate hover:text-blue-600">
                      <router-link to="/home/post/">Mejor equipo para la liga de Galar</router-link>
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">Publicado por: EntrenadorElite</p>
                    
                    <div class="flex flex-wrap items-center mt-2 text-xs gap-2 md:gap-4">
                      <span class="text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        24 comentarios
                      </span>
                      <span class="text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        10 votos
                      </span>
                      <a href="#" class="text-red-500 hover:text-red-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Reportar
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Post 2 -->
                <div class="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition">
                  <div class="w-16 h-16 flex-shrink-0 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg text-gray-800 truncate hover:text-blue-600">
                      <router-link to="/home/post/2">Nuevas mecánicas en Pokémon Escarlata</router-link>
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">Publicado por: ExploradorPaldea</p>
                    
                    <div class="flex flex-wrap items-center mt-2 text-xs gap-2 md:gap-4">
                      <span class="text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        42 comentarios
                      </span>
                      <span class="text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        28 votos
                      </span>
                      <a href="#" class="text-red-500 hover:text-red-700">Reportar</a>
                    </div>
                  </div>
                </div>

                <!-- Post 3 -->
                <div class="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition">
                  <div class="w-16 h-16 flex-shrink-0 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg text-gray-800 truncate hover:text-blue-600">
                      <router-link to="/home/post/3">Eventos de temporada actualizados</router-link>
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">Publicado por: CazadorEventos</p>
                    
                    <div class="flex flex-wrap items-center mt-2 text-xs gap-2 md:gap-4">
                      <span class="text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        15 comentarios
                      </span>
                      <span class="text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        9 votos
                      </span>
                      <a href="#" class="text-red-500 hover:text-red-700">Reportar</a>
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
const currentForum = ref('general'); // Rutas

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<style scoped>
/* Asegurar que el contenido ocupe toda la altura disponible */
.main {
  min-height: 100vh;
}

/* Sidebar fijo en desktop */
@media (min-width: 768px) {
  .sidebar {
    height: calc(100vh - 60px); /* Ajustar según necesidad */
    position: sticky;
    top: 0;
  }
  
  .content {
    height: calc(100vh - 60px); /* Ajustar según necesidad */
    overflow-y: auto;
  }
}

/* Transición suave para el sidebar en móvil */
.sidebar {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>