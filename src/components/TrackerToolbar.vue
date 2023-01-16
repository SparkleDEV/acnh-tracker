<template>
	<div class="tracker-toolbar">
		<div class="tool tab">
			<select class="tab-dropdown" v-model="tab" @change="$emit('tabChange', tab)">
				<option v-for="vtab in valid_tabs" :key="vtab.id" :value="vtab.id">
					{{ vtab.name }}
				</option>
			</select>
		</div>
		<div class="tool month">
			<select class="month-dropdown" v-model="month" @change="$emit('monthChange', month)">
				<option value="1">January</option>
				<option value="2">Febuary</option>
				<option value="3">March</option>
				<option value="4">April</option>
				<option value="5">May</option>
				<option value="6">June</option>
				<option value="7">July</option>
				<option value="8">August</option>
				<option value="9">September</option>
				<option value="10">October</option>
				<option value="11">November</option>
				<option value="12">December</option>
			</select>
		</div>
		<div class="tool only-spawing">
			<input
				type="checkbox"
				:checked="show_only_spawning || show_only_disappearing"
				v-model="show_only_spawning"
				@change="$emit('showSpawningChange', show_only_spawning)"
				:disabled="show_only_disappearing"
			/>
			<label>Only spawning</label>
		</div>
		<div class="tool only-disappearing">
			<input
				type="checkbox"
				:checked="show_only_disappearing"
				v-model="show_only_disappearing"
				@change="$emit('showDisappearingChange', show_only_disappearing)"
			/>
			<label>Only disappearing</label>
		</div>
	</div>
</template>

<script>
export default {
	props: ['tab', 'valid_tabs', 'show_only_spawning', 'show_only_disappearing', 'month'],
	emits: ['tabChange', 'monthChange', 'showSpawningChange', 'showDisappearingChange'],
	methods: {}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.tracker-toolbar {
	display: flex;
	justify-content: flex-end;
	padding: rem-calc(8) rem-calc(4);
	gap: rem-calc(4);
	flex-wrap: wrap;
	background-color: mix($row-background, $black, 70);
	border: 2px solid mix($row-background, $black, 60);
	border-bottom: none;

	@media (max-width: #{$bp-medium}) {
		justify-content: flex-start;
	}

	.tool {
		padding: 0 rem-calc(4);
		display: flex;
		align-items: center;

		label {
			color: #eee;
		}

		&.tab {
			margin-right: auto;

			@media (max-width: #{$bp-medium}) {
				margin-right: unset;
			}
		}
	}
}
</style>
