<template>
	<tr class="bug-table-entry catch-table-entry" v-if="display">
		<td class="caught" @click="emitSortEvent()">
			<input type="checkbox" :id="`bug-${id}-caught`" :checked="hasBeenCaught(id)" @click="toggleCatchState" />
		</td>
		<td class="name">{{ name }}</td>
		<td class="place">{{ getPlaceDisplay(place) }}</td>
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
			return this.$store.getters.hasCaughtBug(id)
		},
		toggleCatchState() {
			this.$store.commit('toggleBugCatchState', this.id)
		},
		getMonthDisplay: (months) => util.getMonthDisplay(months),
		getPlaceDisplay(place) {
			switch (place) {
				case 'beach_disguised_as_shells':
					return 'Beach (Disguised as shells)'
				case 'flying':
					return 'Flying around'
				case 'flying_by_hybrid_flowers':
					return 'Flying around near hybrid flowers'
				case 'flying_by_light':
					return 'Flying around near light'
				case 'hitting_rocks':
					return 'Hitting rocks'
				case 'beach_rocks':
					return 'On beach rocks'
				case 'flowers':
					return 'On flowers'
				case 'flowers_white':
					return 'On white flowers'
				case 'palm_trees':
					return 'On palm trees'
				case 'ponds_and_rivers':
					return 'On ponds and rivers'
				case 'rocks_and_bushes_rain':
					return 'On rocks and bushes by rain'
				case 'rotten_food':
					return 'On rotten food'
				case 'ground':
					return 'On the ground'
				case 'ground_rolling_snowballs':
					return 'On the ground (rolling snowballs)'
				case 'trash_items':
					return 'On trash items'
				case 'tree_stumps':
					return 'On tree stumps'
				case 'trees':
					return 'On trees'
				case 'shaking_trees':
					return 'Shaking trees'
				case 'under_trees_disguised_as_leaves':
					return 'Under trees (Disguised as leaves)'
				case 'underground':
					return 'Underground'
				case 'villagers_heads':
					return "On villager's heads"
			}
			return place
		},
		getLastMonth(month) {
			return month <= 1 ? 12 : month - 1
		},
		getNextMonth(month) {
			return month >= 12 ? 1 : month + 1
		},
		getMonthNameDisplayShort: (month) => util.getMonthNameDisplayShort(month)
	}
}
</script>
