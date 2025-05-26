<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="main">
        <div class="title">
          <div style="float: right;">
            <ion-button @click="saveTeam">Save</ion-button>
            <ion-button @click="resetPokemons">Reset</ion-button>
            <ion-button router-link="/home">Back</ion-button>
          </div>
        </div>

        <div class="team-name">
          <p>Team Name:</p>
          <input type="text" class="textBox bg-white" v-model="teamName" placeholder="Escribe el nombre del equipo" />
        </div>

        <ion-grid class="custom-grid">
          <ion-row>
            <ion-col size="2" v-for="(pokemon, index) in team" :key="index">
              <div>
                <ion-button color="light" size="large" class="addPokemonButton" @click="openModal(index)">
                  Select Pokemon
                </ion-button>
                <div v-if="pokemon.name">
                  <img :src="pokemon!.species.sprite || ''" :alt="pokemon!.name" class="w-24 h-24" />

                  <p>Name</p>
                  <input type="text" class="textBox bg-white" v-model="pokemon.name">

                  <p>Item</p>
                  <input type="text" class="textBox bg-white" v-model="pokemon.item">

                  <p>Ability</p>
                  <select class="textBox bg-white" v-model="pokemon.ability">
                    <option v-for="ability in pokemon.species.abilities" :key="ability" :value="ability">
                      {{ dataController.formatText(ability) }}
                    </option>
                  </select>

                  <p>Nature</p>
                  <select class="textBox bg-white" v-model="pokemon.nature">
                    <option v-for="nature in dataController.natureArray" :key="nature.id" :value="nature.name">
                      {{ dataController.formatText(nature.name) }}
                    </option>
                  </select>

                  <p>Moves</p>
                  <div v-for="(move, moveIndex) in pokemon.moves" :key="moveIndex">
                    <select class="textBox bg-white" v-model="pokemon.moves[moveIndex]">
                      <option v-for="availableMove in pokemon.species.moves" :key="availableMove" :value="availableMove">
                        {{ dataController.formatText(availableMove) }}
                      </option>
                    </select>
                  </div>

                  <p>IVs</p>
                  <div class="stat-container">
                    <div class="stat-subsection" v-for="(iv, stat) in pokemon.iv" :key="stat">
                      <p>{{ iv.name }}</p>
                      <input
                        type="range"
                        class="stat-slider"
                        v-model="iv.amount"
                        min="0"
                        max="31"
                      />
                      <span class="stat-value">{{ iv.amount }}</span>
                    </div>
                  </div>  

                  <p>EVs</p>
                  <div class="stat-container">
                    <div class="stat-subsection" v-for="(ev, statIndex) in pokemon.ev" :key="statIndex">
                      <p>{{ ev.name }}</p>
                      <input
                        type="range"
                        class="stat-slider"
                        v-model="ev.amount"
                        :min="0"
                        :max="calculateRemainingEVs(ev.amount, pokemon)"
                        @input="updateEVTotal(pokemon)"
                      />
                      <span class="stat-value">{{ ev.amount }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <footerComponent/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonModal, IonButton, IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem } from '@ionic/vue';
import { PokemonInterface } from '@/interfaces/pokemonInterface';
import { TeamPokemon } from '@/classes/TeamPokemon';
import { useRouter } from 'vue-router';
import * as dataController from '@/controllers/dataController';
import { modalController } from '@ionic/vue';
import SelectPokemonModal from '@/components/SelectPokemonModal.vue';
import axios from 'axios';
import footerComponent from '@/components/footerComponent.vue';

// Inicializar un Pokémon vacio con valores predeterminados
const router = useRouter();

const blankPokemon = () => new TeamPokemon(
  '' as unknown as PokemonInterface,
  '',
  '',
  '',
  '',
  [
    { name: 'HP', amount: 31 },
    { name: 'Attack', amount: 31 },
    { name: 'Defense', amount: 31 },
    { name: 'Special Attack', amount: 31 },
    { name: 'Special Defense', amount: 31 },
    { name: 'Speed', amount: 31 },
  ],
  [
    { name: 'HP', amount: 0 },
    { name: 'Attack', amount: 0 },
    { name: 'Defense', amount: 0 },
    { name: 'Special Attack', amount: 0 },
    { name: 'Special Defense', amount: 0 },
    { name: 'Speed', amount: 0 },
  ],
  0,
  ['', '', '', '']
);

