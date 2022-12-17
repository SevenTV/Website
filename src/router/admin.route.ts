import { RouteRecordRaw } from "vue-router";

export const AdminRoute = {
	path: "/admin",
	name: "Admin",
	meta: { transition: "fade" },
	component: () => import("@/views/admin/Admin.vue"),
	children: [
		{
			path: "reports",
			meta: { transition: "fade", transitionMode: "out-in" },
			component: () => import("@/views/context/AdminReportContext.vue"),
			children: [
				{
					path: "",
					name: "AdminReports",
					component: () => import("@/views/admin/AdminReports.vue"),
				},
				{
					path: ":report",
					name: "AdminReportEditor",
					meta: { transition: "fade" },
					component: () => import("@/views/admin/AdminReportEditor.vue"),
				},
			],
		},
		{
			path: "modq",
			name: "AdminModQueue",
			meta: { transition: "fade", transitionMode: "out-in" },
			component: () => import("@/views/admin/ModQueue/AdminModQueue.vue"),
		},
		{ path: "users", component: () => import("@/views/admin/AdminUsers.vue") },
		{
			path: "roles",
			name: "AdminRoles",
			meta: { transition: "fade" },
			component: () => import("@/views/admin/AdminRoles.vue"),
			children: [
				{
					path: ":roleID",
					component: () => import("@/views/admin/AdminRoleEditor.vue"),
					props: true,
				},
			],
		},
		{
			path: "cosmetics",
			name: "AdminCosmetics",
			meta: { transition: "fade" },
			component: () => import("@/views/admin/AdminCosmetics.vue"),
			children: [
				{
					path: "paint-builder",
					name: "AdminPaintBuilder",
					component: () => import("@/views/admin/AdminPaintBuilder.vue"),
					props: true,
				},
			],
		},
		{
			path: "bans",
			name: "AdminBans",
			meta: { transition: "fade" },
			component: () => import("@/views/admin/AdminBans.vue"),
		},
	],
} as RouteRecordRaw;
