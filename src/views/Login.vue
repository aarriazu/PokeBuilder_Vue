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
  
  
      <ion-content :fullscreen="true" >
        <div class="main" style="text-align: center;">
          <br>
          <br>
          <h1>Pokebuilder</h1>
          <ion-grid class="container">
            <ion-col size="12" size-md="6" size-lg="4">
              <h2>Acceder</h2>
              <p>Nombre de usuario o correo electronico</p>
              <br>
              <input type="text" id="userName" name="userName">
              <br>
              <p>Contraseña</p>
              <br>
              <input type="text" id="password" name="password">
              <br>
              <ion-button router-link="/home/profile">Acceder</ion-button>
              <p>No tienes cuenta?</p>
              <p>Creala aqui</p>
            </ion-col>
            <ion-col size-md="6" size-lg="4">

              <ion-button router-link="/home/forum">Forum</ion-button>
            </ion-col>  
        </ion-grid>
      </div>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script setup lang="ts">
  import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar , IonGrid, IonCol} from '@ionic/vue';
  </script>
  
  
<style scoped>

.main {
    width: 100%;
    background-color: #929292;
    margin: auto;
}
.container {
    width: 100%;
    margin: auto;
    background-color: #929292;
}
.divProfile {
    width: 50%;
    float: left;
    height: 300px;
    background-color: #929292;
}
.divForum {
    width: 50%;
    float: left;
    height: 300px;
    background-color: #929292;
}
.clear {
    clear: both;
}
</style>