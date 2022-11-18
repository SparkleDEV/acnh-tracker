<template>
	<div class="shadow-size-view view-page">
		<SiteHead title="Shadow sizes" />
		<div class="info-page-content">
			<div class="fish-shadows">
				<h3 class="section-title">Fishes</h3>
				<Gallery :images="images" anchor_prefix="fish-shadow-size-" />
			</div>
		</div>
	</div>
</template>

<script>
import SiteHead from '@/components/SiteHead.vue'
import Gallery from '@/components/Galleries/Grid.vue'

export default {
	components: { SiteHead, Gallery },
	data() {
		return {
			images: [
				{
					name: 'Shadow of a tiny fish',
					asset: require('@/assets/images/shadows/tiny.webp')
				},
				{
					name: 'Shadow of a small fish',
					asset: require('@/assets/images/shadows/small.webp')
				},
				{
					name: 'Shadow of a medium fish',
					asset: require('@/assets/images/shadows/medium.webp')
				},
				{
					name: 'Shadow of a medium fish with fin',
					asset: require('@/assets/images/shadows/medium_with_fin.webp')
				},
				{
					name: 'Shadow of a large fish',
					asset: require('@/assets/images/shadows/large.webp')
				},
				{
					name: 'Shadow of a very large fish',
					asset: require('@/assets/images/shadows/very_large.webp')
				},
				{
					name: 'Shadow of a long and thin fish',
					asset: require('@/assets/images/shadows/long_and_thin.webp')
				},
				{
					name: 'Shadow of a huge fish',
					asset: require('@/assets/images/shadows/huge.webp')
				},
				{
					name: 'Shadow of a huge fish with fin',
					asset: require('@/assets/images/shadows/huge_with_fin.webp')
				}
			]
		}
	}
}
</script>

<style lang="scss">
@use '@/assets/scss/util' as *;

.section-title {
	font-family: $font-family__fink-heavy;
	font-size: rem-calc(38);
	margin-bottom: rem-calc(16);
	color: #222;
}
</style>
