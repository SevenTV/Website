import { useActor } from "@/store/actor";
import { Permissions } from "@/structures/Role";
import { User } from "@/structures/User";
import { RouteRecordRaw } from "vue-router";

export const UsersRoute = [
	{
		path: "/users/:user",
		props: true,
		meta: { transition: "fade" },
		component: () => import("@/views/context/UserContext.vue"),
		children: [
			{
				path: "",
				name: "User",
				component: () => import("@/views/user/UserRoot.vue"),
			},
			{
				path: "settings",
				name: "UserSettings",
				component: () => import("@/views/user-settings/UserSettings.vue"),
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
