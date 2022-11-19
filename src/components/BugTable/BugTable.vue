<template>
	<div class="bug-table-view page-content">
		<div class="catchable-table-wrapper">
			<table class="bug-table catchable-table">
				<thead>
					<td>Caught</td>
					<td>Name</td>
					<td>Place</td>
					<td>Times</td>
					<td>Price</td>
					<td>Months</td>
				</thead>
				<tbody>
					<BugTableEntry
						v-for="b in bug_data"
						:key="b.id"
						:id="b.id"
						:name="getBugName(b.name_key)"
						:place="b.place"
						:times="northern_hemisphere ? b.times : b.southern_times"
						:price="b.price"
						:months="getHemisphereMonths(b)"
						:spawns_now="spawnsInCurrentMonth(getHemisphereMonths(b))"
						:display="displayBug(getHemisphereMonths(b))"
						@sort_event="sortBugList()"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import bugs from '@/assets/data/bugs.json'
import BugTableEntry from '@/components/BugTable/BugTableEntry.vue'
// import Toolbar from '@/components/Toolbar.vue'
import translations from '@/assets/data/translations.json'

export default {
	components: { BugTableEntry },
	props: ['northern_hemisphere', 'current_month', 'show_only_spawning', 'show_only_disappearing'],
	data() {
		return {
			bug_data: bugs.data
		}
	},
	methods: {
		getHemisphereMonths(bug) {
			return this.northern_hemisphere ? bug.northern_months : bug.southern_months
		},
		getBugName(name_key) {
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
		sortBugList() {
			this.bug_data = bugs.data

			this.bug_data = this.bug_data.sort((a, b) => {
				if (this.getBugName(a.name_key) < this.getBugName(b.name_key)) return -1
				if (this.getBugName(a.name_key) > this.getBugName(b.name_key)) return 1
			})

			this.bug_data = this.bug_data.sort((a, b) => {
				const acaught = this.$store.getters.hasCaughtBug(a.id)
				const bcaught = this.$store.getters.hasCaughtBug(b.id)

				if (acaught == bcaught) return 0
				if (acaught > bcaught) return 1
				return -1
			})
		},
		displayBug(months) {
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
		this.sortBugList()
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.page-content {
	max-width: rem-calc(1000);
}
</style>
