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
            <button @click="toggleSidebar" class="md:hidden text-gray-500 hover:text-gray-700">
              <!-- Icono de menú -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-indigo-600">Pokebuilder</h1>
            <div class="md:hidden w-6"></div>
          </div>

          <div class="p-4 md:p-6">
            <div class="max-w-4xl mx-auto">
              <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Bienvenido al foro Off-topic</h2>
                <p class="text-gray-600 mb-6">
                  Este es el lugar para charlas libres, temas fuera del universo Pokémon o cualquier cosa interesante. ¡Exprésate!
                </p>

                <router-link 
                  :to="{ path: '/home/newPost', query: { subforum: 'Offtopic' } }" 
                  class="inline-flex items-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Crear Post
                </router-link>
              </div>

              <div class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Publicaciones recientes</h3>
                <router-link v-for="post in posts" :key="post._id" :to="`/home/post/${post._id}`" class="block no-underline">
                  <PostItem 
                    :key="post._id" 
                    :title="post.title" 
                    :author="post.author" 
                    :subforum="post.subforum" 
                    :description="post.content"
                    :answers="post.answers"
                    :createdAt="post.createdAt"
                    :editedAt="post.editedAt"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import PostItem from '@/components/PostItem.vue';
import * as dataController from '@/controllers/dataController';

const sidebarOpen = ref(false);
const currentForum = ref('offtopic');

interface post {
  _id: string;
  id: number;
  title: string;
  author: string;
  subforum: string;
  content: string;
  answers: number;
  createdAt: string;
  editedAt: string;
}

const posts = ref<post[]>([]);

const fetchOfftopicPost = async () => {
  try {
    posts.value = await dataController.getPosts() as post[];
    posts.value = posts.value.filter((post) => post.subforum === 'Offtopic');
  } catch (error) {
    console.error('Error al obtener los posts:', error);
  }
};

onMounted(() => {
  fetchOfftopicPost();
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
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
</style>
