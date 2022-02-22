<template>
	<div class="admin-sidebar">
		<div tablist>
			<div v-for="t of tabs" :key="t.route">
				<router-link v-if="testTabAccess(t)" class="tab-link unstyled-link" :to="t.route" :tab="t.route">
					<span> {{ t.label }} </span>
					<font-awesome-icon v-if="t.icon" :icon="['fas', t.icon]" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useStore } from "@/store/main";
import { Permissions } from "@/structures/Role";
import { User } from "@/structures/User";
import { computed, defineComponent } from "vue";

export default defineComponent({
	setup() {
		const store = useStore();
		const clientUser = computed(() => store.getClientUser);

		const tabs = [
			{ label: "Overview", route: "/admin", icon: "columns" },
			{ label: "Reports", route: "/admin/reports", access: Permissions.ManageReports, icon: "flag" },
			{ label: "Mod Queue", route: "/admin/modq", access: Permissions.EditAnyEmote, icon: "ellipsis-h" },
			{ label: "Users", route: "/admin/users", access: Permissions.ManageBans, icon: "users-cog" },
			{ label: "Roles", route: "/admin/roles", access: Permissions.ManageRoles, icon: "cube" },
			{ label: "Cosmetics", route: "/admin/cosmetics", icon: "palette" },
			{ label: "Bans", route: "/admin/bans", icon: "gavel" },
		] as SidebarItem[];
		const testTabAccess = (tab: SidebarItem): boolean =>
			typeof tab.access === "bigint" ? User.HasPermission(clientUser.value, tab.access) : true;

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
