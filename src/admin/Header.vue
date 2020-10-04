<template>
  <div class="input-container">
    <img :src="logo" width="75" height="75" @click="$router.push('/admin')" />
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
import { LOGO } from '@/helpers/constants'

export default {
  name: 'mainheader',
  props: {
    title: String
  },
  data: () => ({
    logo: LOGO
  })
}
</script>
