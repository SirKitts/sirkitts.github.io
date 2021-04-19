<template>
  <div class="resume">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  /* box-sizing: border-box; */
}

.resume {
  display: grid;
  grid-template: 10vh 80vh 10vh;
}

.container {
  margin: 0 auto;
  min-height: 80vh;
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
