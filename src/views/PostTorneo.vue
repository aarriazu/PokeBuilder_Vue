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
  
            <!-- Categorías -->
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
              <router-link 
                to="/forumSpinoff" class="flex items-center p-3 rounded-lg transition-colors"
                :class="{'bg-purple-100 text-purple-800': currentForum === 'spinoff', 'text-gray-700 hover:bg-gray-100': currentForum !== 'spinoff'}"
              >
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
            <div class="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:justify-center">
              <button @click="toggleSidebar" class="md:hidden text-gray-500">
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
                <!-- Formulario de edición de postTorneo -->
                <div v-if="editMode" class="bg-white rounded-2xl border border-yellow-300 p-8 mb-8 shadow-lg">
                  <h2 class="text-xl font-bold text-yellow-600 mb-4">Edit Tournament</h2>
                  <input
                    v-model="editTitle"
                    class="block w-full mb-4 border border-gray-300 bg-white rounded-lg p-3 text-lg focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="Edit title"
                  />
                  <textarea
                    v-model="editDescription"
                    rows="4"
                    class="block w-full mb-4 border border-gray-300 bg-white rounded-lg p-3 text-base focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="Edit description"
                  ></textarea>
                  <label class="block mb-2 text-sm font-medium text-gray-900">Participants (One per line)</label>
                  <textarea
                    v-model="editParticipants"
                    rows="3"
                    class="block w-full mb-4 border border-gray-300 bg-white rounded-lg p-3 text-base focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="One participant per line, e.g. Ash, Brock"
                  ></textarea>
                  <label class="block mb-2 text-sm font-medium text-gray-900">Bracket (Each line one match: participant1,participant2)</label>
                  <textarea
                    v-model="editBracket"
                    rows="4"
                    class="block w-full mb-4 border border-gray-300 bg-white rounded-lg p-3 text-base focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="Example: Ash,Brock"
                  ></textarea>
                  <div class="flex space-x-3">
                    <button @click="saveEdit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition">Guardar</button>
                    <button @click="editMode = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition">Cancelar</button>
                  </div>
                </div>
              <div
                  v-else-if="post"
                  class="bg-white rounded-2xl border border-gray-200 p-8 mb-8"
                >
                  <div class="flex items-center mb-6">
                    <img
                      :src="authorProfilePic" 
                      alt="User Icon"
                      class="w-12 h-12 rounded-full mr-4 border-2 border-indigo-200"
                    />
                    <div>
                      <h3 class="font-semibold text-gray-800 text-lg">{{ post.author }}</h3>
                      <p class="text-xs text-gray-500">
                        Created at: {{ new Date(post.createdAt).toLocaleDateString() }}
                        <span v-if="post.editedAt && post.editedAt !== post.createdAt">
                          | Edited at: {{ new Date(post.editedAt).toLocaleString() }}
                        </span>
                      </p>
                    </div>
                    <span
                      class="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700"
                    >
                      Torneos
                    </span>
                  </div>
                  <!-- Botones alineados a la derecha, igual que en Post.vue -->
                  <div class="flex items-center mb-6">
                    <div v-if="getUsername() === post.author && !editMode" class="ml-auto flex space-x-2">
                      <button
                        @click="startEdit"
                        class="px-3 py-1 rounded bg-yellow-400 text-white text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        @click="deletePost"
                        class="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h2 class="text-3xl font-extrabold text-gray-900 mb-4">{{ post.title }}</h2>
                  <div class="prose max-w-none text-gray-700 mb-8 text-lg leading-relaxed">
                    <p>{{ post.description }}</p>
                  </div>
  
                  <!-- Participantes -->
                  <div class="mb-8">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Participants</h3>
                    <ul class="list-disc list-inside text-gray-700">
                      <li v-for="(participant, index) in post.participants" :key="index">
                        {{ participant }}
                      </li>
                    </ul>
                  </div>
  
                  <!-- Bracket -->
                  <div class="mb-8">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Bracket</h3>
                    <ul class="list-disc list-inside text-gray-700">
                      <li v-for="(match, index) in post.bracket" :key="index">
                        {{ match[0] }} vs {{ match[1] }}
                      </li>
                    </ul>
                  </div>
  
                  <div class="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div class="flex space-x-6">
                      <span class="flex items-center text-gray-500">
                        <svg class="w-5 h-5 mr-1 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2M12 15v-6m0 0l-3 3m3-3l3 3" />
                        </svg>
                        {{ answers.length }} Answers
                      </span>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center text-gray-500 py-10">
                  Loading post...
                </div>
              </div>
            </div>
  
            <!-- Caja para responder-->
            <div class="max-w-4xl mx-auto mb-8">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Your answer</label>
              <textarea
                id="message"
                rows="4"
                v-model="answerContent"
                class="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Write your answer here..."
              ></textarea>
              <div class="flex justify-end mt-3">
                <button
                  @click="sendAnswer"
                  class="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Send Answer
                </button>
              </div>
            </div>
  
            <!-- Comentarios -->
            <div class="bg-white p-4 sm:p-6 rounded-lg">
              <h3 class="text-lg sm:text-xl text-center font-semibold text-gray-800 mb-4">Answers</h3>
              <div v-if="answers.length > 0">
                <AnswerComponent
                  v-for="answer in answers"
                  :key="answer._id"
                  :id="answer._id"
                  :postId="answer.postId"
                  :author="answer.author"
                  :content="answer.content"
                  :createdAt="answer.createdAt"
                  :editedAt="answer.editedAt"
                  @answer-deleted="handleAnswerDeleted"
                  @answer-updated="handleAnswerUpdated"
                />
              </div>
              <div v-else class="text-gray-500 text-center text-sm sm:text-base">
                There are no answers yet. Be the first to reply!
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
import { useRoute, useRouter } from 'vue-router';
import AnswerComponent from '@/components/AnswerComponent.vue';
import { getUsername } from '@/controllers/userController';
import { getProfilePicByUsername } from '@/controllers/userController';
import API from '@/controllers/api';

