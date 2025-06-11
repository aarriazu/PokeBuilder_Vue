<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Mostrar loading mientras se cargan los datos -->
      <div v-if="!pokemon" class="flex justify-center items-center h-full">
        <div class="text-center">
          <p class="text-lg">Loading Pokemon data...</p>
        </div>
      </div>

      <div v-if="pokemon" class="p-4 rounded-2xl shadow-md bg-white w-full max-w-6xl mx-auto mt-4">
        <!-- Botón Previous - solo mostrar si existe prevPokemon -->
        <ion-button
          v-if="prevPokemon"
          class="absolute left-4"
          @click="handlePokemonRedirect(prevPokemon.name)">
          Previous
        </ion-button>
        
        <!-- Botón Next - solo mostrar si existe nextPokemon -->
        <ion-button
          v-if="nextPokemon"
          class="absolute right-4"
          @click="handlePokemonRedirect(nextPokemon.name)">
          Next
        </ion-button>

        <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div class="flex items-center space-x-4">
            <img :src="pokemon.sprite || ''" :alt="pokemon.name" class="w-24 h-24" />
            <div>
              <h2 class="text-2xl capitalize font-bold">{{ pokemon.name }}</h2>
              <p class="text-sm text-gray-500">#{{ pokemon.id }}</p>
              <p class="mt-1">
                <span
                  v-for="type in pokemon.types"
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
        </div>
        <div class="mt-4 grid grid-cols-2 text-sm">
          <div><strong>Weight:</strong> {{ pokemon.weight }} kg</div>
          <div><strong>Height:</strong> {{ pokemon.height }} m</div>
        </div>


        <div>
          <div><strong>Egg Groups:</strong>
            <div class="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <span 
                v-for="eggGroup in pokemon.eggGroups" 
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
                v-for="ability in pokemon.abilities" 
                :key="ability" 
                class="bg-gray-200 rounded px-2 py-1 capitalize relative cursor-pointer has-tooltip"
                @mouseenter="(e) => {
                  tooltip.show = true;
                  tooltip.text = getAbilityEffect(ability);
                  tooltip.x = e.clientX;
                  tooltip.y = e.pageY - 60;
                }"
                @mouseleave="tooltip.show = false"
                @click="(e) => showTooltip(e, getAbilityEffect(ability), true)"
              >
                {{ dataController.formatText(ability) }}
              </span>
            </div>
          </div>
        </div>


        <div class="mt-4">
          <h3 class="font-semibold mb-2">Stats</h3>
          <div v-for="stat in pokemon.stats" :key="stat.name" class="mb-2">
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
              v-for="move in pokemon.moves"
              :key="move"
              :style="{
                backgroundColor: getTypeColor(getMoveData(move)?.type || '')
              }"
              class="rounded px-2 py-1 capitalize relative cursor-pointer has-tooltip"
              @mouseenter="(e) => {
                tooltip.show = true;
                tooltip.text = getMoveTooltipHtml(move);
                tooltip.x = e.clientX;
                tooltip.y = e.pageY - 60;
              }"
              @mouseleave="tooltip.show = false"
              @click="(e) => showTooltip(e, getMoveTooltipHtml(move), true)"
           >
              {{ dataController.formatText(move) }}
            </span>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
          <!-- Preevolución -->
          <div v-if="preEvolution" class="mt-4">
            <h3 class="text-lg font-bold">Preevolution</h3>
            <div class="flex space-x-4">
              <button
                class="flex flex-col items-center focus:outline-none"
                style="background: none; border: none; cursor: pointer;"
                @click="handlePokemonRedirect(preEvolution.name)"
              >
                <img :src="preEvolution.sprite || ''" :alt="preEvolution.name || ''" class="w-16 h-16" />
                <p class="capitalize">{{ preEvolution.name }}</p>
              </button>
            </div>
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

      <!-- Tooltip -->
      <div
        v-if="tooltip.show"
        :style="{ position: 'fixed', left: tooltip.x + 10 + 'px', top: tooltip.y + 10 + 'px', zIndex: 1000 }"
        class="bg-white border border-gray-400 rounded shadow-lg p-2 text-xs max-w-xs"
        v-html="tooltip.text"
      ></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonButton, IonContent, IonPage } from '@ionic/vue';
