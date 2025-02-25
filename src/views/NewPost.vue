<template>
  <ion-page>


    <ion-content :fullscreen="true">
      <div class="main">
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
            <ion-col size="12" size-md="2">
              <div class="forumCategory">
                <a href="/home/forumGeneral">
                  <p style="font-size: 22px; color: #0cbeeb; position: relative; bottom:30%; text-align: center">General</p>
                </a>
              </div>
              <br>
              <div class="forumCategory">
                <a href="/home/forumTorneos">
                  <p style="font-size: 22px; color: #0cbeeb; position: relative; bottom:30%; text-align: center">Torneos</p>
                </a>
              </div>
              <br>
              <div class="forumCategory">
                <a href="/home/forumAyuda">
                  <p style="font-size: 22px; color: #0cbeeb; position: relative; bottom:30%; text-align: center">Ayuda</p>
                </a>
              </div>
              <br>
              <div class="forumCategory">
                <a href="/home/forumSpinoff">
                  <p style="font-size: 22px; color: #0cbeeb; position: relative; bottom:30%; text-align: center">Spin Off</p>
                </a>
              </div>
              <br>
              <div class="forumCategory">
                <a href="/home/forumOfftopic">
                  <p style="font-size: 22px; color: #0cbeeb; position: relative; bottom:30%; text-align: center">Off Topic</p>
                </a>
              </div>
            </ion-col>
            <ion-col size="12" size-md="10">
              <div style="width:90%">
                <h3 style="text-align: center">Nuevo Post</h3>
                <p>Titulo</p>
                <textarea rows="1" cols="150" style="resize: none;"></textarea>
                <p>Contenido</p>
                <textarea rows="12" cols="150" style="resize: none;"></textarea>
                <br>
                <div style="float: right;">
                  <ion-button router-link="/home/forumGeneral" shape="round">Publicar</ion-button>
                </div>
              </div>
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

.main {
width: 100%;
height: 100%;
background-color: #bebebe;
}

.profilePic {
border-radius: 15px;
padding: 10px;
height: 127px;
width: 98px
}

.forumCategory {
border-radius: 30px;
padding: 10px;
border: 2px solid #0cbeeb;
background-color: #ffffff;
width: 200px;
height: 70px;
}
</style>