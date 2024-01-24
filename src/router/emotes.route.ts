import { RouteRecordRaw } from "vue-router";

export const EmotesRoute = [
	{
		path: "/emotes",
		name: "Emotes",
		component: () => import("@/views/context/EmoteContext.vue"),
		children: [
			{
				path: "",
				name: "EmoteList",
				meta: { transition: "zoom" },
				component: () => import("@/views/emote-list/EmoteList.vue"),
			},
			{
				path: "/emotes/:emote",
				meta: { transition: "zoom", requestEmoteContext: true },
				props: true,
				name: "Emote",
				component: () => import("@/views/emote/EmoteRoot.vue"),
			},
		],
	},
	{
		path: "/emotes/create",
		name: "EmoteUpload",
		props: true,
		component: () => import("@/views/emote-upload/EmoteUpload.vue"),
	},
] as RouteRecordRaw[];
