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
    path: '/my-appointment/:id',
    name: 'MyAppointment',
    component: () => import(/* webpackChunkName: "myappointment-components" */ '@/views/MyAppointment.vue')
  },
  {
    path: '/make-an-appointment',
    name: 'MakeAnAppointment',
    component: () => import(/* webpackChunkName: "makeappointment-components" */ '@/views/MakeAnAppointment.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin-login-components" */ '@/admin/Login.vue')
  },
  {
    path: '/admin/appointments',
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
