<template>
	<Popper :hover="true">
		<slot />
		<template #content>
			<div ref="tooltip" class="tooltip">
				<span>{{ text }}</span>
			</div>
		</template>
	</Popper>
</template>

<script setup lang="ts">
import type { Placement } from "@popperjs/core";
import { PropType } from "vue";

defineProps({
	text: {
		type: String,
		default: "",
	},
	offset: {
		type: Object as PropType<number[]>,
	},
	position: {
		type: String as PropType<Placement>,
		default: "auto",
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.tooltip {
	z-index: 100;
	pointer-events: none;
	width: max-content;
	max-width: 24em;
	font-size: 1rem;

	&[visible="false"] {
		display: none;
	}

	> span {
		padding: 0.5em;
		@include themify() {
			background-color: lighten(themed("backgroundColor"), 2);
			box-shadow: 0.016em 0.016em 0.2em themed("color");
		}
	}
}
</style>
