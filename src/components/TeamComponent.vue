<template>
    <div class="teamDiv bg-white p-4 rounded-md shadow outline outline-1 outline-gray-300">
      <p>{{ props.teamName }}</p>
      <ul class="flex flex-wrap gap-2">
        <li v-for="(pokemon, index) in teamPokemon" :key="index" class="relative group">
          <img
            v-if="pokemon.species"
            :src="pokemon!.species.sprite || 'https://www.models-resource.com/resources/big_icons/73/72850.png?updated=1720523981'"
            :alt="pokemon!.name"
            class="max-w-[60px] h-auto sm:max-w-[80px] md:max-w-[100px]"
            @mouseenter="(e) => {
              tooltip.show = true;
              tooltip.text =
                `<strong>Name:</strong> ${pokemon.name}<br>
                  <strong>Species:</strong> ${dataController.formatText(pokemon.species.name)}<br>
                  <strong>Types:</strong> ${pokemon.species.types.filter(m => !!m).map(m => dataController.formatText(m)).join(', ')}<br>
                  <strong>Moves:</strong> ${pokemon.moves.filter(m => !!m).map(m => dataController.formatText(m)).join(', ')}<br>
                  <strong>Ability:</strong> ${dataController.formatText(pokemon.ability)}<br>
                  <strong>Nature:</strong> ${dataController.formatText(pokemon.nature)}`
                  ;
              tooltip.x = e.clientX;
              tooltip.y = e.pageY - 60;
            }"
            @mouseleave="tooltip.show = false"
          />
        </li>
      </ul>
      <ion-button @click="editTeam" shape="round">Edit</ion-button>
      <ion-button @click="toggleFavorite">
        <ion-icon :class="{ 'active-icon': isIconActive }" slot="icon-only" :icon="star"></ion-icon>
      </ion-button>
      <div class="teamDeleteButton">
        <ion-button @click="deleteTeam" shape="round" color="danger">Delete</ion-button>
      </div>
    </div>
    
    <div
      v-if="tooltip.show"
      :style="{ position: 'fixed', left: tooltip.x + 10 + 'px', top: tooltip.y + 10 + 'px', zIndex: 1000 }"
      class="bg-white border border-gray-400 rounded shadow-lg p-2 text-xs max-w-xs"
      v-html="tooltip.text"
    ></div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/vue';
  import { star } from 'ionicons/icons';
  import { TeamPokemon } from '@/classes/TeamPokemon';
  import * as dataController from '@/controllers/dataController';
  import axios from 'axios';
  import { teamEditData } from '@/stores/teamEditStore';
  import router from '@/router';
  import { API_BASE_URL } from '@/controllers/api';

  
  const props = defineProps({
    teamId: String,
    teamPokemon: Array<TeamPokemon>,
    teamName: String,
    teamOwnerId: String,
    teamFavorite: Boolean,
    teamCreatedAt: Date,
    teamUpdatedAt: Date,
  });

  const tooltip = ref({
    show: false,
    text: '',
    x: 0,
    y: 0,
  });

  function editTeam() {
    teamEditData.value = {
      team: props.teamPokemon,
      teamName: props.teamName,
      teamId: props.teamId
    };
    console.log(teamEditData.value);
    router.replace({ name: 'TeamBuilder' });
  }

  const isIconActive = ref(props.teamFavorite);
  const emit = defineEmits(['delete-team']); 

  const toggleFavorite = async () => {
    try {
      // Cambia el estado local del icono
      isIconActive.value = !isIconActive.value;

      // Realiza una solicitud al backend para actualizar el estado del equipo
      await axios.put(`${API_BASE_URL}:3000/api/teams/${props.teamOwnerId}/favorite`, {
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
      await axios.delete(`${API_BASE_URL}:3000/api/teams/${props.teamId}`);
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