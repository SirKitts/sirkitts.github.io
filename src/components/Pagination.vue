<template>
  <div class="starwars-pagination">
    <i
      v-if="prev != null"
      class="fas fa-arrow-circle-left starwars-arrow fa-2x"
      @click="setSelectedPage(prev, false);"
    />
    &nbsp;Page {{ page }}
    <i
      v-if="next != null"
      class="fas fa-arrow-circle-right starwars-arrow fa-2x"
      @click="setSelectedPage(next, true);"
    />
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: String,
      required: false,
      default: ''
    },
    page: {
      type: [String, Number],
      required: true,
      default: 1
    },
    next: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    setSelectedPage (page, isNextPage) {
      this.$emit('onChangePage', {
        url: page,
        isNextPage
      })
    }
  }
}
</script>

<style>
.starwars-pagination {
  display: flex;
  justify-content: flex-end;
  margin: auto;
  padding-top: 1rem;
}

.starwars-arrow,
.starwars-arrow:link,
.starwars-arrow:active {
  border: none;
  outline: none;
  text-decoration: none;
  color: #4CAF50;
  padding-left: 0.5rem;
}
</style>
