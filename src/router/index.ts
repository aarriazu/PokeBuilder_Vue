import { userState } from '@/controllers/stateController';
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
    sensitive: true,
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
    sensitive: true,
    component: () => import('@/views/Pokedex.vue')
  },
  {
    path: '/pokedex/:name',
    name: 'PokemonDetail',
    sensitive: true,
    component: () => import('@/views/PokemonDetail.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    beforeEnter: ((to, from, next) => {
      const session = sessionStorage.getItem('session');
      if (to.path === '/profile' && !session) {
        next('/login');
      } else {
        next();
      }
    }),
  },
  {
    path: '/teambuilder',
    name: 'TeamBuilder',
    sensitive: true,
    component: () => import('@/views/TeamBuilder.vue'),
    beforeEnter: ((to, from, next) => {
      const session = sessionStorage.getItem('session');
      if (to.path === '/teambuilder' && !session) {
        next('/login');
      } else {
        next();
      }
    }),
  },
  {
    path: '/settings',
    name: 'Settings',
    sensitive: true,
    component: () => import('@/views/Settings.vue'),
    beforeEnter: ((to, from, next) => {
      const session = sessionStorage.getItem('session');
      if (to.path === '/settings' && !session) {
        next('/login');
      } else {
        next();
      }
    }),
  },
  {
    path: '/forumGeneral',
    name: 'forumGeneral',
    sensitive: true,
    component: () => import('@/views/ForumGeneral.vue')
  },
  {
    path: '/forumAyuda',
    name: 'ForumAyuda',
    sensitive: true,
    component: () => import('@/views/ForumAyuda.vue')
  },
  {
    path: '/forumTorneos',
    name: 'forumTorneos',
    sensitive: true,
    component: () => import('@/views/ForumTorneos.vue')
  },
  {
    path: '/forumSpinoff',
    name: 'forumSpinoff',
    sensitive: true,
    component: () => import('@/views/ForumSpinoff.vue')
  },
  {
    path: '/forumOfftopic',
    name: 'forumOfftopic',
    sensitive: true,
    component: () => import('@/views/ForumOfftopic.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    sensitive: true,
    component: () => import('@/views/Post.vue')
  }, 
  {
    path: '/newPost',
    name: 'newPost',
    sensitive: true,
    beforeEnter: ((to, from, next) => {
      const session = sessionStorage.getItem('session');
      if (to.path === '/newPost' && !session) {
        next('/login');
      } else {
        next();
      }
    }),
    component: () => import('@/views/NewPost.vue')
  },
  {
    path: '/torneoBracket',
    name: 'TorneoBracket',
    sensitive: true,
    beforeEnter: ((to, from, next) => {
      const session = sessionStorage.getItem('session');
      if (to.path === '/torneoBracket' && !session) {
        next('/login');
      } else {
        next();
      }
    }),
    component: () => import('@/views/TorneoBracket.vue')
  },
  {
    path: '/forumTorneos/post/:id',
    name: 'PostTorneo',
    component: () => import('@/views/PostTorneo.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    sensitive: true,
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;