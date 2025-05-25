<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Título principal -->
      <div class="absolute top-0 w-full text-center mt-16">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">
          Pokebuilder
        </h1>
      </div>
      
      <ion-grid class="flex items-center justify-center min-h-screen bg-white m-2">
        <ion-row class="w-full max-w-6xl">
          <!-- Sección de Login -->
          <ion-col size="12" size-md="6" class="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
            <p class="text-gray-600 mb-2">Username or email</p>
            <input 
              v-model="userName"
              type="text" 
              id="userName" 
              name="userName" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
            >
            <p class="text-gray-600 mb-2">Password</p>
            <input 
              v-model="password"
              type="password" 
              id="password" 
              name="password" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
            >
            <ion-button 
              @click="userController.login(userName, password, router)"
              :disabled="loading"
              class="w-full text-white py-2 px-4 rounded-lg"
            >
              Login
            </ion-button>
            <p v-if="errorMsg" class="text-red-500 mt-2">{{ errorMsg }}</p>
            <p class="text-gray-600 mt-4 flex items-center">
              ¿No tienes cuenta?
              <span id="login-trigger" class="text-indigo-600 cursor-pointer hover:underline ml-2">
                Sign in
              </span>
            </p>
          </ion-col>

          <!-- Sección de Actividad Reciente -->
          <ion-col size="12" size-md="6" class="flex flex-col justify-center">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Actividad reciente</h2>
            <a href="/postGuest" class="block mb-4">
              <img 
                src="/src/assets/images/forum/loginForumPost1.png" 
                alt="Post 1" 
                class="w-full rounded-lg shadow-md"
              >
            </a>
            <a href="/postGuest" class="block">
              <img 
                src="/src/assets/images/forum/loginForumPost2.png" 
                alt="Post 2" 
                class="w-full rounded-lg shadow-md"
              >
            </a>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-modal ref="registerModal" trigger="login-trigger" trigger-action="click" alignment="center">
        <ion-content class="ion-padding">
          <div class="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Crear cuenta</h2>
            <form class="space-y-4" @submit.prevent="createAccount">
              <!-- Nombre de usuario -->
              <div>
                <label for="registerUserName" class="block text-gray-800 font-semibold mb-2">Nombre de usuario</label>
                <input 
                  v-model="registerUserName"
                  type="text" 
                  id="registerUserName" 
                  name="registerUserName" 
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Escribe tu nombre de usuario"
                >
              </div>
              <!-- Correo electrónico -->
              <div>
                <label for="registerEmail" class="block text-gray-800 font-semibold mb-2">Correo electrónico</label>
                <input 
                  v-model="registerEmail"
                  type="email" 
                  id="registerEmail" 
                  name="registerEmail" 
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Escribe tu correo electrónico"
                >
              </div>
              <!-- Contraseña -->
              <div>
                <label for="registerPassword" class="block text-gray-800 font-semibold mb-2">Contraseña</label>
                <input 
                  v-model="registerPassword"
                  type="password" 
                  id="registerPassword" 
                  name="registerPassword" 
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Escribe tu contraseña"
                >
              </div>
              <!-- Confirmar contraseña -->
              <div>
                <label for="registerPasswordConfirm" class="block text-gray-800 font-semibold mb-2">Confirmar contraseña</label>
                <input 
                  v-model="registerPasswordConfirm"
                  type="password" 
                  id="registerPasswordConfirm" 
                  name="registerPasswordConfirm" 
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirma tu contraseña"
                >
              </div>
              <p v-if="registerErrorMsg" class="text-red-500 mt-2">{{ registerErrorMsg }}</p>
              <p v-if="registerSuccessMsg" class="text-green-600 mt-2">{{ registerSuccessMsg }}</p>
              <!-- Botón para crear cuenta -->
              <div class="text-center">
                <ion-button 
                  type="submit"
                  :disabled="registerLoading"
                  class="text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Crear cuenta
                </ion-button>
              </div>
            </form>
          </div>
        </ion-content>
      </ion-modal>
      
      <!-- Footer -->
      <footerCustom/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonContent, IonPage, IonGrid, IonRow, IonCol, IonModal } from '@ionic/vue';
import footerCustom from '@/components/footerComponent.vue';
import { useRouter } from 'vue-router';
import * as userController from '@/controllers/userController';

const userName = ref('');
const password = ref('');
const errorMsg = ref('');
const loading = ref(false);

const registerUserName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerPasswordConfirm = ref('');
const registerErrorMsg = ref('');
const registerSuccessMsg = ref('');
const registerLoading = ref(false);

const router = useRouter();

const login = async () => {
  errorMsg.value = '';
  loading.value = true;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName.value, password: password.value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMsg.value = errorData.message || 'Server error';
      return;
    }

    const data = await response.json();

    // Guarda el token en localStorage o sessionStorage
    sessionStorage.setItem('session', data.token);

    // Redirige al perfil del usuario
    router.push('/home/profile');
  } catch (e) {
    errorMsg.value = 'Wrong username or password';
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const registerModal = ref();

const createAccount = async () => {
  registerErrorMsg.value = '';
  registerSuccessMsg.value = '';
  registerLoading.value = true;
  try {
    const response = await fetch('/api/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: registerUserName.value,
        email: registerEmail.value,
        password: registerPassword.value,
        passwordConfirm: registerPasswordConfirm.value
      })
    });
    const data = await response.json();
    if (data.success) {
      registerSuccessMsg.value = data.message;
      setTimeout(() => {
        registerModal.value.dismiss();
        registerUserName.value = '';
        registerEmail.value = '';
        registerPassword.value = '';
        registerPasswordConfirm.value = '';
        registerSuccessMsg.value = '';
      }, 1500);
    } else {
      registerErrorMsg.value = data.message;
    }
  } catch (e) {
    registerErrorMsg.value = 'Error de conexión con el servidor';
  }
  registerLoading.value = false;
};
</script>

<style scoped>
</style>