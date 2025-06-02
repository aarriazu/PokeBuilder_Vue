<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="text-center">Tournament bracket generator</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Zona izquierda: Configuración -->
        <div class="md:w-1/2">
          <div class="bg-white p-4 rounded-xl shadow-md">
            <!-- Input para el nombre del torneo -->
            <div class="mb-4">
              <h2 class="text-xl font-bold mb-4">Tournament settings</h2>
              <label class="block mb-1 font-medium">Tournament name</label>
              <input
                type="text"
                v-model="tournamentName"
                placeholder="Enter the name of the tournament"
                class="w-full p-2 border rounded bg-white"
              />
            </div>

            <!-- Textarea para la descripción del torneo -->
            <div class="mb-4">
              <label class="block mb-1 font-medium">Tournament description</label>
              <textarea
                v-model="tournamentDescription"
                placeholder="Enter the tournament description, rules, modality, etc."
                rows="4"
                class="w-full p-2 border rounded bg-white resize-none"
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="block mb-1 font-medium ">Number of participants (Must be pair)</label>
              <input
                type="number"
                min="2"
                step="2"
                v-model.number="numParticipants"
                @change="updateParticipants"
                class="w-full p-2 border rounded bg-white"
              />
            </div>

            <div v-for="(name, index) in participants" :key="index" class="mb-2">
              <input
                type="text"
                v-model="participants[index]"
                :placeholder="`Participant ${index + 1}`"
                class="w-full p-2 border rounded bg-white"
              />
            </div>

            <ion-button expand="block" @click="generateBracket" class="mt-4">Create Bracket</ion-button>
          </div>
        </div>

        <!-- Zona derecha: Bracket generado -->
        <div class="md:w-1/2">
          <div class="bg-white p-4 rounded-xl shadow-md">
            <h2 class="text-xl font-bold mb-4">Bracket</h2>
            <div v-if="bracket.length === 0">
              <p class="text-gray-500">No matches have been generated.</p>
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="(pair, index) in bracket"
                :key="index"
                class="p-3 border rounded flex justify-around"
              >
                <span>{{ pair[0] }}</span>
                <span>vs</span>
                <span>{{ pair[1] }}</span>
              </li>
            </ul>
            <ion-button expand="block" @click="saveBracket":disabled="bracket.length === 0" class="mt-4">Save Bracket</ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/vue'

import { getUser, getUsername } from '@/controllers/userController';

// Estado y tipos
const tournamentName = ref(''); // Nombre del torneo
const tournamentDescription = ref(''); // Descripción del torneo
const numParticipants = ref<number>(2) // Número de participantes (debe ser par y mínimo 2)
const participants = ref<string[]>(['', '']) // Array de participantes
const bracket = ref<[string, string][]>([]) // Array de emparejamientos
const postTorneo = ref({
  title: '',
  author: '', 
  subforum: '',      
  description: '',
  participants: [''],
  bracket: [['', '']],
  answers: 0,
  createdAt: new Date().toISOString(),
  editedAt: new Date().toISOString(),
}); // Post torneo

// Obtener instancia del router
const router = useRouter();

// Actualizar cantidad de inputs según número de participantes
const updateParticipants = (): void => {
  if (numParticipants.value % 2 !== 0 || numParticipants.value < 2) {
    alert('The number of participants must be even and greater than or equal to 2.')
    return
  }

  // Rellenar o recortar el array manteniendo nombres existentes
  const current = participants.value
  const updated = Array.from({ length: numParticipants.value }, (_, i) => current[i] || '')
  participants.value = updated
  bracket.value = []
}

// Generar emparejamientos aleatorios
const generateBracket = (): void => {
  if (participants.value.some(name => name.trim() === '')) {
    alert('Please write all the names of the participants.')
    return
  }

  const shuffled = [...participants.value].sort(() => Math.random() - 0.5) 
  const pairs: [string, string][] = []

  for (let i = 0; i < shuffled.length; i += 2) {
    pairs.push([shuffled[i], shuffled[i + 1]])
  }

  bracket.value = pairs
  alert(`Bracket creado para el torneo: ${tournamentName.value}`);
}

  // Guardar el bracket en mongoDB como un post.
  const saveBracket = async (): Promise<void> => {
  if (!tournamentName.value || !tournamentDescription.value || participants.value.some(p => !p)) {
    alert('Please complete all fields before saving.');
    return;
  }
  else {
    postTorneo.value = {
        title: tournamentName.value,
        author: getUsername() as string, 
        subforum: 'torneos',      
        description: tournamentDescription.value,
        participants: participants.value,
        bracket: bracket.value,
        answers: 0,
        createdAt: new Date().toISOString(),
        editedAt: new Date().toISOString(),
      };
      console.log('Post torneo:', postTorneo.value);
  }

  try {
    
    const response = await axios.post<{ insertedId: string }>('http://localhost:3000/api/postsTorneo', postTorneo.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intentar parsear solo si el texto no está vacío
    let data = null;


    alert('Tournament saved successfully.');
    router.push('/forumTorneos');
  } catch (error) {
    console.error('Error al guardar el post:', error);
    alert('There was an error saving the post, sorry for the inconvenience..');
  }
};

</script>

<style scoped>

input {
  margin: 5px 0;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
