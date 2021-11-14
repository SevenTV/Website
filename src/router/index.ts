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
		path: "/emotes/:emoteID",
		name: "Emote",
		props: true,
		component: () => import("../views/EmotePage/EmotePage.vue"),
	},
	{
		path: "/users/:userID",
		name: "User",
		props: true,
		component: () => import("../views/UserPage/UserPage.vue"),
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
		path: "/admin",
		name: "Admin",
		component: () => import("../views/Admin/Admin.vue"),
		children: [
			{ path: "reports", component: () => import("../views/Admin/AdminReports.vue") },
			{ path: "modq", component: () => import("../views/Admin/AdminModQueue.vue") },
			{ path: "users", component: () => import("../views/Admin/AdminUsers.vue") },
			{ path: "roles", component: () => import("../views/Admin/AdminRoles.vue") },
			{ path: "cosmetics", component: () => import("../views/Admin/AdminCosmetics.vue") },
			{ path: "bans", component: () => import("../views/Admin/AdminBans.vue") },
		],
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
