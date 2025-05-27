<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">
          Settings
        </h1>
        <p class="text-gray-600 mb-2">Change username</p>
            <input 
              v-model="changeUserName"
              type="text" 
              id="changeUserName" 
              name="changeUserName" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your new username"
            >
        <p class="text-gray-600 mb-2">Change email</p>
            <input 
              v-model="changeEmail"
              type="text" 
              id="changeEmail" 
              name="changeEmail" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your new email"
            >
        <p class="text-gray-600 mb-2">Change password</p>
            <input 
              v-model="changePassword"
              type="password" 
              id="userName" 
              name="userName" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your new password"
            >
        <p class="text-gray-600 mb-2">Change profile picture</p>
            <input 
              v-model="changeProfilePic"
              type="text" 
              id="userName" 
              name="userName" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your new profile picture"
            >
        <br>
        <p class="text-gray-600 mb-2">REQUIRED - Current password</p>
            <input 
              v-model="currentPassword"
              type="password" 
              id="userName" 
              name="userName" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your current password"
            >
        <ion-button 
              @click="profileUpdate"
              class="w-full text-white py-2 px-4 rounded-lg"
            >
              Update
            </ion-button>       
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import * as userController from '@/controllers/userController';
import * as routerController from '@/controllers/routerController';
import { userState } from '@/controllers/stateController';
import { ref } from 'vue';
import { IonButton, IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';

const changeUserName = ref('');
const changeEmail = ref('');
const changePassword = ref('');
const changeProfilePic = ref('');
const currentPassword = ref('');

const updateMsg = ref('');

const router = useRouter();

const profileUpdate = async () => {
  updateMsg.value = '';
  if (!currentPassword.value) {
    updateMsg.value = 'You must enter your current password.';
    return;
  }

  // Solo envía los campos que el usuario ha rellenado
  const updateFields: any = {};
  if (changeUserName.value) updateFields.newUsername = changeUserName.value;
  if (changeEmail.value) updateFields.newEmail = changeEmail.value;
  if (changePassword.value) updateFields.newPassword = changePassword.value;
  if (changeProfilePic.value) updateFields.newProfilePic = changeProfilePic.value;

  try {
    const username = String(userController.getUsername());
    const result = await userController.updateUser(
      username,
      updateFields,
      currentPassword.value
    );
    updateMsg.value = 'Datos actualizados correctamente';
    if (result.token) {
      userState.value = await userController.getUser();
      changeUserName.value = '';
      changeEmail.value = '';
      changePassword.value = '';
      changeProfilePic.value = '';
      currentPassword.value = '';
      alert("Parameters updated.");
      routerController.navigateTo(router, "/profile")
    }
  } catch (error: any) {
    updateMsg.value = error.message || 'Error al actualizar los datos';
  }
};

</script>

<style scoped>

</style>