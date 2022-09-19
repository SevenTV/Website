<template>
	<main class="app-footer" :class="{ halloween: theme === 'halloween' }">
		<div ref="contentRef" class="app-footer-content">
			<!-- Place tombstones -->
			<div class="graveyard">
				<div v-for="[x, s, c] of points" :key="x">
					<component :is="c" :style="{ left: x, width: s }" class="tomb" />
				</div>

				<div class="fog-area">
					<Fog />
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw } from "vue";
import type { Component } from "vue";
import Tomb1 from "./base/halloween/tomb1.vue";
import Tomb2 from "./base/halloween/tomb2.vue";
import Tomb3 from "./base/halloween/tomb3.vue";
import Tomb4 from "./base/halloween/tomb4.vue";
import Tomb5 from "./base/halloween/tomb5.vue";
import Tomb6 from "./base/halloween/tomb6.vue";
import Tomb7 from "./base/halloween/tomb7.vue";
import Tomb8 from "./base/halloween/tomb8.vue";
import Tomb9 from "./base/halloween/tomb9.vue";
import Tomb10 from "./base/halloween/tomb10.vue";
import Tomb11 from "./base/halloween/tomb11.vue";
import Tomb12 from "./base/halloween/tomb12.vue";
import Tomb13 from "./base/halloween/tomb13.vue";
import Tomb14 from "./base/halloween/tomb14.vue";
import Fog from "./utility/Fog.vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";

const { theme } = storeToRefs(useStore());

const tombstones = [
	Tomb1,
	Tomb2,
	Tomb3,
	Tomb4,
	Tomb5,
	Tomb6,
	Tomb7,
	Tomb8,
	Tomb9,
	Tomb10,
	Tomb11,
	Tomb12,
	Tomb13,
	Tomb14,
] as Component[];
const points = ref([] as [number, number, Component][]);

const contentRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
	if (!contentRef.value) {
		return;
	}

	// Calculate amount of points
	const w = window.innerWidth;

	// Generate tombstones
	let gen = true;
	do {
		// get random tombstone vector
		const tomb = tombstones[Math.floor(Math.random() * tombstones.length)];

		// last point where a tombstone was placed
		const lastPoint = points.value[points.value.length - 1]?.[0] ?? 0;

		// random tomb size
		const tombSize = Math.floor(Math.random() * (4 * 16)) + 1 * 16;

		// random x location value starting from previous point
		const point = lastPoint + tombSize - 25;

		points.value.push([point, tombSize, markRaw(tomb)]);

		if (point >= w - tombSize) {
			gen = false;
		}
	} while (gen);
});
</script>

<style scoped lang="scss">
$footerHeight: 6em;
$tombSize: 4em;

main.app-footer {
	height: 0;
	pointer-events: none;
	z-index: -1;

	> .app-footer-content {
		position: absolute;
		transform: translateY(-$footerHeight);
		height: $footerHeight;
		width: 100vw;
	}

	// no footer if not halloween
	display: none;

	&.halloween {
		display: block;

		.graveyard {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			background-image: linear-gradient(0deg, black 1em, transparent 0);

			height: 100%;
			width: 100%;

			svg {
				color: black;
			}
		}

		.fog-area {
			position: absolute;
			opacity: 0.75;
			height: 100vh;
			width: 100%;
		}
	}
}
</style>
