<template>
  <div class="bg-white rounded-lg p-4 mb-4 shadow-sm">
    <div class="flex items-start">
      <!-- Imagen de perfil a la izquierda, ocupa toda la altura -->
      <img
        :src="getProfilePicUrl(authorProfilePic)"
        alt="User Icon"
        class="w-12 h-12 rounded-full border border-indigo-200 object-cover mr-4 flex-shrink-0"
      />
      <!-- Contenido a la derecha -->
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <h4 class="text-sm font-semibold text-gray-800">{{ author }}</h4>
          <div v-if="getUsername() === author" class="flex space-x-2 ml-2">
            <button
              @click="startEdit()"
              class="px-2 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-semibold transition"
            >
              Edit
            </button>
            <button
              @click="deleteAnswer()"
              class="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition"
            >
              Delete
            </button>
          </div>
        </div>
        <p class="text-xs text-gray-500 mb-2">
          Published on: {{ new Date(createdAt).toLocaleString() }}
        </p>
        <!-- Modo edición -->
        <div v-if="editMode" class="mb-2">
          <textarea
            v-model="editContent"
            class="block w-full p-2 text-sm border border-gray-300 rounded mb-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="2"
          ></textarea>
          <div class="flex space-x-2">
            <button
              @click="saveEdit()"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs font-semibold transition"
            >
              Save
            </button>
            <button
              @click="cancelEdit()"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-xs font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </div>
        <!-- Contenido del comentario -->
        <p v-else class="text-gray-700 text-sm leading-relaxed">
          {{ content }}
        </p>
        <!-- Botón para responder SOLO si el usuario está logueado -->
        <button
          v-if="isLoggedIn"
          @click="toggleReply"
          class="mt-2 text-xs font-semibold px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 transition border border-blue-200 shadow-sm"
        >
          {{ replying ? 'Cancel' : 'Reply' }}
        </button>
        <!-- Caja de respuesta -->
        <div v-if="replying" class="mt-2">
          <textarea
            v-model="replyContent"
            class="w-full p-2 border border-gray-300 text-sm bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            placeholder="Write a reply..."
          ></textarea>
          <button
            @click="submitReply"
            class="mt-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition"
          >
            Send Reply
          </button>
        </div>
        <!-- Subrespuestas -->
        <div v-if="replies && replies.length" class="ml-6 mt-4 border-l-2 border-gray-200 pl-4">
          <AnswerComponent
            v-for="reply in replies"
            :key="reply._id"
            :id="reply._id"
            :postId="reply.postId"
            :author="reply.author"
            :content="reply.content"
            :createdAt="reply.createdAt"
            :editedAt="reply.editedAt"
            :parentAnswerId="reply.parentAnswerId"
            :replies="reply.replies || []"
            @answer-updated="$emit('answer-updated')"
            @answer-deleted="$emit('answer-deleted')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { getUsername, getProfilePicByUsername, getProfilePicUrl } from '@/controllers/userController';
import API from '@/controllers/api'; 
import AnswerComponent from './AnswerComponent.vue';

const props = defineProps({
  id: { type: String, required: false },
  postId: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, required: true },
  editedAt: { type: String, required: false },
  parentAnswerId: { type: String, required: false },
  replies: { type: Array as () => any[], required: false, default: () => [] }
});

const emit = defineEmits(['answer-updated', 'answer-deleted']);

const editMode = ref(false);
const editContent = ref(props.content);
const replying = ref(false);
const replyContent = ref('');
const authorProfilePic = ref('/src/assets/images/guest.jpg');

const isLoggedIn = computed(() => {
  const username = getUsername();
  return username && username !== 'nousername';
});

const loadProfilePic = async () => {
  if (props.author) {
    authorProfilePic.value = await getProfilePicByUsername(props.author);
  }
};

onMounted(loadProfilePic);
watch(() => props.author, loadProfilePic);

const toggleReply = () => {
  replying.value = !replying.value;
};

const startEdit = () => {
  editContent.value = props.content;
  editMode.value = true;
};

const cancelEdit = () => {
  editMode.value = false;
};

const saveEdit = async () => {
  try {
    await API.put(`/answers/${props.id}`, {
      content: editContent.value,
      editedAt: new Date().toISOString()
    });
    emit('answer-updated');
    editMode.value = false;
  } catch (error) {
    alert('You do not have permission to edit this comment.');
    console.error(error);
  }
};

const deleteAnswer = async () => {
  if (!confirm('Are you sure you want to delete this comment?')) return;
  try {
    await API.delete(`/answers/${props.id}`);
    emit('answer-deleted');
    alert('Comment deleted successfully.');
  } catch (error) {
    alert('You do not have permission to delete this comment.');
    console.error(error);
  }
};

const submitReply = async () => {
  if (!replyContent.value.trim()) {
    alert('Reply content cannot be empty.');
    return;
  }
  try {
    await API.post('/answers', {
      postId: props.postId,
      content: replyContent.value,
      author: getUsername(),
      parentAnswerId: props.id,
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString()
    });
    emit('answer-updated');
    replyContent.value = '';
    replying.value = false;
  } catch (error) {
    alert('Failed to send reply.');
    console.error(error);
  }
};
</script>

