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
              <!-- Renderizar equipos dinámicamente -->
              <div v-if="teamStore.teams.length > 0">
                <TeamComponent
                  v-for="(team, index) in teamStore.teams"
                  :key="team._id?.toString() || index"
                  :teamId="team._id?.toString()"
                  :teamName="team.name"
                  :teamPokemon="team.pokemon"
                  :teamOwnerId="team.ownerId"
                  :teamFavorite="team.favorite"
                  :teamCreatedAt="team.createdAt"
                  :teamUpdatedAt="team.updatedAt"
                  @delete-team="removeTeam"
                />
              </div>
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
import TeamComponent from '@/components/TeamComponent.vue';
import { useRouter } from 'vue-router';
import * as userController from '@/controllers/userController';
import footerComponent from '@/components/footerComponent.vue';
//import { jwtDecode } from 'jwt-decode';
import { User } from '@/classes/User';
import axios from 'axios';
import { Team } from '@/classes/Team';
import { useTeamStore } from '@/stores/teamStore';

const router = useRouter();

const user = ref<User | null>(null);
//const teams = ref<Team[]>([]);
const teamStore = useTeamStore();

onMounted(async () => {
  try {
    // Obtener el usuario en sesión
    user.value = await userController.getUser();

    if (user.value && user.value._id) {
      // Llamar al backend para obtener los equipos del usuario
      const response = await axios.get(`http://localhost:3000/api/teams/${user.value._id}`);
      console.log('Respuesta del backend:', response.data); // Verifica los datos aquí
      teamStore.setTeams(response.data as Team[]);
      //teams.value = response.data as Team[]; // Asignar los equipos obtenidos
      //console.log('Equipos obtenidos:', teams.value);
    }
  } catch (error) {
    console.error('Error fetching user or teams:', error);
    user.value = null; // Asegurarse de que user sea null si ocurre un error
  }
});

const removeTeam = (teamId: string) => {
  teamStore.removeTeam(teamId);
  //teams.value = teams.value.filter((team) => team._id !== teamId);
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