<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <div >
          <div class="profile">
            <div style="float: left;">
              <img class="profilePic" src="/src/assets/images/profile/profilePic.png">
            </div>
            <div>
              <h5 style="color:blue;">Pokefan33</h5>
              <h5>Miembro desde 10/02/2024</h5>
            </div>
            <a href="/login">Salir</a>
          </div>
          <div style="text-align: center;">
            <h1>Pokebuilder</h1>
          </div>

          <ion-grid class="container">
            <ion-row>
              <ion-col size="24" size-md="1">
                <img style="float:center; width: 50%; height: 50%;"src="/src/assets/images/general/addButton.png">
              </ion-col>
              <ion-col size="24" size-md="1">
                <img style="float:center; width: 50%; height: 50%;"src="/src/assets/images/general/addButton.png">
              </ion-col> 
              <ion-col size="12" size-md="1">
                <img style="float:center; width: 50%; height: 50%;"src="/src/assets/images/general/addButton.png">
              </ion-col>
              <ion-col size="24" size-md="3">

              </ion-col>
              <ion-col size="24" size-md="3">

              </ion-col>
              <ion-col size="24" size-md="3">

              </ion-col>    
              <ion-col size="24" size-md="3">

              </ion-col>  
              <ion-col size="24" size-md="3">

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