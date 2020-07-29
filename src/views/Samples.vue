<template>
  <main class="main-container">
    <BusinessCard />
  </main>
</template>

<script>
const BusinessCard = () => import(
  /* webpackChunkName: "businesscard-samples-component" */ '@/components/samples/businesscard/BusinessCard.vue'
);

export default {
  name: 'samples',
  components: {
    BusinessCard
  }
}
</script>

<style scoped>

</style>
