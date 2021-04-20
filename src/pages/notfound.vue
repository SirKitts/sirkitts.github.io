<template>
  <div class="notfound">
    <div class="notfound-container">
      <div class="notfound-message">
        <span class="notfound-subheading">{{ route }}</span>
        <span class="notfound-heading">Not Found!</span>
      </div>
      <ImageCredit />
    </div>
  </div>
</template>

<script>
const ImageCredit = () => import(
  /* webpackChunkName: "image-credit-component" */ '@/components/ImageCredit.vue'
);

export default {
  name: 'NotFound',
  components: {
    ImageCredit
  },
  data () {
    return {
      route: ''
    }
  },
  created () {
    this.route = this.$route.path;
  }
}
</script>

<style>
.notfound {
    background:
        linear-gradient(
            to left top,
            rgba(8, 5, 184, 0.25),
            rgba(31, 49, 207, 0.25)
        ),
        url('https://source.unsplash.com/1600x900/daily?sand')
        no-repeat center center / cover;

    height: 80vh;
}

.notfound-container {
    min-height: 80vh;
    width: 80%;
}

.notfound-message {
    display: grid;
    justify-content: center;
    align-content: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    font-size: 2.5rem;
    text-transform: capitalize;
    color: white;
    width: 60vw;

    background-color: rgba(96, 96, 100, 0.25);
}

.notfound-heading {
    text-align: center;
}

.notfound-subheading {
    font-size: 1.5rem;
    text-align: center;
}

</style>
