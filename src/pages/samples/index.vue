<template>
  <div class="sample-container">
    <h1 class="title">
      sample components
    </h1>
    <p class="sample__text">
      Here are some of the reuseable components written in vuejs. More to come...
    </p>
    <div class="sample__boxes">
      <div
        v-for="(sample, index) in samples"
        :key="index"
        class="sample__box"
      >
        <h3 class="sample__box-heading">
          <router-link :to="sample.url">
            {{ sample.name }}
          </router-link>
        </h3>
        <router-link v-if="sample.image" :to="sample.url">
          <img :src="`${sample.image}`">
        </router-link>
      </div>
    </div>
    <div class="sample__more-to-come">
      <h4>more coming soon...</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Samples',
  components: {},
  data () {
    return {
      mountains: [],
      samples: [
        {
          name: 'Hero',
          url: '/samples/hero',
          image: 'https://sirkitts.github.io/resume/images/hero.png'
        },
        {
          name: 'Slideshow',
          url: '/samples/slideshow',
          image: 'https://sirkitts.github.io/resume/images/slideshow.png'
        },
        {
          name: 'Clock',
          url: '/samples/clock',
          image: 'https://sirkitts.github.io/resume/images/clock.png'
        },
        {
          name: 'Carousel',
          url: '/samples/carousel',
          image: 'https://source.unsplash.com/1600x900/daily?carousel'
        }
      ]
    }
  }
}
</script>

<style>
.sample-container {
  margin: 0 auto;
  min-height: 80vh;
  width: 80%;
}

.title {
  margin: 2rem auto;
  width: 100%;
  text-transform: capitalize;
}

.sample__boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-content: center;
  grid-gap: 0.4rem;
}

.sample__box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: auto;
  height: auto;
  cursor: pointer;
  border-radius: 0.4rem;
  border: 1px solid gray;
}

.sample__box a,
.sample__box a:link,
.sample__box a:active {
  color: #000;
  outline: none;
  text-decoration: none;
}

.sample__box-heading {
  padding: 0 1rem;
}

.sample__box img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.sample__text,
.sample__more-to-come {
  display: grid;
  margin: 1rem 0;
}

@media only screen and (max-width: 56.25em) {
  .sample__boxes {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
