<template>
  <div v-if="pokemon" class="p-4 rounded-2xl shadow-md bg-white max-w-xl mx-auto mt-4">
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
        <!-- Preevolución -->
      <div v-if="preEvolution" class="mt-4">
        <h3 class="text-lg font-bold">Preevolución</h3>
        <div class="flex items-center space-x-4">
          <img :src="preEvolution.sprite" :alt="preEvolution.name" class="w-16 h-16" />
          <p class="capitalize">{{ preEvolution.name }}</p>
        </div>
      </div>

      <!-- Evoluciones -->
      <div v-if="evolutions.length > 0" class="mt-4">
        <h3 class="text-lg font-bold">Evoluciones</h3>
        <div class="flex space-x-4">
          <div
            v-for="evolution in evolutions"
            :key="evolution.id"
            class="flex flex-col items-center"
          >
            <img :src="evolution.sprite" :alt="evolution.name" class="w-16 h-16" />
            <p class="capitalize">{{ evolution.name }}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  

  <!-- Mensaje de carga -->
    </div>
  </div>
  <div v-else class="text-center mt-4">
    <p>Cargando datos del Pokémon...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as dataController from '@/controllers/dataController';
import { defineProps, defineEmits } from 'vue';
import { IonButton } from '@ionic/vue';
import { PokemonInterface } from '@/interfaces/pokemonInterface';

const props = defineProps<{ pokemonName: string }>();

const lang: string = 'es';

// Variables reactivas para almacenar los datos del Pokémon y sus evoluciones
const pokemon = ref<any>(null);
const preEvolution = ref<any>(null);
const evolutions = ref<any[]>([]);

const prevPokemon = ref<any>(null);
const nextPokemon = ref<any>(null);

// Función para cargar los datos del Pokémon, preevolución y evoluciones
async function loadPokemonData() {
  try {
    // Obtener los datos del Pokémon actual
    pokemon.value = await dataController.getPokemon(props.pokemonName);

    // Obtener la preevolución si existe
    if (pokemon.value.preEvolution) {
      preEvolution.value = await dataController.getPokemon(pokemon.value.preEvolution.name);
    }

    // Obtener las evoluciones si existen
    if (pokemon.value.evolutions) {
      evolutions.value = await Promise.all(
        pokemon.value.evolutions.map((evo: any) => dataController.getPokemon(evo.name))
      );
    }

    prevPokemon.value = dataController.getPokemon(pokemon.value.id - 1);
    nextPokemon.value = dataController.getPokemon(pokemon.value.id + 1);
    
  } catch (error) {
    console.error('Error al cargar los datos del Pokémon:', error);
  }
}

//const pokemon = dataController.pokemonArray.find(p => p.name === props.pokemonName);
/*
const pokemon = await dataController.getPokemon(props.pokemonName) as PokemonInterface;
const preEvolutionName = pokemon!.preEvolution
    ? [pokemon!.preEvolution.name] // Convertir a un array con un único elemento
    : [] // Valor predeterminado si no hay preevolución
;
const preEvolutionData = preEvolutionName.map(name => dataController.getPokemon(name) || { name: '-', sprite: '' });
const evolutionName = pokemon!.evolutions?.map(evo => evo.name || []);
const evolutionData = evolutionName
  .filter((name): name is string => typeof name === 'string')
  .map(name => dataController.getPokemon(name) || { name: '-', sprite: '' });


*/

/*
// Variables reactivas para almacenar los datos del Pokémon
const pokemon = ref<PokemonInterface | null>(null);
const preEvolutionData = ref<{ name: string; sprite: string }[]>([]);
const evolutionData = ref<{ name: string | never[]; sprite: string; }[]>([]);
const prevPokemon = ref<PokemonInterface | null>(null);
const nextPokemon = ref<PokemonInterface | null>(null);

// Cargar los datos del Pokémon al montar el componente
onMounted(async () => {
  try {
    const fetchedPokemon = await dataController.getPokemon(props.pokemonName) as PokemonInterface;
    pokemon.value = fetchedPokemon;
    console.log('Pokémon cargado:', pokemon.value);
    // Pre-evolución
    const preEvolutionName = fetchedPokemon.preEvolution
      ? [fetchedPokemon.preEvolution.name]
      : [];
    preEvolutionData.value = preEvolutionName.map(name => ({
      name,
      sprite: dataController.pokemonArray.find(p => p.name === name)?.sprite || '',
    }));

    // Evoluciones
    const evolutionName = fetchedPokemon.evolutions?.map(evo => evo.name || []);
    evolutionData.value = evolutionName?.map(name => ({
      name,
      sprite: dataController.pokemonArray.find(p => p.name === name)?.sprite || '',
    })) || [];

    // Pokémon anterior y siguiente
    prevPokemon.value = dataController.pokemonArray.find(p => p.id === fetchedPokemon.id! - 1) || null;
    nextPokemon.value = dataController.pokemonArray.find(p => p.id === fetchedPokemon.id! + 1) || null;
  } catch (error) {
    console.error('Error al cargar el Pokémon:', error);
  }
});
*/

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
</script>

<style scoped>
</style>
