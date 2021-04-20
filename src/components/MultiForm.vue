<template>
  <div class="work__achievements">
    <h3>Step: {{ step + offset }}</h3>
    <div class="work__achievements-items">
      <div class="work__achievements-item">
        <div>
          <h4>
            {{ mform.achievement }}
          </h4>
          <p>
            {{ mform.description }}
          </p>
          <div v-if="mform.fields">
            <p>
              {{ step + offset }}.1 - Sample input form #1:
              <input type="text" v-model="mform.fields.name">
            </p>
            <p>
              {{ step + offset }}.2 - Sample input form #2:
              <input type="text" v-model="mform.fields.address">
            </p>
          </div>  
        </div>
        <i class="fas fa-award fa-2x work__achievements-icon" />
      </div>
    </div>
    <div class="work__achievements-buttons">
      <button
        @click="showPreviosAchievement()"
      >
        <i class="fas fa-arrow-circle-left arrow-color fa-2x" style="color: orange;" />
      </button>
      <button
        @click="showNextAchievement()"
      >
        <i class="fas fa-arrow-circle-right arrow-color fa-2x" style="color: orange;" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiForm',
  props: {
    achievements: {
      type: Array,
      required: false,
      default () {}
    }
  },
  data () {
    return {
      offset: 1,
      step: 1,
      mform: {}
    }
  },
  created () {
    this.mform = this.achievements[this.step]
  },
  methods: {
    showPreviosAchievement () {
      this.step--
      if (this.step < 0) {
        this.step = 0
      }
      this.mform = this.achievements[this.step]
    },
    showNextAchievement () {
      this.step++
      if (this.step > this.achievements.length - 1) {
        this.step = this.achievements.length - 1
      }
      this.mform = this.achievements[this.step]
    }
  }
}
</script>

<style>
</style>
