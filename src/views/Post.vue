<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main flex flex-col md:flex-row h-full">
        <!-- Sidebar para categorías -->
        <div class="sidebar md:w-64 bg-gray-50 border-r border-gray-200 md:block transition-all duration-300"
             :class="{'hidden': !sidebarOpen, 'absolute z-50 w-3/4 h-full bg-white': sidebarOpen}">
          <button @click="toggleSidebar" class="md:hidden p-4 text-gray-500 hover:text-gray-700">
            <!-- Icono de cerrar -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Perfil del usuario -->
          <div class="flex items-center p-4 border-b border-gray-200">
            <img class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200" src="/src/assets/images/profile/profilePic.png">
            <div>
              <h5 class="text-blue-600 font-semibold text-sm">Pokefan33</h5>
              <p class="text-gray-500 text-xs">Miembro desde 10/02/2024</p>
            </div>
          </div>

          <!-- Categorías -->
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
            </router-link>
            <router-link 
              to="/home/forumTorneos" 
              class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-red-100 text-red-800': currentForum === 'torneos', 'text-gray-700 hover:bg-gray-100': currentForum !== 'torneos'}"
            >
              <div class="bg-red-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V7a1 1 0 10-2 0v1H7a1 1 0 100 2h2v1a1 1 0 102 0V9h2a1 1 0 100-2h-2z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Torneos</span>
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
            </router-link>
            <router-link 
              to="/home/forumSpinoff" class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-purple-100 text-purple-800': currentForum === 'spinoff', 'text-gray-700 hover:bg-gray-100': currentForum !== 'spinoff'}"
            >
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
          <div class="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:justify-center">
            <button @click="toggleSidebar" class="md:hidden text-gray-500">
              <!-- Icono de menú -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-indigo-600">Pokebuilder</h1>
            <div class="md:hidden w-6"></div>
          </div>

          <!-- Contenido del post -->
          <div class="p-4 md:p-6">
            <div class="max-w-4xl mx-auto">
              <div
                v-if="post"
                class="bg-white rounded-2xl border border-gray-200 p-8 mb-8"
              >
                <div class="flex items-center mb-6">
                  <img
                    src="/src/assets/images/profile/otherProfile.png"
                    alt="User Icon"
                    class="w-12 h-12 rounded-full mr-4 border-2 border-indigo-200"
                  />
                  <div>
                    <h3 class="font-semibold text-gray-800 text-lg">{{ post.author }}</h3>
                    <p class="text-xs text-gray-500">
                      Publicado el {{ new Date(post.createdAt).toLocaleDateString() }}
                      <span v-if="post.editedAt && post.editedAt !== post.createdAt">
                        | Editado: {{ new Date(post.editedAt).toLocaleString() }}
                      </span>
                    </p>
                  </div>
                  <span
                    class="ml-auto px-3 py-1 rounded-full text-xs font-semibold"
                    :class="{
                      'bg-blue-100 text-blue-700': post.subforum === 'General',
                      'bg-red-100 text-red-700': post.subforum === 'Torneos',
                      'bg-green-100 text-green-700': post.subforum === 'Ayuda',
                      'bg-purple-100 text-purple-700': post.subforum === 'Spinoff',
                      'bg-yellow-100 text-yellow-700': post.subforum === 'Offtopic'
                    }"
                  >
                    {{ post.subforum }}
                  </span>
                </div>
                <h2 class="text-3xl font-extrabold text-gray-900 mb-4">{{ post.title }}</h2>
                <div class="prose max-w-none text-gray-700 mb-8 text-lg leading-relaxed">
                  <p>{{ post.content }}</p>
                </div>
                <div class="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div class="flex space-x-6">
                    <span class="flex items-center text-gray-500">
                      <svg class="w-5 h-5 mr-1 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2M12 15v-6m0 0l-3 3m3-3l3 3" />
                      </svg>
                      {{ post.answers }} respuestas
                    </span>
                  </div>
                  <button class="text-red-500 text-xs font-semibold">
                    Reportar post
                  </button>
                </div>
              </div>
              <div v-else class="text-center text-gray-500 py-10">
                Cargando post...
              </div>
            </div>
          </div>
          <!-- Comentarios -->
           
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import { useRoute } from 'vue-router';
import * as dataController from '@/controllers/dataController';

const sidebarOpen = ref(false);
const currentForum = ref('offtopic');

const route = useRoute();
const post = ref<any>(null);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

onMounted(async () => {
  const id = route.params.id as string;
  post.value = await dataController.getPostById(id);
});
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