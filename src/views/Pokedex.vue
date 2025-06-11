<template>
    <ion-page>
      <ion-content>
        <div class="p-4">
          <!-- Barra de búsqueda -->
          <div class="mb-4">
            <IonInput
              v-model="searchQuery"
              placeholder="Search Pokemon..."
              clear-input
              class="textBox bg-white w-full border rounded px-4 py-2"
            />
          </div>
  
          <!-- Filtros de tipo y generación -->
          <div class="flex space-x-4 mb-4">
            <IonSelect v-model="selectedType" placeholder="Filter by type 1" class="w-1/2">
              <IonSelectOption v-for="type in pokemonTypes" :key="type" :value="type">
                {{ dataController.formatText(type) }}
              </IonSelectOption>
            </IonSelect>
            <IonSelect v-model="selectedType2" placeholder="Filter by type 2" class="w-1/2">
              <IonSelectOption v-for="type in pokemonTypes" :key="type" :value="type">
                {{ dataController.formatText(type) }}
              </IonSelectOption>
            </IonSelect>
  
            <IonSelect v-model="selectedGeneration" placeholder="Filter by generation" class="w-1/2">
              <IonSelectOption v-for="generation in pokemonGenerations" :key="generation" :value="generation">
                Generation {{ generation }}
              </IonSelectOption>
            </IonSelect>
          </div>
  
          <!-- Botón para limpiar filtros -->
          <div class="mb-4">
            <IonButton @click="clearFilters" color="danger">Clear Filters</IonButton>
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
                <div class="bg-white rounded-lg shadow-md p-4 w-full max-w-xs text-center" @click="() => goToPokemonDetail(pokemon.name)">
                  <!-- Imagen del Pokémon -->
                  <div class="flex justify-center items-center h-24" >
                    <img :src="pokemon.sprite || ''" :alt="pokemon.name" class="w-20 h-20 cursor-pointer" />
                  </div>
                  <!-- Nombre del Pokémon -->
                  {{ dataController.formatText(pokemon.name) }}
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
  
          <!-- Controles de paginación -->
          <div class="flex justify-between items-center mt-4">
            <ion-button @click="goToPreviousPage" :disabled="currentPage === 1">
              Previous page
            </ion-button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <ion-button @click="goToNextPage" :disabled="currentPage === totalPages">
              Next page
            </ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton, IonInput, IonSelect, IonSelectOption, IonSearchbar } from '@ionic/vue';
  import * as dataController from '@/controllers/dataController';
  import API from '@/controllers/api';
  
  // Configuración de la paginación
  const itemsPerPage = 40;
  
  const route = useRoute();
  const router = useRouter();
  
  // Leer la página actual desde la URL o establecerla en 1 por defecto
  const currentPage = ref(Number(route.query.page) || 1);

  const searchQuery = ref(Array.isArray(route.query.search) ? route.query.search[0] : route.query.search || ''); 
  const selectedType = ref(route.query.type || '');
  const selectedType2 = ref(route.query.type2 || '');
  const selectedGeneration = ref(route.query.generation || ''); 
  
  const pokemonList = ref<{ id: number, name: string; sprite: string; types: string[]; generation: number }[]>([]);
  
  // Calcular el total de páginas basado en los Pokémon filtrados
  const totalPages = computed(() => Math.ceil(filteredPokemon.value.length / itemsPerPage));
  
   // Vuelve a la página 1 al cambiar cualquier filtro
  watch([searchQuery, selectedType, selectedType2, selectedGeneration], () => {
    currentPage.value = 1;
  });

  // Sincronizar los filtros y la página actual con la URL
  watch([currentPage, searchQuery, selectedType, selectedType2, selectedGeneration], () => {
    router.push({
      query: {
        ...route.query,
        page: currentPage.value,
        search: searchQuery.value || undefined,
        type: selectedType.value || undefined,
        type2: selectedType2.value || undefined,
        generation: selectedGeneration.value || undefined,
      },
    });
  });
  
  const pokemonTypes = ['grass', 'fire', 'water', 'electric', 'rock', 'ground', 'psychic', 'dark', 'fairy', 'steel', 'flying', 'bug', 'poison', 'ghost', 'dragon', 'ice', 'fighting', 'normal'];
  const pokemonGenerations = ['1', '2', '3', '4', '5', '6', '7', '8'];

const fetchPokemon = async () => {
  try {
    const response = await API.get('/pokemon');
    pokemonList.value = response.data as { id: number, name: string; sprite: string , types: string[], generation: number;}[];
  } catch (error) {
    console.error("Error al cargar la lista de Pokémon:", error);
  }
};

  onMounted(async () => {
    fetchPokemon();
  });
  
  // Filtrar los Pokémon según el término de búsqueda, tipo y generación
  const filteredPokemon = computed(() => {
    const filtered = pokemonList.value.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes((searchQuery.value || '').toLowerCase());
      const matchesType1 = typeof selectedType.value === 'string' && selectedType.value !== '' ? pokemon.types.includes(selectedType.value) : true;
      const matchesType2 = typeof selectedType2.value === 'string' && selectedType2.value !== '' ? pokemon.types.includes(selectedType2.value) : true;
      const matchesGeneration = selectedGeneration.value !== '' ? pokemon.generation === Number(selectedGeneration.value) : true;
      
      return matchesSearch && matchesType1 && matchesType2 && matchesGeneration;
    });

    return filtered.sort((a, b) => {
      return (a.id || 0) - (b.id || 0);
    });
  });
  
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
    selectedType2.value = '';
    selectedGeneration.value = '';
    currentPage.value = 1;
  }

  // Navegar al detalle del Pokémon
  function goToPokemonDetail(name: string) {
    router.push({ name: 'PokemonDetail', params: { name } });
  }
</script>
  
<style scoped>
</style>