import { RouteRecordRaw } from "vue-router";

export const AdminRoute = {
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
} as RouteRecordRaw;
