import { createStore } from 'vuex'

export default createStore({
	state: {
		locale: localStorage.getItem('locale') || 'en',
		caught_fish: localStorage.caught_fish ? JSON.parse(localStorage.caught_fish) : [],
		caught_bugs: localStorage.caught_bugs ? JSON.parse(localStorage.caught_bugs) : [],
		northern_hemisphere: localStorage.getItem('northern_hemisphere'),
		settings: {}
	},
	getters: {
		hasCaughtFish: (state) => (fish_id) => {
			return state.caught_fish.includes(fish_id)
		},
		hasCaughtBug: (state) => (bug_id) => {
			return state.caught_bugs.includes(bug_id)
		},
		isOnNorthernHemisphere: (state) => {
			if (state.northern_hemisphere == null) return true
			return state.northern_hemisphere
		},
		getExportData(state) {
			let data = {}

			data.caught_fish = state.caught_fish
			data.caught_bugs = state.caught_bugs
			data.locale = state.locale

			return JSON.stringify(data)
		},
		getSetting: (state) => (key) => {
			return state.settings[key]
		}
	},
	mutations: {
		setLocale(state, value) {
			state.locale = value
			localStorage.setItem('locale', value)
		},
		toggleFishCatchState(state, id) {
			if (state.caught_fish.includes(id)) {
				state.caught_fish = state.caught_fish.filter((f) => f != id)
			} else {
				state.caught_fish.push(id)
			}
			localStorage.setItem('caught_fish', JSON.stringify(state.caught_fish))
		},
		toggleBugCatchState(state, id) {
			if (state.caught_bugs.includes(id)) {
				state.caught_bugs = state.caught_bugs.filter((f) => f != id)
			} else {
				state.caught_bugs.push(id)
			}
			localStorage.setItem('caught_bugs', JSON.stringify(state.caught_bugs))
		},
		setNorthernHemisphere(state, value) {
			state.northern_hemisphere = value
			localStorage.setItem('northern_hemisphere', value)
		},
		setSetting(state, key, value) {
			state.setting[key] = value
		},
		loadExportedData(state, content) {
			try {
				let data = JSON.parse(content)
				state.caught_fish = data.caught_fish
				state.caught_bugs = data.caught_bugs
				state.locale = data.locale

				localStorage.setItem('caught_fish', JSON.stringify(data.caught_fish))
				localStorage.setItem('caught_bugs', JSON.stringify(data.caught_bugs))
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
