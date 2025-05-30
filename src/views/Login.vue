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
              v-model="loginUserName"
              type="text" 
              id="userName" 
              name="userName" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your username or email"
            >
            <p class="text-gray-600 mb-2">Password</p>
            <input 
              v-model="loginPassword"
              type="password" 
              id="password" 
              name="password" 
              class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              placeholder="Enter your password"
            >
            <ion-button 
              @click="handleLogin"
              :disabled="loading"
              class="w-full text-white py-2 px-4 rounded-lg"
            >
              Login
            </ion-button>
            <p v-if="loginErrorMsg" class="text-red-500 mt-2">{{ loginErrorMsg }}</p>
            <p class="text-gray-600 mt-4 flex items-center">
              Don't have an account?
              <button @click="showSignin = true" class="text-blue-600 ml-2">Sign in</button>
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

      <!-- Signin Modal -->
      <ion-modal :is-open="showSignin" @didDismiss="showSignin = false">
        <ion-content class="ion-padding">
          <div class="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Sign in</h2>
            <form class="space-y-4" @submit.prevent="handleSignin">
              <div>
                <label class="block text-gray-800 font-semibold mb-2">Username</label>
                <input 
                  v-model="signinUserName"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your username"
                >
              </div>
              <div>
                <label class="block text-gray-800 font-semibold mb-2">Email</label>
                <input 
                  v-model="signinEmail"
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                >
              </div>
              <div>
                <label class="block text-gray-800 font-semibold mb-2">Password</label>
                <input 
                  v-model="signinPassword"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                >
              </div>
              <div>
                <label class="block text-gray-800 font-semibold mb-2">Confirm Password</label>
                <input 
                  v-model="signinPasswordConfirm"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm your password"
                >
              </div>
              <p v-if="signinErrorMsg" class="text-red-500 mt-2">{{ signinErrorMsg }}</p>
              <div class="text-center">
                <ion-button type="submit" class="text-white font-semibold py-2 px-4 rounded-lg transition">
                  Sign in
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

const showSignin = ref(false);

const loginUserName = ref('');
const loginPassword = ref('');
const loading = ref(false);

const signinUserName = ref('');
const signinEmail = ref('');
const signinPassword = ref('');
const signinPasswordConfirm = ref('');

const loginErrorMsg = ref('');
const signinErrorMsg = ref(''); 

const loginTempUsername = ref('');
const loginTempPassword = ref('');

const router = useRouter();

const handleLogin = async () => {
  loginErrorMsg.value = '';
  try {
    loginTempUsername.value = loginUserName.value;
    loginTempPassword.value = loginPassword.value;
    await userController.login(loginTempUsername.value, loginTempPassword.value, router);
    loginUserName.value = '';
    loginPassword.value = '';
  } catch (error) {
    loginErrorMsg.value = (error instanceof Error ? error.message : 'Error al iniciar sesión');
  }
};

const handleSignin = async () => {
  signinErrorMsg.value = '';
  
  try {
    await userController.signin(signinUserName.value, signinEmail.value, signinPassword.value, signinPasswordConfirm.value);
    loginTempUsername.value = signinUserName.value;
    loginTempPassword.value = signinPassword.value;
    showSignin.value = false;
    signinUserName.value = '';
    signinEmail.value = '';
    signinPassword.value = '';
    signinPasswordConfirm.value = '';
    await userController.login(loginTempUsername.value, loginTempPassword.value, router);
  } catch (error) {
     signinErrorMsg.value = (error instanceof Error ? error.message : 'Error al registrar el usuario');
  }
};

/*
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
*/
</script>

<style scoped>
</style>