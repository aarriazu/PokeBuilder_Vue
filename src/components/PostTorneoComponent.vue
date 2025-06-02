<template>
    <ion-card v-for="thread in threads" :key="thread.title">
      <ion-card-header>
        <ion-card-title>{{ thread.title }}</ion-card-title>
        <ion-card-subtitle>
          {{ thread.subforum }} • Created by {{ thread.author }} on {{ formatDate(thread.createdAt) }}
        </ion-card-subtitle>
      </ion-card-header>
  
      <ion-card-content>
        <p>{{ thread.description }}</p>
  
        <div class="mt-2">
          <strong>Participants:</strong>
          <ion-chip v-for="(participant, index) in thread.participants" :key="index">
            {{ participant }}
          </ion-chip>
        </div>
  
        <div class="mt-2">
          <strong>Bracket:</strong>
          <ul>
            <li v-for="(match, index) in thread.bracket" :key="index">{{ match }}</li>
          </ul>
        </div>
  
        <div class="mt-2 flex justify-between items-center text-sm text-gray-600">
          <span>Answers: {{ thread.answers }}</span>
          <span>Last edit: {{ formatDate(thread.editedAt) }}</span>
        </div>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip } from '@ionic/vue'
  
  interface Thread {
    title: string
    author: string
    subforum: string
    description: string
    participants: string[]
    bracket: string[]
    answers: number
    createdAt: string
    editedAt: string
  }
  
  const threads: Thread[] = [
    {
      title: 'Torneo Primavera 2025',
      author: 'moderador1',
      subforum: 'Torneos Oficiales',
      description: 'Este torneo incluye a los mejores jugadores de la comunidad.',
      participants: ['Ana', 'Luis', 'Carla', 'Tomás'],
      bracket: ['Ana vs Luis', 'Carla vs Tomás', 'Ganador A vs Ganador B'],
      answers: 14,
      createdAt: '2025-05-01T12:34:00',
      editedAt: '2025-05-10T09:21:00',
    },
  ]
  
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  </script>
  