<template>
	<div class="login-button-context">
		<div class="context-select">
			<div option @click="emit('ctx-interact', 'DISCORD')">Use Discord</div>
			<div option @click="emit('ctx-interact', 'TWITCH')">Use Twitch</div>
			<div option @click="emit('ctx-interact', 'YOUTUBE')">Use YouTube</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(["ctx-interact"]);
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.login-button-context {
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
