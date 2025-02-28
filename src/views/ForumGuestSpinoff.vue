<template>
    <ion-page>
  
  
      <ion-content :fullscreen="true">
        <div class="main">
  
          <div class="profile">
            <img class="profilePic" src="/src/assets/images/profile/guestProfile.png">
            <div class="profileBuffer"></div>
            <div class="profileTextDiv">
              <h5 class="blueText">Invitado</h5>
              <a href="/login">Login</a>
            </div>
          </div>
  
          <div class="title">
            <h1>Pokebuilder</h1>
          </div>
  
          <ion-grid class="container">
            <ion-row>
              <ion-col size="12" size-md="2">
                <div class="forumCategory_Forum">
                  <a href="/forumGuestGeneral">
                    <p class="forumButtonText_Forum">General</p>
                  </a>
                </div>
                <br>
                <div class="forumCategory_Forum">
                  <a href="/forumGuestTorneos">
                    <p class="forumButtonText_Forum">Torneos</p>
                  </a>
                </div>
                <br>
                <div class="forumCategory_Forum">
                  <a href="/forumGuestAyuda">
                    <p class="forumButtonText_Forum">Ayuda</p>
                  </a>
                </div>
                <br>
                <div class="forumCategory_Forum">
                    <p class="forumButtonText_Forum">Spin Off</p>
                </div>
                <br>
                <div class="forumCategory_Forum">
                  <a href="/forumGuestOfftopic">
                    <p class="forumButtonText_Forum">Off Topic</p>
                  </a>
                </div>
              </ion-col>
              <ion-col size="12" size-md="10">
                <br>
                <a href="/postGuest">
                  <img src="/src/assets/images/forum/forumPostSpinoff.png">
                </a>
                <br>
                <a href="/postGuest">
                  <img src="/src/assets/images/forum/forumPostSpinoff.png">
                </a>
                <br>
                <a href="/postGuest">
                  <img src="/src/assets/images/forum/forumPostSpinoff.png">
                </a>
                <br>
                <a href="/postGuest">
                  <img src="/src/assets/images/forum/forumPostSpinoff.png">
                </a>
                <br>
                <a href="/postGuest">
                  <img src="/src/assets/images/forum/forumPostSpinoff.png">
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