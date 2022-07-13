<template>
	<ModalBase width="30em" height="18em" @close="onClose">
		<template #heading>
			<h2>{{ t("nav.wip_notice.heading") }}</h2>
		</template>

		<template #content>
			<div class="wip-modal-content">
				<p :style="{ marginBottom: '1em' }">{{ t("nav.wip_notice.text1") }}</p>
				<span>{{ t("nav.wip_notice.text2") }}</span>
			</div>
		</template>

		<template #footer>
			<div selector="ok-button" @click="onClose">
				<span>OK</span>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import type { ModalEvent } from "@/store/modal";
import { useI18n } from "vue-i18n";
import ModalBase from "./ModalBase.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const onClose = () => {
	localStorage.setItem("ack_next", "1");

	emit("close");
};

const { t } = useI18n();
</script>

<style scoped lang="scss">
.wip-modal-content {
	padding: 2.5em;
}

[selector="ok-button"] {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1em;
	cursor: pointer;
	background-color: rgba(76, 165, 243, 25%);
}
</style>
