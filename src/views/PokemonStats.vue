<template>
  <ion-page :key="pokemonName"> <!--Se recarga el componente cuando cambia pokemonName-->
    <navbarComponent/>
    <ion-content :fullscreen="true">
      <pokeCard :pokemonName="pokemonName" @selectPokemon="handleSelectPokemon"></pokeCard>
    </ion-content>
  </ion-page>
  
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pokeCard from '@/components/pokeCard.vue';
import navbarComponent from '@/components/navbarComponent.vue';

/*Recogemos el nombre del pokemon y lo guardamos
para usarlo en el pokeCard. */ 
const route = useRoute();
const router = useRouter();
let pokemonName = route.params.name as string; 

watch(
  () => route.params.name, // Observa el parámetro "name"
  (newName) => {
    pokemonName = newName as string; // Actualiza el nombre del Pokémon
  }
);

function handleSelectPokemon(selectedPokemon: string) {
  pokemonName = selectedPokemon;
  router.push({ name: 'PokedexDetail', params: { name: pokemonName } });
  console.log('Evento recibido:', selectedPokemon);
}

</script>

<style scoped>
</style>