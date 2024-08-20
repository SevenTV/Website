<template>
	<ModalBase width="36em" min-height="28em" @close="onClose">
		<template #heading>
			<h2>Assign {{ kind }}</h2>
		</template>

		<template #content>
			<div class="content">
				<TextInput v-model="reason" label="Reason" />
				<div>
					Which roles are required to assign this {{ kind.toLowerCase() }}?
					<br />
					<br />
					<div class="role-list">
						<label v-for="role in roles" :key="role.id" class="role">
							<input
								type="checkbox"
								:checked="required.indexOf(role.id) !== -1"
								:label="role.name"
								@click="toggle(role.id)"
							/>
							<div
								class="role-name"
								:style="{ color: role.color ? ConvertDecimalRGBAToString(role.color) : 'currentColor' }"
							>
								<span>{{ role.name }}</span>
							</div>
						</label>
					</div>
				</div>
			</div>
		</template>

		<template #footer>
			<div class="actions">
				<div action="confirm" :disabled="!reason.length" @click="assignEntitlement">CONFIRM</div>
				<div action="cancel" @click="onClose">CANCEL</div>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LocalStorageKeys } from "@/store/lskeys";
import { useStore } from "@/store/main";
import { ModalEvent } from "@/store/modal";
import { ConvertDecimalRGBAToString } from "@/structures/util/Color";
import TextInput from "@/components/form/TextInput.vue";
import ModalBase from "@/components/modal/ModalBase.vue";

const props = defineProps<{
	kind: "BADGE" | "PAINT";
	objectRef: string;
	userId: string;
}>();

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const toggle = (roleID: string) => {
	const index = required.value.indexOf(roleID);
	if (index === -1) {
		required.value.push(roleID);
	} else {
		required.value.splice(index, 1);
	}
};

const roles = useStore().roles;

const reason = ref<string>("");
const required = ref<string[]>(["6076a86b09a4c63a38ebe801"]);

const token = localStorage.getItem(LocalStorageKeys.TOKEN);
const assignEntitlement = () => {
	const body = {
		kind: props.kind,
		object_ref: props.objectRef,
		user_id: props.userId,
		app_name: "manual",
		app_state: {
			reason: reason.value,
		},
		condition: required.value.length > 0 ? { all_roles: required.value } : undefined,
	};

	fetch(import.meta.env.VITE_APP_API_REST + "/entitlements", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	}).then(onClose);
};

const onClose = () => {
	emit("modal-event", {
		name: "close",
		args: [],
	});

	emit("close");
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1em;
	gap: 2em;
	margin: 2em;

	.role-list {
		display: flex;
		gap: 0.5em;
		flex-direction: column;

		.role {
			display: flex;
			gap: 1em;
		}
	}
}

.actions {
	display: flex;
	height: 3em;
	cursor: pointer;

	> [action] {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50%;
	}

	@include themify() {
		> [action="confirm"] {
			background-color: themed("accent");
		}
		> [action="cancel"] {
			background-color: themed("warning");
		}
		> [disabled="true"] {
			background-color: themed("secondaryBackgroundColor");
			pointer-events: none;
		}
	}
}
</style>
