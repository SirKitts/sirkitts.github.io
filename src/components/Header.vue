<template>
  <header>
    <div class="photo" />
    <h1 class="signature">
      Jose Quitain
    </h1>
    <ul>
      <li
        v-for="(menu, index) in menulist"
        :key="index"
      >
        <NuxtLink :to="menu.url">
          {{ menu.name }}
        </NuxtLink>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data () {
    return {
      menulist: [
        { url: '/', name: 'Home' },
        { url: '/about', name: 'About' },
        { url: '/work', name: 'Work' },
        { url: '/skills', name: 'Skills' },
        { url: '/samples', name: 'Samples' }
      ]
    }
  }
}
</script>
