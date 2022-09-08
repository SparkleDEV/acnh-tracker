import { createRouter, createWebHistory } from 'vue-router'
import CatchListView from '../views/CatchListView.vue'

const routes = [
	{
		path: '/',
		name: 'catchlist',
		component: CatchListView
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
