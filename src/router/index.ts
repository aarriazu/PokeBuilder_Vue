import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/components/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/login'
  },
  {
    path: '/home/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'login',
      },
      {
        path: 'login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'forum',
        component: () => import('@/views/Forum.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
