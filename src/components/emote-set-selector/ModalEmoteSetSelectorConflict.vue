<template>
	<ModalBase width="32em" height="16em" @close="onClose">
		<template #heading>
			<h2>{{ t("emote_set.modal.conflict_heading") }}</h2>
		</template>

		<template #content>
			<div class="emote-name-conflict-content">
				<p>{{ t("emote_set.modal.conflict_notice", { EMOTE: emote.name, EMOTE_SET: set.name }) }}</p>
			</div>
		</template>

		<template #footer>
			<div class="emote-name-conflict-buttons">
				<div class="modal-button" selector="remove">
					<span>{{ t("emote_set.modal.conflict_button_remove").toUpperCase() }}</span>
				</div>
				<div class="modal-button" selector="rename" @click="onClose">
					<span>{{ t("emote_set.modal.conflict_button_rename").toUpperCase() }}</span>
				</div>
				<div class="modal-button" selector="cancel" @click="onClose">
					<span>{{ t("common.cancel").toUpperCase() }}</span>
				</div>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import type { ModalEvent } from "@/store/modal";
import ModalBase from "@/components/modal/ModalBase.vue";
import { useI18n } from "vue-i18n";
import type { Emote } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

defineProps<{
	emote: Emote;
	set: EmoteSet;
}>();

const { t } = useI18n();

const onClose = () => {
	emit("close");
};
</script>

<style scoped lang="scss">
.emote-name-conflict-content {
	text-align: center;
	padding: 2.5em;
}

.emote-name-conflict-buttons {
	display: flex;
}

.modal-button {
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	padding: 1em;
	font-weight: bold;
	cursor: pointer;

	> span {
		text-align: center;
	}

	&[selector="remove"] {
		background-color: rgba(255, 110, 43, 50.9%);
	}
	&[selector="rename"] {
		background-color: rgba(96, 243, 76, 25%);
	}
	&[selector="cancel"] {
		background-color: rgba(255, 43, 43, 50.9%);
	}
}
</style>
