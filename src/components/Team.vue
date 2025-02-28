<template>
    <div class="teamDiv">
      <p>{{ teamName }}</p>
      <div class="teamBg">
        <img :src="teamImage">
      </div>
      <ion-button :router-link="teamLink" shape="round">Modificar</ion-button>
      <ion-button @click="toggleIconColor">
        <ion-icon :class="{ 'active-icon': isIconActive }" slot="icon-only" :icon="star"></ion-icon>
      </ion-button>
      <div class="teamDeleteButton">
        <ion-button @click="deleteTeam" shape="round" color="danger">Eliminar</ion-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { star } from 'ionicons/icons';
  
  const props = defineProps({
    teamName: String,
    teamImage: String,
    teamLink: String
  });

  const isIconActive = ref(false);

  const toggleIconColor = () => {
  isIconActive.value = !isIconActive.value;
  };

  const emits = defineEmits(['delete-team']);

  const deleteTeam = () => {
    emits('delete-team');
  };
  </script>
  
  <style scoped>
  .active-icon {
    color: yellow;
  }
  </style>