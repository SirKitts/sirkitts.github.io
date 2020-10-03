import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/my-reservation/:id',
    name: 'MyReservation',
    component: () => import(/* webpackChunkName: "myreservation-components" */ '@/views/MyReservation.vue')
  },
  {
    path: '/admin',
    name: 'AdminReservations',
    component: () => import(/* webpackChunkName: "admin-reservations-components" */ '@/admin/Admin.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
