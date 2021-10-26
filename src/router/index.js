import { createRouter, createWebHistory } from "@ionic/vue-router"
import Tabs from "../views/Tabs.vue"

const routes = [
	{
		path: "/",
		redirect: "/codes",
	},
	{
		path: "/",
		component: Tabs,
		children: [
			{
				path: "codes",
				component: () => import("@/views/Tab1.vue"),
			},
			{
				path: "settings",
				component: () => import("@/views/Tab2.vue"),
			},
			{
				path: "advanced",
				component: () => import("@/views/Tab4.vue"),
			},
		],
	},
	{ path: "/:CatchAll(.*)*", redirect: "/codes" },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeResolve(() => {
	if (window.navigator.vibrate) {
		window.navigator.vibrate(25)
	}
})

export default router
