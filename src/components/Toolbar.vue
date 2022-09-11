<template>
	<div class="toolbar">
		<!-- TODO (08 Sep 22): Implement -->
		<!-- <div class="tool">
				<label for="hemisphere">Select your islands hemisphere (needs reload after)</label>
				<select name="hemisphere" v-model="northern_hemisphere" @change="saveHemisphere()">
					<option value="true">Northern</option>
					<option value="false">Southern</option>
				</select>
			</div> -->
		<div class="tool tab-tool">
			<select name="tab" v-model="tab" @change="updateTab">
				<option value="fish">Fish</option>
				<option value="bug">Bugs</option>
				<option value="creatures">Sea creatures</option>
			</select>
		</div>
		<div class="tool">
			<label for="current_month">Select current month:</label>
			<select name="current_month" v-model="current_month" @change="updateMonth">
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
		<div class="tool">
			<input
				type="checkbox"
				name="show_spawning"
				:checked="show_only_spawning || show_only_disappearing"
				v-model="show_only_spawning"
				@change="updateShowOnlySpawning"
				:disabled="show_only_disappearing"
			/>
			<label for="show_spawning">Show only spawning</label>
		</div>
		<div class="tool">
			<input
				type="checkbox"
				name="show_disappearing"
				:checked="show_only_disappearing"
				v-model="show_only_disappearing"
				@change="updateShowOnlyDisappearing"
			/>
			<label for="show_disappearing">Show only disappearing</label>
		</div>
	</div>
</template>

<script>
export default {
	props: ['northern_hemisphere', 'current_month', 'show_only_spawning', 'show_only_disappearing', 'tab'],
	methods: {
		updateMonth() {
			// It's not stupid if it works!
			this.$parent.$parent.current_month = this.current_month
		},
		updateShowOnlySpawning() {
			this.$parent.$parent.show_only_spawning = this.show_only_spawning
		},
		updateShowOnlyDisappearing() {
			this.$parent.$parent.show_only_disappearing = this.show_only_disappearing
		},
		updateTab() {
			this.$parent.$parent.tab = this.tab
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.toolbar {
	display: flex;
	justify-content: flex-end;
	margin-bottom: rem-calc(4);

	@media (max-width: 730px) {
		flex-direction: column;
		align-items: flex-end;
	}

	.tool {
		padding: 0 rem-calc(4);
		display: flex;
		align-items: center;

		label {
			color: #eee;
		}
	}

	.tab-tool {
		margin-right: auto;
	}
}
</style>
