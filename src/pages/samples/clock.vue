<template>
  <div class="clock-container">
    <div class="arrow">
      <NuxtLink to="/samples">
        <i class="fas fa-arrow-circle-left fa-2x" style="color: white;" />
      </NuxtLink>
    </div>
    <div class="clock">
      <Clock />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockSample',
  components: {},
  layout: 'sample',
  data () {
    return {}
  }
}
</script>

<style>
.clock-container {
  display: grid;
  background:
    linear-gradient(
        to left top,
        rgba(8, 5, 184, 0.25),
        rgba(31, 49, 207, 0.25)
    ),
    url('https://source.unsplash.com/1600x900/daily?nature')
    no-repeat center center / cover;
}

.arrow {
  display: grid;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
}

.clock {
  display: grid;
  margin: auto;
  position: absolute;
  bottom: 3rem;
  right: 1rem;
  z-index: 1;
}

.clock .time {
  font-size: 6rem;
  color: white;
}

@media only screen and (max-width: 56.25em) {
  .clock .time {
    font-size: 5rem;
  }
}
</style>
