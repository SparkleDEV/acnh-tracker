<template>
	<tr class="fish-table-entry catch-table-entry" v-if="display">
		<td class="caught" @click="emitSortEvent()">
			<input type="checkbox" :id="`fish-${id}-caught`" :checked="hasBeenCaught(id)" @click="toggleCatchState" />
		</td>
		<td class="name">{{ name }}</td>
		<td class="place">{{ getPlaceDisplay(place) }}</td>
		<td class="shadow-size">
			<router-link :to="{ name: 'shadowsizes', hash: `#fish-${shadow_size.replaceAll('_', '-')}` }">
				{{ getShadowSizeDisplay(shadow_size) }}
				<div class="size-preview">
					<img
						:src="require(`@/assets/images/shadows/${shadow_size}.png`)"
						:alt="`Preview Image of a fish with the shadow size of ${getShadowSizeDisplay(shadow_size)}`"
						class="preview-image"
						width="256"
						height="256"
					/>
				</div>
			</router-link>
		</td>
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
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.shadow-size {
	position: relative;

	a {
		color: $black;
	}

	.size-preview {
		display: none;
		position: absolute;
		top: 0;
		left: 50%;
		translate: -50% -100%;
		overflow: hidden;
		border: 2px solid mix($row-background, $black, 70);
		border-radius: 16px;
		padding: rem-calc(8);
		background-color: mix($row-background, $black, 85);
		pointer-events: none;

		.preview-image {
			$image-size: rem-calc(200);
			display: block;
			border-radius: 8px;
			width: $image-size;
			height: $image-size;
		}
	}

	&:hover .size-preview {
		display: block;
	}
}
</style>
