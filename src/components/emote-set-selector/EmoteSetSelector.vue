<template>
	<main class="emote-set-selector">
		<!-- Hint -->
		<div selector="hint-section">
			<i18n-t v-if="mode === 'emote'" keypath="emote_set.explain.hint_select_emote">
				<template #EMOTE>
					<EmoteMention v-if="emote" :emote="emote" />
				</template>
			</i18n-t>
		</div>

		<!-- View Emote Sets -->
		<div selector="emote-set-group-list">
			<EmoteSetGroup v-for="g of groups" :key="g.user.id" :group="g" :emote="emote" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { useActor } from "@/store/actor";
import { storeToRefs } from "pinia";
import { SetGroup, useSetSelector } from "./EmoteSetSelector";
import { watch } from "vue";
import type { Emote } from "@/structures/Emote";
import EmoteSetGroup from "./EmoteSetGroup.vue";
import EmoteMention from "../utility/EmoteMention.vue";

type Mode = "assign" | "emote";

const props = defineProps<{
	mode: Mode;
	emote?: Emote | null;
}>();

const actor = useActor();
const { editableEmoteSets } = storeToRefs(actor);

const { groups } = useSetSelector();

/** Group up emote sets by their respective owner */
function setupGroups(): void {
	const m = new Map<string, SetGroup>();

	groups.length = 0;
	for (const set of Object.values(editableEmoteSets.value)) {
		if (!m.has(set.owner.id)) {
			m.set(set.owner.id, {
				user: set.owner,
				sets: [],
			});
		}

		const g = m.get(set.owner.id) as SetGroup;

		const isEnabled = !!props.emote && set.emotes.some((ae) => ae.id == (props.emote as Emote).id);
		g.sets.push({
			data: set,
			enabled: isEnabled,
			full: set.emotes.length >= set.capacity,
			conflict: !isEnabled && !!props.emote && !!set.emotes.find((e) => e.name === (props.emote as Emote).name),
		});
	}

	for (const g of m.values()) {
		groups.push(g);
	}
}

setupGroups();

for (const es of Object.values(editableEmoteSets.value)) {
	watch(es, () => setupGroups());
}
</script>

<style lang="scss">
@import "@scss/themes.scss";

main.emote-set-selector {
	display: flex;
	flex-direction: column;
	overflow: auto;

	@include themify() {
		background-color: darken(themed("backgroundColor"), 4);

		> div[selector="emote-set-group-list"] {
			> :nth-child(even) {
				background-color: darken(themed("backgroundColor"), 2);
			}
			> :nth-child(odd) {
				background-color: darken(themed("backgroundColor"), 4);
			}
		}
	}

	> div[selector="hint-section"] {
		text-align: center;
		font-size: 1.125rem;
		padding-top: 0.5em;
		padding-bottom: 0.5em;
		border-bottom: 1px solid currentColor;
	}
}
</style>
