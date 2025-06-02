<template>
  <Suspense>
    <ion-page :key="route.fullPath">
      <ion-content :fullscreen="true">
        <pokeCard :key="pokemonName" :pokemonName="pokemonName" @selectPokemon="handleSelectPokemon" />
      </ion-content>
    </ion-page>
  </Suspense>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pokeCard from '@/components/pokeCard.vue';

const route = useRoute();
const router = useRouter();
let pokemonName = ref(route.params.name as string); 

watch(
  () => route.params.name, 
  (newName) => {
    pokemonName.value = newName as string; 
  }
);

function handleSelectPokemon(selectedPokemon: string) {
  pokemonName.value = selectedPokemon;
  router.push({ name: 'PokedexDetail', params: { name: pokemonName.value } });
  console.log('Evento recibido:', selectedPokemon);
}

</script>

<style scoped>
</style>