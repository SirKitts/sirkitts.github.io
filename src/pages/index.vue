<template>
  <div class="index">
    <div class="index-container">
      <h1 class="title" style="color: white;">
        &nbsp;
      </h1>
      <button class="btn work__buttons-btn">
        <router-link to="/about">
          View my profile
        </router-link>
      </button>
      <div class="index-text">
        <span class="index-text__heading">I'm a {{ iam[ item ] }}.</span>
      </div>
      <div class="index-text">
        <span class="index-text__subheading">{{ skills[ desc ] }}</span>
        <Clock class="index-text" />
      </div>
      <ImageCredit />
    </div>
  </div>
</template>

<script>
const Clock = () => import(
  /* webpackChunkName: "clock-component" */ '@/components/Clock'
);

const ImageCredit = () => import(
  /* webpackChunkName: "image-credit-component" */ '@/components/ImageCredit.vue'
);

export default {
  name: 'Index',
  components: {
    Clock,
    ImageCredit
  },
  data () {
    return {
      iam: [
        'Software engineer',
        'Frontend developer',
        'Web apps developer'
      ],
      skills: [
        'I specialise in website analysis, design and development',
        'I have experience with both frontend and backend technologies',
        'I\'m able to design wireframes for UI',
        'I coordinate effectively with team players',
        'I mentor co-developers and/or assist testers in functional testing',
        'I practice agile and follow software development life cycle'
      ],
      item: 0,
      desc: 0,
      jobTimer: '',
      descTimer: ''
    }
  },
  created () {
    this.jobTimer = setInterval(this.updateJob, 2000)
    this.descTimer = setInterval(this.updateDesc, 5000)
  },
  destroyed () {
    clearInterval(this.jobTimer)
    clearInterval(this.descTimer)
  },
  methods: {
    updateJob () {
      this.item = Math.floor(Math.random() * 3)
    },
    updateDesc () {
      (this.desc >= 5) ? this.desc = 0 : this.desc += 1
    }
  }
}
</script>

<style>
.index {
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

.index-container {
    margin: 0 auto;
    min-height: 80vh;
    width: 80%;
}

.index-text {
    display: grid;
    justify-content: center;
    align-content: center;

    margin: auto;
    /* min-height: 40vh; */
    width: 100%;
    color: white;
}

.index-text__heading {
    font-size: 4rem;
    font-weight: 900;
}

.index-text__subheading {
    font-size: 1rem;
    font-weight: 600;
}

.title {
    margin: 2rem auto;
    width: 100%;
    text-transform: capitalize;
}

.image-credit {
    position: absolute;
    bottom: 5.8rem;
    right: -3.2rem;
    margin: 2rem auto;
    transform: rotate(270deg);
    background-color: transparent;
}

.image-credit a {
    text-decoration: none;
    outline: none;
}

</style>
