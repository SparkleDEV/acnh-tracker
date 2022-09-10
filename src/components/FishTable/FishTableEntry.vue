<template>
	<tr class="fish-table-entry catch-table-entry" v-if="display">
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
import util from '@/composables/catch-list-entry-util'

export default {
	props: ['id', 'name', 'place', 'shadow_size', 'times', 'price', 'months', 'spawns_now', 'display'],
	methods: {
		emitSortEvent() {
			this.$emit('sort_event')
		},
		hasBeenCaught(id) {
			return this.$store.getters.hasCaughtFish(id)
		},
		toggleCatchState() {
			this.$store.commit('toggleFishCatchState', this.id)
		},
		getMonthDisplay: (months) => util.getMonthDisplay(months),
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
		getMonthNameDisplayShort: (month) => util.getMonthNameDisplayShort(month)
	}
}
</script>
