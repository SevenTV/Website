import { useActor } from "@/store/actor";
import { Permissions } from "@/structures/Role";
import { User } from "@/structures/User";
import { RouteRecordRaw } from "vue-router";

export const UsersRoute = [
	{
		path: "/users/:userID",
		name: "User",
		props: true,
		meta: { transition: "fade" },
		component: () => import("@/views/UserPage/UserPage.vue"),
		children: [
			{
				path: "settings",
				name: "UserSettings",
				component: () => import("@/views/UserSettings/UserSettings.vue"),
				props: true,
				beforeEnter: (to, _, next) => {
					const actor = useActor();
					if (
						User.HasPermission(actor.user, Permissions.ManageUsers) ||
						to.params.userID === actor.user?.id
					) {
						next();
					} else {
						next(`/users/${to.params.userID}`);
					}
				},
			},
		],
	},
] as RouteRecordRaw[];
