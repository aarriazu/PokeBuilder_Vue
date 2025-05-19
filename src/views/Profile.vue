<template>
  <ion-page>
    <navbarCustom/>
    <ion-content :fullscreen="true">
      <div class="main">
        <!-- Perfil -->
        <div class="flex items-center mt-6 ml-6">
          <img class="w-20 h-20 rounded-lg object-cover mr-4 border-2 border-gray-200" 
               src="/src/assets/images/profile/profilePic.png">
          <div>
            <h5 class="text-blue-600 font-semibold text-lg">Pokefan33</h5>
            <h5 class="text-gray-600 text-sm mt-1">Miembro desde 10/02/2024</h5>
            <a @click.prevent="logout" class="text-red-500 hover:text-red-700 text-sm mt-1 inline-block">Exit</a>
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

            <!-- Columna Foros -->
            <ion-col size="12" size-md="6" class="pl-0 md:pl-4">
              <div class="space-y-4">
                <!-- Categoría General -->
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumGeneral" class="block">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">General</h3>
                        <p class="text-gray-600 text-sm">Discute los juegos de pokemon principales</p>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">143 posts</span>
                    </div>
                  </a>
                </div>

                <!-- Categoría Torneos -->
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumTorneos" class="block">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">Torneos</h3>
                        <p class="text-gray-600 text-sm">Organiza Torneos con otros jugadores</p>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">13 posts</span>
                    </div>
                  </a>
                </div>

                <!-- Categoría Ayuda -->
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumAyuda" class="block">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">Ayuda</h3>
                        <p class="text-gray-600 text-sm">Pide ayuda a otros jugadores</p>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">82 posts</span>
                    </div>
                  </a>
                </div>

                <!-- Categoría Spin Offs -->
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumSpinoff" class="block">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">Spin Offs</h3>
                        <p class="text-gray-600 text-sm">Discute spin offs de pokemon</p>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">27 posts</span>
                    </div>
                  </a>
                </div>

                <!-- Categoría Off Topic -->
                <div class="bg-white rounded-lg shadow-sm border-2 border-blue-300 p-4 hover:shadow-md transition-shadow">
                  <a href="/home/forumOfftopic" class="block">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">Off Topic</h3>
                        <p class="text-gray-600 text-sm">Discute aqui cualquier cosa que no tenga que ver con pokemon</p>
                      </div>
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">53 posts</span>
                    </div>
                  </a>
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
import { IonButton, IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { ref } from 'vue';
import Team from '@/components/Team.vue';
import navbarCustom from '@/components/navbarComponent.vue';
import { useRouter } from 'vue-router';

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

const logout = () => {
  sessionStorage.removeItem('token');
  router.push('/login');
};

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
/* Mantén tus estilos existentes aquí */
</style>