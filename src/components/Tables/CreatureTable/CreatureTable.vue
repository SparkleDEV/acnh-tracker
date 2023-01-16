<template>
	<div class="creature-table-view">
		<div class="catchable-table-wrapper">
			<table class="creature-table catchable-table">
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
import CreatureTableEntry from '@/components/Tables/CreatureTable/CreatureTableEntry.vue'
import translations from '@/assets/data/translations.json'

export default {
	components: { CreatureTableEntry },
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

.page-content {
	max-width: rem-calc(1000);
}
</style>
