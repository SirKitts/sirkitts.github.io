import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/index.vue'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About-components" */ '@/pages/about.vue')
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import(/* webpackChunkName: "Work-components" */ '@/pages/work.vue')
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import(/* webpackChunkName: "Skills-components" */ '@/pages/skills.vue')
  },
  {
    path: '/samples',
    name: 'Samples',
    component: () => import(/* webpackChunkName: "Samples-components" */ '@/pages/samples/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
