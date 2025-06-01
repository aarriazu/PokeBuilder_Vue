<template>
  <p>Porque no se desmonta esta vaina causas</p>
  <div v-if="pokemon" class="p-4 rounded-2xl shadow-md bg-white max-w-xl mx-auto mt-4">
    <div class="p-4 rounded-2xl shadow-md bg-white max-w-xl mx-auto mt-4">
      <ion-button
        class="absolute left-4"
        fill="clear"
        :disabled="!prevPokemon"
        v-if="prevPokemon"
        @click="handlePokemonRedirect(prevPokemon.name)">
        Previous
      </ion-button>
      <ion-button
        class="absolute right-4"
        fill="clear"
        @click="handlePokemonRedirect(nextPokemon!.name)">
        Next
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
              :style="{
                backgroundColor: getTypeColor(type || '')
              }"
              class="inline-block bg-gray-200 rounded px-2 py-1 mr-1 text-sm capitalize"
            >
              {{ dataController.formatText(type) }}
            </span>
          </p>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div><strong>Weight:</strong> {{ pokemon!.weight }} kg</div>
        <div><strong>Height:</strong> {{ pokemon!.height }} m</div>
        <div><strong>Egg Groups:</strong> 
          <div class="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <span 
              v-for="eggGroup in pokemon!.eggGroups" 
              :key="eggGroup" 
              class="bg-gray-200 rounded px-2 py-1 capitalize"
            >
              {{ dataController.formatText(eggGroup) }}
            </span>
          </div>
        </div>
        <div><strong>Abilities:</strong> 
          <div class="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <span 
              v-for="ability in pokemon!.abilities" 
              :key="ability" 
              class="bg-gray-200 rounded px-2 py-1 capitalize relative cursor-pointer"
              @mouseenter="(e) => {
                tooltip.show = true;
                tooltip.text = getAbilityEffect(ability);
                tooltip.x = e.clientX;
                tooltip.y = e.pageY - 60;
              }"
              @mouseleave="tooltip.show = false"
            >
              {{ dataController.formatText(ability) }}
            </span>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="font-semibold mb-2">Stats</h3>
        <div v-for="stat in pokemon!.stats" :key="stat.name" class="mb-2">
          <label class="capitalize">{{ stat.name.replace('-', ' ') }}: {{ stat.base }}</label>
          <div class="w-full bg-gray-400 rounded h-4 overflow-hidden">
            <div
              class="bg-green-500 h-full"
              :style="{ width: (stat.base / 200 * 100) + '%',
              backgroundColor: getStatColor(stat.base)
              }"
            ></div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="font-semibold mb-2">Moves</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
          <span
            v-for="move in pokemon!.moves"
            :key="move"
            :style="{
              backgroundColor: getTypeColor(getMoveData(move)?.type || '')
            }"
            class="rounded px-2 py-1 capitalize relative cursor-pointer"
            @mouseenter="(e) => {
              const data = getMoveData(move);
              tooltip.show = true;
              tooltip.text = data
                ? `<strong>Type:</strong> ${dataController.formatText(data.type)}<br>
                  <strong>Class:</strong> ${dataController.formatText(data.damage_class)}<br>
                  <strong>Effect:</strong> ${data.short_effect}<br>
                  <strong>Power:</strong> ${data.power ?? '-'}<br>
                  <strong>Accuracy:</strong> ${data.accuracy ?? '-'}<br>
                  <strong>PP:</strong> ${data.pp}<br>
                  <strong>Priority:</strong> ${data.priority}`
                : 'No move data';
              tooltip.x = e.clientX;
              tooltip.y = e.pageY - 60;
            }"
            @mouseleave="tooltip.show = false"
          >
            {{ dataController.formatText(move) }}
          </span>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
        <!-- Preevolución -->
      <div v-if="preEvolution" class="mt-4">
        <h3 class="text-lg font-bold">Preevolution</h3>
        <button
          class="flex items-center space-x-4 focus:outline-none"
          style="background: none; border: none; cursor: pointer;"
          @click="handlePokemonRedirect(preEvolution.name)"
        >
          <img :src="preEvolution.sprite || ''" :alt="preEvolution.name || ''" class="w-16 h-16" />
          <p class="capitalize">{{ preEvolution.name }}</p>
        </button>
      </div>

      <!-- Evoluciones -->
      <div v-if="evolutions && evolutions.length > 0" class="mt-4">
        <h3 class="text-lg font-bold">Evolutions</h3>
        <div class="flex space-x-4">
          <button
            v-for="evolution in evolutions"
            :key="evolution.id"
            class="flex flex-col items-center focus:outline-none"
            @click="handlePokemonRedirect(evolution.name)"
            style="background: none; border: none; cursor: pointer;"
          >
            <img :src="evolution.sprite || ''" :alt="evolution.name || ''" class="w-16 h-16" />
            <p class="capitalize">{{ evolution.name }}</p>
          </button>
        </div>
      </div>
      </div>
    </div>
  

  <!-- Mensaje de carga -->
    </div>
  </div>
  <div v-else class="text-center mt-4">
    <p>Loading Pokemon data...</p>
  </div>

  <div
    v-if="tooltip.show"
    :style="{ position: 'fixed', left: tooltip.x + 10 + 'px', top: tooltip.y + 10 + 'px', zIndex: 1000 }"
    class="bg-white border border-gray-400 rounded shadow-lg p-2 text-xs max-w-xs"
    v-html="tooltip.text"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as dataController from '@/controllers/dataController';
