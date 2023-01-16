<template>
	<div class="art-table-view">
		<div class="catchable-table-wrapper">
			<table class="art-table catchable-table">
				<thead>
					<td>Collected</td>
					<td>Name</td>
					<td>Images</td>
					<td>Description</td>
				</thead>
				<tbody>
					<ArtTableEntry
						v-for="a in art_data"
						:key="a.id"
						:id="a.id"
						:name="getArtName(a.name_key)"
						:has_fake="a.has_fake"
						:description="a.description"
						@sort_event="sortArtList()"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import art from '@/assets/data/art.json'
import ArtTableEntry from '@/components/Tables/ArtTable/ArtTableEntry.vue'
import translations from '@/assets/data/translations.json'

export default {
	components: { ArtTableEntry },
	data() {
		return {
			art_data: art.data
		}
	},
	methods: {
		getArtName(name_key) {
			const locale = this.$store.state.locale
			let name = translations[locale][name_key]
			return name
		},
		sortArtList() {
			this.art_data = art.data

			this.art_data = this.art_data.sort((a, b) => {
				if (this.getArtName(a.name_key) < this.getArtName(b.name_key)) return -1
				if (this.getArtName(a.name_key) > this.getArtName(b.name_key)) return 1
			})

			this.art_data = this.art_data.sort((a, b) => {
				const acaught = this.$store.getters.hasCollectedArt(a.id)
				const bcaught = this.$store.getters.hasCollectedArt(b.id)

				if (acaught == bcaught) return 0
				if (acaught > bcaught) return 1
				return -1
			})
		}
	},
	mounted() {
		this.sortArtList()
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.page-content {
	max-width: rem-calc(1000);
}
</style>
