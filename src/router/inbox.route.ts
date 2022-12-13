import { RouteRecordRaw } from "vue-router";

export const InboxRoute = {
	path: "/inbox",
	name: "Inbox",
	component: () => import("@/views/inbox/Inbox.vue"),
} as RouteRecordRaw;