import { defineProps, defineEmits } from 'vue';
import { IonButton } from '@ionic/vue';
import { PokemonInterface } from '@/interfaces/pokemonInterface';
import abilityData from '@/assets/json/abilityData.json';
import moveData from '@/assets/json/moveData.json';
import typeData from '@/assets/json/typeData.json';

const props = defineProps<{ pokemonName: string }>();

const tooltip = ref({
  show: false,
  text: '',
  x: 0,
  y: 0,
});

// Variables reactivas para almacenar los datos del Pokémon y sus evoluciones
const pokemon = ref<PokemonInterface | null>(null);
const preEvolution = ref<PokemonInterface | null>(null);
const evolutions = ref<PokemonInterface[]>([]);

const prevPokemon = ref<PokemonInterface | null>(null);
const nextPokemon = ref<PokemonInterface | null>(null);

// Función para cargar los datos del Pokémon, preevolución y evoluciones
async function loadPokemonData() {
  try {
    // Obtener los datos del Pokémon actual
    pokemon.value = await dataController.getPokemon(props.pokemonName) as PokemonInterface;

    // Obtener la preevolución si existe
    if (pokemon.value.preEvolution) {
      preEvolution.value = await dataController.getPokemon(pokemon.value.preEvolution.name) as PokemonInterface;
    }

    // Obtener las evoluciones si existen
    if (pokemon.value.evolutions) {
      evolutions.value = await Promise.all(
        pokemon.value.evolutions.map((evo: any) => dataController.getPokemon(evo.name))
      ) as PokemonInterface[];
    }

    if (pokemon.value.id > 1){
      prevPokemon.value = await dataController.getPokemon(pokemon.value.id - 1) as PokemonInterface;
    }
    else {
      prevPokemon.value = null;
    }  
    nextPokemon.value = await dataController.getPokemon(pokemon.value.id + 1) as PokemonInterface;
    
  } catch (error) {
    console.error('Error al cargar los datos del Pokémon:', error);
  }
}

function getAbilityEffect(abilityName: string): string {
  const ability = abilityData.find((a: any) => a.name === abilityName);
  return ability ? ability.effect : 'No effect info';
}

function getMoveData(moveName: string) {
  const move = moveData.find((m: any) => m.name === moveName.toLowerCase());
  return move || null;
}

function getTypeColor(type: string): string {
  const typeObj = typeData.find((t: any) => t.name === type);
  return typeObj ? typeObj.color : '#ccc'; // Color por defecto si no se encuentra
}

function getStatColor(stat: number) {
  if (stat >= 150) {
    return '#3b82f6'; // Azul (Tailwind blue-500)
  } else if (stat >= 100) {
    return '#22c55e'; // Verde (Tailwind green-500)
  } else if (stat >= 50) {
    return '#eab308'; // Amarillo (Tailwind yellow-500)
  } else {
    return '#dc2626'; // Rojo (Tailwind red-600)
  }

  //Cambio de color gradual de rojo - verde
  /*
  const min = 1;
  const max = 100;
  const ratio = Math.max(0, Math.min(1, (stat - min) / (max - min)));
  const r = Math.round(220 + (34 - 220) * ratio);
  const g = Math.round(38 + (197 - 38) * ratio);
  const b = Math.round(38 + (94 - 38) * ratio);
  return `rgb(${r},${g},${b})`;
  */
}

// Definir los eventos emitidos
const emit = defineEmits<{
  (event: 'selectPokemon', pokemonName: string): void;
}>();

// Manejar el para recargar el componente con otro pokemon
function handlePokemonRedirect(pokemonNameEmit: string) {
  console.log('prevPokemon:', prevPokemon.value);
  console.log('nextPokemon:', nextPokemon.value);
  console.log('Evento emitido:', pokemonNameEmit);
  emit('selectPokemon', pokemonNameEmit);
}

onMounted(loadPokemonData);

onUnmounted(() => {
  // Limpia los datos reactivos
  pokemon.value = null;
  preEvolution.value = null;
  evolutions.value = [];
  prevPokemon.value = null;
  nextPokemon.value = null;

  // Oculta el tooltip si estaba visible
  tooltip.value.show = false;
  tooltip.value.text = '';
  tooltip.value.x = 0;
  tooltip.value.y = 0;

  // Si tienes listeners globales, timeouts, intervals, límpialos aquí
  // Por ejemplo:
  // clearTimeout(miTimeout);
  // window.removeEventListener('resize', miListener);
});
</script>

<style scoped>
</style>
