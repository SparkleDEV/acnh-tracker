<template>
	<div class="song-table-view page-content">
		<div class="catchable-table-wrapper">
			<table class="song-table catchable-table">
				<thead>
					<td>Collected</td>
					<td>Name</td>
					<td>Song</td>
					<td>Purchaseable</td>
				</thead>
				<tbody>
					<SongTableEntry
						v-for="s in songs_data"
						:key="s.id"
						:id="s.id"
						:name="getSongName(s.name_key)"
						:buyable="s.buyable"
						@sort_event="sortSongList()"
						@play="playSong"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import songs from '@/assets/data/songs.json'
import SongTableEntry from '@/components/SongTable/SongTableEntry.vue'
import translations from '@/assets/data/translations.json'

export default {
	components: { SongTableEntry },
	data() {
		return {
			songs_data: songs.data,
			tab: 'songs'
		}
	},
	methods: {
		getSongName(name_key) {
			const locale = this.$store.state.locale
			let name = translations[locale][name_key]
			return name
		},
		sortSongList() {
			this.songs_data = songs.data

			this.songs_data = this.songs_data.sort((a, b) => {
				if (this.getSongName(a.name_key) < this.getSongName(b.name_key)) return -1
				if (this.getSongName(a.name_key) > this.getSongName(b.name_key)) return 1
			})

			this.songs_data = this.songs_data.sort((a, b) => {
				const acollected = this.$store.getters.hasCollectedSong(a.id)
				const bcollected = this.$store.getters.hasCollectedSong(b.id)

				if (acollected == bcollected) return 0
				if (acollected > bcollected) return 1
				return -1
			})
		},
		playSong(song) {
			this.$refs.audio_source.src = song

			this.$refs.audio.load()
			this.$refs.audio.play()
		},
		updateTab() {
			this.$parent.tab = this.tab
		}
	},
	mounted() {
		this.sortSongList()
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.page-content {
	max-width: rem-calc(1000);
}

.audio-player {
	position: fixed;
	bottom: rem-calc(16);
	right: rem-calc(16);
}
</style>
