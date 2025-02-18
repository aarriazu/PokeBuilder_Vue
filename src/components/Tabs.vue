<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="profile" href="/home/profile">
          <ion-icon :icon="triangle" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="forum" href="/home/forum">
          <ion-icon :icon="square" />
          <ion-label>Forum</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { ellipse, square, triangle } from 'ionicons/icons';

  export default {
    name: 'Tabs',
    components: {
      IonLabel,
      IonTabs,
      IonTabBar,
      IonTabButton,
      IonIcon,
      IonPage,
      IonRouterOutlet,
    },
    setup() {
      return {
        ellipse,
        square,
        triangle,
      };
    },
  };
</script>