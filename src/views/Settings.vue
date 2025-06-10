<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main p-4">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">
          Settings
        </h1>
        <p class="text-gray-600 mb-2">Change username</p>
            <input 
              v-model="changeUserName"
              type="text" 
              id="changeUserName" 
              name="changeUserName" 
              class="w-1/2 px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your new username"
            >
        <p class="text-gray-600 mb-2">Change email</p>
            <input 
              v-model="changeEmail"
              type="text" 
              id="changeEmail" 
              name="changeEmail" 
              class="w-1/2 px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your new email"
            >
        <p class="text-gray-600 mb-2">Change password</p>
            <input 
              v-model="changePassword"
              type="password" 
              id="userName" 
              name="userName" 
              class="w-1/2 px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your new password"
            >
        <p class="text-gray-600 mb-2">Change profile picture (Needs to be a web link)</p>
            <input 
              v-model="changeProfilePic"
              type="text" 
              id="userName" 
              name="userName" 
              class="w-1/2 px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your new profile picture"
            >
        <br>
        <p class="text-gray-600 mb-2">REQUIRED - Current password</p>
            <input 
              v-model="currentPassword"
              type="password" 
              id="userName" 
              name="userName" 
              class="w-1/2 px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your current password"
            >
        <ion-button 
              @click="profileUpdate"
              class="w-1/2 text-white py-2 px-4 rounded-lg"
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

  // Prepare update fields object
  const updateFields = {
    newUsername: changeUserName.value,
    newEmail: changeEmail.value,
    newPassword: changePassword.value,
    newProfilePic: changeProfilePic.value,
    currentPassword: currentPassword.value
  };

  try {
    const username = userState.value?.username || '';
    const result = await userController.updateUser(username, updateFields);
    
    if (result.error) {
      updateMsg.value = result.error;
      return;
    }

    updateMsg.value = result.message || 'Profile updated successfully';
    
    // Clear form fields
    changeUserName.value = '';
    changeEmail.value = '';
    changePassword.value = '';
    changeProfilePic.value = '';
    currentPassword.value = '';
    
    // Show success message
    alert("Profile updated successfully");
    
    // Navigate to profile
    router.push('/profile');
    
  } catch (error: any) {
    updateMsg.value = error.message || 'Error updating profile';
    console.error('Update error:', error);
  }
};



</script>

<style scoped>

</style>