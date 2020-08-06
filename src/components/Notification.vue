<template>
  <router-link to="/my-appointment" class="notification">
    <span v-if="status === '1'">In progress</span>
    <span v-else>You are {{ badge }} in queue.</span>
    <span class="badge" v-show="badge">{{ badge }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'notification',
  props: {
    badge: [String, Number],
    status: [String, Number]
  }
}
</script>

<style scoped>
.notification {
  background-color: #555;
  text-decoration: none;
  magrin-top: 10px;
  padding: 8px 40px;
  position: relative;
  display: inline-block;
  border-radius: 2px;
  color: white;
  /* font-size:small; */
}

.notification:hover {
  /* background: blue; */
}

.notification .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 8px 8px;
  border-radius: 50%;
  background-color: green;
  color: white;
}
</style>
