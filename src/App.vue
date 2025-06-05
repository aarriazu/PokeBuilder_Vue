<template>
  <div class="app-container">
    <headerComponent class="header"/>
    <ion-app class="app-content">
      <ion-router-outlet id="main-content" />
    </ion-app>
  </div>
</template>

<script setup lang="ts">
  import { IonApp, IonRouterOutlet } from '@ionic/vue';
  import headerComponent from '@/components/headerComponent.vue';
  import { onMounted } from 'vue';
  import { userState } from '@/controllers/stateController';
  import * as userController from '@/controllers/userController';

  onMounted(async () => {
  try {
    userState.value = await userController.getUser();
  } catch (error) {
    userState.value = null;
    console.error('Error fetching user:', error);
  }
});

</script>

<style>

:root {
  --header-height: 60px; 
}

ion-modal {
  background: transparent !important;
  --background: transparent !important;
  --box-shadow: none !important;
  filter: none !important;
}

ion-modal .signup-modal {
  max-width: 450px !important;
  width: 90vw !important;
}

ion-modal .login-modal {
  height: 80vh !important;
  min-height: 600px !important;
  max-height: 90vh !important;
}

ion-content {
  --background: #e7fcff;
  background: #e7fcff !important;
  --box-shadow: none !important;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-content {
  flex: 1 0 auto; 
  margin-top: 56px; 
}

.header {
  height: var(--header-height); 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.footer {
  position: relative;
  width: 100%;
  background-color: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

</style>
