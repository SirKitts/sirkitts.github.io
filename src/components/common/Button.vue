<template>
  <button
    type="submit"
    class="button"
    :class="[classConfig, { disabled: isButtonDisabled }]"
    :style="styleConfig"
    @click="onClick"
    :disabled="isButtonDisabled" >
      <slot>Submit</slot>
  </button>
</template>

<script src='./_js/button.js'></script>

<style lang="scss" scoped>
  @import './_css/button.scss';
  @import './_css/style.scss';
</style>
