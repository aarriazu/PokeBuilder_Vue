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
        </div>
        <ion-button router-link="/home/profile">Atras</ion-button>

        <ion-grid class="container">
          <ion-row>
            <ion-col size="12" size-md="6">
              <h2>Pokemon mas usados</h2>
              <canvas id="myChart"></canvas>
            </ion-col>

            <ion-col size="12" size-md="6">
              <h2>Pokemon favoritos</h2>
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide"><img src="/src/assets/images/pokemon/flareon.png" alt="Pokemon 1"></div>
                  <div class="swiper-slide"><img src="/src/assets/images/pokemon/vaporeon.png" alt="Pokemon 2"></div>
                  <div class="swiper-slide"><img src="/src/assets/images/pokemon/jolteon.png" alt="Pokemon 3"></div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
        <br>
        <br>
        <br>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import Chart from 'chart.js/auto';

onMounted(() => {

  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Flareon', 'Vaporeon', 'Jolteon', 'Espeon', 'Umbreon', 'Eevee'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1, 
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
});
</script>

<style scoped>
.swiper-container {
  width: 60%; 
  height: auto; 
  margin: auto; 
  overflow: 'hidden';
}

.swiper-wrapper {
  overflow: 'hidden';
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: auto;
}
</style>