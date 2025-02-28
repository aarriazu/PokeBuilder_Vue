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
            <ion-button router-link="/home/profile">
              Guardar
            </ion-button>
            <ion-button router-link="/home/profile">
              Volver
            </ion-button>
          </div>
        </div>

          <ion-grid class="custom-grid">
            <ion-row>
              <ion-col size="1">

              </ion-col>
              <ion-col size="2">
                <div>
                  <ion-button color="light" size="large" class="addPokemonButton" @click="showActionSheet()">
                    Selecciona Pokemon
                  </ion-button>
                  <div v-html="pokemon1"></div>
                </div>
              </ion-col> 
              <ion-col size="2">
                <div>
                  <ion-button color="light" size="large" class="addPokemonButton" >
                    Selecciona Pokemon
                  </ion-button>
                  <div v-html="pokemon2"></div>
                </div>
              </ion-col>
              <ion-col size="2">
                <div>
                  <ion-button color="light" size="large" class="addPokemonButton">
                    Selecciona Pokemon
                  </ion-button>
                  <div v-html="pokemon3"></div>
                </div>
              </ion-col>
              <ion-col size="2">
                <div>
                  <ion-button color="light" size="large" class="addPokemonButton">
                    Selecciona Pokemon
                  </ion-button>
                  <div v-html="pokemon4"></div>
                </div>
              </ion-col>
              <ion-col size="2">
                <div>
                  <ion-button color="light" size="large" class="addPokemonButton">
                    Selecciona Pokemon
                  </ion-button>
                  <div v-html="pokemon5"></div>
                </div>
              </ion-col>    
              <ion-col size="2">
                <div>
                  <ion-button color="light" size="large" class="addPokemonButton">
                    Selecciona Pokemon
                  </ion-button>
                  <div v-html="pokemon6"></div>
                </div>
              </ion-col>  
              <ion-col size="1">

              </ion-col>        
            </ion-row>
          </ion-grid>

          <ion-action-sheet
            :is-open="actionSheet"
            @did-dismiss="actionSheet = false"
            header="Selecciona Pokemon"
            :buttons="actionSheetButtons">
          </ion-action-sheet>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  
<script setup lang="ts">
  import { Ref, ref } from 'vue';
  import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonActionSheet  } from '@ionic/vue';

  const pokemon1 = ref('');
  const pokemon2 = ref('');
  const pokemon3 = ref('');
  const pokemon4 = ref('');
  const pokemon5 = ref('');
  const pokemon6 = ref('');

  const chosenPokemon = ref('');

  let pokemonStats:string = "";                 

  const actionSheet = ref(false);

  function showActionSheet() {
    actionSheet.value = true;
  }

  function updatePokemonStats(){
    pokemonStats = "<img src=\"/src/assets/images/pokemon/" + chosenPokemon.value + ".png\" alt=\"" + chosenPokemon.value + "\">" +
                              "<p>Objeto</p>" +
                              "<input type=\"text\" id=\"pokemon1Item\" name=\"pokemon1Item\" class=\"textBox\">" +
                              "<p>Habilidad</p>" +
                              "<input type=\"text\" id=\"pokemon1Ability\" name=\"pokemon1Ability\" class=\"textBox\">" +
                              "<p>Naturaleza</p>" +
                              "<input type=\"text\" id=\"pokemon1Nature\" name=\"pokemon1Nature\" class=\"textBox\">" +
                              "<p>Movimientos</p>" +
                              "<input type=\"text\" id=\"pokemon1Move1\" name=\"pokemon1Move1\" class=\"textBox\">" +
                              "<input type=\"text\" id=\"pokemon1Move2\" name=\"pokemon1Move2\" class=\"textBox\">" +
                              "<input type=\"text\" id=\"pokemon1Move3\" name=\"pokemon1Move3\" class=\"textBox\">" +
                              "<input type=\"text\" id=\"pokemon1Move4\" name=\"pokemon1Move4\" class=\"textBox\">";
  }

  function updatePokemon(pokemon:Ref<string, string>){
    updatePokemonStats();
    pokemon.value = pokemonStats;  
  }

  const actionSheetButtons = [
  {
    text: 'Eevee',
    handler: () => {
      chosenPokemon.value = 'eevee';
      updatePokemon(pokemon1);  
    }
  },
  {
    text: 'Flareon',
    handler: () => {
      chosenPokemon.value = 'flareon';
      updatePokemonStats();
      pokemon1.value = pokemonStats;    
    }
  },
  {
    text: 'Vaporeon',
    handler: () => {
      chosenPokemon.value = 'vaporeon';
      updatePokemonStats();
      pokemon1.value = pokemonStats;    
    }
  },
  {
    text: 'Jolteon',
    handler: () => {
      chosenPokemon.value = 'jolteon';
      updatePokemonStats();
      pokemon1.value = pokemonStats;    
    }
  },
  {
    text: 'Espeon',
    handler: () => {
      chosenPokemon.value = 'espeon';
      updatePokemonStats();
      pokemon1.value = pokemonStats;    
    }
  },
  {
    text: 'Umbreon',
    handler: () => {
      chosenPokemon.value = 'umbreon';
      updatePokemonStats();
      pokemon1.value = pokemonStats;    
    }
  },
  {
    text: 'Cancelar',
    handler: () => {
      pokemon1.value = '';
      actionSheet.value = false;
    },
    //role: 'cancel'
  }
];
</script>
  
  
<style scoped>

.custom-grid {
  --ion-grid-columns: 14;
}

</style>