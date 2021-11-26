<template>
	<span :tooltip="text" :position="position">
		<slot />
	</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		text: {
			type: String,
			default: "",
		},
		position: {
			type: String,
			default: "top",
		},
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

[tooltip] {
	font-size: 1rem;
	& > * {
		display: inline-block;
	}

	position: relative;
	&:before,
	&:after {
		line-height: 1;
		user-select: none;
		pointer-events: none;
		position: absolute;
		display: none;
		opacity: 0;
	}
	&:after {
		content: attr(tooltip);
		@include themify() {
			background-color: transparentize(darken(themed("backgroundColor"), 16), 0.25);
		}

		text-align: center;
		min-width: 3rem;
		max-width: 21rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0.75rem;
		border-radius: 0.3rem;
		border: 0.1rem solid currentColor;
		color: currentColor;
		z-index: 500;
	}
	&:hover:before,
	&:hover:after {
		display: block;
		left: -33%;
	}

	// Top position
	&:not([position]):after,
	&[position^="top"]::after {
		bottom: 90%;
	}

	// Bottom position
	&:not([position]):after,
	&[position^="bottom"]::after {
		bottom: -175%;
	}

	&:not([position]):hover::before,
	&:not([position]):hover::after,
	&[position]:hover::before,
	&[position]:hover::after {
		animation: tooltips 150ms ease-out forwards;
	}
}

[tooltip=""]::before,
[tooltip=""]::after {
	display: none !important;
}

@keyframes tooltips {
	to {
		opacity: 1;
	}
}
</style>
