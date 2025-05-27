import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: () => {
      const session = sessionStorage.getItem('session');
      return session ? '/profile' : '/login';
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      const session = sessionStorage.getItem('session');
      if (session) {
        next('/profile');
      } else {
        next();
      }
    },
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
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/teamBuilder',
    name: 'TeamBUilder',
    component: () => import('@/views/TeamBuilder.vue')
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('@/views/Stats.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/forumGeneral',
    name: 'forumGeneral',
    component: () => import('@/views/ForumGeneral.vue')
  },
  {
    path: '/forumAyuda',
    name: 'ForumAyuda',
    component: () => import('@/views/ForumAyuda.vue')
  },
  {
    path: '/forumTorneos',
    name: 'forumTorneos',
    component: () => import('@/views/ForumTorneos.vue')
  },
  {
    path: '/forumSpinoff',
    name: 'forumSpinoff',
    component: () => import('@/views/ForumSpinoff.vue')
  },
  {
    path: '/forumOfftopic',
    name: 'forumOfftopic',
    component: () => import('@/views/ForumOfftopic.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/views/Post.vue')
  }, 
  {
    path: '/newPost',
    name: 'newPost',
    component: () => import('@/views/NewPost.vue')
  },
  {
    path: '/torneoBracket',
    name: 'TorneoBracket',
    component: () => import('@/views/TorneoBracket.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router