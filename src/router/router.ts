import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AdminRoute } from "./admin.route";
import { CallbackRoute } from "./callback.route";
import { EmoteSetRoute } from "./emote-sets.route";
import { EmotesRoute } from "./emotes.route";
import { HomeRoute } from "./home.route";
import { InboxRoute } from "./inbox.route";
import { StoreRoute } from "./store.route";
import { UsersRoute } from "./users.route";

const routes: Array<RouteRecordRaw> = [
	HomeRoute,
	...EmotesRoute,
	...UsersRoute,
	EmoteSetRoute,
	StoreRoute,
	InboxRoute,
	AdminRoute,
	...CallbackRoute,
	{
		path: "/:pathMatch(.*)*",
		name: "Not Found",
		component: () => import("@views/404.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
