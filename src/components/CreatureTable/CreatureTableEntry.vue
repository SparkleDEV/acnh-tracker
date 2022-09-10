<template>
	<tr class="creature-table-entry catch-table-entry" v-if="display">
		<td class="caught" @click="emitSortEvent()">
			<input type="checkbox" :id="`creature-${id}-caught`" :checked="hasBeenCaught(id)" @click="toggleCatchState" />
		</td>
		<td class="name">{{ name }}</td>
		<td class="shadow-size">{{ getShadowSizeDisplay(shadow_size) }}</td>
		<td class="times">{{ times }}</td>
		<td class="price">{{ price }}</td>
		<td class="months" :class="{ spawnsNow: spawns_now }">{{ getMonthDisplay(months) }}</td>
	</tr>
</template>

<script>
import util from '@/composables/catch-list-entry-util'

export default {
	props: ['id', 'name', 'shadow_size', 'times', 'price', 'months', 'spawns_now', 'display'],
	methods: {
		emitSortEvent() {
			this.$emit('sort_event')
		},
		hasBeenCaught(id) {
			return this.$store.getters.hasCaughtCreature(id)
		},
		toggleCatchState() {
			this.$store.commit('toggleCreatureCatchState', this.id)
		},
		getMonthDisplay: (months) => util.getMonthDisplay(months),
		getShadowSizeDisplay(size) {
			switch (size) {
				case 'tiny':
					return 'Tiny'
				case 'small':
					return 'Small'
				case 'medium':
					return 'Medium'
				case 'large':
					return 'Large'
				case 'huge':
					return 'Huge'
			}
			return size
		},
		getMonthNameDisplayShort: (month) => util.getMonthNameDisplayShort(month)
	}
}
</script>
