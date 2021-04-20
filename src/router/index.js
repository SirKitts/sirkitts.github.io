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
  {
    path: '/samples/hero',
    name: 'SamplesHero',
    component: () => import(/* webpackChunkName: "Samples-Hero-components" */ '@/pages/samples/hero.vue')
  },
  {
    path: '/samples/carousel',
    name: 'SamplesCarousel',
    component: () => import(/* webpackChunkName: "Samples-Carousel-components" */ '@/pages/samples/carousel.vue')
  },
  {
    path: '/samples/clock',
    name: 'SamplesClock',
    component: () => import(/* webpackChunkName: "Samples-Clock-components" */ '@/pages/samples/clock.vue')
  },
  {
    path: '/samples/slideshow',
    name: 'SamplesSlideshow',
    component: () => import(/* webpackChunkName: "Samples-Slideshow-components" */ '@/pages/samples/slideshow.vue')
  },
  {
    path: '/samples/multi-form',
    name: 'SamplesMultiForm',
    component: () => import(/* webpackChunkName: "Samples-MultiForm-components" */ '@/pages/samples/multiform.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
