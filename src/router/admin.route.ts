import { RouteRecordRaw } from "vue-router";

export const AdminRoute = {
	path: "/admin",
	name: "Admin",
	meta: { transition: "fade" },
	component: () => import("@views/Admin/Admin.vue"),
	children: [
		{
			path: "",
			name: "AdminOverview",
			meta: { transition: "fade" },
			component: () => import("@views/Admin/AdminOverview.vue"),
		},
		{
			path: "reports",
			name: "AdminReports",
			meta: { transition: "fade", transitionMode: "out-in" },
			component: () => import("@views/Admin/AdminReports.vue"),
		},
		{
			path: "reports/:reportID",
			name: "AdminReportEditor",
			meta: { transition: "fade" },
			component: () => import("@views/Admin/AdminReportEditor.vue"),
			props: true,
		},
		{
			path: "modq",
			name: "AdminModQueue",
			meta: { transition: "fade", transitionMode: "out-in" },
			component: () => import("@views/Admin/ModQueue/AdminModQueue.vue"),
		},
		{ path: "users", component: () => import("@views/Admin/AdminUsers.vue") },
		{
			path: "roles",
			name: "AdminRoles",
			meta: { transition: "fade" },
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
			meta: { transition: "fade" },
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
			meta: { transition: "fade" },
			component: () => import("@views/Admin/AdminBans.vue"),
		},
	],
} as RouteRecordRaw;
