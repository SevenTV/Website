<template>
	<Popper :hover="true" :placement="position">
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
	z-index: 9999;
	pointer-events: none;
	width: max-content;
	text-align: start;
	max-width: 24em;
	font-size: 1rem;
	padding: 0.25em;

	@include themify() {
		background-color: lighten(themed("backgroundColor"), 2);
		box-shadow: 0.016em 0.016em 0.1em themed("color");
	}

	&[visible="false"] {
		display: none;
	}
}
</style>
