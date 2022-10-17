<template>
	<div class="emote-set-select-context">
		<p option @click="[actor.setDefaultEmoteSetID(set.id), emit('ctx-interact', 'assign-default')]">
			{{ t("emote_set.modal.context_set_default") }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useActor } from "@/store/actor";
import { Emote } from "@/structures/Emote";
import { EmoteSet } from "@/structures/EmoteSet";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["ctx-interact"]);
defineProps({
	emote: {
		type: Object as PropType<Emote>,
		required: true,
	},
	set: {
		type: Object as PropType<EmoteSet>,
		required: true,
	},
});

const { t } = useI18n();

const actor = useActor();
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.emote-set-select-context {
	@include themify() {
		border: 0.15em solid transparentize(themed("color"), 0.5);
		background-color: darken(themed("backgroundColor"), 6);

		[option]:hover {
			background-color: mix(themed("primary"), black, 25);
		}
	}

	> div {
		height: 0.01em;
		margin-bottom: 0.1em;
		background-color: currentColor;
	}

	> [option] {
		cursor: pointer;
		padding: 0.5em;
	}
}
</style>
