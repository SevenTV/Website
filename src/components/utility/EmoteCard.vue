<template>
	<div class="emote-card">
		<div class="title-banner">
			<span>{{ emote?.getName() }}</span>
		</div>

		<div class="title-banner submitter">
			<span>Submitter</span>
		</div>

		<div class="img-wrapper">
			<img />
		</div>
	</div>
</template>

<script lang="ts">
import { Emote } from "@/structures/Emote";
import { defineComponent, PropType } from "vue";

export default defineComponent({
	props: {
		emote: {
			type: Object as PropType<Emote>,
			required: true,
		},
	},

	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/themes.scss";

.emote-card {
	display: flex;
	width: 8.75em;
	height: 8.75em;
	cursor: pointer;
	border: groove 2px;
	border-color: transparent;
	border-radius: 3px;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@include themify() {
		background-color: darken(themed("backgroundColor"), 2);
	}
	margin: 0.5em;

	.title-banner {
		height: 1.5em;
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		@include themify() {
			background-color: lighten(themed("backgroundColor"), 8);
		}

		span {
			font-family: "Ubuntu", sans-serif;
		}

		&.submitter {
			width: 80%;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;

			span {
				font-size: 0.75em;
			}
		}
	}

	.img-wrapper {
		display: flex;
		justify-content: center;
		height: 4.5em;

		.is-processing {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-self: flex-end;
			align-items: center;

			span {
				margin-top: 1em;
			}
		}
		img {
			margin-top: 1em;
			min-width: 76px;
			max-width: 55%;
			object-fit: scale-down;
		}
	}
}
</style>
