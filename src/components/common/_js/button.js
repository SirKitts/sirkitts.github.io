export default {
	name: 'Button',
	props: {
		btnDisabled: Boolean,
		customClass: Object,
		customStyle: Object
	},
	computed: {
		classConfig: function() {
			return this.customClass
		},
		styleConfig: function() {
			return this.customStyle
		},
		isButtonDisabled: function() {
			return this.btnDisabled
		}
	},
	methods: {
		onClick($event) {
			/**
			 * Emitted when the button is clicked.
			 * @event click
			 * @type {Event}
			 */
			this.$emit('click', $event);
		}
	}
}
