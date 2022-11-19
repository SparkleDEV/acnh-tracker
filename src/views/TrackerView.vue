<template>
	<div class="tracker-view view-page">
		<SiteHead />
		<div class="tracker">
			<TrackerToolbar
				:valid_tabs="valid_tabs"
				:tab="tab"
				:month="month"
				:show_only_spawning="show_only_spawning"
				:show_only_disappearing="show_only_disappearing"
				@tabChange="handleTabChange"
				@monthChange="handleMonthChange"
				@showSpawningChange="handleShowSpawningChange"
				@showDisappearingChange="handleShowDisappearingChange"
			/>
		</div>
	</div>
</template>

<script>
import SiteHead from '@/components/SiteHead.vue'
import TrackerToolbar from '@/components/TrackerToolbar.vue'

export default {
	components: { SiteHead, TrackerToolbar },
	data() {
		return {
			northern_hemisphere: this.$store.getters.isOnNorthernHemisphere,
			month: new Date().getMonth() + 1,
			locale: 'en',
			tab: '',
			show_only_spawning: false,
			show_only_disappearing: false,
			valid_tabs: [
				{ id: 'fish', name: 'Fish' },
				{ id: 'bugs', name: 'Bugs' },
				{ id: 'creatures', name: 'Sea creatures' },
				{ id: 'songs', name: 'Songs' }
			]
		}
	},
	methods: {
		getTab() {
			const tab = this.$route.query.tab
			return this.valid_tabs.some((vt) => vt.id === tab) ? tab : 'fish'
		},
		handleTabChange(newTab) {
			this.tab = newTab
			this.$router.replace({ query: { ...this.$route.query, tab: this.tab } })
		},
		handleMonthChange(newMonth) {
			this.month = newMonth
		},
		handleShowSpawningChange(newValue) {
			this.show_only_spawning = newValue
		},
		handleShowDisappearingChange(newValue) {
			this.show_only_disappearing = newValue
		}
	},
	mounted() {
		this.tab = this.getTab()
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.tracker {
	container-type: inline-size;
	margin-top: rem-calc(16);
}
</style>
