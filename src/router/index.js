import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/index.vue'
import About from '@/pages/about.vue'
import Work from '@/pages/work.vue'
import Skills from '@/pages/skills.vue'
import Sample from '@/pages/samples/index.vue'

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
    component: () => import(/* webpackChunkName: "About-components" */ About)
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import(/* webpackChunkName: "Work-components" */ Work)
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import(/* webpackChunkName: "Skills-components" */ Skills)
  },
  {
    path: '/samples',
    name: 'Samples',
    component: () => import(/* webpackChunkName: "Samples-components" */ Sample)
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
