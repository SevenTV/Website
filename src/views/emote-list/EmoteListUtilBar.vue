<template>
	<main class="emote-list-util">
		<div v-wave class="util-row" selector="set-select" @click="openSetSelect">
			<Icon size="lg" icon="list-check" />
			<span> {{ actor.defaultEmoteSet ? actor.defaultEmoteSet.name : t("emote_set.select") }} </span>
		</div>
		<div class="util-row">
			<div>
				<Paginator
					:page="pagination.page"
					:items-per-page="pagination.limit"
					:length="pagination.total"
					@change="(change) => [emit('page', change.page)]"
				/>
			</div>
		</div>
		<div class="util-row" />
	</main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useActor } from "@/store/actor";
import { useModal } from "@/store/modal";
import Icon from "@/components/utility/Icon.vue";
import Paginator from "./Paginator.vue";

const SelectEmoteSet = defineAsyncComponent(() => import("@/components/modal/SelectEmoteSet/SelectEmoteSet.vue"));

const emit = defineEmits<{
	(e: "page", page: number): void;
}>();

defineProps<{
	pagination: {
		page: number;
		limit: number;
		total: number;
	};
}>();

const { t } = useI18n();
const actor = useActor();

const modal = useModal();
const openSetSelect = () => {
	const key = "emote-set-select-from-emote-list";
	modal.open(key, {
		component: SelectEmoteSet,
		props: {
			mode: "assign",
		},
		events: {
			assign: (id: string) => actor.setDefaultEmoteSetID(id),
		},
	});
	return null;
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.emote-list-util {
	display: grid;
	gap: 1em;
	grid-template-columns: repeat(3, 1fr);

	> div.util-row {
		display: flex;
		align-items: center;
		padding: 0.5em;
		clip-path: polygon(5% 0, 95% 0, 100% 20%, 100% 100%, 0 100%, 0 20%);

		&:nth-child(1)[selector="set-select"] {
			justify-self: end;
			gap: 0.33em;

			cursor: pointer;

			> span {
				white-space: nowrap;
			}

			@media screen and (max-width: 600px) {
				> span {
					display: none;
				}
			}
		}

		&:nth-child(2) {
			justify-self: center;
		}

		&:nth-child(3) {
			display: none;
			justify-self: start;
		}
	}

	@include themify() {
		> div.util-row {
			background-color: opacify(themed("navBackgroundColor"), 1);

			&:nth-child(1)[selector="set-select"] {
				color: themed("primary");
			}
		}
	}
}
</style>
