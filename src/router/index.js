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
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login-components" */ '@/views/Login.vue')
  },
  {
    path: '/make-reservation',
    name: 'MakeReservation',
    component: () => import(/* webpackChunkName: "makereservation-components" */ '@/views/MakeReservation.vue')
  },
  {
    path: '/my-reservation/:id',
    name: 'MyReservation',
    component: () => import(/* webpackChunkName: "myreservation-components" */ '@/views/MyReservation.vue')
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "admin-login-components" */ '@/admin/Login.vue')
  },
  {
    path: '/admin/reservations',
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
