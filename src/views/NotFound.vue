<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-800">404</h1>
          <h2 class="text-4xl font-bold text-gray-800">Page not found.</h2>
          <p class="text-gray-600">Sorry, this page doesn't exist.</p>
          <ion-button @click="goHome" expand="block" class="mt-4">Back</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function goHome() {
    router.push('/');
  }
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }

  ion-content {
  --background: #ffffff;
  background: #ffffff !important;
  --box-shadow: none !important;
}
  </style>