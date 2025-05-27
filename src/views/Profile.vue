<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main">
        <!-- Grid principal -->
        <ion-grid class="container px-4">
          <ion-row>
            <!-- Columna Equipos -->
            <ion-col size="12" size-md="6" class="pr-0 md:pr-4">
              <div class="max-w-[50%] mb-4">
                <div class="grid grid-cols-2 gap-2">
                  <ion-button router-link="/teamBuilder" class="w-full">New Team</ion-button>
                  <ion-button router-link="/stats" class="w-full">Stats</ion-button>
                </div>
              </div>
              <Team
                v-for="(team, index) in dummyTeams"
                :key="index"
                :teamName="team.name"
                :teamImage="team.image"
                :teamLink="team.link"
                @delete-team="deleteTeam(index)"
              />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <footerComponent/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonContent, IonPage, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import Team from '@/components/Team.vue';
import { useRouter } from 'vue-router';
import * as userController from '@/controllers/userController';
import footerComponent from '@/components/footerComponent.vue';
//import { jwtDecode } from 'jwt-decode';
import { User } from '@/classes/User';

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

const router = useRouter();

const user = ref<User | null>(null);

onMounted(async () => {
  try {
    user.value = await userController.getUser();
  } catch (error) {
    console.error('Error fetching user:', error);
    user.value = null; // Asegurarse de que user sea null si ocurre un error
  }
});

const dummyTeams = ref([
  { name: 'Equipo Eevee', image: '/src/assets/images/pokemon/teamEevee.png', link: '/teamBuilder' },
  { name: 'Equipo 2', image: '/src/assets/images/pokemon/team2.png', link: '/teamBuilder' },
  { name: 'Equipo Kanto', image: '/src/assets/images/pokemon/teamKanto.png', link: '/teamBuilder' }
]);

const deleteTeam = (index: number) => {
  dummyTeams.value.splice(index, 1);
};
</script>

<style scoped>
/* Contenido principal */
.main-content {
  transition: margin-left 0.3s ease; /* Animación para mover el contenido */
  margin-left: 0;
}

/* Cuando la barra lateral está abierta, mueve el contenido */
.content-shift {
  margin-left: 250px; /* Ajusta este valor al ancho de la barra lateral */
}
</style>