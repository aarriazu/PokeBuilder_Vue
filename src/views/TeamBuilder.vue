<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main">
        <div class="title">
          <h1>Pokebuilder</h1>
          <div style="float: right;">
            <ion-button @click="saveTeam">Guardar</ion-button>
            <ion-button @click="resetPokemons">Volver</ion-button>
          </div>
        </div>

        <!-- Input para el nombre del equipo -->
        <div class="team-name">
          <p>Nombre del equipo:</p>
          <input type="text" class="textBox bg-white" v-model="teamName" placeholder="Escribe el nombre del equipo" />
        </div>

        <ion-grid class="custom-grid">
          <ion-row>
            <ion-col size="2" v-for="(pokemon, index) in team" :key="index">
              <div>
                <ion-button color="light" size="large" class="addPokemonButton" @click="openModal(index)">
                  Selecciona Pokemon
                </ion-button>
                <div v-if="pokemon.name">
                  <img :src="pokemon!.species.sprite || ''" :alt="pokemon!.name" class="w-24 h-24" />
                  <p>Name</p>
                  <input type="text" class="textBox bg-white" v-model="pokemon.name">
                  <p>Objeto</p>
                  <input type="text" class="textBox bg-white" v-model="pokemon.item">
                  <p>Habilidad</p>
                  <input type="text" class="textBox bg-white" v-model="pokemon.ability">
                  <p>Naturaleza</p>
                  <input type="text" class="textBox bg-white" v-model="pokemon.nature">
                  <p>Movimientos</p>
                  <div v-for="(move, moveIndex) in pokemon.moves" :key="moveIndex">
                    <input type="text" class="textBox bg-white" v-model="pokemon.moves[moveIndex]">
                  </div>
                </div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonModal, IonButton, IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem } from '@ionic/vue';
import { Pokemon } from '@/interfaces/pokemonInterface';
import { TeamPokemon } from '@/classes/TeamPokemon';
import { Team } from '@/classes/Team';
import * as dataController from '@/controllers/dataController';
import { modalController } from '@ionic/vue';
import SelectPokemonModal from '@/components/SelectPokemonModal.vue';

// Función para inicializar un equipo vacío
const blankPokemons = () => [
  new TeamPokemon(dataController.pokemonArray[0]),
  new TeamPokemon(dataController.pokemonArray[0]),
  new TeamPokemon(dataController.pokemonArray[0]),
  new TeamPokemon(dataController.pokemonArray[0]),
  new TeamPokemon(dataController.pokemonArray[0]),
  new TeamPokemon(dataController.pokemonArray[0]),
];

// Variables reactivas
const team = ref(blankPokemons());
const teamName = ref('');
const availablePokemons = dataController.pokemonArray.map(pokemon => ({
  name: pokemon.name,
  sprite: pokemon.sprite || '',
  types: pokemon.types || [],
  generation: pokemon.generation || 0,
}));
const selectedPokemonIndex = ref<number | null>(null);

// Función para abrir el modal de selección de Pokémon
async function openModal(index: number) {
  selectedPokemonIndex.value = index;

  const modal = await modalController.create({
    component: SelectPokemonModal,
    componentProps: {
      availablePokemons,
    },
  });

  modal.onDidDismiss().then(({ data, role }) => {
    if (role === 'select' && data && selectedPokemonIndex.value !== null) {
      const selectedSpecies = dataController.pokemonArray.find(
        pokemon => pokemon.name.toLowerCase() === data.toLowerCase(),
      );
      if (selectedSpecies) {
        team.value[selectedPokemonIndex.value].species = selectedSpecies;
      } else {
        console.error(`No se encontró un Pokémon con el nombre: ${data}`);
      }
    }
    selectedPokemonIndex.value = null;
  });

  await modal.present();
}

// Función para guardar el equipo en memoria
function saveTeam() {
  if (!teamName.value) {
    alert('Por favor, ingresa un nombre para el equipo.');
    return;
  }

  const teamCopy = JSON.parse(JSON.stringify(team.value)); //Copia del valor actual de team para que pueda ser guardado correctamente
  localStorage.setItem('teamCopy', JSON.stringify(teamCopy));

  const newTeam = new Team(teamCopy, teamName.value, "1", 1);

  // Guardar el equipo en localStorage
  const savedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
  savedTeams.push(newTeam);
  localStorage.setItem('teams', JSON.stringify(savedTeams));

  alert('Equipo guardado correctamente.');
}

// Función para reiniciar el equipo
function resetPokemons() {
  team.value = blankPokemons();
  teamName.value = '';
}
</script>

<style scoped>
.team-name {
  margin: 20px 0;
}

.textBox {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>