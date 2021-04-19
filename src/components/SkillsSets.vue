<template>
  <div class="skills-sets">
    <div>
      <h3>
        <i
          :class="skill.icon"
          class="skills-sets__icon"
          :style="styleObject"
        /> {{ skill.name }}
      </h3>
      <p>{{ skill.rate }}</p>
      <p><i>{{ skill.desc1 }} {{ skill.desc2 }}</i></p>
      <div style="margin: 1rem 0;">
        <div
          v-for="(tech, index) in skill.technologies"
          :key="index"
        >
          <p>{{ tech.name }}</p>
          <ProgressBar
            :key="tech.name"
            :barwidth="tech.proficiency"
            :barcolor="skill.barcolor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsSets',
  props: {
    skill: {
      type: Object,
      required: true,
      default () {}
    }
  },
  data () {
    return {
      styleObject: {
        '--skills-set-icon-color': this.skill.barcolor,
        color: 'var(--skills-set-icon-color)'
      }
    }
  }
}
</script>

<style>
</style>
