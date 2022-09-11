<template>
	<div class="fish-table-view page-content">
		<Toolbar
			:northern_hemisphere="northern_hemisphere"
			:current_month="current_month"
			:show_only_spawning="show_only_spawning"
			:show_only_disappearing="show_only_disappearing"
			tab="fish"
		/>
		<div class="table-wrapper">
			<table class="fish-table">
				<thead>
					<td>Caught</td>
					<td>Name</td>
					<td>Place</td>
					<td>Shadow Size</td>
					<td>Times</td>
					<td>Price</td>
					<td>Months</td>
				</thead>
				<tbody>
					<FishTableEntry
						v-for="f in fishes"
						:key="f.id"
						:id="f.id"
						:name="getFishName(f.name_key)"
						:place="f.place"
						:shadow_size="f.shadow_size"
						:times="northern_hemisphere ? f.times : f.southern_times"
						:price="f.price"
						:months="getHemisphereMonths(f)"
						:spawns_now="spawnsInCurrentMonth(getHemisphereMonths(f))"
						:display="displayFish(getHemisphereMonths(f))"
						@sort_event="sortFishList()"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import fish from '@/assets/data/fish.json'
import FishTableEntry from '@/components/FishTable/FishTableEntry.vue'
import Toolbar from '@/components/Toolbar.vue'
import translations from '@/assets/data/translations.json'

export default {
	components: { FishTableEntry, Toolbar },
	props: ['northern_hemisphere', 'current_month', 'show_only_spawning', 'show_only_disappearing'],
	data() {
		return {
			fishes: fish.data
		}
	},
	methods: {
		getHemisphereMonths(fish) {
			return this.northern_hemisphere ? fish.northern_months : fish.southern_months
		},
		getFishName(name_key) {
			const locale = this.$store.state.locale
			let name = translations[locale][name_key]
			return name
		},
		spawnsInCurrentMonth(months) {
			return months.includes(parseInt(this.current_month, 10))
		},
		spawnsNextMonth(months) {
			let next_month = parseInt(this.current_month, 10) >= 12 ? 1 : parseInt(this.current_month, 10) + 1
			return months.includes(next_month)
		},
		sortFishList() {
			this.fishes = fish.data

			this.fishes = this.fishes.sort((a, b) => {
				if (this.getFishName(a.name_key) < this.getFishName(b.name_key)) return -1
				if (this.getFishName(a.name_key) > this.getFishName(b.name_key)) return 1
			})

			this.fishes = this.fishes.sort((a, b) => {
				const acaught = this.$store.getters.hasCaughtFish(a.id)
				const bcaught = this.$store.getters.hasCaughtFish(b.id)

				if (acaught == bcaught) return 0
				if (acaught > bcaught) return 1
				return -1
			})
		},
		displayFish(months) {
			if (this.show_only_disappearing) {
				return this.spawnsInCurrentMonth(months) && !this.spawnsNextMonth(months)
			}
			if (this.show_only_spawning) {
				return this.spawnsInCurrentMonth(months)
			}
			return true
		}
	},
	mounted() {
		this.sortFishList()
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.fish-table {
	border-spacing: 0;
	border: 2px solid mix($row-background, $black, 70);
	border-radius: 4px;
	position: relative;
	color: $black;
	width: 100%;

	thead {
		background-color: mix($row-background, $black, 80);
		position: sticky;
		top: -1px;

		td {
			padding: rem-calc(6) rem-calc(4);
			border-bottom: 2px solid mix($row-background, $black, 70);
			font-weight: bold;
		}
	}
}

.table-wrapper {
	@media (max-width: 1200px) {
		overflow-x: auto;
		white-space: nowrap;
		max-width: 100%;
	}
}

.page-content {
	max-width: rem-calc(1000);
	margin: 0 auto;
	padding: rem-calc(50) rem-calc(80);
	width: 100vw;

	@media (max-width: 730px) {
		padding: rem-calc(50) rem-calc(30);
	}
}
</style>
