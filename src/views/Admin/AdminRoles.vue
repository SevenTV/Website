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

<script setup lang="ts">
import { User } from "@/structures/User";
import { CreateRole } from "@gql/mutation/CreateRole";
import { GetRoles } from "@gql/roles/role";
import { useActorStore } from "@store/actor";
import { Role } from "@structures/Role";
import { ConvertIntColorToHex } from "@structures/util/Color";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const actorStore = useActorStore();
const clientUser = computed(() => actorStore.user);

const { result, refetch } = useQuery<GetRoles>(GetRoles);
const roles = computed(() => result.value?.roles as Role[]);
const selectedRole = ref(route.params.roleID as string);

const canEditRole = (role: Role): boolean => {
	if (!clientUser.value?.roles?.length) {
		return false;
	}
	const r = User.GetRoles(clientUser.value ?? null)?.[0];
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
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-roles.scss";
</style>
