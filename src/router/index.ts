import { authentication } from '@/stores/authentication';
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
    },
    {
      path: '/cadastrarItem',
      name: 'cadastrarItem',
      component: () => import('../views/CadastrarItem.vue')
    },
    {
      path: '/listarItem',
      name: 'listarItem',
      component: () => import('../views/ListarItem.vue')
    },
    {
      path: '/telaInicial',
      name: 'telaInicial',
      component: () => import('../views/TelaInicial.vue')
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: () => import('../views/Relatorios.vue')
    },
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/faleConosco', '/projeto'];
  const authRequired = !publicPages.includes(to.path)

  const auth = authentication();

  // Se necessitar de autenticação, faça isso.
  if (authRequired && !auth.token) {
    return '/login';
  }

  if (to.path == '/') {
    router.push("/login")
  }

})

export default router
