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
    path: '/reserve',
    name: 'Reserve',
    component: () => import(/* webpackChunkName: "reserve-components" */ '@/views/Reserve.vue')
  },
  {
    path: '/my-reservation/:id',
    name: 'MyReservation',
    component: () => import(/* webpackChunkName: "myreservation-components" */ '@/views/MyReservation.vue')
  },
  {
    path: '/admin/reservations',
    name: 'AdminAppointments',
    component: () => import(/* webpackChunkName: "admin-appointments-components" */ '@/admin/Admin.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
