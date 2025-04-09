<template>
  <div class="p-4 rounded-2xl shadow-md bg-white max-w-xl mx-auto mt-4">
    <ion-button
      class="absolute left-4"
      fill="clear"
      @click="handlePokemonRedirect(prevPokemon!.name)">
      Previo
    </ion-button>
    <ion-button
      class="absolute right-4"
      fill="clear"
      @click="handlePokemonRedirect(nextPokemon!.name)">
      Siguiente
    </ion-button>
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
            {{ dataController.typeTranslate(type, lang) }}
          </span>
        </p>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
      <div><strong>Peso:</strong> {{ pokemon!.weight }} kg</div>
      <div><strong>Altura:</strong> {{ pokemon!.height }} m</div>
      <div><strong>Grupo Huevo:</strong> 
        <div class="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <span 
            v-for="eggGroup in pokemon!.eggGroups" 
            :key="eggGroup" 
            class="bg-gray-200 rounded px-2 py-1 capitalize"
          >
            {{ dataController.eggGroupTranslate(eggGroup, lang) }}
          </span>
        </div>
      </div>
      <div><strong>Habilidades:</strong> 
        <div class="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <span 
            v-for="ability in pokemon!.abilities" 
            :key="ability" 
            class="bg-gray-200 rounded px-2 py-1 capitalize"
          >
            {{ dataController.abilityTranslate(ability, lang) }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h3 class="font-semibold mb-2">Estadísticas</h3>
      <div v-for="stat in pokemon!.stats" :key="stat.name" class="mb-2">
        <label class="capitalize">{{ stat.name.replace('-', ' ') }}:</label>
        <div class="w-full bg-gray-400 rounded h-4 overflow-hidden">
          <div
            class="bg-green-500 h-full"
            :style="{ width: stat.base + '%' }"
          >{{ stat.base }}</div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h3 class="font-semibold mb-2">Movimientos</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
        <span 
          v-for="move in pokemon!.moves" 
          :key="move" 
          class="bg-gray-200 rounded px-2 py-1 capitalize"
        >
          {{ dataController.moveTranslate(move, lang) }}
        </span>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
      <div>
        <strong>Preevolucion: </strong>
        <div class="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm text-gray-700" >
          <span class="bg-gray-200 rounded px-2 py-1 capitalize text-center" 
            v-for="(preEvolution, index) in preEvolutionData"
            :key="index" 
            @click="handlePokemonRedirect(preEvolution.name)">
            <span>{{ preEvolution?.name }}</span>
            <img
              v-if="preEvolution"
              :src="preEvolution.sprite || ''"
              :alt="preEvolution.name"
              class="w-24 h-24 cursor-pointer"
            />
          </span>
        </div>
      </div>
      <div>
        <strong>Evoluciones: </strong>
        <div class="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm text-gray-700" >
          <span class="bg-gray-200 rounded px-2 py-1 capitalize text-center" 
            v-for="(evolution, index) in evolutionData"
            :key="index" 
            @click="handlePokemonRedirect(evolution.name)">
            <span>{{ evolution?.name }}</span>
            <img
              v-if="evolution"
              :src="evolution.sprite || ''"
              :alt="evolution.name"
              class="w-24 h-24 cursor-pointer"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as dataController from '@/controllers/dataController';
import { defineProps, defineEmits } from 'vue';
import { IonButton } from '@ionic/vue';

const props = defineProps<{ pokemonName: string }>();

const lang: string = 'es';

const pokemon = dataController.pokemonArray.find(p => p.name === props.pokemonName);
const preEvolutionName = pokemon!.preEvolution
    ? [pokemon!.preEvolution.name] // Convertir a un array con un único elemento
    : [] // Valor predeterminado si no hay preevolución
;
const preEvolutionData = preEvolutionName.map(name => dataController.pokemonArray.find(p => p.name === name) || { name: '-', sprite: '' });
const evolutionName = pokemon!.evolutions?.map(evo => evo.name || []);
const evolutionData = evolutionName.map(name => dataController.pokemonArray.find(p => p.name === name) || { name: '-', sprite: '' });

const prevPokemon = dataController.pokemonArray.find(p => p.id === pokemon!.id! - 1);
const nextPokemon = dataController.pokemonArray.find(p => p.id === pokemon!.id! + 1);

// Definir los eventos emitidos
const emit = defineEmits<{
  (event: 'selectPokemon', pokemonName: string): void;
}>();

// Manejar el para recargar el componente con otro pokemon
function handlePokemonRedirect(pokemonNameEmit: string) {
  console.log('Evento emitido:', pokemonNameEmit);
  emit('selectPokemon', pokemonNameEmit);
}
</script>

<style scoped>
</style>
