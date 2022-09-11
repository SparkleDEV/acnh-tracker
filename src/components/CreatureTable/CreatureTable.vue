<template>
	<div class="creature-table-view page-content">
		<Toolbar
			:northern_hemisphere="northern_hemisphere"
			:current_month="current_month"
			:show_only_spawning="show_only_spawning"
			:show_only_disappearing="show_only_disappearing"
			tab="creatures"
		/>
		<div class="table-wrapper">
			<table class="creature-table">
				<thead>
					<td>Caught</td>
					<td>Name</td>
					<td>Shadow Size</td>
					<td>Times</td>
					<td>Price</td>
					<td>Months</td>
				</thead>
				<tbody>
					<CreatureTableEntry
						v-for="c in creature_data"
						:key="c.id"
						:id="c.id"
						:name="getCreatureName(c.name_key)"
						:shadow_size="c.shadow_size"
						:times="northern_hemisphere ? c.times : c.southern_times"
						:price="c.price"
						:months="getHemisphereMonths(c)"
						:spawns_now="spawnsInCurrentMonth(getHemisphereMonths(c))"
						:display="displayCreature(getHemisphereMonths(c))"
						@sort_event="sortCreatureList()"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import seacreatures from '@/assets/data/seacreatures.json'
import CreatureTableEntry from '@/components/CreatureTable/CreatureTableEntry.vue'
import Toolbar from '@/components/Toolbar.vue'
import translations from '@/assets/data/translations.json'

export default {
	components: { CreatureTableEntry, Toolbar },
	props: ['northern_hemisphere', 'current_month', 'show_only_spawning', 'show_only_disappearing'],
	data() {
		return {
			creature_data: seacreatures.data
		}
	},
	methods: {
		getHemisphereMonths(creature) {
			return this.northern_hemisphere ? creature.northern_months : creature.southern_months
		},
		getCreatureName(name_key) {
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
		sortCreatureList() {
			this.creature_data = seacreatures.data

			this.creature_data = this.creature_data.sort((a, b) => {
				if (this.getCreatureName(a.name_key) < this.getCreatureName(b.name_key)) return -1
				if (this.getCreatureName(a.name_key) > this.getCreatureName(b.name_key)) return 1
			})

			this.creature_data = this.creature_data.sort((a, b) => {
				const acaught = this.$store.getters.hasCaughtCreature(a.id)
				const bcaught = this.$store.getters.hasCaughtCreature(b.id)

				if (acaught == bcaught) return 0
				if (acaught > bcaught) return 1
				return -1
			})
		},
		displayCreature(months) {
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
		this.sortCreatureList()
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.creature-table {
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
