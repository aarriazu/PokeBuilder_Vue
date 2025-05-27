<template>
    <div class="teamDiv">
      <p>{{ props.teamName }}</p>
      <ul class="flex space-x-4">
        <li v-for="(pokemon, index) in teamPokemon" :key="index" class="relative group">
          <img :src="pokemon!.species.sprite || ''" :alt="pokemon!.name" class="w-24 h-24" />

          <!-- Contenedor de datos que se muestra al hacer hover -->
          <div
            v-if="pokemon.species"
            class="absolute bottom-0 left-0 w-full bg-white text-black text-sm p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <p><strong>Name:</strong> {{ pokemon.name }}</p>
            <p><strong>Species:</strong> {{ pokemon.species.name }}</p>
            <p><strong>Types:</strong> {{ pokemon.species.types.join(', ') }}</p>
            <p><strong>Moves:</strong> {{ pokemon.moves.join(', ') }}</p>
            <p><strong>Ability:</strong> {{ pokemon.ability }}</p>
            <p><strong>Nature:</strong> {{ pokemon.nature }}</p>
          </div>
        </li>
      </ul>
      <ion-button :router-link="teamOwnerId" shape="round">Modificar</ion-button>
      <ion-button @click="toggleFavorite">
        <ion-icon :class="{ 'active-icon': isIconActive }" slot="icon-only" :icon="star"></ion-icon>
      </ion-button>
      <div class="teamDeleteButton">
        <ion-button @click="deleteTeam" shape="round" color="danger">Eliminar</ion-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/vue';
  import { star } from 'ionicons/icons';
  import { TeamPokemon } from '@/classes/TeamPokemon';
  import axios from 'axios';
  
  const props = defineProps({
    teamId: String,
    teamPokemon: Array<TeamPokemon>,
    teamName: String,
    teamOwnerId: String,
    teamFavorite: Boolean,
    teamCreatedAt: Date,
    teamUpdatedAt: Date,
  });

  const isIconActive = ref(props.teamFavorite);
  const emit = defineEmits(['delete-team']); 

  const toggleFavorite = async () => {
    try {
      // Cambia el estado local del icono
      isIconActive.value = !isIconActive.value;

      // Realiza una solicitud al backend para actualizar el estado del equipo
      await axios.put(`http://localhost:3000/api/teams/${props.teamOwnerId}/favorite`, {
        teamId: props.teamId, // Asegúrate de que el ID del equipo esté disponible
        favorite: isIconActive.value,
      });

      console.log('Estado de favorito actualizado en la base de datos');
    } catch (error) {
      console.error('Error al actualizar el estado de favorito:', error);

      // Revertir el cambio local si la solicitud falla
      isIconActive.value = !isIconActive.value;
    }
};

  const deleteTeam = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${props.teamName}?`);

    if (!confirmed) {
      console.log('Operación cancelada por el usuario');
      return; // Salir si el usuario cancela la operación
    }

    try {
      // Llamar al backend para eliminar el equipo
      await axios.delete(`http://localhost:3000/api/teams/${props.teamId}`);
      emit('delete-team', props.teamId);
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };
  </script>
  
  <style scoped>
  .active-icon {
    color: yellow;
  }
  </style>