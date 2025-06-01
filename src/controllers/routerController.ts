
import { Router } from "vue-router";
import { menuController } from '@ionic/vue';
import { mobileMenuState } from '@/controllers/stateController';

export const navigateTo = async (router: Router, path: string) => {
    console.log(router);
    await router.replace(path);
    menuController.close();
};

export const navigateToAndClose = async (router: Router, path: string) => {
    console.log(router);
    await router.replace(path);
    mobileMenuState.value = false;
    menuController.close();
};
