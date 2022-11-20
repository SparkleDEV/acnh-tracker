<template>
	<div class="tracker-view view-page">
		<SiteHead />
		<div class="tracker page-content">
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
			<FishTable
				:northern_hemisphere="northern_hemisphere"
				:current_month="month"
				:show_only_spawning="show_only_spawning"
				:show_only_disappearing="show_only_disappearing"
				v-if="tab == 'fish'"
			/>
			<BugTable
				:northern_hemisphere="northern_hemisphere"
				:current_month="month"
				:show_only_spawning="show_only_spawning"
				:show_only_disappearing="show_only_disappearing"
				v-if="tab == 'bugs'"
			/>
			<CreatureTable
				:northern_hemisphere="northern_hemisphere"
				:current_month="month"
				:show_only_spawning="show_only_spawning"
				:show_only_disappearing="show_only_disappearing"
				v-if="tab == 'creatures'"
			/>
			<SongTable v-if="tab == 'songs'" @playSong="playSong" />
		</div>
		<div class="audio-player" v-if="tab == 'songs'">
			<audio controls ref="audio" class="audio-player">
				<source ref="audio_source" />
			</audio>
		</div>
	</div>
</template>

<script>
import SiteHead from '@/components/SiteHead.vue'
import TrackerToolbar from '@/components/TrackerToolbar.vue'
import FishTable from '@/components/Tables/FishTable/FishTable.vue'
import BugTable from '@/components/Tables/BugTable/BugTable.vue'
import CreatureTable from '@/components/Tables/CreatureTable/CreatureTable.vue'
import SongTable from '@/components/Tables/SongTable/SongTable.vue'

export default {
	components: { SiteHead, TrackerToolbar, FishTable, BugTable, CreatureTable, SongTable },
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
		},
		playSong(song) {
			this.$refs.audio_source.src = song

			this.$refs.audio.load()
			this.$refs.audio.play()
		}
	},
	mounted() {
		this.tab = this.getTab()
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.audio-player {
	position: fixed;
	bottom: rem-calc(16);
	right: rem-calc(16);
}
</style>
