<template>
  <div class="carousel-container">
    <h1>{{ title }}</h1>
    <div class="carousel-grid">
      <a class="carousel-btn--prev" @click="prevSlides()">
        <span class="carousel-images__btn">&#10094;</span>
      </a>
      <div
        id="carousel-images"
        class="carousel-images no-scrollbar"
      >
        <div
          v-for="(project, index) in items"
          :key="index"
          class="carousel-item"
        >
          <h4 class="carousel-item__heading">
            {{ project.year }}
          </h4>
          <img
            :id="setId(index)"
            :src="getImage(images[index])"
            :alt="images[index]"
            class="carousel-item__image"
          >
          <div class="carousel-item__text">
            <p
              v-for="(proj, idx) in project.keyProjects"
              :key="idx"
            >
              {{ proj }}
            </p>
          </div>
          <p class="carousel-item__footer">
            Tech: {{ project.technologies }}
          </p>
        </div>
      </div>
      <a class="carousel-btn--next" @click="nextSlides()">
        <span class="carousel-images__btn">&#10095;</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      images: [
        'nature', 'water', 'earth', 'wind', 'air', 'fire', 'space', 'galaxy', 'universe', 'people'
      ]
    }
  },
  methods: {
    getImage (image) {
      return `https://source.unsplash.com/daily?${image}`
    },
    setId (id) {
      return `myImg${id}`
    },
    prevSlides () {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      document.getElementById('carousel-images').scrollLeft -= width
    },
    nextSlides () {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      document.getElementById('carousel-images').scrollLeft += width
    }
  }
}
</script>

<style>
</style>
