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

        <ion-button router-link="/home/stats">Stats</ion-button>

        <ion-grid class="container">
          <ion-row>

            <ion-col size="12" size-md="6">
              <ion-button router-link="/home/teamBuilder" shape="round">Nuevo Equipo</ion-button>
              <br>
              <Team
                v-for="(team, index) in dummyTeams"
                :key="index"
                :teamName="team.name"
                :teamImage="team.image"
                :teamLink="team.link"
                @delete-team="deleteTeam(index)"
              />
            </ion-col>

            <ion-col size="12" size-md="6">
              <br>
              <br>
              <br>
              <br>
              <div class="forumCategory_Profile">
                <a href="/home/forumGeneral">
                  <p class="forumCategory_Profile_postCount">143 posts</p>
                  <div class="forumCategory_Profile_textDiv">
                    <p class="forumCategory_Profile_title">General</p>
                    <p class="forumCategory_Profile_desc">Discute los juegos de pokemon principales</p>
                  </div>
                </a>
              </div>
              <br>
              <div class="forumCategory_Profile">
                <a href="/home/forumTorneos">
                  <p class="forumCategory_Profile_postCount">13 posts</p>
                  <div class="forumCategory_Profile_textDiv">
                    <p class="forumCategory_Profile_title">Torneos</p>
                    <p class="forumCategory_Profile_desc">Organiza Torneos con otros jugadores</p>
                  </div>
                </a>
              </div>
              <br>
              <div class="forumCategory_Profile">
                <a href="/home/forumAyuda">
                  <p class="forumCategory_Profile_postCount">82 posts</p>
                  <div class="forumCategory_Profile_textDiv">
                    <p class="forumCategory_Profile_title">Ayuda</p>
                    <p class="forumCategory_Profile_desc">Pide ayuda a otros jugadores</p>
                  </div>
                </a>
              </div>
              <br>
              <div class="forumCategory_Profile">
                <a href="/home/forumSpinoff">
                  <p class="forumCategory_Profile_postCount">27 posts</p>
                  <div class="forumCategory_Profile_textDiv">
                    <p class="forumCategory_Profile_title">Spin Offs</p>
                    <p class="forumCategory_Profile_desc">Discute spin offs de pokemon</p>
                  </div>
                </a>
              </div>
              <br>
              <div class="forumCategory_Profile">
                <a href="/home/forumOfftopic">
                  <p class="forumCategory_Profile_postCount">53 posts</p>
                  <div class="forumCategory_Profile_textDiv">
                    <p class="forumCategory_Profile_title">Off Topic</p>
                    <p class="forumCategory_Profile_desc">Discute aqui cualquier cosa que no tenga que ver con pokemon</p>                
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
import { ref } from 'vue';
import Team from '@/components/Team.vue';

interface Pokemon {
  name: string;
  item: string;
  ability: string;
  nature: string;
  moves: string[];
}

interface Team {
  name: string;
  pokemons: Pokemon[];
}

const dummyTeams = ref([
  { name: 'Equipo Eevee', image: '/src/assets/images/pokemon/teamEevee.png', link: '/home/teamBuilder' },
  { name: 'Equipo 2', image: '/src/assets/images/pokemon/team2.png', link: '/home/teamBuilder' },
  { name: 'Equipo Kanto', image: '/src/assets/images/pokemon/teamKanto.png', link: '/home/teamBuilder' }
]);

const deleteTeam = (index: number) => {
  dummyTeams.value.splice(index, 1);
};

</script>


<style scoped>
</style>