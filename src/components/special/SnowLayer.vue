<template>
	<div class="snow-layer">
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";

const props = withDefaults(
	defineProps<{
		density?: number;
		size?: number;
		speed?: number;
		gravity?: number;
		color?: string;
	}>(),
	{
		density: 7,
		size: 5,
		speed: 55,
		gravity: 100,
		color: "#fff",
	},
);

const canvas = ref<HTMLCanvasElement>();
let context: CanvasRenderingContext2D | null;

const particles: [number, number, number, number][] = [];

let lastTick = 0;

function init() {
	stopDrawLoop();

	const el = canvas.value;
	if (!el) return;

	context = el.getContext("2d");
	if (!context) return;

	const w = el.clientWidth;
	const h = el.clientHeight;

	el.width = w;
	el.height = h;

	particles.length = 0;

	let c = 0;

	c += (1 / props.density / 2) * w;
	c += (1 / props.density / 2) * h;

	for (let i = 0; i < c; i++) {
		const x = Math.random() * w;
		const y = Math.random() * h;
		const z = Math.random() ** 2.5 * 0.7 + 0.3;
		const vX = Math.random() * props.speed * 2 - props.speed;

		particles[i] = [x, y, z, vX];
	}

	lastTick = Date.now() / 1000;

	drawLoop();
}

function tick() {
	if (!context) return;

	const now = Date.now() / 1000;
	const delta = now - lastTick;

	const w = context.canvas.width;
	const h = context.canvas.height;

	for (const p of particles) {
		p[0] += p[3] * p[2] * delta;
		p[1] += props.gravity * p[2] * delta;

		p[0] = p[0] < 0 ? w + p[0] : p[0] % w;
		p[1] = p[1] < 0 ? h + p[1] : p[1] % h;
	}

	lastTick = now;
}

function draw() {
	if (!canvas.value || !context) return;

	tick();

	const w = context.canvas.width;
	const h = context.canvas.height;

	context.clearRect(0, 0, w, h);

	context.save();

	context.fillStyle = props.color;

	for (const p of particles) {
		context.beginPath();
		context.arc(p[0], p[1], props.size * p[2], 0, 2 * Math.PI);
		context.fill();
	}

	context.restore();
}

let drawTimeout: number | undefined;

function drawLoop() {
	if (!context) return;

	draw();

	drawTimeout = requestAnimationFrame(drawLoop);
}

function stopDrawLoop() {
	if (drawTimeout) cancelAnimationFrame(drawTimeout);

	drawTimeout = undefined;
}

const observer = new ResizeObserver(() => {
	init();
});

watch(
	canvas,
	(el, old) => {
		if (old) observer.unobserve(old);

		if (el) observer.observe(el);
	},
	{ immediate: true },
);

watch(props, () => {
	init();
});

onUnmounted(() => {
	observer.disconnect();

	stopDrawLoop();
});
</script>

<style scoped lang="scss">
.snow-layer {
	height: 0;
	width: 0;

	canvas {
		position: absolute;

		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
	}
}
</style>
