<template>
	<div class="admin-roles">
		<div class="role-list">
			<div
				class="role-selectable"
				:class="{ active: selectedRole === role.id }"
				@click="() => selectRole(role.id)"
				v-for="role of roles"
				:key="role.id"
				:style="{
					backgroundColor: ConvertIntColorToHex(role.color, 0.25),
					color: ConvertIntColorToHex(role.color),
				}"
			>
				<span> {{ role.name }} </span>
			</div>
			<div class="role-selectable create-role-btn">
				<font-awesome-icon :icon="['fas', 'plus']" />
				<span>Create Role</span>
			</div>
		</div>

		<div class="selected-role">
			<router-view :roleData="JSON.stringify(roles?.find((r) => r.id === selectedRole))" />
		</div>
	</div>
</template>

<script lang="ts">
import { GetRoles } from "@/assets/gql/roles/role";
import { Role } from "@/structures/Role";
import { ConvertIntColorToHex } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, ref } from "vue-demi";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
	setup() {
		const router = useRouter();
		const route = useRoute();

		const { result } = useQuery<GetRoles>(GetRoles);
		const roles = computed(() => result.value?.roles as Role[]);
		const selectedRole = ref(route.params.roleID as string);

		const selectRole = (id: string) => {
			selectedRole.value = id;
			router.replace(`/admin/roles/${id}`);
		};
		return {
			roles,
			selectedRole,
			selectRole,
			ConvertIntColorToHex,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-roles.scss";
</style>
