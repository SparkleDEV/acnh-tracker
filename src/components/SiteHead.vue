<template>
	<div class="site-head">
		<router-link to="/">
			<img
				src="@/assets/images/logo.png"
				alt="Logo with text saying Animal Crossing Collectible Tracker"
				class="logo"
			/>
		</router-link>
		<h3 style="color: #eee; margin-top: 0; text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25)">( Preview version )</h3>
		<h2 class="page-title" v-if="title">{{ title }}</h2>
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
	</div>
</template>

<script>
export default {
	props: ['title'],
	data() {
		return {
			locale: 'en'
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

.site-head {
	position: relative;
}

.page-title {
	font-size: rem-calc(48);
	margin-block-start: rem-calc(16);
	margin-block-end: rem-calc(8);
	color: #eee;
	text-shadow: 2px 2px 2px rgba($black, 0.25);
	font-family: $font-family__fink-heavy;
}

.import-btn {
	@include button($blue, $font-size-px: 14);
}

.export-btn {
	@include button($green, $font-size-px: 14);
}

.logo {
	width: rem-calc(300);

	@media (max-width: #{$bp-small}) {
		width: rem-calc(230);
	}
}

.import-export-buttons {
	position: absolute;
	top: 0;
	right: rem-calc(16);
	display: flex;
	flex-direction: row;
	gap: rem-calc(8);

	@media (max-width: #{$bp-medium}) {
		position: unset;
		margin-top: rem-calc(16);
		justify-content: center;
	}
}

.locale-selection {
	position: absolute;
	top: 0;
	left: rem-calc(16);
	display: flex;
	align-items: center;

	label {
		color: $white;
		margin-left: rem-calc(8);
	}

	@media (max-width: #{$bp-medium}) {
		label {
			display: none;
		}

		position: unset;
		justify-content: center;
		margin-top: rem-calc(16);
	}
}
</style>
