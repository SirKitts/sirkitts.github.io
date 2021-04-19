<template>
  <section class="slideshow">
    <div class="slides-grid">
      <a
        class="slideshow__btn--prev"
        @click="prevSlides()"
      >
        &#10094;
      </a>
      <div class="slideshow__container">
        <div
          v-for="(slides, index) in slideshow"
          :key="index"
          class="slideshow__image"
          :style="{ 'background-image': 'url(' + slides.image + ')' }"
        >
          <div class="slideshow__text">
            <p style="color: white;">
              <router-link to="/samples">
                <i class="fas fa-arrow-circle-left fa-2x" style="color: aqua;" />
              </router-link>
              {{ index+1 }}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit atque omnis ex magni ea non praesentium, laboriosam mollitia fuga, debitis officia velit fugiat odit accusamus natus perspiciatis provident itaque cumque.
              <a href="https://source.unsplash.com/" style="color: aqua; font-size: small">Image by Usplash.com</a>
            </p>
          </div>
        </div>
      </div>
      <a
        class="slideshow__btn--next"
        @click="nextSlides()"
      >
        &#10095;
      </a>
    </div>
    <div class="slideshow__dot-container">
      <span
        v-for="(slides, index) in slideshow"
        :key="index"
        class="slideshow__dot"
        @click="selectedSlides(index+1)"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Slideshow',
  props: {
    slideshow: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      curSlides: 1,
      // v-bind:style="styleBackgroundImage"
      styleBackgroundImage: {
        'background-image': 'url("https://source.unsplash.com/daily?water")'
      }
    }
  },
  created () {
    this.showSlides(this.curSlides)
  },
  methods: {
    nextSlides () {
      this.showSlides(++this.curSlides)
    },
    prevSlides () {
      this.showSlides(--this.curSlides)
    },
    selectedSlides (num) {
      this.showSlides(this.curSlides = num)
    },
    setCurrentSlides (num, slides) {
      if (num > slides.length) {
        this.curSlides = 1
      }
      if (num < 1) {
        this.curSlides = slides.length
      }
    },
    initSlides (num) {
      const slides = document.getElementsByClassName('slideshow__image')
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
      }
      this.setCurrentSlides(num, slides)
      slides[this.curSlides - 1].style.display = 'block'
    },
    initDots () {
      const dots = document.getElementsByClassName('slideshow__dot')
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '')
      }
      dots[this.curSlides - 1].className += ' active'
    },
    showSlides (num) {
      this.initSlides(num)
      this.initDots()
    }
  }
}
</script>

<style>
</style>
