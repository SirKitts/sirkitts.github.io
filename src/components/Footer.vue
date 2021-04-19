<template>
  <footer>
    <div class="social-media">
      <a href="https://www.linkedin.com/in/jose-quitain-6740591ab/">
        <i class="fab fa-linkedin" />
      </a>
      <i class="fab fa-twitter" />
      <i class="fab fa-facebook" />
      <i class="fab fa-instagram" />
    </div>
    <div>Copyright &copy; {{ year }}. License MIT.</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      year: 2021
    }
  },
  created () {
    const d = new Date()
    this.year = d.getFullYear()
  }
}
</script>
