<template>
	<div class="twitch-button">
		<div>
			<TwitchLogo class="twitch-icon" />
			<div class="separator"></div>
			<span>SIGN IN</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import TwitchLogo from "@/components/base/TwitchLogo.vue";

export default defineComponent({
	components: {
		TwitchLogo,
	},
});
</script>

<style lang="scss" scoped>
.twitch-button {
	display: flex;
	align-items: center;
	cursor: pointer;
	border-style: solid;
	border-width: 1px;
	border-radius: 2px;
	border-color: currentColor;
	font-size: 14px;
	padding: 0.5em;
	background-color: var(--twitch-purple);

	span,
	.twitch-icon,
	.separator {
		color: white;
	}

	:first-child {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.twitch-icon {
		border: currentColor solid;
		border-width: 0;
	}

	.separator {
		height: 1rem;
		width: 1px;
		background-color: currentColor;
		margin-right: 0.25em;
		margin-left: 0.5em;
	}
}
</style>
