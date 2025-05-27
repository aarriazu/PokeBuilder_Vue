<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main flex flex-col md:flex-row h-full">
        <!-- Sidebar -->
        <div class="sidebar md:w-64 bg-gray-50 border-r border-gray-200 md:block transition-all duration-300">
          <!-- Perfil en sidebar -->
          <div class="flex items-center p-4 border-b border-gray-200">
            <img
              class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200"
              src="/src/assets/images/profile/profilePic.png"
            >
            <div>
              <h5 class="text-blue-600 font-semibold text-sm">Pokefan33</h5>
              <p class="text-gray-500 text-xs">Miembro desde 10/02/2024</p>
              <a href="/login" class="text-red-500 hover:text-red-700 text-xs mt-1 inline-block">Salir</a>
            </div>
          </div>

          <!-- Opciones del perfil -->
          <div class="p-4 space-y-2">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Opciones</h3>
            <router-link
              to="/profile"
              class="flex items-center p-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <span class="font-medium">Volver al perfil</span>
            </router-link>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="content flex-1 overflow-auto">
          <div class="p-4 md:p-6">
            <div class="max-w-4xl mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Gráfico de Pokémon más usados -->
                <div>
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">Pokémon más usados</h2>
                  <div class="relative w-full h-64">
                    <canvas id="myChart" class="w-full h-full"></canvas>
                  </div>
                </div>

                <!-- Pokémon favoritos -->
                <div>
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">Pokémon favoritos</h2>
                  <div class="grid grid-cols-3 gap-4">
                    <div class="flex flex-col items-center">
                      <img class="w-16 h-16 rounded-lg object-cover" src="/src/assets/images/pokemon/jolteon.png" alt="Jolteon">
                      <span class="text-sm text-gray-600 mt-2">Jolteon</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <img class="w-16 h-16 rounded-lg object-cover" src="/src/assets/images/pokemon/umbreon.png" alt="Umbreon">
                      <span class="text-sm text-gray-600 mt-2">Umbreon</span>
                    </div>
                    <div class="flex flex-col items-center">
                      <img class="w-16 h-16 rounded-lg object-cover" src="/src/assets/images/pokemon/vaporeon.png" alt="Vaporeon">
                      <span class="text-sm text-gray-600 mt-2">Vaporeon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(() => {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle', 'Eevee'],
        datasets: [
          {
            label: 'Usos',
            data: [12, 19, 3, 5, 2],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});
</script>

<style scoped>
.main {
  min-height: 100vh;
}

@media (min-width: 768px) {
  .sidebar {
    height: calc(100vh - 60px);
    position: sticky;
    top: 0;
  }

  .content {
    height: calc(100vh - 60px);
    overflow-y: auto;
  }
}
</style>