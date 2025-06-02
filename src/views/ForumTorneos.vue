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

          <div class="p-4 space-y-2">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
            
            <router-link to="/forumGeneral" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-blue-100 text-blue-800': currentForum === 'general', 'text-gray-700 hover:bg-gray-100': currentForum !== 'general'}">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">General</span>
            </router-link>

            <router-link to="/forumTorneos" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-red-100 text-red-800': currentForum === 'torneos', 'text-gray-700 hover:bg-gray-100': currentForum !== 'torneos'}">
              <div class="bg-red-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Tournaments</span>
            </router-link>

            <router-link to="/forumAyuda" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-green-100 text-green-800': currentForum === 'ayuda', 'text-gray-700 hover:bg-gray-100': currentForum !== 'ayuda'}">
              <div class="bg-green-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Help</span>
            </router-link>

            <router-link to="/forumSpinoff" class="flex items-center p-3 rounded-lg transition-colors"
                         :class="{'bg-purple-100 text-purple-800': currentForum === 'spinoff', 'text-gray-700 hover:bg-gray-100': currentForum !== 'spinoff'}">
              <div class="bg-purple-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
              </div>
              <span class="font-medium">Spin-off</span>
            </router-link>

            <router-link to="/forumOfftopic" class="flex items-center p-3 rounded-lg transition-colors"
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
          <div class="bg-white border-b border-gray-200 p-4 flex items-center justify-center md:justify-center">
            <button @click="toggleSidebar" class="md:hidden text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 class="text-2xl font-bold text-indigo-600">Pokebuilder</h1>
            
            <div class="md:hidden w-6"></div> <!-- Espaciador para centrar el título -->
          </div>

          <div class="p-4 md:p-6">
            <div class="max-w-4xl mx-auto">
              <!-- Cabecera del foro -->
              <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Welcome to the tournament forum</h2>
                <p class="text-gray-600 mb-6">Here you can discuss Pokémon tournament-related topics and create your own tournaments. Participate in conversations and share your strategies with other trainers.</p>     
                <!-- Botón Crear Toreno -->
                <button
                  @click="checkLogin"
                  class="inline-flex items-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Create tournament
                </button>

              </div>

              <!-- Lista de posts -->
              <div class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Recent Posts</h3>
                
                <router-link 
                  v-for="post in posts" 
                  :key="post._id" 
                  :to="`/forumTorneos/post/${post._id}`" 
                  class="block no-underline"
                >
                    <!-- Mostrar los post de la DB con el component-->
                    <PostItem 
                    :key="post._id" 
                    :title="post.title" 
                    :author="post.author" 
                    :subforum="post.subforum" 
                    :description="post.description"
                    :bracket="post.bracket"
                    :participants="post.participants"
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
import PostItem from '@/components/PostItem.vue'; // Importar el componente PostItem
import * as dataController from '@/controllers/dataController';
import { useRouter } from 'vue-router';
import { getUsername } from '@/controllers/userController';

const router = useRouter();
const sidebarOpen = ref(false);
const currentForum = ref('torneos');

interface post {
  _id:string,
  title:string,
  author:string,
  subforum:string,
  description:string,
  participants:string[],
  bracket:string[],
  answers:number,
  createdAt:string,
  editedAt:string
}

const posts = ref<post[]>([]);

// Función para obtener los posts desde el servidor
const fetchPosts = async ()  => {
  try {
    posts.value = await dataController.getPostsTorneo() as post[]; // Llamar al servicio para obtener los posts
  } catch (error) {
    console.error('Error al obtener los posts:', error);
  }
};

const checkLogin = (event: Event) => {
  event.preventDefault(); // evitar navegación automática

  const username = getUsername();
  if (!username || username === 'nousername') {
    alert('You must log in to create a post');
    return;
  }
  
  // Navegar manualmente al enlace del router-link
  router.push({ path: '/torneoBracket', query: { subforum: 'torneos' } });
};

// Llamar a la función fetchPosts cuando el componente se monte
onMounted(() => {
  fetchPosts();
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