<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="bg-white">
        <ion-title class="text-indigo-700 text-center font-bold">Generador de Torneo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="bg-gradient-to-b from-indigo-50 to-white">
      <!-- Configuración del torneo -->
      <div v-if="!bracketGenerated" class="p-6 max-w-md mx-auto">
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-2xl font-bold text-indigo-700 mb-6 text-center">Configura tu torneo</h2>
          
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">Número de participantes</label>
            <ion-input
              type="number"
              :value="numPlayers"
              @ionInput="onNumPlayersInput"
              min="2"
              max="32"
              class="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />
          </div>

          <div class="space-y-3 mb-6">
            <h3 class="text-lg font-semibold text-gray-700">Nombres de los participantes</h3>
            <div 
              v-for="(name, index) in playerNames" 
              :key="index" 
              class="flex items-center"
            >
              <span class="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-medium">
                {{ index + 1 }}
              </span>
              <ion-input 
                v-model="playerNames[index]" 
                :placeholder="`Participante ${index + 1}`"
                class="border-2 border-gray-200 rounded-lg p-2 flex-grow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          <ion-button 
            expand="block" 
            @click="generateBracket"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Generar Bracket
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
            </svg>
          </ion-button>
        </div>
      </div>

      <!-- Bracket generado -->
      <div v-else class="p-6">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold text-indigo-700 mb-2 text-center">Bracket del Torneo</h2>
          <p class="text-gray-600 text-center mb-8">Emparejamientos generados aleatoriamente</p>
          
          <div class="space-y-4">
            <div
              v-for="(match, index) in matches"
              :key="index"
              class="bg-white border-l-4 border-indigo-500 rounded-lg shadow-md p-5 hover:shadow-lg transition"
            >
              <div class="flex justify-between items-center">
                <span class="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center font-medium">
                  {{ index + 1 }}
                </span>
                <div class="flex-grow text-center">
                  <p class="text-lg font-semibold text-gray-800">{{ match[0] }}</p>
                  <p class="text-sm text-gray-500 my-1">vs</p>
                  <p class="text-lg font-semibold text-gray-800">{{ match[1] }}</p>
                </div>
                <div class="w-8"></div> <!-- Spacer para alinear -->
              </div>
            </div>
          </div>

          <ion-button 
            expand="block" 
            color="medium" 
            @click="reset"
            class="mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg shadow transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            Volver a configurar
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Match = [string, string];

const numPlayers = ref<number>(2);
const playerNames = ref<string[]>([]);
const matches = ref<Match[]>([]);
const bracketGenerated = ref<boolean>(false);

const generateInputs = () => {
  playerNames.value = Array.from({ length: numPlayers.value }, (_, i) => playerNames.value[i] || '');
};

const onNumPlayersInput = (event: CustomEvent) => {
  const value = parseInt(event.detail.value, 10);
  if (!isNaN(value)) {
    numPlayers.value = value;
    generateInputs();
  }
};

const generateBracket = () => {
  const names = playerNames.value.slice(0, numPlayers.value);
  shuffleArray(names);
  matches.value = [];
  for (let i = 0; i < names.length; i += 2) {
    matches.value.push([names[i], names[i + 1] || 'N/A']);
  }
  bracketGenerated.value = true;
};

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const reset = () => {
  bracketGenerated.value = false;
  playerNames.value = [];
  numPlayers.value = 2;
};
</script>