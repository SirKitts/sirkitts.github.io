<template>
  <div class="time">
    {{ time }}
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data: () => ({
    time: ''
  }),
  created () {
    this.timer = setInterval(this.updateTime, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    setAMPM (h) {
      return h >= 12 ? 'pm' : 'am'
    },
    addLeadingZero (num) {
      return (parseInt(num, 10) >= 10 ? '' : '0') + num
    },
    displayTime (hh, mm, ss) {
      const ampm = ' ' + this.setAMPM(hh)
      return (hh % 12 || 12) + ':' + this.addLeadingZero(mm) + ':' + this.addLeadingZero(ss) + ampm
    },
    updateTime () {
      const d = new Date()
      this.time = this.displayTime(d.getHours(), d.getMinutes(), d.getSeconds())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.time {
  font-size: 2rem;
}
</style>
