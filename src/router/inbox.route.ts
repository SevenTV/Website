import { RouteRecordRaw } from "vue-router";

export const InboxRoute = {
	path: "/inbox",
	name: "Inbox",
	component: () => import("@views/Inbox/Inbox.vue"),
} as RouteRecordRaw;
