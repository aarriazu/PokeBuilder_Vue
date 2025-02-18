<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
  
      <ion-content :fullscreen="true">
        <div style="text-align: center;">
          <h2>Login</h2>
          <ion-button router-link="/home/login">Login</ion-button>
          <ion-button router-link="/home/profile">Profile</ion-button>
          <ion-button router-link="/home/forum">Forum</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script setup lang="ts">
  import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  </script>
  
  
  <style scoped>
  </style>