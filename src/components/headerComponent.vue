<template>
    <navbarComponent :router="router" :user="user" v-bind="$attrs"/>
    <menuComponent v-if="user !== null" :router="router" :user="user"/>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';
    import * as userController from '@/controllers/userController';
    import navbarComponent from '@/components/navbarComponent.vue';
    import menuComponent from '@/components/menuComponent.vue';
    import { userState } from '@/controllers/stateController';
    import { useRouter } from "vue-router";

    defineOptions({
        inheritAttrs: false
    });

    const user = computed(() => userState.value); // Computed para reaccionar a los cambios en el estado global
    const router = useRouter();
    const isLoading = ref(true);

    onMounted(async () => {
        try {
            // Agregar timeout para evitar que se cuelgue
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 10000)
            );
            
            const userPromise = userController.getUser();
            
            userState.value = await Promise.race([userPromise, timeoutPromise]) as Awaited<ReturnType<typeof userController.getUser>>;
        } catch (error) {
            console.error('Error fetching user:', error);
            userState.value = null;
        } finally {
            isLoading.value = false;
        }
    });

    watch(userState, (newUser, oldUser) => {
        console.log('User state changed:', { oldUser, newUser });
        // Aquí puedes ejecutar cualquier lógica adicional cuando cambie el usuario
    });

</script>
<style>
</style>