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
    path: '/forumGuestGeneral',
    name: 'ForumGuestGeneral',
    component: () => import('@/views/ForumGuestGeneral.vue')
  },
  {
    path: '/postGuest',
    name: 'PostGuest',
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
        path: 'post',
        component: () => import('@/views/Post.vue')
      }, 
      {
        path: 'newPost',
        component: () => import('@/views/NewPost.vue')
      }, 
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
