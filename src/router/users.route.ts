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
				children: [
					{
						path: "",
						name: "UserOverview",
						component: () => import("@/views/user/UserOverview.vue"),
					},
					{
						path: "settings",
						name: "UserSettings",
						component: () => import("@/views/user/UserSettings.vue"),
						props: true,
						beforeEnter: (to, _, next) => {
							const actor = useActor();
							if (
								User.HasPermission(actor.user, Permissions.ManageUsers) ||
								to.params.user === actor.user?.id
							) {
								next();
							} else {
								next(`/users/${to.params.user}`);
							}
						},
					},
				],
			},
		],
	},
] as RouteRecordRaw[];
