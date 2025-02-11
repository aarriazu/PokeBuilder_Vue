<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>Página 3</ion-title>
        </ion-toolbar>
      </ion-header>
  
  
      <ion-content :fullscreen="true">
        <div style="text-align: center;">
          <h2>Página 3</h2>
          <ion-button router-link="/">Go 1</ion-button>
          <ion-button router-link="/teamBuilder">Go 2</ion-button>
          <ion-button router-link="/login">Go 3</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script setup lang="ts">
  import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  </script>
  
  
  <style scoped>
  </style>