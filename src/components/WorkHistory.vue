<template>
  <div class="work__experience-history">
    <h4>
      {{ history.year }} | {{ history.job }} – {{ history.company.name }}
    </h4>
    <p>{{ history.company.desc }} {{ history.company.url }}</p>
    <p>
      <ul>
        <li>
          <span
            v-for="(role, index) in history.roles"
            :key="index"
          >
            {{ role }}
          </span>
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
export default {
  name: 'WorkHistory',
  props: {
    history: {
      type: Object,
      required: true,
      default () {}
    }
  }
}
</script>

<style>
</style>
