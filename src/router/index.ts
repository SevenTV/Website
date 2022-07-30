import { useActorStore } from "@/store/actor";
import { Permissions } from "@/structures/Role";
import { User } from "@/structures/User";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: () => import("@views/Home/Home.vue"),
	},
	{
		path: "/emotes",
		name: "Emotes",
		meta: { transition: "zoom" },
		component: () => import("@views/EmoteList/EmoteList.vue"),
	},
	{
		path: "/emotes/create",
		name: "EmoteUpload",
		props: true,
		component: () => import("@views/EmoteUpload/EmoteUpload.vue"),
	},
	{
		path: "/emotes/:emoteID",
		name: "Emote",
		meta: { transition: "zoom" },
		props: true,
		component: () => import("@views/EmotePage/EmotePage.vue"),
	},
	{
		path: "/users/:userID",
		name: "User",
		props: true,
		component: () => import("@views/UserPage/UserPage.vue"),
		children: [
			{
				path: "settings",
				name: "UserSettings",
				component: () => import("@views/UserSettings/UserSettings.vue"),
				props: true,
				beforeEnter: (to, _, next) => {
					const actor = useActorStore();
					if (
						User.HasPermission(actor.user, Permissions.ManageUsers) ||
						to.params.userID === actor.user?.id
					) {
						next();
					} else {
						next(`/users/${to.params.userID}`);
					}
				},
			},
		],
	},
	{
		path: "/emote-sets/:setID",
		name: "EmoteSet",
		props: true,
		component: () => import("@views/EmoteSetPage/EmoteSetPage.vue"),
	},
	{
		path: "/subscribe",
		name: "Subscribe",
		component: () => import("@views/Subscribe.vue"),
	},
	{
		path: "/inbox",
		name: "Inbox",
		component: () => import("@views/Inbox/Inbox.vue"),
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("@views/Admin/Admin.vue"),
		children: [
			{
				path: "reports",
				name: "AdminReports",
				component: () => import("@views/Admin/AdminReports.vue"),
			},
			{
				path: "reports/:reportID",
				name: "AdminReportEditor",
				component: () => import("@views/Admin/AdminReportEditor.vue"),
				props: true,
			},
			{
				path: "modq",
				name: "AdminModQueue",
				component: () => import("@views/Admin/AdminModQueue.vue"),
			},
			{ path: "users", component: () => import("@views/Admin/AdminUsers.vue") },
			{
				path: "roles",
				name: "AdminRoles",
				component: () => import("@views/Admin/AdminRoles.vue"),
				children: [
					{
						path: ":roleID",
						component: () => import("@views/Admin/AdminRoleEditor.vue"),
						props: true,
					},
				],
			},
			{
				path: "cosmetics",
				name: "AdminCosmetics",
				component: () => import("@views/Admin/AdminCosmetics.vue"),
				children: [
					{
						path: "paint-builder",
						name: "AdminPaintBuilder",
						component: () => import("@views/Admin/AdminPaintBuilder.vue"),
						props: true,
					},
				],
			},
			{
				path: "bans",
				name: "AdminBans",
				component: () => import("@views/Admin/AdminBans.vue"),
			},
		],
	},
	{
		path: "/oauth2",
		name: "OAuth2Callback",
		component: () => import("@views/OAuth2.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "Not Found",
		component: () => import("@views/404.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
