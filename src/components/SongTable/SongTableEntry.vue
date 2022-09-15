<template>
	<tr class="song-table-entry catch-table-entry">
		<td class="collected" @click="emitSortEvent()">
			<input
				type="checkbox"
				:id="`song-${id}-collected`"
				:checked="hasBeenCollected(id)"
				@click="toggleCollectionState"
			/>
		</td>
		<td class="name">{{ name }}</td>
		<td class="song">-</td>
		<td class="buyable" :class="{ is_buyable: buyable }">{{ displayBuyable() }}</td>
	</tr>
</template>

<script>
export default {
	props: ['id', 'name', 'buyable'],
	methods: {
		emitSortEvent() {
			this.$emit('sort_event')
		},
		hasBeenCollected(id) {
			return this.$store.getters.hasCollectedSong(id)
		},
		toggleCollectionState() {
			this.$store.commit('toggleFishCatchState', this.id)
		},
		displayBuyable() {
			return this.buyable ? 'Yes' : 'No'
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.song-table-entry {
	&:nth-child(2n) .buyable {
		background-color: mix($not-spawning, #000, 92);

		&.is_buyable {
			background-color: mix($spawning, #000, 92);
		}
	}
}

.buyable {
	background-color: $not-spawning;

	&.is_buyable {
		background-color: $spawning;
	}
}
</style>
