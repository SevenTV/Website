<template>
	<div class="emote-card-context">
		<div class="context-select">
			<div option="test">Add to Channel</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.emote-card-context {
	@include themify() {
		border: 1px solid transparentize(themed("color"), 0.5);
		background-color: darken(themed("backgroundColor"), 6);
	}

	[option] {
		padding: 1em;
	}
}
</style>
