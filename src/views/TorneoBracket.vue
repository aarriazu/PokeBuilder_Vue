<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Torneo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="p-4">

      <!-- Configuración del torneo -->
      <div v-if="!bracketGenerated">
        <div class="mb-4">
          <label class="block mb-1">Número de participantes</label>
          <ion-input
            type="number"
            :value="numPlayers"
            @ionInput="onNumPlayersInput"
            min="2"
            max="32"
          />
        </div>

        <div v-if="playerNames.length" class="mb-4">
          <h2 class="text-lg font-medium mb-2">Nombres de los participantes</h2>
          <div v-for="(name, index) in playerNames" :key="index" class="mb-2">
            <ion-input
              v-model="playerNames[index]"
              :placeholder="`Participante ${index + 1}`"
              fill="outline"
            />
          </div>
          <ion-button expand="block" class="mt-4" @click="generateBracket">Generar Bracket</ion-button>
        </div>
      </div>

      <!-- Bracket generado -->
      <div v-else>
        <h2 class="text-xl font-semibold mb-4">Bracket generado</h2>
        <div class="flex flex-col items-center space-y-4">
          <div
            v-for="(match, index) in matches"
            :key="index"
            class="border p-4 rounded bg-gray-100 w-full max-w-md text-center"
          >
            <p>{{ match[0] }} vs {{ match[1] }}</p>
          </div>
        </div>
        <ion-button expand="block" color="medium" class="mt-6" @click="reset">Volver a configurar</ion-button>
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

/** Maneja cambios en el número de jugadores */
const onNumPlayersInput = (event: CustomEvent) => {
  const value = parseInt(event.detail.value, 10);
  if (!isNaN(value) && value >= 2 && value <= 32) {
    numPlayers.value = value;
    updatePlayerInputs();
  }
};

/** Actualiza la cantidad de inputs de participantes */
const updatePlayerInputs = () => {
  const current = [...playerNames.value];
  const updated = Array.from({ length: numPlayers.value }, (_, i) => current[i] || '');
  playerNames.value = updated;
};

/** Genera los emparejamientos */
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

/** Aleatoriza un array */
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
  updatePlayerInputs();
};

// Inicializar con 2 inputs
updatePlayerInputs();
</script>
