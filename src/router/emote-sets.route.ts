import { RouteRecordRaw } from "vue-router";

export const EmoteSetRoute = {
	path: "/emote-sets/:setID",
	name: "EmoteSet",
	props: true,
	component: () => import("@views/EmoteSetPage/EmoteSetPage.vue"),
} as RouteRecordRaw;
