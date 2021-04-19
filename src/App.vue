<template>
  <div>
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
const Header = () => import(
  /* webpackChunkName: "header-component" */ '@/components/Header'
);

const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer'
);

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
}
</script>

<style lang="scss">
  @import "@/assets/sass/main.scss";
</style>
