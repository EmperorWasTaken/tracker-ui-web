import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/general/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/general/About.vue')
    },
    {
      path: '/gym',
      name: 'gym',

      component: () => import('../views/gym/Gym.vue')
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/recipes/Recipes.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/Settings.vue')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/user/User.vue')
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: () => import('../views/tracker/Tracker.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/user/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/user/Login.vue')
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../views/user/Logout.vue')
    },
  ]
})

export default router
