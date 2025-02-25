import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/components/Tabs.vue'

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
    path: '/forumGuest',
    name: 'ForumGuest',
    component: () => import('@/views/ForumGuest.vue')
  },
  {
    path: '/postGuest',
    name: 'PostTestGuest',
    component: () => import('@/views/PostGuest.vue')
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
        path: 'forum',
        component: () => import('@/views/Forum.vue')
      },
      {
        path: 'post',
        component: () => import('@/views/Post.vue')
      }  
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
