<template>
	<div class="user-role-list" :class="{ manage: canManage }">
		<div
			v-for="role of roles"
			:key="role.id"
			class="user-role-chip"
			:style="{ color: role.color ? ConvertDecimalRGBAToString(role.color) : 'currentColor' }"
		>
			<span>{{ role.name }}</span>

			<Icon icon="remove" class="role-interact-remove" @click="setRole(role, 'REMOVE')" />
		</div>

		<!-- Add Role -->
		<div v-if="canManage" class="role-interact-add" @click="openRoleMenu">
			<Icon icon="plus" />
		</div>

		<!-- Role Selector -->
		<div v-if="roleSelectorOpen">
			<div ref="roleSelector" class="role-selector">
				<div
					v-for="role of availableRoles.values()"
					:key="role.id"
					class="grantable-role"
					@click="setRole(role, 'ADD')"
				>
					<span :style="{ color: role.color ? ConvertDecimalRGBAToString(role.color) : 'currentColor' }">
						{{ role.name }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { onClickOutside } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useActor } from "@/store/actor";
import { useStore } from "@/store/main";
import { UpdateUserRoles } from "@/apollo/mutation/user-role.mutation";
import { ListItemAction } from "@/structures/Common";
import { Permissions, Role } from "@/structures/Role";
import { User } from "@/structures/User";
import { ConvertDecimalRGBAToString } from "@/structures/util/Color";
import Icon from "./Icon.vue";

const props = defineProps<{
	user: User;
}>();

const roles = computed(() => (User.GetRoles(props.user) ?? []).filter((r) => !r.invisible));

const { roleList } = storeToRefs(useStore());
const actor = useActor();
const canManage = computed(
	() => actor.hasPermission(Permissions.ManageRoles) && actor.hasPermission(Permissions.ManageUsers),
);

const availableRoles = ref([] as Role[]);

const setRole = (role: Role, action: ListItemAction) => {
	const { onError, onDone, mutate } = useMutation<UpdateUserRoles.Result, UpdateUserRoles.Variables>(
		UpdateUserRoles,
		{
			variables: {
				user_id: props.user.id,
				role_id: role.id,
				action: action,
			},
		},
	);

	mutate();

	onError((err) => {
		actor.showErrorModal(err);
	});
	onDone(() => {
		roleSelectorOpen.value = false;
	});
};

const roleSelector = ref<HTMLElement | null>(null);
const roleSelectorOpen = ref(false);

const openRoleMenu = () => {
	roleSelectorOpen.value = !roleSelectorOpen.value;

	availableRoles.value = roleList.value.filter((r) => actor.mayEditRole(r) && !r.invisible);

	if (!roleSelector.value) {
		return;
	}
};

onClickOutside(roleSelector, () => {
	roleSelectorOpen.value = false;
});
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.user-role-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.25em;
	margin-right: 0.25em;
	margin-left: 0.25em;

	> .role-interact-add {
		cursor: pointer;
		padding: 0.5em;
		border-radius: 0.25rem;
	}

	@include themify() {
		> .user-role-chip {
			background-color: lighten(themed("backgroundColor"), 2);
		}

		> .user-role-chip > .role-interact-remove {
			color: themed("warning");
		}

		> .role-interact-add {
			background-color: mix(themed("backgroundColor"), themed("primary"), 50%);
		}

		.role-selector {
			background-color: lighten(themed("backgroundColor"), 2);

			> .grantable-role {
				&:hover {
					background-color: lighten(themed("backgroundColor"), 5);
				}
			}
		}
	}

	.user-role-chip {
		display: grid;
		align-items: center;
		column-gap: 0.25em;
		grid-template-columns: auto;

		padding: 0.5em;
		border-radius: 0.25rem;
		max-width: 12em;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		> span {
			user-select: none;
		}

		> .role-interact-remove {
			display: none;
			cursor: pointer;
		}
	}

	&.manage {
		> .user-role-chip {
			grid-template-columns: auto auto;

			> .role-interact-remove {
				display: block;
			}
		}
	}

	.role-selector {
		position: absolute;
		z-index: 1;
		display: grid;
		gap: 0.5em;
		border-radius: 0.25rem;
		max-height: 12em;
		overflow: auto;

		> .grantable-role {
			cursor: pointer;
			padding: 0.5em;
			border-radius: 0.25rem;
		}
	}
}
</style>
