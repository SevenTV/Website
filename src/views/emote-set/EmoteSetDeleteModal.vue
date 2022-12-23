<template>
	<ModalBase width="32em" height="16em" footer-height="3em" @close="emit('close')">
		<template #heading>
			<h2>{{ t("emote_set.delete_prompt.heading", [set.name]) }}</h2>
		</template>

		<template #content>
			<div class="delete-explain">
				<span> {{ t("emote_set.delete_prompt.notice", [set.name]) }} </span>
			</div>
		</template>

		<template #footer>
			<div class="action-buttons">
				<div
					v-wave="{ duration: 0.3 }"
					@click="[emit('modal-event', { name: 'delete', args: [] }), emit('close')]"
				>
					{{ t("common.delete").toUpperCase() }}
				</div>

				<div v-wave="{ duration: 0.3 }" @click="emit('close')">
					{{ t("common.cancel").toUpperCase() }}
				</div>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ModalEvent } from "@/store/modal";
import { EmoteSet } from "@/structures/EmoteSet";
import ModalBase from "@/components/modal/ModalBase.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

defineProps<{
	set: EmoteSet;
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.delete-explain {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;
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
			background-color: red;
		}
	}
}
</style>
