<template>
  <div class="app-container">
    <headerComponent class="header" />
    <ion-app class="app-content">
      <ion-router-outlet id="main-content" />
    </ion-app>
  </div>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import headerComponent from '@/components/headerComponent.vue';
import footerComponent from '@/components/footerComponent.vue';
</script>

<style scoped>
:root {
  --header-height: 60px; /* Define la altura del header */
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
}

.app-content {
  flex: 1 0 auto; /* Hace que el contenido crezca y empuje el footer hacia abajo */
  margin-top: 60px; /* Si tu header es fijo */
}

.header {
  height: var(--header-height); /* Asegúrate de que el header use la misma altura */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer {
  position: relative; /* Cambia a relative para que se posicione dentro del flujo del documento */
  width: 100%;
  background-color: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.app-content {
  margin-top: 60px; 
}
</style>
