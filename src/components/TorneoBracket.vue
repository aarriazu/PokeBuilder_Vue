<template>
    <div class="overflow-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Bracket del Torneo</h2>
      <div class="flex space-x-8">
        <div
          v-for="(round, rIndex) in rounds"
          :key="rIndex"
          class="flex flex-col space-y-6"
        >
          <h3 class="text-lg font-semibold text-center">Ronda {{ rIndex + 1 }}</h3>
          <div
            v-for="(match, mIndex) in round"
            :key="mIndex"
            class="bg-white shadow p-2 rounded-lg border w-40 text-center"
          >
            <button
              v-if="match.player1"
              class="block w-full py-1 hover:bg-blue-100"
              @click="selectWinner(rIndex, mIndex, match.player1!)"
            >
              {{ match.player1 }}
            </button>
            <span class="block py-1 text-gray-500">vs</span>
            <button
              v-if="match.player2"
              class="block w-full py-1 hover:bg-blue-100"
              @click="selectWinner(rIndex, mIndex, match.player2!)"
            >
              {{ match.player2 }}
            </button>
            <div v-if="match.winner" class="mt-1 text-sm text-green-600 font-medium">
              🏆 {{ match.winner }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // --- Types ---
  type Player = string | null
  type Match = {
    player1: Player | null
    player2: Player | null
    winner: Player | null
  }
  type Round = Match[]
  
  // --- Input: Lista de jugadores ---
  const players = ref<Player[]>([
    'Mario', 'Luigi', 'Peach', 'Bowser', 'Yoshi', 'Wario', 'Toad', 'Daisy'
  ])
  
  const rounds = ref<Round[]>([])
  
  // --- Bracket Generation ---
  function generateInitialBracket(playerList: Player[]) {
    const shuffled = [...playerList]
  
    // Asegurar número par (añadir bye si es impar)
    if (shuffled.length % 2 !== 0) shuffled.push(null)
  
    const firstRound: Round = []
    for (let i = 0; i < shuffled.length; i += 2) {
      firstRound.push({
        player1: shuffled[i],
        player2: shuffled[i + 1],
        winner: null
      })
    }
  
    rounds.value = [firstRound]
    generateEmptyRounds(firstRound.length)
  }
  
  function generateEmptyRounds(initialMatchCount: number) {
    let matches = initialMatchCount
    while (matches > 1) {
      matches = Math.ceil(matches / 2)
      const round: Round = Array.from({ length: matches }, () => ({
        player1: null,
        player2: null,
        winner: null
      }))
      rounds.value.push(round)
    }
  }
  
  // --- Winner Selection ---
  function selectWinner(roundIndex: number, matchIndex: number, winner: Player) {
    const currentMatch = rounds.value[roundIndex][matchIndex]
    currentMatch.winner = winner
  
    const nextRound = rounds.value[roundIndex + 1]
    if (nextRound) {
      const nextMatchIndex = Math.floor(matchIndex / 2)
      if (matchIndex % 2 === 0) {
        nextRound[nextMatchIndex].player1 = winner
      } else {
        nextRound[nextMatchIndex].player2 = winner
      }
    }
  }
  
  // --- Init ---
  generateInitialBracket(players.value)
  </script>
  
  <style scoped>
  /* Puedes usar líneas SVG o pseudo-elementos si deseas conectar visualmente los emparejamientos */
  </style>
  