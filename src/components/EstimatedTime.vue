<template>
  <section>
    <p>{{ remainingTime }}</p>
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
    remainingTime: ''
  }),
  methods: {
    estimate() {
      this.currentTime = new Date(new Date().getTime())
      // console.log('this.currentTime', this.currentTime)
      const dt = (this.estimatedTime.getTime() - this.currentTime.getTime()) / 1000
      let hrsStr = ''
      let minStr = ''
      console.log('dt', dt)
      if (dt > 0) {
        const [hour, mins] = (dt / (60 * 60)).toString().split(".")
        const minutes = Math.ceil((mins / 100) * 60)
        console.log('hour', hour)
        console.log('mins', mins)
        hrsStr = (hour > 0) ? hour + ' hr(s) ' : ''
        minStr = (minutes > 0) ? minutes.toString().substring(0,2) + ' min(s) ' : ''
      }
      const hdng = 'Estimated time to be served/helped: '
      const ovrtime = 'Are you being served/helped?'
      this.remainingTime = (dt < 0 ) ? ovrtime : hdng + hrsStr + minStr
    }
  },
  mounted () {
    this.estimatedTime = new Date(new Date(this.apptdatetime).getTime())
    // console.log('this.estimatedTime', this.estimatedTime)
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
