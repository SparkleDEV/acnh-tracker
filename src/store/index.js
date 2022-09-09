import { createStore } from 'vuex'

export default createStore({
	state: {
		locale: localStorage.getItem('locale') || 'en',
		caught_fish: localStorage.caught_fish ? JSON.parse(localStorage.caught_fish) : [],
		northern_hemisphere: localStorage.getItem('northern_hemisphere')
	},
	getters: {
		hasCaught: (state) => (fish_id) => {
			return state.caught_fish.includes(fish_id)
		},
		isOnNorthernHemisphere: (state) => {
			if (state.northern_hemisphere == null) return true
			return state.northern_hemisphere
		},
		getExportData(state) {
			let data = {}

			data.caught_fish = state.caught_fish
			data.locale = state.locale

			return JSON.stringify(data)
		}
	},
	mutations: {
		setLocale(state, value) {
			state.locale = value
			localStorage.setItem('locale', value)
		},
		toggleCatchState(state, id) {
			if (state.caught_fish.includes(id)) {
				state.caught_fish = state.caught_fish.filter((f) => f != id)
			} else {
				state.caught_fish.push(id)
			}
			localStorage.setItem('caught_fish', JSON.stringify(state.caught_fish))
		},
		setNorthernHemisphere(state, value) {
			state.northern_hemisphere = value
			localStorage.setItem('northern_hemisphere', value)
		},
		loadExportedData(state, content) {
			try {
				let data = JSON.parse(content)
				state.caught_fish = data.caught_fish
				state.locale = data.locale

				localStorage.setItem('caught_fish', JSON.stringify(data.caught_fish))
				localStorage.setItem('locale', data.locale)
				alert('Data has been imported successfully (page reload is recommended)')
			} catch {
				alert("Imported data couldn't been parsed")
				console.error(`Import error, imported data: ${content}`)
			}
		}
	},
	actions: {},
	modules: {}
})
