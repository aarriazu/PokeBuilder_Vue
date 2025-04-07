<template>
    <pokeCard :pokemonName="pokemonName"></pokeCard>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import pokeCard from '@/components/pokeCard.vue';
  
  /*Recogemos el nombre del pokemon y lo guardamos
  para usarlo en el pokeCard. */ 
  const route = useRoute();
  const pokemonName = ref(route.params.name as string); 

    watch(
    () => route.params.name, // Observa el parámetro "name"
    (newName) => {
        pokemonName.value = newName as string; // Actualiza el nombre del Pokémon
    }
    );

  </script>
  
  <style scoped>
  </style>