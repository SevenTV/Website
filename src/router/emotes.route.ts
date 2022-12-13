import { RouteRecordRaw } from "vue-router";

export const EmotesRoute = [
	{
		path: "/emotes",
		name: "Emotes",
		meta: { transition: "zoom" },
		component: () => import("@/views/emote-list/EmoteList.vue"),
	},
	{
		path: "/emotes/create",
		name: "EmoteUpload",
		props: true,
		component: () => import("@/views/emote-upload/EmoteUpload.vue"),
	},
	{
		path: "/emotes/:emoteID",
		name: "Emote",
		meta: { transition: "zoom" },
		props: true,
		component: () => import("@/views/emote/EmotePage.vue"),
	},
	{
		path: "/migrate",
		name: "Migrate",
		meta: { transition: "fade" },
		component: () => import("@/views/provider-migration/ProviderMigration.vue"),
	},
] as RouteRecordRaw[];
