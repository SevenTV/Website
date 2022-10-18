<template>
	<ModalBase width="28em" height="16em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h3>{{ t("user.settings.cosmetics_updated") }}</h3>
		</template>

		<template #content>
			<div class="user-cosmetics-update">
				<span>{{ t("user.settings.cosmetics_updated_message") }}</span>
			</div>
		</template>

		<template #footer>
			<div class="modal-button" selector="ok" @click="emit('close')">
				<span>OK</span>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import type { ModalEvent } from "@store/modal";
import { GraphQLErrors } from "@apollo/client/errors";
import ModalBase from "@/components/modal/ModalBase.vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

defineProps<{
	error: string;
	detail: string;
	code: number;
	gql?: GraphQLErrors;
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.user-cosmetics-update {
	padding: 1em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	text-align: center;

	> span {
		font-size: 1.25em;
	}
}

.modal-button {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1em;
	cursor: pointer;

	@include themify() {
		background-color: themed("primary");
	}
}
</style>
