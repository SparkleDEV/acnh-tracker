<template>
	<div class="vertical-gallery-component">
		<div class="gallery-entry" v-for="image in images" :key="image" :id="anchor_prefix ? getAnchorID(image) : ''">
			<img :src="image.asset" :alt="image.name" class="gallery-image" @click="imageFullscreen(image)" />
			<h3 class="image-name">{{ image.name }}</h3>
		</div>
	</div>
	<Modal @close="fullscreen = !fullscreen" v-if="fullscreen" default_close_button="true">
		<div class="fullscreen-modal">
			<img :src="fullscreen_image.asset" :alt="fullscreen_image.name" class="fullscreen-image" />
			<span class="fullscreen-name">{{ fullscreen_image.name }}</span>
		</div>
	</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
	components: { Modal },
	props: ['anchor_prefix', 'path_prefix', 'images'],
	data() {
		return {
			fullscreen: false,
			fullscreen_image: {}
		}
	},
	methods: {
		getImagePath(image) {
			return this.path_prefix + image.path
		},
		getAnchorID(image) {
			let lower_name = image.name.toLowerCase().replaceAll(/[^a-zA-Z0-9-]/g, '-')
			return this.anchor_prefix + lower_name
		},
		imageFullscreen(image) {
			this.fullscreen_image = image
			this.fullscreen = true
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.vertical-gallery-component {
	display: flex;
	flex-wrap: wrap;

	.gallery-entry {
		width: 33%;
		margin-bottom: rem-calc(16);
	}

	.gallery-image {
		$image-size: rem-calc(270);
		width: $image-size;
		height: $image-size;
		border-radius: 8px;

		transition: scale 0.3s;

		&:hover {
			scale: 1.05;
			cursor: pointer;
		}
	}

	.image-name {
		margin-block-start: rem-calc(8);
	}
}

.fullscreen-modal {
	display: flex;
	flex-direction: column;
	margin-bottom: rem-calc(16);

	.fullscreen-image {
		width: rem-calc(700);
		max-width: 80vw;
	}

	.fullscreen-name {
		font-size: rem-calc(22);
		font-weight: bold;
		margin-top: rem-calc(8);
	}
}
</style>
