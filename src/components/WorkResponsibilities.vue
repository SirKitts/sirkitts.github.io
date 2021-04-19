<template>
  <div class="work__responsibilities">
    <h3>Work and Responsibilities</h3>
    <div class="work__responsibilities-items">
      <div
        v-for="(resp, index) in responsibilities"
        :key="index"
        class="work__responsibilities-item"
      >
        <h2>
          <i :class="resp.icon" />
          {{ resp.work }}
        </h2>
        <ul>
          <li
            v-for="(text, i) in resp.responsibilities.split('.')"
            :key="i"
          >
            {{ text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkResponsibilities',
  props: {
    responsibilities: {
      type: Array,
      required: false,
      default () {}
    }
  }
}
</script>

<style>
</style>
