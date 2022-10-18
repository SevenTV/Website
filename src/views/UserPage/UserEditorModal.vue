<template>
	<ModalBase width="36em" min-height="28em" @close="onClose">
		<template #heading>
			<h2>{{ t("user.editor_modal_heading", [user.display_name]) }}</h2>
		</template>

		<template #content>
			<div class="user-editor">
				<!-- Display editor or search box -->
				<section class="selected-user" :user="!!editor">
					<p>{{ !editor ? t("user.editor_modal_user_search") : t("user.editor_modal_user_update") }}</p>
					<UserTag v-if="editor" :user="editor?.user" scale="1rem" />

					<UserQuickSearch v-else :event-only="true" @select="setEditor" />
				</section>

				<!-- Permission Selector -->
				<section v-if="permissions.size > 2" class="permissions">
					<div v-for="[k, b] of permissions" :key="k" class="permission-bit">
						<Checkbox
							:label="k.replace(/[A-Z]/g, ' $&').trim()"
							:test="b"
							:checked="b"
							@change="setBit(k, ($event.target as HTMLInputElement)?.checked)"
						/>
					</div>
				</section>
			</div>
		</template>

		<template #footer>
			<div class="user-editor-actions">
				<div action="save" @click="onSave()">SAVE</div>
				<div action="revoke" @click="onSave(true)">REVOKE PRIVILEGES</div>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { ModalEvent } from "@/store/modal";
import { User } from "@/structures/User";
import { useI18n } from "vue-i18n";
import { defineAsyncComponent, ref, watch } from "vue";
import { HasBits } from "@/structures/util/BitField";
import { useMutationStore } from "@/store/mutation";
import { useActor } from "@/store/actor";
import ModalBase from "@/components/modal/ModalBase.vue";
import UserTag from "@/components/utility/UserTag.vue";
import Checkbox from "@/components/form/Checkbox.vue";

const UserQuickSearch = defineAsyncComponent(() => import("@/components/utility/UserQuickSearch.vue"));

const props = defineProps<{
	user: User;
	editor?: User.Editor;
}>();

const editor = ref<User.Editor | null>(props.editor ?? null);
const newPermissionValue = ref(props.editor?.permissions ?? 0);

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const { t } = useI18n();

const setEditor = (user: User | null) => {
	if (user && user.id !== props.user.id) {
		editor.value = {
			id: user.id,
			connections: [],
			user: user,
			permissions: User.EditorPermission.ModifyEmotes | User.EditorPermission.ManageEmoteSets,
			visible: true,
		};

		newPermissionValue.value = editor.value.permissions;
	} else {
		editor.value = null;
	}
};

const permissions = ref(new Map<string, boolean>());

const setBit = (k: string, v: boolean): void => {
	if (!editor.value) {
		return undefined;
	}

	const t = k as keyof typeof User.EditorPermission;
	if (v) {
		newPermissionValue.value |= User.EditorPermission[t];
	} else {
		newPermissionValue.value &= ~User.EditorPermission[t];
	}
};

watch(
	editor,
	(v) => {
		if (!v) {
			return;
		}

		Object.keys(User.EditorPermission).forEach((k) => {
			permissions.value.set(
				k,
				HasBits(v.permissions ?? 0, User.EditorPermission[k as keyof typeof User.EditorPermission])
					? true
					: HasBits(v.permissions ?? 0, User.EditorPermission[k as keyof typeof User.EditorPermission]) ||
							false,
			);
		});
	},
	{ immediate: true },
);

const actor = useActor();
const m = useMutationStore();
const onSave = (revoke?: boolean) => {
	if (!editor.value) {
		return;
	}

	m.editUserEditors(props.user.id, editor.value.id, {
		permissions: revoke ? 0 : newPermissionValue.value,
	})
		.catch(actor.showErrorModal)
		.then((res) => {
			emit("modal-event", {
				name: "editors",
				args: [res?.data?.user.editors ?? []],
			});
			onClose();
		});
};

const onClose = () => {
	emit("close");
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.user-editor {
	display: flex;
	flex-direction: column;
	padding: 1em;
	gap: 1em;

	> section.selected-user {
		> p {
			margin-bottom: 0.75em;
			letter-spacing: -0.01em;
			font-weight: 500;
			font-size: 0.88rem;
		}
	}

	> section.permissions {
		border-top: 1px solid currentColor;
		padding-top: 1em;

		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
}

.user-editor-actions {
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
		> [action="save"] {
			background-color: themed("accent");
		}
		> [action="revoke"] {
			background-color: themed("warning");
		}
	}
}
</style>
