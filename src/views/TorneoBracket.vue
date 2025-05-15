<template>
  <ion-page class="p-4">
    <ion-header>
      <ion-toolbar>
        <ion-title>Generador de Torneos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Zona izquierda: Configuración -->
        <div class="md:w-1/2">
          <div class="bg-white p-4 rounded-xl shadow-md">
            <h2 class="text-xl font-bold mb-4">Configuración del Torneo</h2>
            <div class="mb-4">
              <label class="block mb-1 font-medium ">Número de Participantes (par)</label>
              <input
                type="number"
                min="2"
                step="2"
                v-model.number="numParticipants"
                @change="updateParticipants"
                class="w-full p-2 border rounded bg-white"
              />
            </div>

            <div v-for="(name, index) in participants" :key="index" class="mb-2">
              <input
                type="text"
                v-model="participants[index]"
                :placeholder="`Participante ${index + 1}`"
                class="w-full p-2 border rounded bg-white"
              />
            </div>

            <ion-button expand="block" @click="generateBracket" class="mt-4">Generar Emparejamientos</ion-button>
          </div>
        </div>

        <!-- Zona derecha: Bracket generado -->
        <div class="md:w-1/2">
          <div class="bg-white p-4 rounded-xl shadow-md">
            <h2 class="text-xl font-bold mb-4">Emparejamientos</h2>
            <div v-if="bracket.length === 0">
              <p class="text-gray-500">No se han generado emparejamientos.</p>
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="(pair, index) in bracket"
                :key="index"
                class="p-3 border rounded flex justify-between"
              >
                <span>{{ pair[0] }}</span>
                <span>vs</span>
                <span>{{ pair[1] }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/vue'

// Estado y tipos
const numParticipants = ref<number>(2)
const participants = ref<string[]>(['', ''])
const bracket = ref<[string, string][]>([])

// Actualizar cantidad de inputs según número de participantes
const updateParticipants = (): void => {
  if (numParticipants.value % 2 !== 0 || numParticipants.value < 2) {
    alert('El número de participantes debe ser par y mayor o igual a 2.')
    return
  }

  // Rellenar o recortar el array manteniendo nombres existentes
  const current = participants.value
  const updated = Array.from({ length: numParticipants.value }, (_, i) => current[i] || '')
  participants.value = updated
  bracket.value = []
}

// Generar emparejamientos aleatorios
const generateBracket = (): void => {
  if (participants.value.some(name => name.trim() === '')) {
    alert('Por favor, escribe todos los nombres de los participantes.')
    return
  }

  const shuffled = [...participants.value].sort(() => Math.random() - 0.5)
  const pairs: [string, string][] = []

  for (let i = 0; i < shuffled.length; i += 2) {
    pairs.push([shuffled[i], shuffled[i + 1]])
  }

  bracket.value = pairs
}
</script>

<style scoped>

</style>
