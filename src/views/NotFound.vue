<template>
  <ion-page>
    <ion-content class="flex items-center justify-center h-screen bg-white">
      <div class="text-center">
        <!-- Código de error -->
        <p class="text-base font-semibold text-indigo-600">404</p>
        <!-- Mensaje principal -->
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <!-- Mensaje secundario -->
        <p class="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <!-- Botones -->
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            @click.prevent="goHome"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonContent } from '@ionic/vue';

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>