const team = ref([blankPokemon(), blankPokemon(), blankPokemon(), blankPokemon(), blankPokemon(), blankPokemon()]);
const teamName = ref('');

const selectedPokemonIndex = ref<number | null>(null);

// Función para calcular el total de EVs de un Pokémon y poner topes a los sliders
function calculateRemainingEVs(currentEV: number, pokemon: TeamPokemon) {
  const remainingEVs = 510 - (pokemon.evTotal - currentEV);
  return Math.min(remainingEVs, 252); // El máximo permitido por stat es 252
}

function updateEVTotal(pokemon: TeamPokemon) {
  console.log('Valores de EV:', pokemon.ev.map(stat => stat.amount));
  pokemon.evTotal = Number(pokemon.ev[0].amount) + Number(pokemon.ev[1].amount) + Number(pokemon.ev[2].amount) + Number(pokemon.ev[3].amount) + Number(pokemon.ev[4].amount) + Number(pokemon.ev[5].amount);
  console.log('Total de EVs:', pokemon.evTotal);
}

// Función para abrir el modal de selección de Pokémon
async function openModal(index: number) {
  selectedPokemonIndex.value = index;

  const modal = await modalController.create({ component: SelectPokemonModal });

  modal.onDidDismiss().then(async ({ data, role }) => {
  console.log('Modal dismissed with data:', data);
  if (role === 'select' && data && selectedPokemonIndex.value !== null) {
    try {
      const selectedSpecies = await dataController.getPokemon(data) as PokemonInterface;
      console.log('Pokemon seleccionado:', selectedSpecies.name);

      if (selectedSpecies) {
        team.value[selectedPokemonIndex.value].species = selectedSpecies;
        team.value[selectedPokemonIndex.value].name = dataController.formatText(selectedSpecies.name);
        team.value[selectedPokemonIndex.value].ability = selectedSpecies.abilities[0];
        team.value[selectedPokemonIndex.value].nature = dataController.natureArray[0].name;
        team.value[selectedPokemonIndex.value].moves[0] = selectedSpecies.moves[0];
        team.value[selectedPokemonIndex.value].moves[1] = selectedSpecies.moves[1];
        team.value[selectedPokemonIndex.value].moves[2] = selectedSpecies.moves[2];
        team.value[selectedPokemonIndex.value].moves[3] = selectedSpecies.moves[3];
        team.value[selectedPokemonIndex.value].iv[0].amount = 31;
        team.value[selectedPokemonIndex.value].iv[1].amount = 31;
        team.value[selectedPokemonIndex.value].iv[2].amount = 31;
        team.value[selectedPokemonIndex.value].iv[3].amount = 31;
        team.value[selectedPokemonIndex.value].iv[4].amount = 31;
        team.value[selectedPokemonIndex.value].iv[5].amount = 31;
      }
    } catch (error) {
      console.error('Error al obtener el Pokémon seleccionado:', error);
    }
    }
    selectedPokemonIndex.value = null;
  });

  await modal.present();
}

// Función para guardar el equipo en MongoDB
async function saveTeam() {
  if (!teamName.value) {
    alert('Por favor, ingresa un nombre para el equipo.');
    return;
  }

  const newTeam = {
    name: teamName.value,
    format: "1",
    rating: 1,
    pokemon: JSON.parse(JSON.stringify(team.value)),
  };

  console.log("Datos enviados al backend:", newTeam);

  //enviar datos al backend con axios
  try {
    const response = await axios.post<{ insertedId: string }>('http://localhost:3000/api/teams', newTeam, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    alert(`Equipo guardado correctamente con ID: ${response.data.insertedId}`);
  } catch (error) {
    console.error("Error al guardar el equipo:", error);
    alert("Hubo un error al guardar el equipo. Por favor, inténtalo de nuevo.");
  }
}

// Función para reiniciar el equipo
function resetPokemons() {
  team.value = [blankPokemon(), blankPokemon(), blankPokemon(), blankPokemon(), blankPokemon(), blankPokemon()];
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

.stat-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  gap: 10px; /* Espaciado entre los subapartados */
}

.stat-subsection {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-slider {
  width: 100%; /* Ajustar el slider al ancho del contenedor */
}

.stat-value {
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>