<template>
  <Hero :hero="hero" />
</template>

<script>
const Hero = () => import(
  /* webpackChunkName: "hero-component" */ '@/components/Hero'
);

export default {
  name: 'HeroSample',
  components: {
    Hero
  },
  layout: 'sample',
  data () {
    return {
      hero: {
        img: 'https://source.unsplash.com/weekly?water',
        poster: 'https://source.unsplash.com/weekly?water',
        mp4:
          'https://hexsoftstudio.github.io/demo/video/170216A_142_WomanWatchingWaterfall2_1080p.mp4',
        webm:
          'https://hexsoftstudio.github.io/demo/video/170216A_142_WomanWatchingWaterfall2_1080p.webm',
        detail: {
          title: 'Waterfall',
          kicker: {
            link:
              'https://www.videvo.net/video/panning-around-woman-watching-waterfall/5919/',
            text: 'Original video by kiril-videvo'
          },
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sed a optio expedita vero labore?',
          button: {
            text: 'Read More'
          }
        }
      }
    }
  }
}
</script>

<style>
</style>
