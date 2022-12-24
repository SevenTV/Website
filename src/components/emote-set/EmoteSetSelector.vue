<template>
	<main class="emote-set-selector">
		<!-- Subheading -->
		<div v-if="emote" selector="subheading-section">
			<!-- Hint -->
			<span>
				<i18n-t keypath="emote_set.explain.hint_select_emote">
					<template #EMOTE>
						<EmoteMention v-if="emote" :emote="emote" />
					</template>
				</i18n-t>
			</span>

			<div>
				<TextInput v-model="customName" label="Custom Name" width="8em" />
			</div>
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
import { data, SetGroup, useSetSelector } from "./EmoteSetSelector";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import type { Emote } from "@/structures/Emote";
import EmoteSetGroup from "./EmoteSetSelectorGroup.vue";
import EmoteMention from "../utility/EmoteMention.vue";
import TextInput from "../form/TextInput.vue";
import { HasBits } from "@/structures/util/BitField";
import { EmoteSetFlag } from "@/structures/EmoteSet";

const props = defineProps<{
	emote?: Emote | null;
}>();

const actor = useActor();
const { editableEmoteSets, defaultEmoteSetID } = storeToRefs(actor);

const { setMode, setCustomName } = useSetSelector();

const groups = ref(data.groups);
const customName = ref("");

if (props.emote) {
	setMode("emote");
} else {
	setMode("assign");
}

onBeforeMount(() => {
	if (!props.emote) return;

	customName.value = props.emote.name;
});

watch(
	customName,
	(name) => {
		setCustomName(name);
		setupGroups();
	},
	{ immediate: true },
);

/** Group up emote sets by their respective owner */
function setupGroups(): void {
	const m = new Map<string, SetGroup>();

	data.groups.length = 0;
	for (const set of Object.values(editableEmoteSets.value)) {
		if (!m.has(set.owner.id)) {
			m.set(set.owner.id, {
				user: set.owner,
				sets: [],
			});
		}

		const g = m.get(set.owner.id) as SetGroup;

		const isEnabled = !!props.emote && set.emotes.some((ae) => !ae.origin_id && ae.id == (props.emote as Emote).id);
		g.sets.push({
			data: set,
			default: set.id === defaultEmoteSetID.value,
			enabled: isEnabled,
			full: set.emotes.length >= set.capacity,
			personal: HasBits(set.flags, EmoteSetFlag.PERSONAL),
			conflict:
				!isEnabled && !!props.emote && customName.value === props.emote.name
					? set.emotes.find((e) => !e.origin_id && e.name === (props.emote as Emote).name) ?? null
					: null,
		});
	}

	for (const g of m.values()) {
		data.groups.push(g);
	}
}

onMounted(() => {
	setupGroups();

	for (const es of Object.values(editableEmoteSets.value)) {
		watch(es, () => setupGroups());
	}
});
</script>

<style lang="scss">
@import "@scss/themes.scss";

main.emote-set-selector {
	display: flex;
	flex-direction: column;
	overflow: auto;
	margin-bottom: 1.5em;

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

		> div[selector="subheading-section"] {
			background-color: darken(themed("backgroundColor"), 2);
		}
	}

	> div[selector="subheading-section"] {
		z-index: 1;
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		font-size: 1.125rem;
		padding: 0.5em;
		border-bottom: 1px solid currentColor;
	}
}
</style>
