<template>
    <navbarComponent :router="router" :user="user"/>
    <menuComponent v-if="user !== null" :router="router" :user="user"/>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import * as userController from '@/controllers/userController';
    import navbarComponent from '@/components/navbarComponent.vue';
    import menuComponent from '@/components/menuComponent.vue';
    import { userState } from '@/controllers/stateController';
    import { useRouter, onBeforeRouteLeave } from "vue-router";

    const user = computed(() => userState.value); // Computed para reaccionar a los cambios en el estado global
    const router = useRouter();

    onMounted(async () => {
    try {
        userState.value = await userController.getUser();
    } catch (error) {
        console.error('Error fetching user:', error);
        userState.value = null;
    }
    });
</script>