<template>
	<div class="admin-sidebar">
		<div tablist>
			<router-link class="tab-link unstyled-link" tab v-for="t of tabs" :key="t.route" :to="t.route">
				<span> {{ t.label }} </span>
				<font-awesome-icon v-if="t.icon" :icon="['fas', t.icon]" />
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { RolePermissions } from "@/structures/Role";
import { User, UserHasPermission } from "@/structures/User";
import { computed, defineComponent } from "vue-demi";

export default defineComponent({
	setup() {
		const store = useStore();
		const clientUser = computed(() => store.getters.clientUser as User);

		const tabs = [
			{ label: "Overview", route: "/admin", icon: "columns" },
			{ label: "Reports", route: "/admin/reports", access: RolePermissions.ManageReports, icon: "flag" },
			{ label: "Mod Queue", route: "/admin/modq", access: RolePermissions.EditAnyEmote, icon: "ellipsis-h" },
			{ label: "Users", route: "/admin/users", access: RolePermissions.ManageBans, icon: "users-cog" },
			{ label: "Roles", route: "/admin/roles", access: RolePermissions.ManageRoles, icon: "cube" },
			{ label: "Cosmetics", route: "/admin/cosmetics", icon: "palette" },
			{ label: "Bans", route: "/admin/bans", icon: "gavel" },
		] as SidebarItem[];
		const testTabAccess = (tab: SidebarItem): boolean => UserHasPermission(clientUser.value, tab.access);

		return {
			tabs,
			testTabAccess,
		};
	},
});

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
