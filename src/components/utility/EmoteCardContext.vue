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
		</div>
	</div>
</template>

<script setup lang="ts">
import { useActorStore } from "@/store/actor";
import { Emote } from "@/structures/Emote";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	emote: Emote;
}>();

const emit = defineEmits(["ctx-interact"]);

const { t } = useI18n();

const actor = useActorStore();

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
		border: 1px solid transparentize(themed("color"), 0.5);
		background-color: darken(themed("backgroundColor"), 6);
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
