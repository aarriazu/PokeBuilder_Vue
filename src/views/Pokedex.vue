<template>
    <IonPage>
        <IonContent>
            <div class="bg-gray-100 min-h-screen">
                <IonGrid>
                    <IonRow class="justify-center">
                        <IonCol size="12" size-md="8" class="p-4">
                            <div class="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-6">
                                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Pokedex</h2>
                                <p class="text-gray-600 text-sm mb-4">
                                    Bienvenido a nutesra Pokédex. Aquí te mostraremos información sobre los pokemon que tenemos en nuestra página web.
                                </p>
                            </div>
                            <div class="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-6 mt-4">
                                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Pokemon</h2>
                                <p class="text-gray-600 text-sm mb-4">
                                    Aquí puedes ver la lista de Pokémon disponibles.
                                </p>
                                <PokeCard :pokemonName="selectedPokemon" @select-pokemon="handleSelectPokemon" />
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';
import PokeCard from '@/components/pokeCard.vue';

// Variable para el Pokémon seleccionado
const selectedPokemon = ref('jolteon');

// Manejar el evento de selección de un Pokémon
function handleSelectPokemon(pokemonName: string) {
  selectedPokemon.value = pokemonName;
}
</script>

<style scoped>
</style>