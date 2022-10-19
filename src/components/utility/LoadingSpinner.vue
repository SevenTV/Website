<template>
	<div ref="loadingSpinner" class="loading-spinner">
		<PpL />
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PpL from "../base/ppL.vue";

const props = defineProps<{
	speed: number;
	radius: number;
}>();

const loadingSpinner = ref<HTMLDivElement | null>(null);
const setSpinnerSpeed = (v: number) =>
	loadingSpinner.value?.style.setProperty("--loading-spinner-speed", v.toFixed(2) + "ms");

setSpinnerSpeed(props.speed);

const radius1x = computed(() => `${props.radius}em`);
const radius2x = computed(() => `${props.radius * 2}em`);
</script>

<style scoped lang="scss">
.loading-spinner {
	svg {
		animation: ppCircle linear infinite;
		animation-duration: var(--loading-spinner-speed, 0.5s);
		transform-origin: var(--loading-spinner-radius, v-bind(radius2x))
			var(--loading-spinner-radius, v-bind(radius2x));
		width: v-bind(radius1x);
		height: v-bind(radius1x);
	}
}

@keyframes ppCircle {
	from {
		transform: rotateZ(-360deg);
	}
	to {
		transform: rotateZ(0deg);
	}
}
</style>
