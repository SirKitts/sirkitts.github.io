<template>
    <img 
      :src="getSource"
      alt="Avatar"
      class="avatar"
      :class="[{ shadow: isAvatarWithShadow }]"
      @click="onClick" />
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: String,
    sample: String,
    shadow: Boolean
  },
  computed: {
		isAvatarWithShadow: function() {
			return this.shadow
		},
    getSource: function() {
			return this.source
		}
	},
  data () {
    return {
      imageUrl: 'https://www.w3schools.com/w3images/',
      avatars: ['male1', 'male2', 'male3', 'female1', 'female2', 'female3'],
      source: ''
    }
  },
  methods: {
    onClick($event) {
      this.$emit('click', $event);
    }
  },
  mounted() {
    this.source = this.avatars.includes(this.sample) 
        ? `${this.imageUrl}avatar${this.avatars.indexOf(this.sample)+1}.png`
        : this.src || `${this.imageUrl}avatar3.png`
  }
}
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 0.4s;
}

.shadow {
  box-shadow: 0 6px #999;
}

.shadow:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
