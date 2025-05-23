<template>
  <!-- Menú lateral -->
  <ion-menu content-id="main-content" side="start">
    <ion-header>
      <ion-toolbar>
          <div class="flex items-center p-4 border-b border-gray-200">
          <img 
            class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200" 
            :src="profilePic! || ''"
          >
          <div>
            <h5 class="text-blue-600 font-semibold text-sm">{{ user!.username }}</h5>
            <p class="text-gray-500 text-xs">Member since {{ new Date(user!.createdAt).toLocaleDateString('en-EN') }}</p>
            <a @click="userController.logout(router)" class="text-red-500 hover:text-red-700 text-sm mt-1 inline-block">Exit</a>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Contenido del menú -->
      <ion-list>
        <ion-item button>
          <ion-label>Profile</ion-label>
        </ion-item>
        <ion-item button>
          <ion-label>Settings</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  
  <!-- Página principal -->
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <!-- Botón para abrir el menú -->
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Contenido principal de la página -->
      <p>Este es el contenido principal de la página.</p>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import * as userController from '@/controllers/userController';
    //import navbarComponent from '@/components/navbarComponent.vue';
    import { IonContent, IonPage, IonToolbar, IonMenu, IonMenuButton, IonHeader, IonLabel, IonItem, IonList, IonButtons, IonTitle } from '@ionic/vue';
    
    import { User } from '@/classes/User';
    import type { Router } from 'vue-router';

    const props = defineProps({
      router: {
        type: Object as () => Router,
        required: true,
      },
      /*
      user: {
        type: Object as () => User,
        required: true,
      },
      */
    });

    const profilePic = ref<any>(null);
    const user = ref<User | null>(null);

    onMounted(async () => {
      user.value = await userController.getUser();
    });
    

    // SI NO FUNCIONA VOLVER A ESTO!!!
    /*
    onMounted(() => { 
      if (props.user) {
        profilePic.value = props.user.profilePic || null; // Asigna la imagen de perfil si existe
        //profilePic.value = userController.getProfilePic() || null; 
        console.log('Usuario:', props.user);
        console.log('Imagen de perfil:', profilePic.value);
        console.log('Miembro desde:', props.user.createdAt);
      } else {
        console.error('No se encontró el usuario');
      }
        
    });
    */
</script>
  
<style scoped>
  /* Puedes agregar estilos personalizados aquí si es necesario */
</style>