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
      <div class="main" style="text-align: center;">
        <br>
        <br>
        <h1>Pokebuilder</h1>
        <ion-grid class="container">
          <ion-row>
            <ion-col size="12" size-md="6">
              <h2>Acceder</h2>
              <p>Nombre de usuario o correo electronico</p>
              <input type="text" id="userName" name="userName" class="textBox">
              <br>
              <p>Contraseña</p>
              <input type="password" id="password" name="password" class="textBox">
              <br>
              <ion-button router-link="/home/profile">Acceder</ion-button>
              <p>No tienes cuenta?</p>
              <p id="login-trigger" style="color:blue;">Creala aqui</p>
              <ion-modal trigger="login-trigger" trigger-action="click" alignment="center">
                <ion-content class="ion-padding">
                  <div style="text-align: center;">
                    <h2>Crear cuenta</h2>
                    <p>Nombre de usuario</p>
                    <input type="text" id="registerUserName" name="registerUserName" class="textBox">
                    <p>Correo electronico</p>
                    <input type="text" id="registerEmail" name="registerEmail" class="textBox">
                    <p>Contraseña</p>
                    <input type="password" id="registerPassword" name="registerPassword" class="textBox">
                    <p>Confirmar contraseña</p>
                    <input type="password" id="registerPasswordConfirm" name="registerPasswordConfirm" class="textBox">
                    <br>
                    <ion-button router-link="/home/profile">Crear cuenta</ion-button>
                  </div>
                </ion-content>
              </ion-modal>
            </ion-col>
            <ion-col size="12" size-md="6">
              <h2>Actividad reciente</h2>
              <a href="/postGuest">
                  <img src="/src/assets/images/forum/loginForumPost1.png">
              </a>
              <p></p>
              <a href="/postGuest">
                  <img src="/src/assets/images/forum/loginForumPost2.png">
              </a>
              <p></p>
              <a href="/forumGuest">Acceder al foro como invitado</a>
            </ion-col>           
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol } from '@ionic/vue';
</script>


<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #bebebe;
}

.textBox {
  border-radius: 15px;
  padding: 10px;
  border: 2px solid #ccc;
  width: 250px
}

.divProfile {
  width: 50%;
  float: left;
  height: 300px;
}

.divForum {
  width: 50%;
  float: left;
  height: 300px;
}

.clear {
  clear: both;
}
</style>