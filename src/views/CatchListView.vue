<template>
	<div class="catch-list-view view-page">
		<SiteHead />
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
		<CreatureTable
			:northern_hemisphere="northern_hemisphere"
			:current_month="current_month"
			:show_only_spawning="show_only_spawning"
			:show_only_disappearing="show_only_disappearing"
			v-if="tab == 'creatures'"
		/>
	</div>
</template>

<script>
import SiteHead from '@/components/SiteHead.vue'

import FishTable from '@/components/FishTable/FishTable.vue'
import BugTable from '@/components/BugTable/BugTable.vue'
import CreatureTable from '@/components/CreatureTable/CreatureTable.vue'

export default {
	components: { FishTable, BugTable, CreatureTable, SiteHead },
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
	}
}
</script>
