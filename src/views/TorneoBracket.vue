<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="text-center">Generador de torneo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="p-4">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Sección izquierda (1/3) - Configuración -->
        <div class="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Configuración del Torneo</h2>
          
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium">Número de participantes</label>
            <ion-input
              type="number"
              :value="numPlayers"
              @ionInput="onNumPlayersInput"
              min="2"
              max="32"
              step="2"
              class="border rounded p-2 w-full"
            />
            <p v-if="warningMessage" class="text-sm text-yellow-600 mt-1 transition-opacity duration-300">
              {{ warningMessage }}
            </p>
          </div>

          <div v-if="playerNames.length" class="mb-4">
            <h3 class="text-lg font-medium mb-2">Nombres de los participantes</h3>
            <div class="space-y-2 max-h-96 overflow-y-auto pr-2">
              <div v-for="(name, index) in playerNames" :key="index" class="mb-2">
                <ion-input
                  v-model="playerNames[index]"
                  :placeholder="`Participante ${index + 1}`"
                  fill="outline"
                  class="border rounded p-2 w-full"
                />
              </div>
            </div>
            <ion-button 
              expand="block" 
              class="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
              @click="generateBracket"
            >
              Generar Bracket
            </ion-button>
          </div>
        </div>

        <!-- Sección derecha (2/3) - Visualización del bracket -->
        <div class="w-full md:w-2/3 bg-white p-4 rounded-lg shadow">
          <div v-if="!bracketGenerated" class="flex items-center justify-center h-full">
            <div class="text-center text-gray-500">
              <p class="text-xl mb-2">Bracket no generado</p>
              <p>Configura el torneo a la izquierda y haz clic en "Generar Bracket"</p>
            </div>
          </div>

          <div v-else>
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Bracket Generado</h2>
              <ion-button 
                color="medium" 
                @click="reset"
                class="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Volver a configurar
              </ion-button>
            </div>
            
            <div class="space-y-4">
              <div
                v-for="(match, index) in matches"
                :key="index"
                class="border p-4 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <p class="text-lg font-medium text-center">{{ match[0] }} <span class="text-gray-500 mx-2">vs</span> {{ match[1] }}</p>
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

type Match = [string, string];

const numPlayers = ref<number>(2);
const playerNames = ref<string[]>([]);
const matches = ref<Match[]>([]);
const bracketGenerated = ref<boolean>(false);
const warningMessage = ref('');
let warningTimeout: ReturnType<typeof setTimeout> | null = null;

/** Maneja cambios en el número de jugadores (No modifica los inputs de participantes) */
const onNumPlayersInput = (event: CustomEvent) => {
  let value = parseInt(event.detail.value, 10);
  warningMessage.value = '';

  if (!isNaN(value)) {
    value = Math.max(2, Math.min(32, value));

    if (value % 2 !== 0) {
      value -= 1;
      warningMessage.value = 'Solo se permiten números pares. Se ajustó automáticamente.';

      if (warningTimeout) clearTimeout(warningTimeout);

      warningTimeout = setTimeout(() => {
        warningMessage.value = '';
        warningTimeout = null;
      }, 3000);
    }

    numPlayers.value = value;
    setTimeout(updatePlayerInputs, 50);
  }
};

/** Actualiza la cantidad de inputs de participantes (De momento no funciona) */
const updatePlayerInputs = () => {
  playerNames.value = Array.from(
    { length: numPlayers.value },
    (_, i) => playerNames.value[i] || ''
  );
};

/** Genera los emparejamientos entre jugadores */
const generateBracket = () => {
  const names = playerNames.value.map(n => n.trim()).filter(Boolean);
  if (names.length < 2) {
    alert("Debe haber al menos 2 nombres.");
    return;
  }
  shuffleArray(names);
  matches.value = [];
  for (let i = 0; i < names.length; i += 2) {
    matches.value.push([names[i], names[i + 1] || 'BYE']);
  }
  bracketGenerated.value = true;
};

/** Aleatorizar el array de jugadores */
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/** Reinicia la vista */
const reset = () => {
  bracketGenerated.value = false;
  playerNames.value = [];
  numPlayers.value = 2;
  warningMessage.value = '';
  if (warningTimeout) {
    clearTimeout(warningTimeout);
    warningTimeout = null;
  }
  updatePlayerInputs();
};

// Inicializar con 2 inputs
updatePlayerInputs();
</script>
