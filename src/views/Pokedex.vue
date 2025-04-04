<template>
    <IonPage>
        <IonContent>
            <div class="bg-gray-100 min-h-screen">
                <IonGrid>
                    <IonRow class="justify-center">
                        <IonCol size="12" size-md="8" class="p-4">
                            <div class="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-6">
                                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Pokedex</h2>
                                <p class="text-gray-600 text-sm mb-4">
                                    Bienvenido a nutesra Pokédex. Aquí te mostraremos información sobre los pokemon que tenemos en nuestra página web.
                                </p>
                            </div>
                            <div class="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-6 mt-4">
                                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Pokemon</h2>
                                <p class="text-gray-600 text-sm mb-4">
                                    Aquí puedes ver la lista de Pokémon disponibles.
                                </p>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">

import { Ref } from 'vue';
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';


</script>

<style scoped>
</style>