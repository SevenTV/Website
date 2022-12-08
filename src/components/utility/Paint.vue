<template>
	<span class="painted-content" :text="text">
		<slot />
	</span>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import { ConvertDecimalRGBAToString } from "@/structures/util/Color";
import { Paint } from "@/structures/Cosmetic";

const props = defineProps<{
	paint: Paint;
	text: boolean;
}>();

const paint = toRef(props, "paint");

const cssFunction = computed(() => paint.value.function.toLowerCase().replace("_", "-"));
const bgImage = computed(() => {
	if (!paint.value) {
		return "";
	}

	const args = [] as string[];
	switch (paint.value.function) {
		case "LINEAR_GRADIENT": // paint is linear gradient
			args.push(`${paint.value.angle}deg`);
			break;
		case "RADIAL_GRADIENT": // paint is radial gradient
			args.push(paint.value.shape ?? "circle");
			break;
		case "URL": // paint is an image
			args.push(paint.value.image_url ?? "");
			break;
	}
	let funcPrefix = "";
	if (paint.value.function !== "URL") {
		funcPrefix = paint.value.repeat ? "repeating-" : "";
	}

	for (const stop of paint.value.stops) {
		const color = ConvertDecimalRGBAToString(stop.color);
		args.push(`${color} ${stop.at * 100}%`);
	}

	return `${funcPrefix}${cssFunction.value}(${args.join(", ")})`;
});

const filter = computed(() => {
	if (!paint.value) {
		return "";
	}

	return paint.value.shadows
		.map((v) => `drop-shadow(${v.x_offset}px ${v.y_offset}px ${v.radius}px ${ConvertDecimalRGBAToString(v.color)})`)
		.join(" ");
});
</script>

<style scoped lang="scss">
.painted-content > :first-child {
	background-size: cover !important;
	background-color: currentColor;
	background-image: v-bind("bgImage");
	filter: v-bind("filter");
	color: v-bind("paint.color");
}

.painted-content[text="true"] > :first-child {
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text !important;
	background-clip: text !important;
	font-weight: 700;
}
</style>
