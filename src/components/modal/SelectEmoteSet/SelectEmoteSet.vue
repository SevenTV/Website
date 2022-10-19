<template>
	<ModalBase width="32em">
		<template #heading>
			<h3 v-if="mode === 'emote'">{{ t("emote.use") }}</h3>
		</template>

		<template #content>
			<EmoteSetSelector :mode="mode" :emote="emote" />
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Emote } from "@/structures/Emote";
import ModalBase from "@/components/modal/ModalBase.vue";
import EmoteSetSelector from "@/components/emote-set-selector/EmoteSetSelector.vue";

const { t } = useI18n();

withDefaults(
	defineProps<{
		emote?: Emote | null;
		mode?: "assign" | "emote";
	}>(),
	{
		mode: "emote",
	},
);
</script>

<style lang="scss" data-style-group="modal">
@import "@scss/themes.scss";

.modal-content {
	display: none;
}

.modal-content > .emote-set-selector {
	width: 100%;
	min-height: 24em;
	max-height: 32em;
}
</style>
