<template>
	<div class="admin-roles">
		<div class="role-list">
			<div
				v-for="role of roles"
				:key="role.id"
				class="role-selectable"
				:class="{ active: selectedRole === role.id, locked: !canEditRole(role) }"
				:style="{
					backgroundColor: ConvertIntColorToHex(role.color, 0.25),
					color: ConvertIntColorToHex(role.color),
				}"
				@click="() => selectRole(role)"
			>
				<span>{{ role.name }}</span>
				<font-awesome-icon class="lock-icon" :icon="['fas', 'lock']" />
			</div>
			<div class="role-selectable create-role-btn" @click="createRole">
				<font-awesome-icon :icon="['fas', 'plus']" />
				<span>Create Role</span>
			</div>
		</div>

		<div class="selected-role">
			<router-view :role-data="JSON.stringify(roles?.find((r) => r.id === selectedRole))" @deleted="onDeleted" />
		</div>
	</div>
</template>

<script lang="ts">
import { CreateRole } from "@/assets/gql/mutation/CreateRole";
import { GetRoles } from "@/assets/gql/roles/role";
import { useStore } from "@/store";
import { Role } from "@/structures/Role";
import { ConvertIntColorToHex, User } from "@/structures/User";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
	setup() {
		const router = useRouter();
		const route = useRoute();
		const store = useStore();
		const clientUser = computed(() => store.getters.clientUser as User);

		const { result, refetch } = useQuery<GetRoles>(GetRoles);
		const roles = computed(() => result.value?.roles as Role[]);
		const selectedRole = ref(route.params.roleID as string);

		const canEditRole = (role: Role): boolean => {
			if (!clientUser.value?.roles?.length) {
				return false;
			}
			const r = clientUser.value.roles[0];
			if (role.position >= r.position) {
				return false;
			}
			return true;
		};
		const selectRole = (role: Role) => {
			selectedRole.value = role.id;
			router.replace(`/admin/roles/${role.id}`);
		};

		const createRoleMutation = useMutation<CreateRole>(CreateRole);
		const createRole = () => {
			createRoleMutation
				.mutate({
					data: {
						name: "New Role",
						color: 0,
						allowed: "0",
						denied: "0",
					},
				})
				.then((res) => roles.value.push(res?.data?.createRole as Role));
		};
		const onDeleted = () => {
			refetch();
			router.replace("/admin/roles");
		};
		return {
			roles,
			selectedRole,
			selectRole,
			createRole,
			canEditRole,
			onDeleted,
			ConvertIntColorToHex,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-roles.scss";
</style>
