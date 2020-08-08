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
  watch: {
    remainingTime: function() {
      this.$emit('isUpdateTime', this.remainingTime);
    }
  },
  methods: {
    estimate() {
      this.currentTime = new Date(new Date().getTime())
      const dt = (this.estimatedTime.getTime() - this.currentTime.getTime()) / 1000
      let hrsStr = ''
      let minStr = ''
      this.remainingTime = ''
      this.message = ''
      if (dt > 0) {
        const hrsmins = (dt / (60 * 60))
        const hrsAndMinutes = hrsmins.toString().split(".")
        const hours = hrsAndMinutes[0]
        const minutes = Math.ceil((hrsmins - hours) * 59)
        hrsStr = (hours > 0) ? hours + ' hr(s) ' : ''
        minStr = (minutes > 0) ? minutes.toString().substring(0,2) + ' min(s) ' : ''
        this.message = 'to be served/helped'
        if (hours > 24) {
          const days= (hours / 24).toString().split(".")
          this.remainingTime = days[0] + ' day(s) '
        } else {
          this.remainingTime = hrsStr + minStr
        }
      } else {
        this.remainingTime = 'Are you being served/helped?'
      }
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
