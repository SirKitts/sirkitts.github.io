<template>
  <main class="main-container">
    <DesignImages />
    <Tutorials />
    <div class="samples">
      <a href="./samples">Business Card sample</a>
    </div>
  </main>
</template>

<script>
const DesignImages = () => import(
  /* webpackChunkName: "designimages-samples-component" */ '@/components/samples/DesignImages.vue'
);

const Tutorials = () => import(
  /* webpackChunkName: "tutorials-samples-component" */ '@/components/samples/Tutorials.vue'
);

export default {
  name: 'home',
  components: {
    DesignImages,
    Tutorials
  }
}
</script>

<style scoped>
.samples {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding-top: 50px;
}
</style>
