<template>
	<ModalBase width="24em">
		<template #heading>
			<h3>{{ t("emote_set.select") }}</h3>
		</template>

		<template #content>
			<div class="emote-set-selector">
				<div class="available-sets">
					<div
						v-for="set of clientUser?.emote_sets"
						:key="set.id"
						v-wave
						:selected="selection.has(set.id)"
						class="card"
						@click="toggleSet(set.id)"
						@contextmenu.prevent="
							actor.setDefaultEmoteSetID(actor.defaultEmoteSetID === set.id ? '' : set.id)
						"
					>
						<div>
							<span selector="set-name">{{ set.name }}</span>
							<span selector="set-owner">
								<UserTag scale="1em" :user="set.owner" />
							</span>
						</div>
						<div>
							<!-- Set As Default -->
							<span selector="set-default" :selected="defaultEmoteSetID === set.id">
								<Tooltip text="Selected As Default">
									<font-awesome-icon :icon="['far', 'circle-check']" />
								</Tooltip>
							</span>

							<!-- Checkbox selected indicator -->
							<span selector="check">
								<Checkbox :checked="selection.has(set.id)" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { useActorStore } from "@/store/actor";
import { storeToRefs } from "pinia";
import { ref, defineProps, defineEmits, PropType } from "vue";
import { useI18n } from "vue-i18n";
import ModalBase from "./ModalBase.vue";
import UserTag from "../utility/UserTag.vue";
import Checkbox from "../form/Checkbox.vue";
import Tooltip from "../utility/Tooltip.vue";
import { Emote } from "@/structures/Emote";

const props = defineProps({
	emote: Object as PropType<Emote | null>,
});
const emit = defineEmits(["change"]);
const { t } = useI18n();
const actor = useActorStore();
const { user: clientUser, defaultEmoteSetID } = storeToRefs(actor);
const selection = ref(new Set<string>());

// Set as selected for sets that have the emote
if (props.emote) {
	for (const es of clientUser.value?.emote_sets ?? []) {
		if (!es.emotes?.filter((ae) => props.emote?.id === ae.id).length) {
			continue;
		}
		selection.value.add(es.id);
	}
}

const toggleSet = (id: string) => {
	const has = selection.value.has(id);
	if (has) {
		selection.value.delete(id);
		emit("change", "REMOVE", id);
	} else {
		selection.value.add(id);
		emit("change", "ADD", id);
	}
	actor.setDefaultEmoteSetID(id);
	if (!selection.value.size) {
		actor.setDefaultEmoteSetID("");
	}
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.emote-set-selector {
	height: 100%;
	width: 100%;
	padding: 1em;

	> div.available-sets {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		width: 100%;
		height: 26em;
		> .card {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: row;
			margin-top: 0.5em;
			margin-bottom: 0.5em;
			border-radius: 0.3em;
			width: 100%;
			height: 4em;
			@include themify() {
				background-color: darken(themed("backgroundColor"), 4);

				&[selected="true"] {
					background-color: mix(themed("backgroundColor"), themed("primary"), 85%);
				}
			}

			> :nth-child(1) {
				display: flex;
				flex-direction: column;
				margin-left: 0.5em;
				> [selector="set-name"] {
					padding-bottom: 0.25em;
				}
			}
			> :nth-child(2) {
				display: flex;
				align-items: center;
				margin-right: 0.5em;

				> [selector="check"] {
					pointer-events: none;
				}

				> [selector="set-default"] {
					color: silver;
					font-size: 1.5em;
					margin-right: 0.5em;
					visibility: hidden;

					&[selected="true"] {
						visibility: visible;
						@include themify() {
							color: themed("accent");
						}
					}
				}
			}
		}
	}
}
</style>