const authorProfilePic = ref('/src/assets/images/guest.jpg');
const sidebarOpen = ref(false);
const currentForum = ref('torneos');
const router = useRouter();

// Edit mode state
const editMode = ref(false);
const editTitle = ref('');
const editDescription = ref('');
const editParticipants = ref('');
const editBracket = ref('');

interface PostTorneo {
  _id: string;
  title: string;
  author: string;
  description: string;
  participants: string[];
  bracket: string[][];
  createdAt: string;
  editedAt: string;
  answers?: number;
}

interface Comment {
  _id?: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
  editedAt: string;
  parentAnswerId?: string;
  replies?: Comment[];
}

const route = useRoute();
const post = ref<PostTorneo | null>(null);
const answers = ref<Comment[]>([]);
const answerContent = ref('');

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const startEdit = () => {
  editTitle.value = post.value?.title || '';
  editDescription.value = post.value?.description || '';
  editParticipants.value = post.value?.participants.join('\n') || '';
  editBracket.value = post.value?.bracket.map(match => match.join(',')).join('\n') || '';
  editMode.value = true;
};

const saveEdit = async () => {
  try {
    // Process participants and bracket
    const participants = editParticipants.value
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const bracket = editBracket.value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && line.includes(','))
      .map(line => {
        const [p1, p2] = line.split(',').map(p => p.trim());
        return [p1, p2];
      })
      .filter(pair => pair.length === 2 && pair[0] && pair[1]);

    await API.put(`/postsTorneo/${post.value?._id}`, {
      title: editTitle.value,
      description: editDescription.value,
      participants,
      bracket,
      editedAt: new Date().toISOString()
    });

    if (post.value) {
      post.value.title = editTitle.value;
      post.value.description = editDescription.value;
      post.value.participants = participants;
      post.value.bracket = bracket;
      post.value.editedAt = new Date().toISOString();
    }
    
    editMode.value = false;
    alert('Tournament successfully edited.');
  } catch (error: any) {
    if (error.response) {
      alert(error.response.data?.error || 'You do not have permission to edit this tournament.');
    } else {
      alert('An error occurred while editing the tournament');
    }
    console.error('Error editing tournament:', error);
    editMode.value = false;
  }
};

const deletePost = async () => {
  if (!confirm('Are you sure you want to delete this tournament?')) return;
  try {
    await API.delete(`/postsTorneo/${post.value?._id}`);
    alert('Tournament successfully deleted.');
    router.push('/forumTorneos');
  } catch (error: any) {
    if (error.response) {
      alert(error.response.data?.error || 'You do not have permission to delete this tournament.');
    } else {
      alert('An error occurred while deleting the tournament');
    }
    console.error('Error deleting tournament:', error);
  }
};

const handleAnswerDeleted = async () => {
  if (post.value?._id) {
    await API.put(`/postsTorneo/${post.value._id}/answers`, {
      answers: answers.value.length - 1
    });
    await fetchAnswers();
  }
};

const handleAnswerUpdated = async () => {
  await fetchAnswers();
};

const sendAnswer = async () => {
  if (!getUsername() || getUsername() === 'nousername') {
    alert('You must log in to reply.');
    return;
  }

  if (!answerContent.value.trim()) {
    alert('The response cannot be empty.');
    return;
  }

  const comment: Comment = {
    postId: post.value?._id || '',
    author: getUsername() as string,
    content: answerContent.value,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  };

  try {
    await API.post('/Answers', comment);

    if (post.value?._id) {
      await API.put(`/postsTorneo/${post.value._id}/answers`, {
        answers: answers.value.length + 1,
      });
    }

    alert('Answer sent successfully.');
    answerContent.value = '';
    await fetchAnswers();
  } catch (error: any) {
    console.error('Error sending answer:', error);
    if (error.response) {
      alert(`Error: ${error.response.data?.error || 'Failed to send answer'}`);
    } else {
      alert('An unexpected error occurred');
    }
  }
};

const fetchAnswers = async () => {
  try {
    if (!post.value?._id) {
      console.error('Tournament not loaded or has invalid ID.');
      return;
    }

    const response = await API.get<Comment[]>(`/Answers`, {
      params: { postId: post.value._id },
    });

    answers.value = response.data;
  } catch (error: any) {
    console.error('Error fetching answers:', error);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
  }
};

const fetchPost = async () => {
    try {
      const id = route.params.id as string;
      const response = await API.get<PostTorneo>(`/postsTorneo/${id}`);
      post.value = response.data;
      
      if (post.value?.author) {
        authorProfilePic.value = await getProfilePicByUsername(post.value.author);
      }
    } catch (error: any) {
      console.error('Error fetching tournament:', error);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  onMounted(async () => {
    await fetchPost();
    await fetchAnswers();
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