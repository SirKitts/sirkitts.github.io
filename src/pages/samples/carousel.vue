<template>
  <div class="work-container">
    <div class="arrow">
      <router-link to="/samples">
        <i class="fas fa-arrow-circle-left fa-2x" style="color: white;" />
      </router-link>
    </div>
    <div class="work__projects">
      <Carousel title="Latest News" :items="projects" />
      <Carousel title="Featured Products" :items="projects" />
      <ImageCredit />
    </div>
  </div>
</template>

<script>
const Carousel = () => import(
  /* webpackChunkName: "carousel-component" */ '@/components/Carousel'
);

const ImageCredit = () => import(
  /* webpackChunkName: "image-credit-component" */ '@/components/ImageCredit.vue'
);

export default {
  name: 'CarouselSample',
  components: {
    Carousel,
    ImageCredit
  },
  layout: 'sample',
  data () {
    return {
      projects: [
        {
          year: '2020',
          keyProjects: [
            'Maintenance and support of Stats API',
            'Integration of Video transferring from XSquare'
          ],
          technologies: 'XSquare, Java, Groovy, Springboot, MSSQL'
        },
        {
          year: '2020-2019',
          keyProjects: [
            'Ads Admin tool (E-commerce tools)',
            'Video Playlist Monitoring tool'
          ],
          technologies: 'Vue.js, Vuematerial, React'
        },
        {
          year: '2019-2018',
          keyProjects: [
            'Video Admin tool (DVP)'
          ],
          technologies: 'Vue.js, Vuematerial'
        },
        {
          year: '2019-2016',
          keyProjects: [
            'Integrate small widgets & components for BAU'
          ],
          technologies: 'React, WordPress'
        },
        {
          year: '2016',
          keyProjects: [
            'Recreated Fox Sports Website'
          ],
          technologies: 'WordPress, Php, Twig'
        },
        {
          year: '2011',
          keyProjects: [
            'Recreated Fox Sports Website'
          ],
          technologies: 'Fatwire, Java, Jsp'
        },
        {
          year: '2006',
          keyProjects: [
            'Created Fox Sports Website from scratch'
          ],
          technologies: 'Vignette, Tcl'
        }
      ]
    }
  }
}
</script>

<style>
</style>
