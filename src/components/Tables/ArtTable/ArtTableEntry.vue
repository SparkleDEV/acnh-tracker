<template>
	<tr class="art-table-entry catch-table-entry">
		<td class="caught" @click="emitSortEvent()">
			<input type="checkbox" :id="`art-${id}-caught`" :checked="hasBeenCollected(id)" @click="toggleCollectState" />
		</td>
		<td class="name">{{ name }}</td>
		<td class="images">
			<div class="real-image art-image-wrapper">
				<img :src="getImageAsset()" alt="nope" class="art-preview-image" />
				<span>Original</span>
			</div>
			<div class="fake-image art-image-wrapper" v-if="has_fake">
				<img :src="getFakeImageAsset()" alt="nope" class="art-preview-image" />
				<span>Fake</span>
			</div>
		</td>
		<td class="description" @click="expanded = !expanded">
			<div v-if="has_fake">
				<span class="expand">Click to expand</span>
				<p class="desc-content" :class="{ open: expanded }">{{ description }}</p>
			</div>
			<div v-else>N/A</div>
		</td>
	</tr>
</template>

<script>
export default {
	props: ['id', 'name', 'has_fake', 'description'],
	data() {
		return {
			expanded: false
		}
	},
	methods: {
		emitSortEvent() {
			this.$emit('sort_event')
		},
		hasBeenCollected(id) {
			return this.$store.getters.hasCollectedArt(id)
		},
		toggleCollectState() {
			this.$store.commit('toggleArtCollectState', this.id)
		},
		getImageAsset() {
			return require(`@/assets/images/art_pieces/${this.id}.webp`)
		},
		getFakeImageAsset() {
			return require(`@/assets/images/art_pieces/${this.id}_fake.webp`)
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.description {
	width: 30ch;

	.expand {
		text-decoration: underline;
		font-weight: bold;
		cursor: pointer;
	}

	.desc-content {
		height: 0;
		overflow: hidden;
		margin-block-start: 0;
		margin-block-end: 0;

		&.open {
			height: fit-content;
		}
	}
}

.images {
	display: flex;
	flex-direction: row;
	justify-content: center;

	.art-image-wrapper {
		display: flex;
		flex-direction: column;
		width: fit-content;
		padding: 0 rem-calc(4);
	}
	.art-preview-image {
		max-width: 150px;
		max-height: 150px;
	}
}
</style>
