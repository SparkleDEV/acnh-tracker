<template>
	<div class="modal">
		<div class="modal-content">
			<div class="slot-content">
				<slot />
			</div>
			<button
				@click="closeModal"
				class="close-button"
				v-if="default_close_button == null ? true : default_close_button"
			>
				Close
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['default_close_button'],
	methods: {
		closeModal() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba($black, 0.5);

	.modal-content {
		background-color: $white;
		width: fit-content;
		padding: rem-calc(32);
		border-radius: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.close-button {
		@include button(#f00);
	}
}
</style>
