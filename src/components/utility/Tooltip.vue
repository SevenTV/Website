<template>
	<span :tooltip="text" :position="position">
		<slot />
	</span>
</template>

<script>
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

<style lang="scss">
@import "@/assets/scss/themes.scss";

[tooltip] {
	@include themify() {
		$color: transparentize(darken(themed("backgroundColor"), 16), 0.25);
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
			background-color: $color;

			text-align: center;
			min-width: 3em;
			max-width: 21em;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 0.75rem;
			border-radius: 0.3rem;
			border: 1px solid currentColor;
			color: currentColor;
			z-index: 500;
		}
		&:hover:before,
		&:hover:after {
			display: block;
		}

		// Top position
		&:not([position]):after,
		&[position^="top"]::after {
			bottom: 125%;
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
}
/* don't show empty tooltips */
[tooltip=""]::before,
[tooltip=""]::after {
	display: none !important;
}

/* KEYFRAMES */
@keyframes tooltips {
	to {
		opacity: 1;
	}
}
</style>
