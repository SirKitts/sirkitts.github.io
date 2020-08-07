<template>
  <section>
    <p><b>{{ remainingTime }}</b> {{ message }}</p>
  </section>
</template>

<script>
import { POLLING_TIME } from '@/helpers/constants';

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
    remainingTime: '',
    message: ''
  }),
  methods: {
    estimate() {
      this.currentTime = new Date(new Date().getTime())
      const dt = (this.estimatedTime.getTime() - this.currentTime.getTime()) / 1000
      let hrsStr = ''
      let minStr = ''
      if (dt > 0) {
        const [hour, mins] = (dt / (60 * 60)).toString().split(".")
        const minutes = Math.ceil((mins / 100) * 60)
        hrsStr = (hour > 0) ? hour + ' hr(s) ' : ''
        minStr = (minutes > 0) ? minutes.toString().substring(0,2) + ' min(s) ' : ''
      }
      this.message = (dt > 0 ) ? 'to be served/helped: ' : ''
      const ovrtime = 'Are you being served/helped?'
      this.remainingTime = (dt > 0 ) ? hrsStr + minStr : ovrtime
    }
  },
  mounted () {
    this.estimatedTime = new Date(new Date(this.apptdatetime).getTime())
    this.estimate()
    this.etime = setInterval(this.estimate, POLLING_TIME)
  },
  beforeDestroy () {
    clearInterval(this.etime);
  }
}
</script>

<style scoped>
</style>
