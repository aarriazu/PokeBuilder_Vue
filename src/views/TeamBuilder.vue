<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <div class="main">

        <div class="profile">
          <img class="profilePic" src="/src/assets/images/profile/profilePic.png">
          <div class="profileBuffer"></div>
          <div class="profileTextDiv">
            <h5 class="blueText">Pokefan33</h5>
            <h5>Miembro desde 10/02/2024</h5>
            <a href="/login">Salir</a>
          </div>
        </div>

        <div class="title">
          <h1>Pokebuilder</h1>
        </div>

          <ion-grid columns="24">
            <ion-row>
              <ion-col size="3">

              </ion-col>
              <ion-col size="3">
                <img class="addPokemonButton" src="/src/assets/images/general/addButton.png">
              </ion-col> 
              <ion-col size="3">
                <img class="addPokemonButton" src="/src/assets/images/general/addButton.png">
              </ion-col>
              <ion-col size="3">
                <img class="addPokemonButton" src="/src/assets/images/general/addButton.png">
              </ion-col>
              <ion-col size="3">
                <img class="addPokemonButton" src="/src/assets/images/general/addButton.png">
              </ion-col>
              <ion-col size="3">
                <img class="addPokemonButton" src="/src/assets/images/general/addButton.png">
              </ion-col>    
              <ion-col size="3">
                <img class="addPokemonButton" src="/src/assets/images/general/addButton.png">
              </ion-col>  
              <ion-col size="3">

              </ion-col>        
            </ion-row>
          </ion-grid>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script setup lang="ts">
  import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  </script>
  
  
<style scoped>
</style>