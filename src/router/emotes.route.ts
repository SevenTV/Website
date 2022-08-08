import { RouteRecordRaw } from "vue-router";

export const EmotesRoute = [
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
] as RouteRecordRaw[];
