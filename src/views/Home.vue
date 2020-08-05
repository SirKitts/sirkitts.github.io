<template>
  <main class="main-container">
    <Login />
  </main>
</template>

<script>
const Login = () => import(
  /* webpackChunkName: "login-component" */ '@/views/Login.vue'
);

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>

<style scoped>

</style>
