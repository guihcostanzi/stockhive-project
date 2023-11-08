import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/faleConosco',
      name: 'faleConosco',
      component: () => import('../views/FaleConosco.vue')
    },
    {
      path: '/projeto',
      name: 'projeto',
      component: () => import('../views/Projeto.vue')
    }
  ]
})

export default router
