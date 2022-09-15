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
					name: 'Tiny shadow of a fish',
					asset: require('@/assets/images/shadows/tiny.png')
				},
				{
					name: 'Small shadow of a fish',
					asset: require('@/assets/images/shadows/small.png')
				},
				{
					name: 'Medium shadow of a fish',
					asset: require('@/assets/images/shadows/medium.png')
				},
				{
					name: 'Medium (with fin) shadow of a fish',
					asset: require('@/assets/images/shadows/medium_with_fin.png')
				},
				{
					name: 'Large shadow of a fish',
					asset: require('@/assets/images/shadows/large.png')
				},
				{
					name: 'Very large shadow of a fish',
					asset: require('@/assets/images/shadows/very_large.png')
				},
				{
					name: 'Long and thin shadow of a fish',
					asset: require('@/assets/images/shadows/long_and_thin.png')
				},
				{
					name: 'Huge shadow of a fish',
					asset: require('@/assets/images/shadows/huge.png')
				},
				{
					name: 'Huge (with fin) shadow of a fish',
					asset: require('@/assets/images/shadows/huge_with_fin.png')
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
