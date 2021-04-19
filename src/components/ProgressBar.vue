<template>
  <div class="progress-bar" :class="{ 'progress-bar--with-text': issidetext }">
    <div class="progress-bar__left">
      {{ ltext }}
    </div>
    <div class="progress-bar__bar">
      <div
        class="progress-bar__bar--width"
        :style="styleObject"
      />
    </div>
    <div class="progress-bar__right">
      {{ rtext }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    ltext: {
      type: [String, Number],
      required: false,
      default: ''
    },
    barwidth: {
      type: String,
      required: false,
      default: '0'
    },
    barcolor: {
      type: String,
      required: false,
      default: '#316ba3'
    },
    rtext: {
      type: [String, Number],
      required: false,
      default: ''
    },
    issidetext: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      styleObject: {
        '--progress-bar-width': this.barwidth,
        '--progress-bar-color': this.barcolor,
        width: 'var(--progress-bar-width)',
        backgroundColor: 'var(--progress-bar-color)'
      }
    }
  }
}
</script>
