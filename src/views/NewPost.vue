<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main flex flex-col md:flex-row h-full">
        <!-- Sidebar para categorías -->
        <div class="sidebar md:w-64 bg-gray-50 border-r border-gray-200 md:block transition-all duration-300"
             :class="{'hidden': !sidebarOpen, 'absolute z-50 w-3/4 h-full bg-white': sidebarOpen}">
          <!-- Botón para cerrar sidebar en móvil -->
          <button @click="toggleSidebar" class="md:hidden p-4 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Categorías del foro -->
          <div class="p-4 space-y-2">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
            
            <router-link 
              to="/forumGeneral" 
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
              to="/forumTorneos" 
              class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-red-100 text-red-800': currentForum === 'torneos', 'text-gray-700 hover:bg-gray-100': currentForum !== 'torneos'}"
            >
              <div class="bg-red-100 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V7a1 1 0 10-2 0v1H7a1 1 0 100 2h2v1a1 1 0 102 0V9h2a1 1 0 100-2h-2z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="font-medium">Tournaments</span>
            </router-link>

            <router-link 
              to="/forumAyuda" 
              class="flex items-center p-3 rounded-lg transition-colors"
              :class="{'bg-green-100 text-green-800': currentForum === 'ayuda', 'text-gray-700 hover:bg-gray-100': currentForum !== 'ayuda'}"
            >
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
              <!-- Cabecera del formulario -->
              <div class="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Create a new post</h2>
                <p class="text-gray-600 text-sm mb-4">
                  Share your thoughts, questions, or any Pokémon-related topics in this forum.                
                </p>
                <!-- Formulario para crear un post -->
                <form class="space-y-4" @submit.prevent="savePost">
                  <!-- Título del post -->
                  <div>
                    <label for="postTitle" class="block text-gray-800 font-semibold mb-2">Post Title</label>
                    <input 
                      v-model="postContent.title"
                      type="text" 
                      id="postTitle" 
                      name="postTitle" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      placeholder="Write the post title here"
                    >
                  </div>

                  <!-- Contenido del post -->
                  <div>
                    <label for="postContent" class="block text-gray-800 font-semibold mb-2">Content</label>
                    <textarea 
                      v-model="postContent.content"
                      id="postContent" 
                      name="postContent" 
                      rows="6" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      placeholder="Write the content here"
                    ></textarea>
                  </div>

                  <!-- Botón para enviar -->
                  <div>
                    <button
                      type="submit" 
                      class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Post
                    </button>
                  </div>
                </form>
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
import { IonPage, IonContent } from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';
import { createPost, PostData } from '@/controllers/postController';
import { getUsername } from '@/controllers/userController';

const sidebarOpen = ref(false);
const currentForum = ref('newPost');

const router = useRouter();
const route = useRoute();

const postContent = ref({
  title: '',
  author: getUsername(),
  subforum: route.query.subforum as string,
  answers: 0,
  content: '',
  createdAt: '',
  editedAt: ''
});

const savePost = async (): Promise<void> => {
  if (!postContent.value.title || !postContent.value.content || !postContent.value.subforum) {
    alert('Please complete all fields before saving.');
    return;
  }

  postContent.value = {
    ...postContent.value,
    author: getUsername(),
    answers: 0,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  };

  try {
    await createPost(postContent.value);
    alert('Post saved successfully.');
    router.push('/forumGeneral');
  } catch (error) {
    console.error('Error al guardar el post:', error);
    alert('There was an error saving the post. Please try again later.');
  }
};


onMounted(() => {
  const subforumParam = route.query.subforum as string || '';
  postContent.value.subforum = subforumParam;
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