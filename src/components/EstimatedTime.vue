<template>
  <section>
    <p>Estimated time to be served: {{ remainingTime }}</p>
  </section>
</template>

<script>
// import { POLLING_TIME } from '@/helpers/constants';

export default {
  name: 'estimatedtime',
  props: {
    apptdatetime: String,
    status: [Number, String]
  },
  data: () => ({
    etime: '',
    currentTime: '',
    estimatedTime: '',
    remainingTime: ''
  }),
  methods: {
    estimate() {
      this.currentTime = new Date(new Date().getTime())
      const dt = (this.estimatedTime.getTime() - this.currentTime.getTime()) / 1000
      const [hour, mins] = (dt / (60 * 60)).toString().split(".")
      const minutes = Math.ceil(mins * 60)
      let hrsStr = (hour > 0) ? hour + ' hr(s) ' : ''
      let minStr = (minutes > 0) ? minutes.toString().substring(0,2) + ' min(s) ' : ''
      this.remainingTime = hrsStr + minStr
    }
  },
  mounted () {
    this.estimatedTime = new Date(this.apptdatetime)
    this.currentTime = new Date(new Date().getTime())
    this.estimate()
    // this.etime = setInterval(this.estimate, POLLING_TIME)
  },
  beforeDestroy () {
    // clearInterval(this.etime);
  }
}
</script>

<style scoped>
</style>
