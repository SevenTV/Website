<template>
	<div class="admin-roles">
		<div class="role-list">
			<div
				v-for="role of roles"
				:key="role.id"
				class="role-selectable"
				:class="{ active: selectedRole === role.id, locked: !canEditRole(role) }"
				:style="{
					backgroundColor: ConvertDecimalToHex(role.color) + SetHexAlpha(0.25),
					color: role.color ? ConvertDecimalToHex(role.color) : 'currentColor',
				}"
				@click="() => selectRole(role)"
			>
				<span>{{ role.name }}</span>
				<Icon class="lock-icon" icon="lock" />
			</div>
			<div class="role-selectable create-role-btn" @click="createRole">
				<Icon icon="hexagon-plus" />
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
import { CreateRole } from "@/apollo/mutation/role.mutation";
import { GetRoles } from "@/apollo/query/role.query";
import { useActor } from "@store/actor";
import { Role } from "@/structures/Role";
import { ConvertDecimalToHex, SetHexAlpha } from "@/structures/util/Color";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Icon from "@/components/utility/Icon.vue";

const router = useRouter();
const route = useRoute();
const actorStore = useActor();
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
@import "@scss/themes.scss";

.admin-roles {
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow: hidden;

	@include themify() {
		background-color: lighten(themed("backgroundColor"), 2);

		> .role-selectable {
			background-color: transparentize(themed("color"), 0.25) !important;
		}
	}

	.role-list {
		width: 12em;
	}
	.role-selectable {
		display: flex;
		cursor: pointer;
		user-select: none;
		border-radius: inherit;
		padding: 1em;

		&:not(:hover, .active) {
			background-color: transparent !important;
		}
		.lock-icon {
			display: none;
		}
		&.locked {
			pointer-events: none;
			cursor: default;
			.lock-icon {
				display: block;
				margin-top: 0.15em;
				margin-left: 0.35em;
			}
		}
	}
	.create-role-btn {
		@include themify() {
			background-color: lighten(themed("backgroundColor"), 6) !important;
		}
		span {
			margin-left: 0.5em;
		}
	}

	.selected-role {
		padding: 1em;
		flex-grow: 1;
		@include themify() {
			background-color: lighten(themed("backgroundColor"), 1);
		}
	}
}
</style>
