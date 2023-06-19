import { RouteRecordRaw } from "vue-router";

export const HelpRoute = {
	path: "/help",
	name: "Help",
	component: () => import("@/views/help/Help.vue"),
	children: [
		{
			path: "kick",
			name: "HelpKick",
			meta: { title: "Enable 7TV on kick.com", transparentNav: true },
			component: () => import("@/views/help/HelpKick.vue"),
		},
	],
} as RouteRecordRaw;
