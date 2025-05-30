<template>
  <ion-header class="shadow-sm">
    <ion-toolbar class="px-4 bg-indigo-100">
      <ion-buttons slot="start">
        <div v-if="user">
          <button @click="openMenu" class="relative w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden bg-white">
            <img
              :src="user?.profilePic || 'https://i.pinimg.com/474x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg'"
              alt="Profile Picture"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </ion-buttons>

      <div class="flex items-center space-x-2">
        <div class="w-1"></div>
        <span class="text-gray-900 font-semibold text-lg">PokeBuilder</span>
        <button v-if="!user" @click="showLogin = true" class="text-blue-600">Log in</button>
        <button v-if="!user" @click="showSignin = true" class="text-blue-600 ml-2">Sign in</button>
      </div>

      <!-- Login Modal -->
      <ion-modal :is-open="showLogin" @didDismiss="showLogin = false">
        <ion-content class="ion-padding">
          <div class="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>
            <form class="space-y-4" @submit.prevent="handleLogin">
              <div>
                <label class="block text-gray-800 font-semibold mb-2">Username or email</label>
                <input 
                  v-model="loginUserName"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your username or email"
                >
              </div>
              <div>
                <label class="block text-gray-800 font-semibold mb-2">Password</label>
                <input 
                  v-model="loginPassword"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                >
              </div>
              <p v-if="loginErrorMsg" class="text-red-500 mt-2">{{ loginErrorMsg }}</p>
              <div class="text-center">
                <ion-button type="submit" class="text-white font-semibold py-2 px-4 rounded-lg transition">
                  Log in
                </ion-button>
              </div>
            </form>
          </div>
        </ion-content>
      </ion-modal>

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

      <!-- Menú normal para desktop -->
      <ion-buttons slot="end" class="hidden md:flex space-x-2">
        <ion-button 
          @click="routerController.navigateTo(props.router, '/forumGeneral')" 
          class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
        >
          Forum
        </ion-button>
        <ion-button 
          @click="routerController.navigateTo(props.router, '/pokedex')" 
          class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
        >
          Pokedex
        </ion-button>
        <ion-button 
          @click="routerController.navigateTo(props.router, '/contact')" 
          class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
        >
          Contact
        </ion-button>
        <ion-button 
          @click="routerController.navigateTo(props.router, '/help')" 
          class="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
        >
          Help
        </ion-button>
      </ion-buttons>

      <!-- Botón hamburguesa para mobile/tablet -->
      <ion-buttons slot="end" class="md:hidden">
        <ion-button 
          @click="toggleMobileMenu" 
          class="text-gray-800 transition-all duration-300"
          :class="{ 'rotate-90': isMenuOpen }"
        >
          <ion-icon 
            :icon="isMenuOpen ? closeOutline : menuOutline" 
            class="text-2xl transition-transform duration-300"
            :class="{ 'scale-110': isMenuOpen }"
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
        v-if="isMenuOpen" 
        class="md:hidden bg-indigo-100 shadow-lg overflow-hidden"
      >
        <div class="flex flex-col py-2 space-y-1 px-4">
          <button 
            @click="routerController.navigateToAndClose(props.router, '/forumGeneral')" 
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all duration-300 flex items-center"
          >
            <span class="font-medium">Forum</span>
          </button>

          <button 
            @click="routerController.navigateToAndClose(props.router, '/pokedex')" 
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all duration-300 flex items-center"
          >
            <span class="font-medium">Pokedex</span>
          </button>
          
          <button 
            @click="routerController.navigateToAndClose(props.router, '/contact')" 
            class="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all duration-300 flex items-center"
          >
            <span class="font-medium">Contacto</span>
          </button>
          
          <button 
            @click="routerController.navigateToAndClose(props.router, '/help')" 
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
import { computed, ref } from 'vue';
import { User } from '@/classes/User';
import type { Router } from 'vue-router';
import { PropType } from 'vue';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
} from '@ionic/vue';
import { menuOutline, closeOutline } from 'ionicons/icons';
import * as routerController from '@/controllers/routerController';
import * as userController from '@/controllers/userController';
import { mobileMenuState } from '@/controllers/stateController';
import { menuController } from '@ionic/vue'; 

const showLogin = ref(false);
const showSignin = ref(false);

const loginUserName = ref('');
const loginPassword = ref('');

const signinUserName = ref('');
const signinEmail = ref('');
const signinPassword = ref('');
const signinPasswordConfirm = ref('');

const loginErrorMsg = ref('');
const signinErrorMsg = ref(''); 

const loginTempUsername = ref('');
const loginTempPassword = ref('');

const isMenuOpen = computed(() => mobileMenuState.value);

const openMenu = async () => {
  await menuController.open(); // Abre el menú lateral
};

const toggleMobileMenu = () => {
  mobileMenuState.value = !mobileMenuState.value;
};

const handleLogin = async () => {
  loginErrorMsg.value = '';
  loginTempUsername.value = loginUserName.value;
  loginTempPassword.value = loginPassword.value;
  try {
    await userController.login(loginTempUsername.value, loginTempPassword.value, props.router);
    showLogin.value = false;
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
    await userController.login(signinUserName.value, signinPassword.value, props.router);
  } catch (error) {
     signinErrorMsg.value = (error instanceof Error ? error.message : 'Error al registrar el usuario');
  }
};

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

  /* Estilos personalizados para la imagen de perfil */
  img {
  transition: transform 0.2s ease-in-out;
}

img:hover {
  transform: scale(1.1); /* Efecto de zoom al pasar el cursor */
}
</style>