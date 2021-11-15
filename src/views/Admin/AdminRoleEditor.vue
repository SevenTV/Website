<template>
	<div class="role-editor" v-if="role">
		<h2>{{ role.name }}</h2>

		<div class="role-permissions">
			<div class="permission-bit" v-for="[k, b] of permissions" :key="k">
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
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, watch } from "vue-demi";

export default defineComponent({
	props: {
		roleID: String,
		roleData: String,
	},
	setup(props) {
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

		return {
			role,
			permissions,
		};
	},
});
</script>
