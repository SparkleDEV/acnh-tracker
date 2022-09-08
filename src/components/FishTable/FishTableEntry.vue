<template>
	<tr class="fish-table-entry" v-if="display">
		<td class="caught" @click="emitSortEvent()">
			<input type="checkbox" :id="`fish-${id}-caught`" :checked="hasBeenCaught(id)" @click="toggleCatchState" />
		</td>
		<td class="name">{{ name }}</td>
		<td class="place">{{ getPlaceDisplay(place) }}</td>
		<td class="shadow-size">{{ getShadowSizeDisplay(shadow_size) }}</td>
		<td class="times">{{ times }}</td>
		<td class="price">{{ price }}</td>
		<td class="months" :class="{ spawnsNow: spawns_now }">{{ getMonthDisplay(months) }}</td>
	</tr>
</template>

<script>
export default {
	props: ['id', 'name', 'place', 'shadow_size', 'times', 'price', 'months', 'spawns_now', 'display'],
	methods: {
		emitSortEvent() {
			this.$emit('sort_event')
		},
		hasBeenCaught(id) {
			return this.$store.getters.hasCaught(id)
		},
		toggleCatchState() {
			this.$store.commit('toggleCatchState', this.id)
		},
		getMonthDisplay(months) {
			let ranges = []
			let already_ranged = []

			months = months.sort()

			if (months.length >= 12) return 'All year'

			months.forEach((m) => {
				if (already_ranged.includes(m)) return
				already_ranged.push(m)

				// Find chain start
				let s = m
				while (months.includes(this.getLastMonth(s))) {
					s = this.getLastMonth(s)
					already_ranged.push(s)
				}

				// Find chain end
				let e = m
				while (months.includes(this.getNextMonth(e))) {
					e = this.getNextMonth(e)
					already_ranged.push(e)
				}

				ranges.push({ start: s, end: e })
			})

			let display = ''

			ranges.forEach((r) => {
				let r_str = `${this.getMonthNameDisplayShort(r.start)} - ${this.getMonthNameDisplayShort(r.end)}`
				if (display) display += ', '
				display += r_str
			})

			return display
		},
		getPlaceDisplay(place) {
			switch (place) {
				case 'pier':
					return 'Pier'
				case 'pond':
					return 'Pond'
				case 'river':
					return 'River'
				case 'river_clifftop':
					return 'River (Clifftop)'
				case 'river_clifftop_and_pond':
					return 'River (Clifftop) & Pond'
				case 'river_mouth':
					return 'River (Mouth)'
				case 'sea':
					return 'Sea'
			}
			return place
		},
		getShadowSizeDisplay(size) {
			switch (size) {
				case 'tiny':
					return 'Tiny'
				case 'small':
					return 'Small'
				case 'medium':
					return 'Medium'
				case 'medium_with_fin':
					return 'Medium (with fin)'
				case 'large':
					return 'Large'
				case 'very_large':
					return 'Very large'
				case 'long_and_thin':
					return 'Long and thin'
				case 'huge':
					return 'Huge'
				case 'huge_with_fin':
					return 'Huge (with fin)'
			}
			return size
		},
		getLastMonth(month) {
			return month <= 1 ? 12 : month - 1
		},
		getNextMonth(month) {
			return month >= 12 ? 1 : month + 1
		},
		getMonthNameDisplayShort(month) {
			switch (month) {
				case 1:
					return 'Jan'
				case 2:
					return 'Feb'
				case 3:
					return 'Mar'
				case 4:
					return 'Apr'
				case 5:
					return 'May'
				case 6:
					return 'Jun'
				case 7:
					return 'Jul'
				case 8:
					return 'Aug'
				case 9:
					return 'Sep'
				case 10:
					return 'Oct'
				case 11:
					return 'Nov'
				case 12:
					return 'Dec'
				default:
					return '?'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.spawnsNow {
	background-color: #19e485;
}
</style>
