<template>
  <div class="resume">
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

.resume {
  display: grid;
  grid-template: 10vh 80vh 10vh;
}

.container {
  margin: 0 auto;
  min-height: 80vh;
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
