<template>
	<h1>ACNH Collectible Tracker</h1>
	<button class="import-btn" @click="pickFile()">Import data</button>
	<input type="file" ref="fileInput" style="display: none" @change="importData" />
	<a class="export-btn" :href="`data:text/plain;charset=utf-8,${exportData()}`" download="export.acnhtrack"
		>Export data</a
	>
	<FishTable :northern_hemisphere="northern_hemisphere" :current_month="current_month" />
</template>

<script>
import FishTable from '@/components/FishTable/FishTable.vue'

export default {
	components: { FishTable },
	data() {
		return {
			northern_hemisphere: this.$store.getters.isOnNorthernHemisphere,
			current_month: new Date().getMonth() + 1
		}
	},
	methods: {
		exportData() {
			let file_content = this.$store.getters.getExportData

			return encodeURIComponent(file_content)

			let element = document.createElement('a')
			element.setAttribute('href', 'data:')
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
		}
	}
}
</script>
