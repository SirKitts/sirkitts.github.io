<template>
  <Slideshow :slideshow="slideshow" />
</template>

<script>
const Slideshow = () => import(
  /* webpackChunkName: "slideshow-component" */ '@/components/Slideshow'
);

export default {
  name: 'SlideshowSample',
  components: {
    Slideshow
  },
  layout: 'sample',
  data () {
    return {
      slideshow: [
        {
          image: 'https://source.unsplash.com/daily?water'
        },
        {
          image: 'https://source.unsplash.com/daily?nature'
        },
        {
          image: 'https://source.unsplash.com/daily?peope'
        },
        {
          image: 'https://source.unsplash.com/daily?cards'
        },
        {
          image: 'https://source.unsplash.com/daily?landscape'
        }
      ]
    }
  }
}
</script>

<style>
</style>
