<template>
	<h1>Paint Builder</h1>
	<div class="paint-builder--form">
		<FormKit type="group">
			<!-- Paint Name -->
			<FormKit v-model="data.name" type="text" label="Paint Name" validation="required" />

			<!-- Preview -->
			<div class="paint-builder--paints-list">
				<div class="paint-builder--preview">
					<h1 :style="{ backgroundImage: bgImage, filter }" class="paint-base as-text">{{ data.name }}</h1>
				</div>
				<div class="paint-builder--preview">
					<h2 :style="{ backgroundImage: bgImage, filter }" class="paint-base as-text">
						{{ actor?.display_name }}
					</h2>
				</div>
				<div class="paint-builder--preview">
					<h3 :style="{ backgroundImage: bgImage, filter }" class="paint-base as-text">
						{{ actor?.display_name }}
					</h3>
				</div>
				<div class="paint-builder--preview">
					<p :style="{ backgroundImage: bgImage, filter }" class="paint-base as-text">
						{{ actor?.display_name }}
					</p>
				</div>
				<div class="paint-builder--preview">
					<div :style="{ backgroundImage: bgImage, filter }" class="full-paint-preview"></div>
				</div>
			</div>

			<!-- Function -->
			<FormKit
				v-model="data.function"
				type="select"
				:options="functions"
				:style="{ color: '#327fa8' }"
				label="Type"
			/>

			<!-- Repeat? -->
			<FormKit v-if="data.function !== 'URL'" v-model="data.repeat" type="checkbox" label="Repeating Gradient" />

			<!-- Angle -->
			<FormKit
				v-if="data.function === 'LINEAR_GRADIENT'"
				v-model="data.angle"
				type="range"
				label="Angle"
				min="0"
				max="360"
				:help="`${data.angle}°`"
			/>

			<!-- Shape -->
			<FormKit
				v-if="data.function === 'RADIAL_GRADIENT'"
				v-model="data.shape"
				type="select"
				:options="shape"
				:style="{ color: '#327fa8' }"
				label="Shape"
			></FormKit>

			<!-- Stops (if using gradient function) -->
			<div v-if="data.function !== 'URL'" class="paint-builder--stops">
				<div v-for="(s, i) of data.stops" :key="i">
					<p class="paint-builder--stop-heading">
						<Icon icon="close" @click="removeStop(i)" />
						Stop #{{ i + 1 }}
					</p>
					<div class="paint-builder--stop-item">
						<div>
							<FormKit
								v-model="data.stops[i].at"
								type="range"
								min="0"
								max="1"
								step="0.01"
								:help="(data.stops[i].at * 100).toFixed(0).toString()"
								@input="(v) => editStop(i, '', v)"
							/>
							<FormKit
								type="color"
								label="Color"
								:value="ConvertDecimalToHex(data.stops[i].color)"
								@input="(v) => editStop(i, v, '')"
							/>
						</div>
						<div>
							<FormKit
								:value="GetDecimalAlpha(data.stops[i].color) / 255 || '1'"
								:help="`Opacity - ${((GetDecimalAlpha(s.color) / 255) * 100).toFixed(2) ?? '1'}%`"
								type="range"
								min="0"
								max="1"
								step="0.01"
								@input="(v) => editStop(i, '', '', parseFloat(v))"
							/>
						</div>
					</div>
				</div>
			</div>
			<Button v-if="data.function !== 'URL'" color="primary" label="Add Stop" @click="addStop" />
			<div class="paint-builder--divider" />

			<!-- Image URl (if using url function) -->
			<FormKit
				v-if="data.function === 'URL'"
				v-model="data.image_url"
				type="url"
				label="Image URL"
				placeholder="https://cdn.7tv.app/..."
			/>

			<!-- Drop Shadows -->
			<div class="paint-builder--shadows">
				<div v-for="(s, i) of data.shadows" :key="i">
					<p>
						<Icon icon="trash" @click="removeShadow(i)" />
						Shadow #{{ i + 1 }}
					</p>

					<div class="paint-builder--shadow-form">
						<FormKit
							type="color"
							:value="ConvertDecimalToHex(data.shadows[i].color)"
							@input="(v) => editShadow(i, v)"
						/>
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

	<div class="paint-builder--data">
		<button @click="() => importData()">Import from clipboard</button>
		<span v-if="importError">{{ importError }}</span>
		<code>{{ data }}</code>
	</div>

	<div class="paint-builder--divider" />

	<Button v-if="!editMode" color="accent" label="Create Paint" :disabled="create.loading.value" @click="doCreate" />
	<Button v-else color="accent" label="Update Paint" :disabled="update.loading.value" @click="doUpdate" />
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRaw } from "vue";
import { Paint } from "@structures/Cosmetic";
import Button from "@/components/utility/Button.vue";
import {
	ConvertHexToRGB,
	ConvertRGBAToDecimal,
	ConvertDecimalRGBAToString,
	ConvertDecimalToHex,
	ConvertIntColorToHex,
	GetDecimalAlpha,
} from "@/structures/util/Color";
import { useActorStore } from "@/store/actor";
import { useMutation } from "@vue/apollo-composable";
import { CreatePaint, UpdatePaint } from "@gql/mutation/Cosmetic";
import { useRouter } from "vue-router";
import Icon from "@/components/utility/Icon.vue";

const props = defineProps<{
	paint: string;
}>();

const { user: actor } = useActorStore();
const actorColor = computed(() => ConvertIntColorToHex(actor?.tag_color ?? 0));

