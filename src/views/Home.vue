<template>
  <main class="main-container">
    <Reserve />
  </main>
</template>

<script>
const Reserve = () => import(
  /* webpackChunkName: "login-component" */ '@/views/Reserve.vue'
);

export default {
  name: 'home',
  components: {
    Reserve
  }
}
</script>
