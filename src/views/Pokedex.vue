<template>
    <ion-page>
        <navbarComponent/>
      <ion-content :fullscreen="true">
        <div class="p-4 bg-gray-100 min-h-screen">
          <!-- Título -->
          <div class="text-center mb-6">
            <h1 class="text-4xl font-bold text-indigo-600">Pokédex</h1>
            <p class="text-gray-600 text-sm mt-2">
              Bienvenido a nuestra Pokédex. Aquí encontrarás toda la información sobre los Pokémon.
            </p>
          </div>
  
          <!-- Grid de Pokémon -->
          <ion-grid>
            <ion-row>
              <ion-col
                v-for="pokemon in pokemonData"
                :key="pokemon.id"
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
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';
  import pokemonData from '@/assets/data/pokemonData.json';
  import navbarComponent from '@/components/navbarComponent.vue';
  
  // Cargar los datos de Pokémon
  const pokemonDataRef = ref(pokemonData);
  </script>
  
  <style scoped>
  </style>