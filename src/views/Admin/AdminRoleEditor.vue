<template>
	<div v-if="role" class="role-editor">
		<div class="role-heading">
			<h2>{{ role.name }}</h2>
			<IconButton color="warning" tooltip="Delete" fa-icon="trash" @interact="deleteRole" />
		</div>

		<div class="role-permissions">
			<div v-for="[k, b] of permissions" :key="k" class="permission-bit">
				<span>{{ k }} {{ b }}</span>
				<span v-if="b === null">unset</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { GetRole } from "@/assets/gql/roles/role";
import { Role, RolePermissions } from "@/structures/Role";
import { HasBits64 } from "@/structures/util/BitField";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, watch } from "vue";
import { DeleteRole } from "@/assets/gql/mutation/DeleteRole";
import IconButton from "@/components/utility/IconButton.vue";

export default defineComponent({
	components: { IconButton },
	props: {
		roleID: String,
		roleData: String,
	},
	setup(props, { emit }) {
		const role = computed(() =>
			props.roleData ? (JSON.parse(props.roleData) as Role) : (result.value?.role as Role)
		);
		const roleID = computed(() => props.roleID);
		const { result } = useQuery<GetRole>(GetRole, { id: roleID });
		const permissions = new Map<string, boolean | null>();
		watch(role, () => {
			Object.keys(RolePermissions).forEach((k) =>
				permissions.set(
					k,
					HasBits64(BigInt(role.value?.denied ?? 0), RolePermissions[k as keyof typeof RolePermissions])
						? false
						: HasBits64(
								BigInt(role.value?.allowed ?? 0),
								RolePermissions[k as keyof typeof RolePermissions]
						  ) || null
				)
			);
		});

		const deleteRoleMutation = useMutation<DeleteRole>(DeleteRole);
		const deleteRole = () =>
			deleteRoleMutation.mutate({ role_id: role.value.id }).then((res) => {
				emit("deleted", res?.data?.deleteRole);
			});

		return {
			role,
			permissions,
			deleteRole,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-role-editor.scss";
</style>
