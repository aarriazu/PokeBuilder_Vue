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

            <ion-col size="12" size-md="6">
              <ion-button router-link="/home/teamBuilder" shape="round">Nuevo Equipo</ion-button>
              <br>
              <div class="team">
                <p>Equipo Eevee</p>
                <div class="teamHolder">
                  <img src="/src/assets/images/pokemon/teamEevee.png">
                </div>
                <ion-button router-link="/home/teamBuilder" shape="round">Modificar</ion-button>
                <ion-button>
                  <ion-icon slot="icon-only" :icon="star"></ion-icon>
                </ion-button>
                <div style="float: right;">
                  <ion-button router-link="/home/teamBuilder" shape="round" color="danger">Eliminar</ion-button>
                </div>
              </div>
              <div class="team">
                <p>Equipo 2</p>
                <div class="teamHolder">
                  <img src="/src/assets/images/pokemon/team2.png">
                </div>
                <ion-button router-link="/home/teamBuilder" shape="round">Modificar</ion-button>
                <ion-button>
                  <ion-icon slot="icon-only" :icon="star"></ion-icon>
                </ion-button>
                <div style="float: right;">
                  <ion-button router-link="/home/teamBuilder" shape="round" color="danger">Eliminar</ion-button>
                </div>
              </div>
              <div class="team">
                <p>Equipo Kanto</p>
                <div class="teamHolder">
                  <img src="/src/assets/images/pokemon/teamKanto.png">
                </div>
                <ion-button router-link="/home/teamBuilder" shape="round">Modificar</ion-button>
                <ion-button>
                  <ion-icon slot="icon-only" :icon="star"></ion-icon>
                </ion-button>
                <div style="float: right;">
                  <ion-button router-link="/home/teamBuilder" shape="round" color="danger">Eliminar</ion-button>
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="6">
              <br>
              <br>
              <br>
              <br>
              <div class="forumCategory">
                <a href="/home/forumGeneral">
                  <p style="float: right;">143 posts</p>
                  <div style="position: relative; bottom:20%;">
                    <p style="font-size: 22px; color: #0cbeeb;">General</p>
                    <p style="font-size: 16px; color: #0cbeeb;">Discute los juegos de pokemon principales</p>
                  </div>
                </a>
              </div>
              <br>
              <div class="forumCategory">
                <a href="/home/forumTorneos">
                  <p style="float: right;">13 posts</p>
                  <div style="position: relative; bottom:20%;">
                    <p style="font-size: 22px; color: #0cbeeb;">Torneos</p>
                    <p style="font-size: 16px; color: #0cbeeb;">Organiza Torneos con otros jugadores</p>
                  </div>
                </a>
              </div>
              <br>
              <div class="forumCategory">
                <a href="/home/forumAyuda">
                  <p style="float: right;">82 posts</p>
                  <div style="position: relative; bottom:20%;">
                    <p style="font-size: 22px; color: #0cbeeb;">Ayuda</p>
                    <p style="font-size: 16px; color: #0cbeeb;">Pide ayuda a otros jugadores</p>
                  </div>
                </a>
              </div>
              <br>
              <div class="forumCategory">
                <a href="/home/forumSpinoff">
                  <p style="float: right;">27 posts</p>
                  <div style="position: relative; bottom:20%;">
                    <p style="font-size: 22px; color: #0cbeeb;">Spin Offs</p>
                    <p style="font-size: 16px; color: #0cbeeb;">Discute spin offs de pokemon</p>
                  </div>
                </a>
              </div>
              <br>
              <div class="forumCategory">
                <a href="/home/forumOfftopic">
                  <p style="float: right;">53 posts</p>
                  <div style="position: relative; bottom:20%;">
                    <p style="font-size: 22px; color: #0cbeeb;">Off Topic</p>
                    <p style="font-size: 16px; color: #0cbeeb;">Discute aqui cualquier cosa que no tenga que ver con pokemon</p>                
                  </div>
                </a>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
        <br>
        <br>
        <br>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { star } from 'ionicons/icons';
</script>


<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #bebebe;

}

.team {
  width: 700px;
  height: 220px;
}

.teamHolder {
  border-radius: 30px;
  padding: 10px;
  border: 2px solid #2909dd;
  background-color: #859ee4;
  width: 700px;
  height: 140px;
}

.forumCategory {
  border-radius: 30px;
  padding: 10px;
  border: 2px solid #0cbeeb;
  background-color: #ffffff;
  width: 700px;
  height: 100px;
}

.textBox {
  border-radius: 15px;
  padding: 10px;
  border: 2px solid #ccc;
  width: 250px
}

.profilePic {
  border-radius: 15px;
  padding: 10px;
  height: 127px;
  width: 98px
}
</style>