<template>
	<div class="emote-card-context">
		<div class="context-select">
			<div
				v-if="actor.defaultEmoteSet"
				option="use"
				@click="emit('ctx-interact', enabled ? 'use-del' : 'use-add')"
			>
				{{
					enabled
						? t("emote_set.context_emote_remove", { SET_NAME: actor.defaultEmoteSet.name })
						: t("emote_set.context_emote_add", { SET_NAME: actor.defaultEmoteSet.name })
				}}
			</div>
			<div option="use-ellipsis" @click="emit('ctx-interact', 'use-select')">Use Emote...</div>
			<div option="open-in-new-tab" @click="emit('ctx-interact', 'open-in-new-tab')">
				{{ t("emote.context.open_in_new_tab") }}
			</div>
			<div option="copy-emote-link" @click="emit('ctx-interact', 'copy-emote-link')">
				{{ t("emote.context.copy_emote_link") }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useActor } from "@/store/actor";
import { Emote } from "@/structures/Emote";

const props = defineProps<{
	emote: Emote;
}>();

const emit = defineEmits(["ctx-interact"]);

const { t } = useI18n();

const actor = useActor();

const enabled = ref(false);

if (props.emote && actor.defaultEmoteSetID) {
	enabled.value = !!actor.getActiveEmoteInSet(actor.defaultEmoteSetID, props.emote.id);
}
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.emote-card-context {
	max-width: 16em;

	@include themify() {
		outline: 0.1rem solid transparentize(themed("color"), 0.85);
		background-color: transparentize(darken(themed("backgroundColor"), 6), 0.25);
		backdrop-filter: blur(2rem);

		> div.context-select > div[option]:hover {
			background-color: transparentize(themed("primary"), 0.85);
		}
	}

	> div.context-select > div[option] {
		cursor: pointer;
		padding: 1em;
	}
}
</style>
