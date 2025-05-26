import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/components/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: () => import('@/views/Pokedex.vue')
  },
  {
    path: '/pokedex/:name',
    name: 'PokedexDetail',
    component: () => import('@/views/PokemonStats.vue')
  },
  {
    path: '/home/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/home/profile',
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'teamBuilder',
        component: () => import('@/views/TeamBuilder.vue')
      },
      {
        path: 'stats',
        component: () => import('@/views/Stats.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings.vue')
      },
      {
        path: 'forumGeneral',
        component: () => import('@/views/ForumGeneral.vue')
      },
      {
        path: 'forumAyuda',
        component: () => import('@/views/ForumAyuda.vue')
      },
      {
        path: 'forumTorneos',
        component: () => import('@/views/ForumTorneos.vue')
      },
      {
        path: 'forumSpinoff',
        component: () => import('@/views/ForumSpinoff.vue')
      },
      {
        path: 'forumOfftopic',
        component: () => import('@/views/ForumOfftopic.vue')
      },
      {
        path: 'post/:id',
        component: () => import('@/views/Post.vue')
      },
      {
        path: 'newPost',
        component: () => import('@/views/NewPost.vue')
      },
      {
        path: 'torneoBracket',
        component: () => import('@/views/TorneoBracket.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;