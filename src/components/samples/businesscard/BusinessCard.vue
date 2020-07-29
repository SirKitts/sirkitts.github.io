<template>
	<center>
		<main class="business-card">
			<section class="float-left">
				<div v-if="style.horizontal">
					<section v-if="style.flipped">
						<BusinessCardHorizontalFlip />
					</section>
					<section v-else>
						<BusinessCardHorizontal />
					</section>
				</div>
				<div v-else>
					<section v-if="style.flipped">
						<BusinessCardVerticalFlip />
					</section>
					<section v-else>
						<BusinessCardVertical />
					</section>
				</div>
			</section>
			<section class="float-right">
				<BusinessCardCustomiser @is-flipped="isFlipped" @is-horizontal="isHorizontal" />
			</section>
		</main>
	</center>
</template>

<script>
const BusinessCardVertical = () => import(
  /* webpackChunkName: "businesscard-vertical-component" */ './Vertical.vue'
);

const BusinessCardVerticalFlip = () => import(
  /* webpackChunkName: "businesscard-vertical-flip-component" */ './VerticalFlip.vue'
);

const BusinessCardHorizontal = () => import(
  /* webpackChunkName: "businesscard-horizontal-component" */ './Horizontal.vue'
);

const BusinessCardHorizontalFlip = () => import(
  /* webpackChunkName: "businesscard-horizontal-flip-component" */ './HorizontalFlip.vue'
);

const BusinessCardCustomiser = () => import(
  /* webpackChunkName: "businesscard-customiser-component" */ './Customiser.vue'
);

export default {
	name: 'BusinessCard',
    components: {
        BusinessCardVertical,
        BusinessCardVerticalFlip,
        BusinessCardHorizontal,
        BusinessCardHorizontalFlip,
        BusinessCardCustomiser
    },
	data: () => ({
		style: {
			flipped: false,
			horizontal: false
		}
	}),
	methods: {
		isFlipped(value) {
			this.style.flipped = value
		},
		isHorizontal(value) {
			this.style.horizontal = value
		}
	}
}
</script>

<style src="./style.css"></style>
