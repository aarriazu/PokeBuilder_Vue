<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Título principal -->
      <div class="absolute top-0 w-full text-center mt-16">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">
          Pokebuilder
        </h1>
      </div>
      <br><br><br><br><br><br><br><br><br><br>

      <div class="flex justify-center items-center mt-8">
        <div class="flex bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYFPfcNmWqP1jCFAy_wtGIpeWBBz-3860teA&s"
              alt="Login image"
              class="w-100 h-100 object-contain hidden md:block" />
          <ion-list lines="none" class="w-full max-w-md">
            <ion-item>
              <ion-label position="stacked" class="text-gray-800 font-semibold">Username or email</ion-label>
              <ion-input
                v-model="loginUserName"
                type="text"
                id="loginUserName"
                name="loginUserName"
                placeholder="Enter your username or email"
                class="text-black"
                autocomplete="username"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked" class="text-gray-800 font-semibold">Password</ion-label>
              <ion-input
                v-model="loginPassword"
                type="password"
                id="loginPassword"
                name="loginPassword"
                placeholder="Enter your password"
                class="text-black"
                autocomplete="current-password"
              ></ion-input>
            </ion-item>
            <div class="text-center">
              <ion-button
                  expand="block"
                  @click="handleLogin"
                  class="text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Login
                </ion-button>
              <p v-if="loginErrorMsg" class="text-red-500 mt-2">{{ loginErrorMsg }}</p>
              <p class="text-gray-600 mt-4 flex items-center">
                <ion-button fill="clear" size="small" @click="showSignin = true" class="text-blue-600 ml-2"> Don't have an account? Sign up</ion-button>
              </p>
              <p class="text-gray-600 mt-4 flex items-center">
                <ion-button fill="clear" size="small" @click="router.push('/forumGeneral')" class="text-blue-600 ml-2">Enter forum as guest</ion-button>
              </p>
            </div>
          </ion-list>
        </div>
      </div>

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
                  Sign up
                </ion-button>
              </div>
            </form>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonContent, IonPage, IonList, IonModal, IonItem, IonLabel, IonInput } from '@ionic/vue';
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
</script>

<style scoped>

</style>