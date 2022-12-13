<template>
	<ModalBase width="30em" height="18em" @close="onClose">
		<template #heading>
			<h2>{{ t("store.purchase_success.heading") }}</h2>
		</template>

		<template #content>
			<div class="purchase-success-modal-content">
				<p :style="{ marginBottom: '1em' }">{{ t("store.purchase_success.text1") }}</p>
				<span>{{ t("store.purchase_success.text2") }}</span>
			</div>
		</template>

		<template #footer>
			<router-link
				:to="{ name: 'UserSettings', params: { userID: actorID } }"
				class="modal-button unstyled-link"
				selector="cosmetics"
				@click="onClose"
			>
				<span>MANAGE COSMETICS</span>
			</router-link>
			<div class="modal-button" selector="ok" @click="onClose">
				<span>OK</span>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import type { ModalEvent } from "@/store/modal";
import { useI18n } from "vue-i18n";
import ModalBase from "@/components/modal/ModalBase.vue";
import { useActor } from "@/store/actor";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const { id: actorID } = storeToRefs(useActor());

const onClose = () => {
	emit("close");
};

const { t } = useI18n();
</script>

<style scoped lang="scss">
.purchase-success-modal-content {
	padding: 2.5em;
}

.modal-button {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1em;
	cursor: pointer;

	&[selector="cosmetics"] {
		background-color: rgba(17, 103, 179, 50.9%);
	}
	&[selector="ok"] {
		background-color: rgba(76, 243, 179, 25%);
	}
}
</style>
