<template>
  <ion-header class="shadow-sm">
    <ion-toolbar class="px-4 bg-indigo-100">
      <ion-buttons slot="start">
        <ion-menu-button class="text-gray-800"></ion-menu-button>
      </ion-buttons>

      <ion-title class="text-gray-900 font-semibold">PokeBuilder</ion-title>

      <!-- Menú normal para desktop -->
      <ion-buttons slot="end" class="hidden md:flex space-x-2">
        <ion-button 
          @click="navigateTo('/about')" 
          class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
        >
          About Us
        </ion-button>
        <ion-button 
          @click="navigateTo('/contact')" 
          class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
        >
          Contact
        </ion-button>
        <ion-button 
          @click="navigateTo('/help')" 
          class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
        >
          Help
        </ion-button>
      </ion-buttons>

      <!-- Botón hamburguesa para mobile/tablet -->
      <ion-buttons slot="end" class="md:hidden">
        <ion-button 
          @click="toggleMenu" 
          class="text-gray-800 transition-all duration-300"
          :class="{ 'rotate-90': isOpen }"
        >
          <ion-icon 
            :icon="isOpen ? closeOutline : menuOutline" 
            class="text-2xl transition-transform duration-300"
            :class="{ 'scale-110': isOpen }"
          ></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>

    <!-- Menú desplegable para mobile/tablet -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div 
        v-if="isOpen" 
        class="md:hidden bg-indigo-100 shadow-lg overflow-hidden"
      >
        <div class="flex flex-col py-2 space-y-1 px-4">
          <button 
            @click="navigateToAndClose('/about')" 
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all duration-300 flex items-center"
          >
            <span class="font-medium">Sobre nosotros</span>
          </button>
          
          <button 
            @click="navigateToAndClose('/contact')" 
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all duration-300 flex items-center"
          >
            <span class="font-medium">Contacto</span>
          </button>
          
          <button 
            @click="navigateToAndClose('/help')" 
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all duration-300 flex items-center"
          >
            <span class="font-medium">Ayuda</span>
          </button>
        </div>
      </div>
    </transition>
  </ion-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton,
} from '@ionic/vue';
import { menuOutline, closeOutline } from 'ionicons/icons';

const router = useRouter();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const navigateTo = (path: string) => {
  router.push(path);
};

const navigateToAndClose = (path: string) => {
  router.push(path);
  isOpen.value = false;
};
</script>

<style scoped>
/* Efecto de subrayado al hover para desktop */
.hover-underline {
  position: relative;
}

.hover-underline::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #4f46e5;
  transition: width 0.3s ease;
}

.hover-underline:hover::after {
  width: 100%;
}

/* Mejora el contraste del menú hamburguesa */
ion-toolbar {
  --background: #e0e7ff; /* Color de fondo más claro */
  --border-color: #c7d2fe; /* Borde sutil */
}
</style>