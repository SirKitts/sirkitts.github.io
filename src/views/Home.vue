<template>
  <section style="max-width:500px;margin:auto">
    <center>
      <img :src="logo" width="200" height="200"/>
    </center>

    <button type="submit" class="btn" @click.prevent="login">My Reservation</button>
    <div class="input-container">
    </div>
    <button type="submit" class="btn" @click.prevent="makeReservation">Make Reservation</button>
    
    <Footer />
  </section>
</template>

<script>
const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer.vue'
);

import { LOGO } from '@/helpers/constants'

export default {
  name: 'home',
  components: {
    Footer
  },
  data: () => ({
    logo: LOGO
  }),
  methods: {
    login () {
      this.$router.push('/login')
    },
    makeReservation () {
      this.$router.push('/make-reservation/')
    },
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
