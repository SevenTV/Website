<template>
	<h1>Paint Builder</h1>
	<div class="paint-builder--form">
		<FormKit type="group">
			<!-- Paint Name -->
			<FormKit v-model="data.name" type="text" label="Paint Name" validation="required" />

			<!-- Function -->
			<FormKit
				v-model="data.function"
				type="select"
				:options="functions"
				:style="{ color: '#327fa8' }"
				label="Type"
			/>

			<!-- Repeat? -->
			<FormKit v-if="data.function !== 'url'" v-model="data.repeat" type="checkbox" label="Repeating Gradient" />

			<!-- Angle -->
			<FormKit
				v-if="data.function === 'linear-gradient'"
				v-model="data.angle"
				type="range"
				label="Angle"
				min="0"
				max="360"
				:help="`${data.angle}°`"
			/>

			<!-- Shape -->
			<FormKit
				v-if="data.function === 'radial-gradient'"
				v-model="data.shape"
				type="select"
				:options="shape"
				:style="{ color: '#327fa8' }"
				label="Shape"
			></FormKit>

			<!-- Stops (if using gradient function) -->
			<div v-if="data.function !== 'url'" class="paint-builder--stops">
				<div v-for="(s, i) of data.stops" :key="i">
					<p class="paint-builder--stop-heading">
						<font-awesome-icon :icon="['fas', 'close']" @click="removeStop(i)" />
						Stop #{{ i + 1 }}
					</p>
					<div class="paint-builder--stop-item">
						<FormKit
							v-model="data.stops[i].at"
							type="range"
							min="0"
							max="1"
							step="0.01"
							:help="(data.stops[i].at * 100).toFixed(0).toString()"
							@input="(v) => editStop(i, '', v)"
						/>
						<FormKit type="color" label="Color" @input="(v) => editStop(i, v, '')" />
					</div>
				</div>
			</div>
			<Button color="primary" label="Add Stop" @click="addStop" />
			<div class="paint-builder--divider" />

			<!-- Image URl (if using url function) -->
			<FormKit
				v-if="data.function === 'url'"
				v-model="data.url"
				type="url"
				label="Image URL"
				placeholder="https://cdn.7tv.app/..."
			/>

			<!-- Drop Shadows -->
			<div class="paint-builder--shadows">
				<div v-for="(s, i) of data.shadows" :key="i">
					<p>
						<font-awesome-icon :icon="['fas', 'close']" @click="removeShadow(i)" />
						Shadow #{{ i + 1 }}
					</p>

					<div class="paint-builder--shadow-form">
						<FormKit type="color" @input="(v) => editShadow(i, v)" />
						<div>
							<FormKit v-model="data.shadows[i].x_offset" type="number" label="X Offset" />
							<FormKit v-model="data.shadows[i].y_offset" type="number" label="Y Offset" />
							<FormKit v-model="data.shadows[i].radius" type="number" label="Radius" />
						</div>
					</div>
				</div>
			</div>
			<Button color="primary" label="Add Shadow" @click="addShadow" />
			<div class="paint-builder--divider" />
		</FormKit>
	</div>

	<div v-if="data.stops.length > 1 || data.url" class="paint-builder--preview">
		<h1 :style="{ backgroundImage: bgImage, filter }" class="paint-base as-text">{{ data.name }}</h1>
		<div :style="{ backgroundImage: bgImage, filter }" class="full-paint-preview"></div>
		<h2 :style="{ backgroundImage: bgImage, filter }" class="paint-base as-text">{{ actor?.display_name }}</h2>
		<h3 :style="{ backgroundImage: bgImage, filter }" class="paint-base as-text">{{ actor?.display_name }}</h3>
		<p :style="{ backgroundImage: bgImage, filter }" class="paint-base as-text">{{ actor?.display_name }}</p>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { Paint } from "@structures/Cosmetic";
import Button from "@/components/utility/Button.vue";
import { ConvertHexToRGB, DecimalRGBA, ConvertDecimalRGBAToString } from "@/structures/util/Color";
import { useActorStore } from "@/store/actor";

const { user: actor } = useActorStore();
const data = reactive({
	name: "",
	function: "linear-gradient",
	repeat: false,
	angle: 90,
	shape: "circle",
	url: "",
	stops: [] as Paint.Stop[],
	shadows: [] as Paint.Shadow[],
});

const functions = {
	"linear-gradient": "Linear Gradient",
	"radial-gradient": "Radial Gradient",
	url: "URL",
};

const shape = {
	circle: "Circle",
	ellipse: "Ellipse",
};

const addStop = () => {
	data.stops.push({
		at: data.stops.length > 0 ? data.stops[data.stops.length - 1].at : 0,
		color: data.stops[data.stops.length - 1]?.color ?? 0,
	});
};
const editStop = (ind: number, hex: string, pos: string) => {
	if (hex) {
		const rgb = ConvertHexToRGB(hex);
		const n = DecimalRGBA(...rgb, 255);
		data.stops[ind].color = n;
	}
	if (pos) {
		data.stops[ind].at = parseFloat(pos);
	}
};
const removeStop = (ind: number) => {
	data.stops.splice(ind, 1);
};

const addShadow = () => {
	data.shadows.push({
		color: 0,
		radius: 1,
		x_offset: 0,
		y_offset: 0,
	});
};
const editShadow = (ind: number, color: string) => {
	if (color) {
		data.shadows[ind].color = DecimalRGBA(...ConvertHexToRGB(color), 255);
	}
};
const removeShadow = (ind: number) => {
	data.shadows.splice(ind, 1);
};

const bgImage = computed(() => {
	const args = [] as string[];
	switch (data.function) {
		case "linear-gradient": // paint is linear gradient
			args.push(`${data.angle}deg`);
			break;
		case "radial-gradient": // paint is radial gradient
			args.push(data.shape ?? "circle");
			break;
		case "url": // paint is an image
			args.push(data.url ?? "");
			break;
	}

	for (const stop of data.stops) {
		const color = ConvertDecimalRGBAToString(stop.color);
		args.push(`${color} ${stop.at * 100}%`);
	}

	return `${data.function}(${args.join(", ")})`;
});

const filter = computed(() => {
	return data.shadows
		.map((v) => `drop-shadow(${v.x_offset}px ${v.y_offset}px ${v.radius}px ${ConvertDecimalRGBAToString(v.color)})`)
		.join(" ");
});
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
.paint-builder--form {
	margin-top: 1em;

	.paint-builder--divider {
		margin-top: 1em;
		margin-bottom: 1em;
	}
}

.paint-builder--stops {
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
	margin-bottom: 1em;
	@include themify() {
		> div {
			background-color: darken(themed("backgroundColor"), 2);
		}
	}

	> div {
		border-radius: 0.25em;
		padding: 0.5em;
	}

	.paint-builder--stop-heading {
		> svg {
			margin-right: 0.25em;
			cursor: pointer;
			color: red;
		}
	}

	.paint-builder--stop-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}
}

.paint-builder--shadows {
	.paint-builder--shadow-form {
		margin-top: 0.5em;
		> div {
			display: flex;
			flex-direction: row;
			gap: 0.5em;
		}
	}
}

.paint-builder--preview {
	position: fixed;
	top: 6em;
	right: 3em;
	text-align: center;
	.paint-base {
		background-clip: text !important;
		background-size: cover !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: transparent;
		background-color: currentColor;
	}

	.full-paint-preview {
		background-size: cover;
		border-radius: 0.25em;
		margin: 0.25em;
		width: auto;
		height: 3em;
	}
}
</style>
