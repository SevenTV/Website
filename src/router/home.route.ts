import { RouteRecordRaw } from "vue-router";

export const HomeRoute = {
	path: "/",
	name: "Home",
	meta: { transparentNav: true },
	component: () => import("@views/Home/Home.vue"),
} as RouteRecordRaw;
