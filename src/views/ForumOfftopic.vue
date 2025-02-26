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

          <ion-grid class="container">
            <ion-row>
              <ion-col size="12" size-md="2">
                <div class="forumCategory_Forum">
                  <a href="/home/forumGeneral">
                    <p class="forumButtonText_Forum">General</p>
                  </a>
                </div>
                <br>
                <div class="forumCategory_Forum">
                  <a href="/home/forumTorneos">
                    <p class="forumButtonText_Forum">Torneos</p>
                  </a>
                </div>
                <br>
                <div class="forumCategory_Forum">
                  <a href="/home/forumAyuda">
                    <p class="forumButtonText_Forum">Ayuda</p>
                  </a>
                </div>
                <br>
                <div class="forumCategory_Forum">
                  <a href="/home/forumSpinoff">
                    <p class="forumButtonText_Forum">Spin Off</p>
                  </a>
                </div>
                <br>
                <div class="forumCategory_Forum">
                    <p class="forumButtonText_Forum">Off Topic</p>
                </div>
              </ion-col>
              <ion-col size="12" size-md="10">
                <ion-button router-link="/home/newPost" shape="round">Nuevo Post</ion-button>
                <br>
                <a href="/home/post">
                  <img src="/src/assets/images/forum/forumPostOfftopic.png">
                </a>
                <br>
                <a href="/home/post">
                  <img src="/src/assets/images/forum/forumPostOfftopic.png">
                </a>
                <br>
                <a href="/home/post">
                  <img src="/src/assets/images/forum/forumPostOfftopic.png">
                </a>
                <br>
                <a href="/home/post">
                  <img src="/src/assets/images/forum/forumPostOfftopic.png">
                </a>
                <br>
                <a href="/home/post">
                  <img src="/src/assets/images/forum/forumPostOfftopic.png">
                </a>
                <br>
                <p class="blueText"><1></p>
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