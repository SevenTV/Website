import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/emotes",
		name: "Emotes",
		component: () => import("../views/EmoteList/EmoteList.vue"),
	},
	{
		path: "/emotes/:emote",
		name: "Emote",
		component: () => import("../views/EmotePage.vue"),
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/Admin.vue"),
	},
	{
		path: "/subscribe",
		name: "Subscribe",
		component: () => import("../views/Subscribe.vue"),
	},
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../views/About.vue"),
	},
	{
		path: "/oauth2",
		name: "OAuth2Callback",
		component: () => import("../views/OAuth2.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "Not Found",
		component: () => import("../views/404.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
