<template>
	<div class="fish-table-view page-content">
		<div class="toolbar">
			<!-- TODO (08 Sep 22): Implement -->
			<!-- <div class="tool">
				<label for="hemisphere">Select your islands hemisphere (needs reload after)</label>
				<select name="hemisphere" v-model="northern_hemisphere" @change="saveHemisphere()">
					<option value="true">Northern</option>
					<option value="false">Southern</option>
				</select>
			</div> -->
			<div class="tool">
				<label for="current_month">Select current month:</label>
				<select name="current_month" v-model="current_month">
					<option value="1">January</option>
					<option value="2">Febuary</option>
					<option value="3">March</option>
					<option value="4">April</option>
					<option value="5">May</option>
					<option value="6">June</option>
					<option value="7">July</option>
					<option value="8">August</option>
					<option value="9">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
			</div>
			<div class="tool">
				<input type="checkbox" name="show_spawning" v-model="show_only_spawning" />
				<label for="show_spawning">Show only spawning</label>
			</div>
			<div class="tool">
				<input type="checkbox" name="show_disappearing" v-model="show_only_disappearing" />
				<label for="show_disappearing">Show only disappearing</label>
			</div>
		</div>
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
</template>

<script>
import fish from '@/assets/data/fish.json'
import FishTableEntry from '@/components/FishTable/FishTableEntry.vue'
import translations from '@/assets/data/translations.json'

export default {
	components: { FishTableEntry },
	props: ['northern_hemisphere', 'current_month'],
	data() {
		return {
			fishes: fish.data,
			show_only_spawning: false,
			show_only_disappearing: false
		}
	},
	methods: {
		saveHemisphere() {
			this.$store.commit('setNorthernHemisphere', this.northern_hemisphere)
		},
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
				// return 0
			})

			this.fishes = this.fishes.sort((a, b) => {
				const acaught = this.$store.getters.hasCaught(a.id)
				const bcaught = this.$store.getters.hasCaught(b.id)

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

.toolbar {
	display: flex;
	justify-content: flex-end;
	margin-bottom: rem-calc(4);

	.tool {
		padding: 0 rem-calc(4);
		display: flex;
		align-items: center;

		label {
			color: #eee;
		}
	}
}

.fish-table {
	border-spacing: 0;
	border: 2px solid mix($row-background, $black, 70);
	border-radius: 4px;
	position: relative;
	color: $black;

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

.page-content {
	max-width: rem-calc(1000);
	margin: 0 auto;
	padding: rem-calc(50) rem-calc(80);
}
</style>
