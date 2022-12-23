<template>
	<div class="admin-sidebar">
		<div tablist>
			<div v-for="t of tabs" :key="t.route">
				<router-link v-if="testTabAccess(t)" class="tab-link unstyled-link" :to="t.route" :tab="t.route">
					<span> {{ t.label }} </span>
					<Icon v-if="t.icon" :icon="t.icon" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useActor } from "@store/actor";
import { Permissions } from "@/structures/Role";
import { User } from "@/structures/User";
import { computed } from "vue";
import Icon from "@/components/utility/Icon.vue";

const actorStore = useActor();
const clientUser = computed(() => actorStore.user);
const tabs = [
	{ label: "Overview", route: "/admin", icon: "columns" },
	{ label: "Reports", route: "/admin/reports", access: Permissions.ManageReports, icon: "flag" },
	{ label: "Mod Queue", route: "/admin/modq", access: Permissions.EditAnyEmote, icon: "ellipsis-h" },
	{ label: "Users", route: "/admin/users", access: Permissions.ManageUsers, icon: "users-cog" },
	{ label: "Roles", route: "/admin/roles", access: Permissions.ManageRoles, icon: "cube" },
	{ label: "Cosmetics", route: "/admin/cosmetics", icon: "palette" },
	{ label: "Bans", route: "/admin/bans", access: Permissions.ManageBans, icon: "gavel" },
] as SidebarItem[];
const testTabAccess = (tab: SidebarItem): boolean =>
	typeof tab.access === "bigint" ? User.HasPermission(clientUser.value, tab.access) : true;

interface SidebarItem {
	label: string;
	route: string;
	access: bigint;
	icon?: string;
}
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.admin-sidebar {
	margin-top: 1em;

	[tablist] {
		display: flex;
		flex-direction: column;

		[tab] {
			display: flex;
			justify-content: space-between;
			margin-bottom: 0.25em;

			font-size: 1.25em;
			padding: 0.75em;
			transform: skewY(-2.5deg);

			&:hover {
				--admin-tab-mark: currentColor;
				cursor: pointer;
			}

			@include themify() {
				background-color: themed("backgroundColor");
			}

			box-shadow: 0 2px var(--admin-tab-mark);

			&.router-link-active:not([tab="/admin"]),
			&.router-link-exact-active {
				--admin-tab-mark: rgb(30, 150, 30);
				@include themify() {
					background-color: lighten(themed("backgroundColor"), 6);
				}
			}
		}
	}
	.admin-tab {
		padding: 1em;
	}
}
</style>
