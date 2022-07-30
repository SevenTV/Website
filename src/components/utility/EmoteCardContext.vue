<template>
	<div class="emote-card-context">
		<div class="context-select">
			<div option="use" @click="emit('ctx-interact', 'use')">Add to {{ actor.defaultEmoteSet?.name }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useActorStore } from "@/store/actor";

const emit = defineEmits(["ctx-interact"]);

const actor = useActorStore();
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
