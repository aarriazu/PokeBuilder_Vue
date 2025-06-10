<template>
  <!-- Menú lateral -->
  <ion-menu content-id="main-content" side="start">
    <ion-toolbar>
        <div class="flex items-center p-4 border-b border-gray-200">
          <div v-if="props.user"> 
            <img 
              class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200" 
              :src="userController.getProfilePicUrl(props.user.profilePic)"
              @error="userController.handleImageError"
            >
            <div>
              <h5 class="text-blue-600 font-semibold text-sm">{{ props.user!.username }}</h5>
              <p class="text-gray-500 text-xs">Member since {{ new Date(props.user!.createdAt).toLocaleDateString('en-EN') }}</p>
              <a @click="userController.logout(router)" class="text-red-500 hover:text-red-700 text-sm mt-1 inline-block">Logout</a>
            </div>
          </div>
          <div v-else>
            <img 
              class="w-12 h-12 rounded-lg object-cover mr-3 border-2 border-gray-200" 
              :src="'src/assets/images/guest.jpg'"
            >
            <div>
              <h5 class="text-blue-600 font-semibold text-sm">Guest</h5>
            </div>
          </div>
        </div>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <!-- Contenido del menú -->
      <div v-if="props.user"> 
        <ion-list>
          <ion-item button @click="routerController.navigateTo(router, '/profile')">          
            <ion-label>Profile</ion-label>
          </ion-item>
          <ion-item button @click="routerController.navigateTo(router, '/settings')">
            <ion-label>Settings</ion-label>
          </ion-item>
        </ion-list>
    </div>
    </ion-content>
  </ion-menu>
</template>
  
<script setup lang="ts">
  import * as userController from '@/controllers/userController';
  import { IonContent, IonPage, IonToolbar, IonMenu, IonLabel, IonItem, IonList } from '@ionic/vue';
  import { PropType, watch } from 'vue';
  import { User } from '@/classes/User';
  import type { Router } from 'vue-router';
  import * as routerController from '@/controllers/routerController';

  const props = defineProps({
    router: {
      type: Object as PropType<Router>,
      required: true,
    },
    user: {
      type: Object as PropType<User | null>, 
      required: false,
    },
  });

</script>
  
<style scoped>

ion-content {
  --background: #ffffff;
  background: #ffffff !important;
  --box-shadow: none !important;
}

</style>