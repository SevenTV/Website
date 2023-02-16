<template>
	<ModalBase width="32em" height="16em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h2>Merge Emote</h2>
		</template>

		<template #content>
			<div class="merge-explain">
				<TextInput v-model="targetID" :autofocus="true" autocomplete="off" label="New Emote (ID)" />

				<TextInput v-model="reason" autocomplete="off" label="Reason for merge" />
			</div>
		</template>

		<template #footer>
			<div class="action-buttons">
				<div
					v-wave="{ duration: 0.3 }"
					:disabled="!targetID"
					@click="
						targetID && [emit('modal-event', { name: 'merge', args: [targetID, reason] }), emit('close')]
					"
				>
					Merge
				</div>

				<div v-wave="{ duration: 0.3 }" @click="emit('close')">Cancel</div>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ModalEvent } from "@/store/modal";
import { Emote } from "@/structures/Emote";
import TextInput from "@/components/form/TextInput.vue";
import ModalBase from "@/components/modal/ModalBase.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

defineProps<{
	emote: Emote;
}>();

const targetID = ref("");
const reason = ref("");
</script>

<style scoped lang="scss">
.merge-explain {
	display: grid;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 1em;

	> span {
		font-size: 1.25em;
		text-align: center;
	}
}

.action-buttons {
	display: flex;
	justify-content: space-between;
	height: 100%;

	> div {
		cursor: pointer;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		place-items: center;
		text-align: center;

		&:nth-child(1) {
			background-color: rgb(160, 0, 255);
		}

		&[disabled="true"] {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
}
</style>
