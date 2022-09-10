const util = {
	getMonthDisplay(months) {
		let ranges = []
		let already_ranged = []

		months = months.sort()

		if (months.length >= 12) return 'All year'

		months.forEach((m) => {
			if (already_ranged.includes(m)) return
			already_ranged.push(m)

			// Find chain start
			let s = m
			while (months.includes(this.getLastMonth(s))) {
				s = this.getLastMonth(s)
				already_ranged.push(s)
			}

			// Find chain end
			let e = m
			while (months.includes(this.getNextMonth(e))) {
				e = this.getNextMonth(e)
				already_ranged.push(e)
			}

			ranges.push({ start: s, end: e })
		})

		let display = ''

		ranges.forEach((r) => {
			let r_str = `${this.getMonthNameDisplayShort(r.start)} - ${this.getMonthNameDisplayShort(r.end)}`
			if (display) display += ', '
			display += r_str
		})

		return display
	},
	getLastMonth(month) {
		return month <= 1 ? 12 : month - 1
	},
	getNextMonth(month) {
		return month >= 12 ? 1 : month + 1
	},
	getMonthNameDisplayShort(month) {
		switch (month) {
			case 1:
				return 'Jan'
			case 2:
				return 'Feb'
			case 3:
				return 'Mar'
			case 4:
				return 'Apr'
			case 5:
				return 'May'
			case 6:
				return 'Jun'
			case 7:
				return 'Jul'
			case 8:
				return 'Aug'
			case 9:
				return 'Sep'
			case 10:
				return 'Oct'
			case 11:
				return 'Nov'
			case 12:
				return 'Dec'
			default:
				return '?'
		}
	}
}

export default util
