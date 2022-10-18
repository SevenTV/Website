import { RouteRecordRaw } from "vue-router";

export const CallbackRoute = [
	{
		path: "/oauth2",
		name: "OAuth2Callback",
		component: () => import("@/views/OAuth2.vue"),
	},
] as RouteRecordRaw[];
