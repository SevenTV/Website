import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
	},
	{
		path: "/emotes",
		name: "Emotes",
		component: () => import(/* webpackChunkName: "about" */ "../views/Emotes.vue"),
	},
	{
		path: "/emotes/:id",
		name: "Emote",
		component: () => import(/* webpackChunkName: "about" */ "../views/EmotePage.vue"),
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
	},
	{
		path: "/",
		name: "Home",
		component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "Not Found",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/404.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
