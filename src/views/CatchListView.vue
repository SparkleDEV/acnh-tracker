<template>
	<div class="catch-list-view">
		<img src="@/assets/images/logo.png" alt="Logo with text saying Animal Crossing Collectible Tracker" class="logo" />
		<div class="import-export-buttons">
			<button class="import-btn" @click="pickFile()">Import data</button>
			<a class="export-btn" :href="`data:text/plain;charset=utf-8,${exportData()}`" download="export.acnhtrack"
				>Export data</a
			>
		</div>
		<div class="locale-selection">
			<select name="locale" class="locale-select" v-model="locale" @change="changeLocale">
				<option value="en">English</option>
				<option value="de">German</option>
			</select>
			<label for="locale">(only affects names)</label>
		</div>
		<input type="file" ref="fileInput" style="display: none" @change="importData" />
		<FishTable
			:northern_hemisphere="northern_hemisphere"
			:current_month="current_month"
			:show_only_spawning="show_only_spawning"
			:show_only_disappearing="show_only_disappearing"
			v-if="tab == 'fish'"
		/>
		<BugTable
			:northern_hemisphere="northern_hemisphere"
			:current_month="current_month"
			:show_only_spawning="show_only_spawning"
			:show_only_disappearing="show_only_disappearing"
			v-if="tab == 'bug'"
		/>
	</div>
</template>

<script>
import FishTable from '@/components/FishTable/FishTable.vue'
import BugTable from '@/components/BugTable/BugTable.vue'

export default {
	components: { FishTable, BugTable },
	data() {
		return {
			northern_hemisphere: this.$store.getters.isOnNorthernHemisphere,
			current_month: new Date().getMonth() + 1,
			locale: 'en',
			tab: 'fish',
			show_only_spawning: false,
			show_only_disappearing: false
		}
	},
	mounted() {
		this.locale = this.$store.state.locale
	},
	methods: {
		exportData() {
			let file_content = this.$store.getters.getExportData

			return encodeURIComponent(file_content)
		},
		importData(event) {
			let f = event.target.files[0]
			let reader = new FileReader()

			reader.onload = (file) => {
				this.$store.commit('loadExportedData', file.target.result)
			}

			reader.readAsText(f)
		},
		pickFile() {
			this.$refs.fileInput.click()
		},
		changeLocale() {
			this.$store.commit('setLocale', this.locale)
		}
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/util' as *;

.import-btn {
	@include button($blue, $font-size-px: 14);
}

.export-btn {
	@include button($green, $font-size-px: 14);
}

.catch-list-view {
	background-color: rgba($black, 0.3);
	width: fit-content;
	margin: 0 auto;
	padding-top: rem-calc(16);
	border-radius: 3px;
	position: relative;
}

.logo {
	width: rem-calc(300);
	@media (max-width: 730px) {
		margin-top: rem-calc(48);
	}
}

.import-export-buttons {
	position: absolute;
	top: rem-calc(16);
	right: rem-calc(16);
}

.locale-selection {
	position: absolute;
	top: rem-calc(16);
	left: rem-calc(16);
	display: flex;
	align-items: center;

	@media (max-width: 730px) {
		align-items: flex-start;
		flex-direction: column;
	}

	label {
		color: $white;
		margin-left: rem-calc(8);
	}
}
</style>
