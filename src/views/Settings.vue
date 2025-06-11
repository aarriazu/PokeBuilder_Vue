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
         <p v-if="updateMsg" class="text-red-600 mb-2">{{ updateMsg }}</p>
         <br><br><br>
         
         <p class="text-gray-600 mb-2">Change profile picture</p>
          <div class="flex items-center mb-4">
            <input 
              ref="fileInput"
              type="file" 
              accept="image/*"
              @change="handleFileSelect"
              class="w-1/2 px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            >
            <ion-button 
              @click="uploadProfilePic"
              :disabled="!selectedFile || uploading"
              class="ml-2"
            >
              {{ uploading ? 'Uploading...' : 'Upload' }}
            </ion-button>
          </div>
            
        
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
import axios from 'axios';
import { API_BASE_URL } from '@/controllers/api';

const changeUserName = ref('');
const changeEmail = ref('');
const changePassword = ref('');
const selectedFile = ref<File | null>(null);
const uploading = ref(false);
const currentPassword = ref('');

const updateMsg = ref('');
const fileInput = ref<HTMLInputElement>();

const router = useRouter();

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};

const uploadProfilePic = async () => {
  if (!selectedFile.value) {
    alert('Selecciona un archivo primero');
    return;
  }

  uploading.value = true;
  
  try {
    const token = sessionStorage.getItem('session');
    
    if (!token) {
      alert('No hay token de autenticación');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', selectedFile.value);
    formData.append('username', userState.value!.username);

    const response = await axios.post(`${API_BASE_URL}:3000/api/user/upload-profile-pic`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const data = response.data as { token?: string };
    if (data.token) {
      sessionStorage.setItem('session', data.token);
    }

    // Forzar actualización del estado global
    userState.value = await userController.getUser();
    
    alert('Foto de perfil actualizada correctamente');
    selectedFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  } catch (error: any) {
    console.error('Error completo:', error);
    alert(`Error al subir la foto: ${error.response?.data?.error || error.message}`);
  } finally {
    uploading.value = false;
  }
};

const profileUpdate = async () => {
  updateMsg.value = '';
  
  if (!currentPassword.value) {
    updateMsg.value = 'You must enter your current password.';
    return;
  }

  // Solo envía los campos que el usuario ha rellenado
  /*
  const updateFields: any = {};
  if (changeUserName.value) updateFields.newUsername = changeUserName.value;
  if (changeEmail.value) updateFields.newEmail = changeEmail.value;
  if (changePassword.value) updateFields.newPassword = changePassword.value;

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
      currentPassword.value = '';
      alert("Parameters updated.");
      routerController.navigateTo(router, "/profile")
      */
      
  // Prepare update fields object
  const updateFields = {
    newUsername: changeUserName.value,
    newEmail: changeEmail.value,
    newPassword: changePassword.value,
    currentPassword: currentPassword.value
  };

  try {
    const username = userState.value?.username || '';
    const result = await userController.updateUser(username, updateFields);
    
    if (result.error) {
      updateMsg.value = result.error;
      return;
    }

    if (result.user) {
      userState.value = result.user;
    }

    if (result.token) {
      sessionStorage.setItem('session', result.token);
    }

    updateMsg.value = result.message || 'Profile updated successfully';
    
    // Clear form fields
    changeUserName.value = '';
    changeEmail.value = '';
    changePassword.value = '';
    currentPassword.value = '';
    
    // Show success message
    alert("Profile updated successfully");
    
    // Navigate to profile
    router.push('/profile');
    
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      updateMsg.value = error.response.data.error;
    } else if (error.message) {
      updateMsg.value = error.message;
    } else {
      updateMsg.value = 'Error updating profile';
    }
    console.error('Update error:', error);
  }
};



</script>

<style scoped>

</style>