
import { Router } from "vue-router";
import { menuController } from '@ionic/vue';
import { mobileMenuState } from '@/controllers/stateController';

export const navigateTo = async (router: Router, path: string) => {
    console.log(router);
    await router.push(path); // Navegar a la ruta
    menuController.close(); // Cerrar el menú
};

export const navigateToAndClose = async (router: Router, path: string) => {
    console.log(router);
    await router.push(path); // Navegar a la ruta
    mobileMenuState.value = false; // Cerrar el menú
    menuController.close();
  };
