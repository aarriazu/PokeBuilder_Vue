<template>
  <ion-page>
    <navbarCustom/>
    <menuComponent/>
    <ion-content :fullscreen="true">
      <div class="main">
        <!-- Perfil -->
        <div class="flex items-center mt-6 ml-6">
          <img class="w-20 h-20 rounded-lg object-cover mr-4 border-2 border-gray-200" 
               src="/src/assets/images/profile/profilePic.png">
          <div>
            <h5 class="text-blue-600 font-semibold text-lg">{{ userController.getUsername() }}</h5>
            <h5 class="text-gray-600 text-sm mt-1">Miembro desde 10/02/2024</h5>
            <a class="text-red-500 hover:text-red-700 text-sm mt-1 inline-block">Exit</a>
          </div>
        </div>

        <!-- Grid principal -->
        <ion-grid class="container px-4">
          <ion-row>
            <!-- Columna Equipos -->
            <ion-col size="12" size-md="6" class="pr-0 md:pr-4">
              <div class="max-w-[50%] mb-4">
                <div class="grid grid-cols-2 gap-2">
                  <ion-button router-link="/home/teamBuilder" class="w-full">New Team</ion-button>
                  <ion-button router-link="/home/stats" class="w-full">Stats</ion-button>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import Team from '@/components/Team.vue';
import navbarCustom from '@/components/navbarComponent.vue';
import menuComponent from '@/components/menuComponent.vue';
import { useRouter } from 'vue-router';
import * as userController from '@/controllers/userController';
import { jwtDecode } from 'jwt-decode';

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

const username = ref<string | null>(null);

onMounted(() => {
  userController.getUser();
});

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