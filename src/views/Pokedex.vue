<template>
  <ion-page>
    <navbarComponent />
    <ion-content>
      <div class="p-4">
        <!-- Barra de búsqueda -->
        <div class="mb-4">
          <IonInput
            v-model="searchQuery"
            placeholder="Buscar Pokémon..."
            clear-input
            class="w-full border rounded px-4 py-2"
          />
        </div>

        <!-- Filtros de tipo y generación -->
        <div class="flex space-x-4 mb-4">
          <!-- Filtro por tipo -->
          <IonSelect v-model="selectedType" placeholder="Filtrar por tipo" class="w-1/2">
            <IonSelectOption v-for="type in pokemonTypes" :key="type" :value="type">
              {{ type }}
            </IonSelectOption>
          </IonSelect>

          <!-- Filtro por generación -->
          <IonSelect v-model="selectedGeneration" placeholder="Filtrar por generación" class="w-1/2">
            <IonSelectOption v-for="generation in pokemonGenerations" :key="generation" :value="generation">
              Generación {{ generation }}
            </IonSelectOption>
          </IonSelect>
        </div>

        <!-- Botón para limpiar filtros -->
        <div class="mb-4">
          <IonButton @click="clearFilters" color="danger">Limpiar filtros</IonButton>
        </div>

        <!-- Lista de Pokémon -->
        <ion-grid>
          <ion-row>
            <ion-col
              v-for="pokemon in visiblePokemon"
              :key="pokemon.name"
              size="6"
              size-md="4"
              size-lg="3"
              class="flex justify-center mb-4"
            >
              <div class="bg-white rounded-lg shadow-md p-4 w-full max-w-xs text-center">
                <!-- Imagen del Pokémon -->
                <div class="flex justify-center items-center h-24">
                  <img :src="pokemon.sprite || ''" :alt="pokemon.name" class="w-20 h-20" />
                </div>
                <!-- Nombre del Pokémon -->
                <router-link
                  :to="{ name: 'PokedexDetail', params: { name: pokemon.name } }"
                  class="text-lg font-semibold text-indigo-600 capitalize hover:underline"
                >
                  {{ pokemon.name }}
                </router-link>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- Controles de paginación -->
        <div class="flex justify-between items-center mt-4">
          <ion-button @click="goToPreviousPage" :disabled="currentPage === 1">
            Anterior
          </ion-button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <ion-button @click="goToNextPage" :disabled="currentPage === totalPages">
            Siguiente
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
import pokemonData from '@/assets/json/pokemonData.json';
import navbarComponent from '@/components/navbarComponent.vue';

// Cargar los datos de Pokémon
const pokemonDataRef = ref(pokemonData);

// Configuración de la paginación
const itemsPerPage = 40; // Número de elementos por página

// Acceso a la ruta y el router
const route = useRoute();
const router = useRouter();

// Leer la página actual desde la URL o establecerla en 1 por defecto
const currentPage = ref(Number(route.query.page) || 1);

// Leer los filtros desde la URL o establecer valores predeterminados
const searchQuery = ref(Array.isArray(route.query.search) ? route.query.search[0] : route.query.search || ''); // Término de búsqueda
const selectedType = ref(route.query.type || ''); // Tipo seleccionado
const selectedGeneration = ref(route.query.generation || ''); // Generación seleccionada

// Sincronizar los filtros y la página actual con la URL
watch([currentPage, searchQuery, selectedType, selectedGeneration], () => {
  router.push({
    query: {
      ...route.query,
      page: currentPage.value,
      search: searchQuery.value || undefined, // Elimina el parámetro si está vacío
      type: selectedType.value || undefined,
      generation: selectedGeneration.value || undefined,
    },
  });
});

// Opciones de tipos y generaciones
const pokemonTypes = ['grass', 'fire', 'water', 'electric', 'rock', 'ground', 'psychic', 'dark', 'fairy', 'steel', 'flying', 'bug', 'poison', 'ghost', 'dragon', 'ice', 'fighting', 'normal'];
const pokemonGenerations = ['1', '2', '3', '4', '5', '6', '7', '8'];

// Filtrar los Pokémon según el término de búsqueda, tipo y generación
const filteredPokemon = computed(() => {
  return pokemonDataRef.value.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes((searchQuery.value ?? '').toLowerCase());
    const matchesType = selectedType.value ? pokemon.types.includes(selectedType.value) : true;
    const matchesGeneration = selectedGeneration.value ? pokemon.generation === Number(selectedGeneration.value) : true;
    return matchesSearch && matchesType && matchesGeneration;
  });
});

// Calcular el total de páginas basado en los Pokémon filtrados
const totalPages = computed(() => Math.ceil(filteredPokemon.value.length / itemsPerPage));

// Calcular los Pokémon visibles para la página actual
const visiblePokemon = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPokemon.value.slice(start, end);
});

// Funciones para cambiar de página
function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function goToPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Función para limpiar los filtros
function clearFilters() {
  searchQuery.value = '';
  selectedType.value = '';
  selectedGeneration.value = '';
  currentPage.value = 1; // Reiniciar a la primera página
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>