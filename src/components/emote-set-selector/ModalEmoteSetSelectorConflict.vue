<template>
	<ModalBase width="32em" height="16em" @close="onClose">
		<template #heading>
			<h2>{{ t("emote_set.modal.conflict_heading") }}</h2>
		</template>

		<template #content>
			<div class="emote-name-conflict-content">
				<i18n-t keypath="emote_set.modal.conflict_notice">
					<template #EMOTE>
						<EmoteMention :emote="emote" />
					</template>
					<template #ACTIVE_EMOTE>
						<EmoteMention :emote="activeEmote" />
					</template>
				</i18n-t>
			</div>
		</template>

		<template #footer>
			<div class="emote-name-conflict-buttons">
				<div class="modal-button" selector="remove" @click="onClose('remove')">
					<span>{{ t("emote_set.modal.conflict_button_replace").toUpperCase() }}</span>
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
import EmoteMention from "../utility/EmoteMention.vue";
import { useQuery } from "@vue/apollo-composable";
import { GetEmote, GetMinimalEmote } from "@/assets/gql/emotes/emote";
import { computed } from "vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const props = defineProps<{
	emote: Emote;
	activeEmote: Emote;
	set: EmoteSet;
}>();

const { t } = useI18n();

const { result } = useQuery<GetEmote>(GetMinimalEmote, { id: props.activeEmote.id });
const activeEmote = computed(() => (result.value?.emote ?? null) as Emote | null);

const onClose = (evt?: string) => {
	if (evt) {
		emit("modal-event", { name: evt, args: [] });
	}

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
	&[selector="cancel"] {
		background-color: rgba(255, 43, 43, 50.9%);
	}
}
</style>
