<template>
	<ModalBase width="32em" height="18em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h3>Action Required</h3>
		</template>

		<template #content>
			<div class="content">
				<p>{{ providerName }} is actively trying to block this page from functioning.</p>
				<p>
					In order to proceed, please click the button below and copy all the content in the newly opened
					window. Then, close the window and click on "Paste Data".
				</p>

				<p v-if="error" :style="{ color: 'red' }">Error: {{ error }}</p>
			</div>
		</template>

		<template #footer>
			<div class="action-buttons">
				<div class="modal-button" selector="open" :current="!opened" @click="open">
					<span>OPEN PAGE</span>
				</div>
				<div class="modal-button" selector="paste" :current="opened" @click="paste">
					<span>PASTE DATA</span>
				</div>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import type { ModalEvent } from "@store/modal";
import ModalBase from "@/components/modal/ModalBase.vue";
import { ref } from "vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const props = defineProps<{
	url: string;
	providerName: string;
}>();

const win = ref<Window | null>();
const opened = ref(false);
const error = ref("");

function open() {
	win.value = window.open(props.url, "", "popup,width=500,height=500,noreferrer,noopener");

	opened.value = true;
}

function paste() {
	let data: unknown;

	navigator.clipboard.readText().then((text) => {
		try {
			data = JSON.parse(text);
		} catch (err) {
			error.value = err as string;
		}

		emit("modal-event", {
			name: "data",
			args: [data],
		});

		if (win.value) {
			win.value.close();
		}

		emit("close");
	});
}
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.content {
	padding: 1em;
	display: flex;
	row-gap: 2em;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	text-align: center;

	> span {
		font-size: 1.25em;
	}
}

.action-buttons {
	display: flex;
	justify-content: space-between;
	height: 100%;

	.modal-button {
		cursor: pointer;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		place-items: center;
		text-align: center;
		background-color: rgb(80, 80, 80);

		&[current="true"] {
			background-color: rgb(50, 80, 50);
		}
	}
}
</style>
