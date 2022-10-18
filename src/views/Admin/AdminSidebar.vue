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
@import "@scss/admin/admin-sidebar.scss";
</style>
