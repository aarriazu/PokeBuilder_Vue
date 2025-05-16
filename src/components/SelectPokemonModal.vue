<template>
    <ion-page>
      <ion-content>
        <div class="modal-content">
          <h2>Selecciona Pokémon</h2>
  
          <!-- Barra de búsqueda -->
          <ion-input
            v-model="searchQuery"
            placeholder="Buscar Pokémon..."
            clear-input
            class="search-bar"
          ></ion-input>
  
          <!-- Filtros por tipo y generación -->
          <div class="filters">
            <!-- Filtro por tipo 1 -->
            <ion-select v-model="selectedType1" placeholder="Tipo 1">
              <ion-select-option v-for="type in pokemonTypes" :key="type" :value="type">
                {{ type }}
              </ion-select-option>
            </ion-select>
  
            <!-- Filtro por tipo 2 -->
            <ion-select v-model="selectedType2" placeholder="Tipo 2">
              <ion-select-option v-for="type in pokemonTypes" :key="type" :value="type">
                {{ type }}
              </ion-select-option>
            </ion-select>
  
            <!-- Filtro por generación -->
            <ion-select v-model="selectedGeneration" placeholder="Generación">
              <ion-select-option v-for="generation in pokemonGenerations" :key="generation" :value="generation">
                Generación {{ generation }}
              </ion-select-option>
            </ion-select>
          </div>
  
          <!-- Lista de Pokémon con scroll -->
          <ion-list class="pokemon-list">
            <ion-item
              class="text-2xl capitalize"
              v-for="pokemon in filteredPokemons"
              :key="pokemon.name"
              @click="selectPokemon(pokemon.name)"
            >
              <img
                :src="pokemon.sprite"
                :alt="pokemon.name"
                class="pokemon-sprite"
              />
              {{ pokemon.name }}
            </ion-item>
          </ion-list>
  
          <ion-button @click="close">Cerrar</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { modalController, IonList, IonItem, IonButton, IonContent, IonPage, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
  import { defineProps, ref, computed, onMounted } from 'vue';
  import * as dataController from '@/controllers/dataController';
  
  // Barra de búsqueda
  const searchQuery = ref('');
  
  // Filtros
  const selectedType1 = ref('');
  const selectedType2 = ref('');
  const selectedGeneration = ref('');
  
  // Tipos y generaciones disponibles
  const pokemonTypes = ['grass', 'fire', 'water', 'electric', 'rock', 'ground', 'psychic', 'dark', 'fairy', 'steel', 'flying', 'bug', 'poison', 'ghost', 'dragon', 'ice', 'fighting', 'normal'];
  const pokemonGenerations = [1, 2, 3, 4, 5, 6, 7, 8];

  const pokemonList = ref<{id: number; name: string; sprite: string; types: string[]; generation: number }[]>([]);
  onMounted(async () => {
    try {
        pokemonList.value = await dataController.getAllPokemon() as {id: number; name: string; sprite: string , types: string[], generation: number;}[];
    } catch (error) {
        console.error("Error al cargar la lista de Pokémon:", error);
    }
  });
  
  // Filtrar Pokémon en tiempo real
  const filteredPokemons = computed(() =>
      pokemonList.value.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesType1 = selectedType1.value ? pokemon.types.includes(selectedType1.value) : true;
      const matchesType2 = selectedType2.value ? pokemon.types.includes(selectedType2.value) : true;
      const matchesGeneration = selectedGeneration.value ? pokemon.generation === Number(selectedGeneration.value) : true;
      return matchesSearch && matchesType1 && matchesType2 && matchesGeneration;
    })
  );

  
  function selectPokemon(pokemonName: string) {
    modalController.dismiss(pokemonName, 'select');
  }
  
  function close() {
    modalController.dismiss(null, 'cancel');
  }
  </script>
  
  <style scoped>
  .modal-content {
    padding: 20px;
    max-height: 500px;
  }
  
  .search-bar {
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .pokemon-list {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .pokemon-sprite {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  </style>