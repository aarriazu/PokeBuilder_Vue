<template>
    <div class="p-4 rounded-2xl shadow-md bg-white max-w-xl mx-auto mt-4">
      <div class="flex items-center space-x-4">
        <img :src="pokemon!.sprite || ''" :alt="pokemon!.name" class="w-24 h-24" />
        <div>
          <h2 class="text-2xl capitalize font-bold">{{ pokemon!.name }}</h2>
          <p class="text-sm text-gray-500">#{{ pokemon!.id }}</p>
          <p class="mt-1">
            <span
              v-for="type in pokemon!.types"
              :key="type"
              class="inline-block bg-gray-200 rounded px-2 py-1 mr-1 text-sm capitalize"
            >
              {{ type }}
            </span>
          </p>
        </div>
      </div>
  
      <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div><strong>Peso:</strong> {{ pokemon!.weight }} kg</div>
        <div><strong>Altura:</strong> {{ pokemon!.height }} m</div>
        <div><strong>Grupo Huevo:</strong> {{ pokemon!.eggGroups.join(', ') || 'Desconocido' }}</div>
        <div><strong>Habilidades:</strong> {{ pokemon!.abilities.join(', ') }}</div>
      </div>
  
      <div class="mt-4">
        <h3 class="font-semibold mb-2">Estadísticas</h3>
        <div v-for="stat in pokemon!.stats" :key="stat.name" class="mb-2">
          <label class="capitalize">{{ stat.name }}:</label>
          <div class="w-full bg-gray-200 rounded h-4 overflow-hidden">
            <div
              class="bg-green-500 h-full"
              :style="{ width: stat.base + '%' }"
            >{{ stat.base }}</div>
          </div>
        </div>
      </div>
  
      <div class="mt-4">
        <h3 class="font-semibold mb-1">Movimientos</h3>
        <p class="text-sm text-gray-700">
          {{ pokemon!.moves.join(', ') }}
        </p>
      </div>
  
      <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <strong>Preevolución: </strong>
          <span class="capitalize">
            {{ preEvolutionName }}
            <img
              v-if="preEvolutionData"
              :src="preEvolutionData!.sprite || ''"
              :alt="preEvolutionName"
              class="w-24 h-24 cursor-pointer"
              @click="handlePreEvolutionClick"
            />
          </span>
        </div>
        <div>
          <strong>Evoluciones: </strong>
          <span class="capitalize">
            {{ evolutionName }}
          </span>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import pokemonData from '@/assets/data/pokemonData.json';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ pokemonName: string }>();
const pokemon = ref(pokemonData.find(p => p.name === props.pokemonName));
const preEvolutionName = ref(pokemon.value?.preEvolution?.name || '-');
const preEvolutionData = ref(pokemonData.find(p => p.name === preEvolutionName.value));
const evolutionName = ref(pokemon.value?.evolutions?.map(evo => evo.name).join(', ') || '-');


//--------------------------------------- COSA DE IA REVISAR
// Definir los eventos emitidos
const emit = defineEmits<{
  (event: 'select-pokemon', pokemonName: string): void;
}>();

// Manejar el clic en la imagen de la preevolución
function handlePreEvolutionClick() {
  if (preEvolutionName.value !== '-') {
    emit('select-pokemon', preEvolutionName.value);
  }
}
//-------------------------------------------

</script>
  
