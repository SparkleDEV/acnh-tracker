import { createRouter, createWebHistory } from 'vue-router'
import CatchListView from '../views/CatchListView.vue'
import ShadowSizesView from '../views/ShadowSizesView.vue'

const routes = [
	{
		path: '/',
		name: 'catchlist',
		component: CatchListView
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
