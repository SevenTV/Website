import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: defineAsyncComponent(() => import("@views/Home/Home.vue")),
	},
	{
		path: "/emotes",
		name: "Emotes",
		component: defineAsyncComponent(() => import("@views/EmoteList/EmoteList.vue")),
	},
	{
		path: "/emotes/create",
		name: "EmoteUpload",
		props: true,
		component: defineAsyncComponent(() => import("@views/EmoteUpload/EmoteUpload.vue")),
	},
	{
		path: "/emotes/:emoteID",
		name: "Emote",
		props: true,
		component: defineAsyncComponent(() => import("@views/EmotePage/EmotePage.vue")),
	},
	{
		path: "/users/:userID",
		name: "User",
		props: true,
		component: defineAsyncComponent(() => import("@views/UserPage/UserPage.vue")),
	},
	{
		path: "/emote-sets/:setID",
		name: "EmoteSet",
		props: true,
		component: defineAsyncComponent(() => import("@views/EmoteSetPage/EmoteSetPage.vue")),
	},
	{
		path: "/subscribe",
		name: "Subscribe",
		component: defineAsyncComponent(() => import("@views/Subscribe.vue")),
	},
	{
		path: "/about",
		name: "About",
		component: defineAsyncComponent(() => import("@views/About.vue")),
	},
	{
		path: "/inbox",
		name: "Inbox",
		component: defineAsyncComponent(() => import("@views/Inbox/Inbox.vue")),
	},
	{
		path: "/admin",
		name: "Admin",
		component: defineAsyncComponent(() => import("@views/Admin/Admin.vue")),
		children: [
			{
				path: "reports",
				name: "AdminReports",
				component: defineAsyncComponent(() => import("@views/Admin/AdminReports.vue")),
				children: [
					{
						path: ":reportID",
						name: "AdminReportEditor",
						component: defineAsyncComponent(() => import("@views/Admin/AdminReportEditor.vue")),
						props: true,
					},
				],
			},
			{
				path: "modq",
				name: "AdminModQueue",
				component: defineAsyncComponent(() => import("@views/Admin/AdminModQueue.vue")),
			},
			{ path: "users", component: defineAsyncComponent(() => import("@views/Admin/AdminUsers.vue")) },
			{
				path: "roles",
				name: "AdminRoles",
				component: defineAsyncComponent(() => import("@views/Admin/AdminRoles.vue")),
				children: [
					{
						path: ":roleID",
						component: defineAsyncComponent(() => import("@views/Admin/AdminRoleEditor.vue")),
						props: true,
					},
				],
			},
			{
				path: "cosmetics",
				name: "AdminCosmetics",
				component: defineAsyncComponent(() => import("@views/Admin/AdminCosmetics.vue")),
			},
			{
				path: "bans",
				name: "AdminBans",
				component: defineAsyncComponent(() => import("@views/Admin/AdminBans.vue")),
			},
		],
	},
	{
		path: "/oauth2",
		name: "OAuth2Callback",
		component: defineAsyncComponent(() => import("@views/OAuth2.vue")),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "Not Found",
		component: defineAsyncComponent(() => import("@views/404.vue")),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
