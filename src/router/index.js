import { createRouter, createWebHistory } from 'vue-router'
import CatchListView from '../views/CatchListView.vue'
import TrackerView from '../views/TrackerView.vue'
import ShadowSizesView from '../views/ShadowSizesView.vue'

const routes = [
	{
		path: '/',
		redirect: { name: 'tracker' }
	},
	{
		path: '/tracker',
		name: 'tracker',
		component: TrackerView
	},
	{
		path: '/shadow-sizes',
		name: 'shadowsizes',
		component: ShadowSizesView
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
