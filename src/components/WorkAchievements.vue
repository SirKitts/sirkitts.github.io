<template>
  <div class="work__achievements">
    <h3>Achievements</h3>
    <div class="work__achievements-items">
      <div class="work__achievements-item">
        <div>
          <h4>
            {{ achieve.achievement }}
          </h4>
          <p>
            {{ achieve.description }}
          </p>
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
  name: 'WorkAchievements',
  props: {
    achievements: {
      type: Array,
      required: false,
      default () {}
    }
  },
  data () {
    return {
      ptr: 0,
      achieve: {}
    }
  },
  created () {
    this.achieve = this.achievements[this.ptr]
  },
  methods: {
    showPreviosAchievement () {
      this.ptr--
      if (this.ptr < 0) {
        this.ptr = 0
      }
      this.achieve = this.achievements[this.ptr]
    },
    showNextAchievement () {
      this.ptr++
      if (this.ptr > this.achievements.length - 1) {
        this.ptr = this.achievements.length - 1
      }
      this.achieve = this.achievements[this.ptr]
    }
  }
}
</script>

<style>
</style>
