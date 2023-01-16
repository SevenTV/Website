<template>
	<div v-if="role" class="role-editor">
		<div class="role-heading">
			<p>
				<TextInput v-model="role.name" label="Role Name" @focusout="() => editRole(['name'])" />
			</p>
			<div selector="buttons">
				<IconButton color="warning" tooltip="Delete" fa-icon="trash" @interact="deleteRole" />
			</div>
		</div>

		<div class="role-permissions">
			<div v-for="[k, b] of permissions" :key="k" class="permission-bit">
				<label> {{ k.replace(/[A-Z]/g, " $&").trim() }} </label>

				<div class="permission-switcher" :state="String(b)">
					<span :selected="b === false" @click="() => denyBit(k as keyof typeof Permissions)">
						<Icon size="lg" icon="close" />
					</span>
					<span :selected="b === null" @click="() => neutralBit(k as keyof typeof Permissions)">
						<Icon size="lg" icon="minus" />
					</span>
					<span :selected="b === true" @click="() => allowBit(k as keyof typeof Permissions)">
						<Icon size="lg" icon="check" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useActor } from "@/store/actor";
import { EditRole } from "@/apollo/mutation/role.mutation";
import { DeleteRole } from "@/apollo/mutation/role.mutation";
import { GetRole } from "@/apollo/query/role.query";
import { Permissions, Role } from "@/structures/Role";
import { HasBits64 } from "@/structures/util/BitField";
import TextInput from "@/components/form/TextInput.vue";
import Icon from "@/components/utility/Icon.vue";
import IconButton from "@utility/IconButton.vue";

const props = defineProps({
	roleID: String,
	roleData: String,
});

const emit = defineEmits(["deleted"]);
const role = computed(() => (props.roleData ? (JSON.parse(props.roleData) as Role) : (result.value?.role as Role)));
const { result } = useQuery<GetRole>(GetRole, { id: props.roleID });
const permissions = ref(new Map<string, boolean | null>());

watch(
	role,
	() => {
		Object.keys(Permissions).forEach((k) =>
			permissions.value.set(
				k,
				HasBits64(BigInt(role.value?.denied ?? 0), Permissions[k as keyof typeof Permissions])
					? false
					: HasBits64(BigInt(role.value?.allowed ?? 0), Permissions[k as keyof typeof Permissions]) || null,
			),
		);
	},
	{ immediate: true },
);

const denyBit = (b: keyof typeof Permissions) => [permissions.value.set(b, false), editRole(["denied"])];
const neutralBit = (b: keyof typeof Permissions) => [permissions.value.set(b, null), editRole(["allowed", "denied"])];
const allowBit = (b: keyof typeof Permissions) => [permissions.value.set(b, true), editRole(["allowed"])];

const actor = useActor();

const editRoleMutation = useMutation<EditRole>(EditRole);
const editRole = (fields: (keyof Role)[]) => {
	const d = {} as Partial<Role>;

	if (fields.includes("allowed") || fields.includes("denied")) {
		let allowed = 0n;
		let denied = 0n;

		permissions.value.forEach((b, k) => {
			if (b === true) {
				allowed |= BigInt(Permissions[k as keyof typeof Permissions]);
			} else if (b === false) {
				denied |= BigInt(Permissions[k as keyof typeof Permissions]);
			}
		});

		d.allowed = String(allowed);
		d.denied = String(denied);
	}

	if (fields.includes("name")) {
		d.name = role.value?.name;
	}

	editRoleMutation.mutate({ id: role.value.id, data: d }).catch((err) => actor.showErrorModal(err));
};

const deleteRoleMutation = useMutation<DeleteRole>(DeleteRole);
const deleteRole = () =>
	deleteRoleMutation.mutate({ role_id: role.value.id }).then((res) => {
		emit("deleted", res?.data?.deleteRole);
	});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.role-editor {
	@include themify() {
		> div.role-permissions > div.permission-bit {
			> div.permission-switcher {
				background-color: lighten(themed("backgroundColor"), 4);

				&[state="false"] > span:nth-child(1) {
					background-color: themed("warning");
					cursor: default;
				}
				&[state="null"] > span:nth-child(2) {
					background-color: lighten(themed("backgroundColor"), 8);
					cursor: default;
				}
				&[state="true"] > span:nth-child(3) {
					background-color: themed("accent");
					cursor: default;
				}
			}
		}
	}

	.role-heading {
		display: flex;
		justify-content: space-between;

		> div[selector="buttons"] {
			display: flex;
		}
	}

	> div.role-permissions > div.permission-bit {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.66em;
		padding-bottom: 0.66em;
		border-bottom: 1px solid currentColor;

		> label {
			margin-bottom: 0.25em;
		}

		> div.permission-switcher {
			width: fit-content;
			border-radius: 0.25em;
			overflow: hidden;

			> span {
				cursor: pointer;
				display: inline-block;
				vertical-align: middle;
				text-align: center;
				padding-top: 0.5em;
				width: 2em;
				height: 2em;
			}
		}
	}
}
</style>
