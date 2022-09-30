<template>
	<main class="app-footer" :class="{ halloween: seasonalTheme }">
		<div ref="contentRef" class="app-footer-content">
			<!-- Place tombstones -->
			<div class="graveyard">
				<div v-for="[x, s, rot, c] of points.layer2" :key="x" class="tomblayer" :layer="2">
					<component
						:is="c"
						:style="{ left: `${x}px`, width: `${s}px`, transform: `rotate(${rot}deg)` }"
						class="tomb"
					/>
				</div>
			</div>

			<div class="graveyard">
				<div v-for="[x, s, rot, c] of points.layer1" :key="x" class="tomblayer" :layer="1">
					<component
						:is="c"
						:style="{ left: `${x}px`, width: `${s}px`, transform: `rotate(${rot}deg)` }"
						class="tomb"
					/>
				</div>
			</div>
		</div>

		<div class="fog-area">
			<Fog />
		</div>
	</main>
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw, reactive } from "vue";
import type { Component } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";
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

const { seasonalTheme } = storeToRefs(useStore());

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

const points = reactive({
	layer1: [] as [number, number, number, Component][],
	layer2: [] as [number, number, number, Component][],
});
// const points = ref([] as [number, number, number, Component][]);

const contentRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
	if (!contentRef.value) {
		return;
	}

	// Calculate amount of points
	const w = window.innerWidth;

	// Generate tombstones
	for (const layer of [points.layer1, points.layer2]) {
		let gen = true;
		do {
			// get random tombstone vector
			const tomb = tombstones[Math.floor(Math.random() * tombstones.length)];

			// last point where a tombstone was placed
			const lastPoint = layer[layer.length - 1]?.[0] ?? 0;

			// random tomb size
			const tombSize = Math.floor(Math.random() * (4 * 16)) + 1 * 16;

			// random tomb rotation between 22.5 degrees
			const tombRotation = -5 + Math.floor(Math.random() * 10);

			// random x location value starting from previous point
			const point = lastPoint + Math.floor(Math.random() * 85);

			layer.push([point, tombSize, tombRotation, markRaw(tomb)]);

			if (point >= w - tombSize) {
				gen = false;
			}
		} while (gen);
	}
});
</script>

<style scoped lang="scss">
$footerHeight: 6em;
$tombSize: 4em;

main.app-footer {
	position: fixed;
	height: 100%;
	width: 100%;
	overflow: hidden;
	pointer-events: none;
	z-index: -1;

	> .app-footer-content {
		position: absolute;
		bottom: 0;
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
			position: absolute;
			top: 100%;

			height: 100%;
			width: 100%;

			svg {
				color: black;
			}

			[layer="1"] {
				z-index: 3;
			}

			[layer="2"] {
				svg {
					opacity: 0.42;
				}
			}
		}
	}
}

.fog-area {
	position: absolute;
	opacity: 0.75;
	top: 0;
	height: 100vh;
	width: 100%;
}
</style>