const paintData = typeof props.paint === "string" ? JSON.parse(props.paint) : null;
const editMode = !!paintData;

const data = reactive<Paint>(
	paintData ?? {
		name: "Unnamed Paint",
		function: "LINEAR_GRADIENT",
		repeat: false,
		angle: 90,
		shape: "circle",
		image_url: "",
		stops: [] as Paint.Stop[],
		shadows: [] as Paint.Shadow[],
	},
);

const functions = {
	LINEAR_GRADIENT: "Linear Gradient",
	RADIAL_GRADIENT: "Radial Gradient",
	URL: "URL",
};

const shape = {
	circle: "Circle",
	ellipse: "Ellipse",
};

const addStop = () => {
	data.stops.push({
		at: data.stops.length > 0 ? data.stops[data.stops.length - 1].at : 0,
		color: data.stops[data.stops.length - 1]?.color ?? 255,
	});
};
const editStop = (ind: number, hex: string, pos: string, alpha?: number) => {
	if (hex) {
		const rgb = ConvertHexToRGB(hex);
		const n = ConvertRGBAToDecimal(...rgb, 255);
		data.stops[ind].color = n;
	}
	if (pos) {
		data.stops[ind].at = parseFloat(pos);
	}
	if (typeof alpha !== "undefined") {
		const col = data.stops[ind].color;
		const a = alpha * 255;
		data.stops[ind].color = ((col >> 8) << 8) | a;
	}
};
const removeStop = (ind: number) => {
	data.stops.splice(ind, 1);
};

const addShadow = () => {
	const prev = data.shadows[data.shadows.length - 1];
	data.shadows.push({
		color: prev?.color ?? 255,
		radius: prev?.radius ?? 1,
		x_offset: prev?.x_offset ?? 0,
		y_offset: prev?.y_offset ?? 0,
	});
};
const editShadow = (ind: number, color: string) => {
	if (color) {
		data.shadows[ind].color = ConvertRGBAToDecimal(...ConvertHexToRGB(color), 255);
	}
};
const removeShadow = (ind: number) => {
	data.shadows.splice(ind, 1);
};

const cssFunction = computed(() => data.function.toLowerCase().replace("_", "-"));
const bgImage = computed(() => {
	const args = [] as string[];
	switch (data.function) {
		case "LINEAR_GRADIENT": // paint is linear gradient
			args.push(`${data.angle}deg`);
			break;
		case "RADIAL_GRADIENT": // paint is radial gradient
			args.push(data.shape ?? "circle");
			break;
		case "URL": // paint is an image
			args.push(data.image_url ?? "");
			break;
	}
	let funcPrefix = "";
	if (data.function !== "URL") {
		funcPrefix = data.repeat ? "repeating-" : "";
	}

	for (const stop of data.stops) {
		const color = ConvertDecimalRGBAToString(stop.color);
		args.push(`${color} ${stop.at * 100}%`);
	}

	return `${funcPrefix}${cssFunction.value}(${args.join(", ")})`;
});

const filter = computed(() => {
	return data.shadows
		.map((v) => `drop-shadow(${v.x_offset}px ${v.y_offset}px ${v.radius}px ${ConvertDecimalRGBAToString(v.color)})`)
		.join(" ");
});

// Mutation
const create = useMutation(CreatePaint);
const doCreate = () => {
	create.mutate({
		def: data,
	});
};

const router = useRouter();

const update = useMutation(UpdatePaint);
const doUpdate = () => {
	if (!data.id) {
		return;
	}

	const def = {
		name: data.name,
		function: data.function,
		color: data.color,
		angle: data.angle,
		shape: data.shape,
		image_url: data.image_url,
		repeat: data.repeat,
		stops: toRaw(data.stops).map((s) => ({ at: s.at, color: s.color })),
		shadows: toRaw(data.shadows).map((s) => ({
			color: s.color,
			radius: s.radius,
			x_offset: s.x_offset,
			y_offset: s.y_offset,
		})),
	};

	update
		.mutate({
			def,
			id: data.id,
		})
		.then(() => router.push({ name: "AdminCosmetics" }));
};

const importError = ref("");
const importData = async () => {
	importError.value = "";
	const txt = await navigator.clipboard.readText();
	let parsed: Record<string, object> = {};
	try {
		parsed = JSON.parse(txt);
	} catch (err) {
		importError.value = (err as Error).message;
	}
	for (const k of Object.keys(parsed)) {
		(data as unknown as Record<string, object>)[k] = parsed[k];
	}
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
.paint-builder--form {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 100%;
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
		flex-direction: column;

		> div:nth-child(1) {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1em;
		}
		> div:nth-child(2) {
			display: flex;
			justify-content: flex-end;
		}
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

		input {
			width: 1em;
		}
	}
}

.paint-builder--paints-list {
	display: block;
	width: fit-content;
	text-align: center;
	margin-left: 3em;
}

.paint-builder--preview {
	.paint-base {
		background-clip: text !important;
		background-size: cover !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: transparent;
		background-color: currentColor;
		font-weight: 700;
		color: v-bind("actorColor");
	}

	.full-paint-preview {
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: 0.25em;
		margin-bottom: 1.5em;
		margin-top: 1.5em;
		width: auto;
		height: 3em;
	}
}

.paint-builder--data {
	> code {
		display: block;
		width: 32em;
		padding: 1em;
		color: white;
		border-radius: 0.5em;
		background-color: rgb(53, 53, 53);
	}
	> span {
		color: red;
		margin: 1em;
	}
}
</style>
