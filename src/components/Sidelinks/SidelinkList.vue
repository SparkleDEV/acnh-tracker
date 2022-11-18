<template>
	<div class="sidelink-list">
		<ul class="sidelink-list--list">
			<SideLinkEntry
				v-for="link in links"
				:key="link.path"
				:icon="link.icon"
				:path="link.path"
				:text="link.text"
				:external="link.external"
			/>
		</ul>
	</div>
</template>

<script>
import SideLinkEntry from './SidelinkEntry.vue'
import GithubLogo from '@/assets/images/icons/github.svg'
import TwitterLogo from '@/assets/images/icons/twitter.svg'
import KofiLogo from '@/assets/images/icons/kofi.svg'
import PremiumLogo from '@/assets/images/icons/premium.svg'

export default {
	components: { SideLinkEntry },
	data() {
		return {
			links: [
				{
					icon: TwitterLogo,
					path: 'https://twitter.com/VTheConfused',
					text: 'Twitter',
					external: true
				},
				{
					icon: GithubLogo,
					path: 'https://github.com/SparkleDEV/acnh-tracker',
					text: 'Source code',
					external: true
				},
				{
					icon: KofiLogo,
					path: 'https://ko-fi.com/sparkledev',
					text: 'Donate on Ko-Fi',
					external: true
				},
				{
					icon: PremiumLogo,
					path: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
					text: 'Buy Premium',
					external: false
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.sidelink-list {
	position: fixed;
	top: rem-calc(100);
	right: 0;
	z-index: 10000;
}

.sidelink-list--list {
	display: flex;
	flex-direction: column;
	width: fit-content;
	align-items: flex-end;
}
</style>
