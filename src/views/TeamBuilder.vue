<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main">
        <div class="profile">
          <img class="profilePic" src="/src/assets/images/profile/profilePic.png">
          <div class="profileBuffer"></div>
          <div class="profileTextDiv">
            <h5 class="blueText">Pokefan33</h5>
            <h5>Miembro desde 10/02/2024</h5>
            <a href="/login">Salir</a>
          </div>
        </div>

        <div class="title">
          <h1>Pokebuilder</h1>
          <div style="float: right;">
            <ion-button router-link="/home/profile">Guardar</ion-button>
            <ion-button @click="resetPokemons" router-link="/home/profile">Volver</ion-button>
          </div>
        </div>

        <ion-grid class="custom-grid">
          <ion-row>
            <ion-col size="1"></ion-col>
            <ion-col size="2" v-for="(pokemon, index) in pokemons" :key="index">
              <div>
                <ion-button color="light" size="large" class="addPokemonButton" @click="openModal(index)">
                  Selecciona Pokemon
                </ion-button>
                <div v-if="pokemon.name">
                  <img :src="`/src/assets/images/pokemon/${pokemon.name}.png`" :alt="pokemon.name">
                  <p>Objeto</p>
                  <input type="text" class="textBox" v-model="pokemon.item">
                  <p>Habilidad</p>
                  <input type="text" class="textBox" v-model="pokemon.ability">
                  <p>Naturaleza</p>
                  <input type="text" class="textBox" v-model="pokemon.nature">
                  <p>Movimientos</p>
                  <div v-for="(move, moveIndex) in pokemon.moves" :key="moveIndex">
                    <input type="text" class="textBox" v-model="pokemon.moves[moveIndex]">
                  </div>
                </div>
              </div>
            </ion-col>
            <ion-col size="1"></ion-col>
          </ion-row>
        </ion-grid>

        <ion-modal :is-open="isModalOpen" @did-dismiss="closeModal">
          <div class="modal-content">
            <h2>Selecciona Pokemon</h2>
            <ion-list>
              <ion-item v-for="pokemon in availablePokemons" :key="pokemon" @click="selectPokemon(pokemon)">
                {{ pokemon }}
              </ion-item>
            </ion-list>
            <ion-button @click="closeModal">Cerrar</ion-button>
          </div>
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonModal, IonButton, IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem } from '@ionic/vue';

const blankPokemons = () => [
  { name: '', item: '', ability: '', nature: '', moves: ['', '', '', ''] },
  { name: '', item: '', ability: '', nature: '', moves: ['', '', '', ''] },
  { name: '', item: '', ability: '', nature: '', moves: ['', '', '', ''] },
  { name: '', item: '', ability: '', nature: '', moves: ['', '', '', ''] },
  { name: '', item: '', ability: '', nature: '', moves: ['', '', '', ''] },
  { name: '', item: '', ability: '', nature: '', moves: ['', '', '', ''] }
];

const pokemons = ref(blankPokemons());

const availablePokemons = ['Eevee', 'Flareon', 'Vaporeon', 'Jolteon', 'Espeon', 'Umbreon'];

const isModalOpen = ref(false);
const selectedPokemonIndex = ref<number | null>(null);

function openModal(index: number) {
  selectedPokemonIndex.value = index;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedPokemonIndex.value = null;
}

function selectPokemon(pokemon: string) {
  if (selectedPokemonIndex.value !== null) {
    pokemons.value[selectedPokemonIndex.value].name = pokemon;
  }
  closeModal();
}

function resetPokemons() {
  pokemons.value = blankPokemons();
}
</script>

<style scoped>
.custom-grid {
  --ion-grid-columns: 14;
}

.modal-content {
  padding: 20px;
}
</style>