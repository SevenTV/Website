<template>
	<ModalBase width="32em" height="auto">
		<template #footer>
			<h2 class="copy-emote-link">{{ t("emote.copied") }}</h2>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ModalBase from "@/components/modal/ModalBase.vue";

const { t } = useI18n();
</script>

<style lang="scss" data-style-group="modal">
@import "@scss/themes.scss";

.copy-emote-link {
	padding: 3em 0;
	text-align: center;
}
</style>
