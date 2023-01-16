<template>
	<ModalBase width="30em" height="18em" @close="onClose">
		<template #heading>
			<h2>{{ t("store.sub.cancel") }}</h2>
		</template>

		<template #content>
			<div class="sub-cancel-modal-content">
				<p :style="{ marginBottom: '1em' }">{{ t("store.sub.cancel_prompt") }}</p>
			</div>
		</template>

		<template #footer>
			<div
				class="modal-button"
				selector="confirm"
				@click="[onClose(), emit('modal-event', { name: 'confirm', args: [] })]"
			>
				<span>CONFIRM</span>
			</div>
			<div class="modal-button" selector="remain" @click="onClose">
				<span>STAY SUBSCRIBED</span>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ModalEvent } from "@/store/modal";
import ModalBase from "@/components/modal/ModalBase.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const onClose = () => {
	emit("close");
};

const { t } = useI18n();
</script>

<style scoped lang="scss">
.sub-cancel-modal-content {
	display: flex;
	align-items: center;
	width: 100%;
	text-align: center;
	justify-content: center;
}

.modal-button {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1em;
	cursor: pointer;

	&[selector="confirm"] {
		background-color: rgb(255, 60, 60);
	}
	&[selector="remain"] {
		background-color: rgba(76, 243, 179, 25%);
	}
}
</style>