import * as dataController from '@/controllers/dataController';
import { PokemonInterface } from '@/interfaces/pokemonInterface';
import abilityData from '@/assets/json/abilityData.json';
import moveData from '@/assets/json/moveData.json';
import typeData from '@/assets/json/typeData.json';

const route = useRoute();
const router = useRouter();

const tooltip = ref({
  show: false,
  text: '',
  x: 0,
  y: 0,
  persistent: false,
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
    // Resetear datos antes de cargar
    pokemon.value = null;
    preEvolution.value = null;
    evolutions.value = [];
    prevPokemon.value = null;
    nextPokemon.value = null;

    const pokemonName = route.params.name as string;
    if (!pokemonName) return;
    
    // Obtener los datos del Pokémon actual
    pokemon.value = await dataController.getPokemon(pokemonName) as PokemonInterface;

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

    // Obtener el Pokémon anterior
    if (pokemon.value.id > 1) {
      try {
        prevPokemon.value = await dataController.getPokemon(pokemon.value.id - 1) as PokemonInterface;
      } catch (error) {
        console.log('No hay Pokémon anterior');
        prevPokemon.value = null;
      }
    }

    // Obtener el siguiente Pokémon
    try {
      nextPokemon.value = await dataController.getPokemon(pokemon.value.id + 1) as PokemonInterface;
    } catch (error) {
      console.log('No hay siguiente Pokémon');
      nextPokemon.value = null;
    }

    console.log("Current Pokemon:", pokemon.value.name, "ID:", pokemon.value.id);
    console.log("Prev Pokemon:", prevPokemon.value?.name || 'None');
    console.log("Next Pokemon:", nextPokemon.value?.name || 'None');
    
  } catch (error) {
    console.error('Error al cargar los datos del Pokémon:', error);
  }
}

// Watch para recargar cuando cambie el parámetro de la ruta
watch(
  () => route.params.name,
  () => {
    if (route.params.name) {
      loadPokemonData();
    }
  }
);

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
  return typeObj ? typeObj.color : '#ccc';
}

function getStatColor(stat: number) {
  if (stat >= 150) {
    return '#3b82f6';
  } else if (stat >= 100) {
    return '#22c55e';
  } else if (stat >= 50) {
    return '#eab308';
  } else {
    return '#dc2626';
  }
}

// Navegar a otro Pokémon usando Vue Router
function handlePokemonRedirect(pokemonName: string) {
  console.log('Redirecting to:', pokemonName); // Para debug
  router.push({ name: 'PokemonDetail', params: { name: pokemonName } });
}

function showTooltip(e: MouseEvent, text: string, persistent = false) {
  tooltip.value.show = true;
  tooltip.value.text = text;
  tooltip.value.x = e.clientX;
  tooltip.value.y = e.pageY - 60;
  tooltip.value.persistent = persistent;
}

function hideTooltip() {
  // Solo oculta si no es persistente (clic)
  if (!tooltip.value.persistent) {
    tooltip.value.show = false;
  }
}

function getMoveTooltipHtml(moveName: string) {
  const data = getMoveData(moveName);
  return data
    ? `<strong>Type:</strong> ${dataController.formatText(data.type)}<br>
      <strong>Class:</strong> ${dataController.formatText(data.damage_class)}<br>
      <strong>Effect:</strong> ${data.short_effect}<br>
      <strong>Power:</strong> ${data.power ?? '-'}<br>
      <strong>Accuracy:</strong> ${data.accuracy ?? '-'}<br>
      <strong>PP:</strong> ${data.pp}<br>
      <strong>Priority:</strong> ${data.priority}`
    : 'No move data';
}

// Ocultar tooltip al hacer clic fuera si fue abierto por click
function handleDocumentClick(event: MouseEvent) {
  if (
    tooltip.value.show &&
    tooltip.value.persistent &&
    !(event.target as HTMLElement).closest('.has-tooltip')
  ) {
    tooltip.value.show = false;
    tooltip.value.persistent = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
  loadPokemonData();
});

onUnmounted(() => {
  // Limpia los datos reactivos
  pokemon.value = null;
  preEvolution.value = null;
  evolutions.value = [];
  prevPokemon.value = null;
  nextPokemon.value = null;
  tooltip.value.show = false;
  tooltip.value.text = '';
  tooltip.value.x = 0;
  tooltip.value.y = 0;
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<style scoped>
</style>