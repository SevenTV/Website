<template>
	<ModalBase width="28em" height="16em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h3>Emote Slots Increased</h3>
		</template>

		<template #content>
			<div class="content">
				<p selector="error-name">Your emote slots have been automatically increased to {{ value }}!</p>
				<p>
					Want everything in one place? You can now easily
					<router-link :to="{ name: 'Migrate' }" @click="emit('close')">migrate to 7TV</router-link>.
				</p>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import type { ModalEvent } from "@store/modal";
import ModalBase from "@/components/modal/ModalBase.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

defineProps<{
	value: number;
}>();
</script>

<style scoped lang="scss">
.content {
	padding: 1em;
	display: flex;
	row-gap: 1em;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	text-align: center;

	> p {
		font-size: 1.25em;
	}
}
</style>
