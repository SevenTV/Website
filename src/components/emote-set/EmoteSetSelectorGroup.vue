<template>
	<div class="emote-set-group">
		<div class="header">
			<UserTag :user="group.user" scale="1.25em" />
		</div>

		<div class="sets">
			<EmoteSetDetail
				v-for="set of group.sets"
				:key="set.data.id"
				:emote="emote"
				:set="set"
				@click="onSetClick(set)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { data, SetGroup, SetMeta, useSetSelector } from "./EmoteSetSelector";
import type { Emote } from "@/structures/Emote";
import type { ActiveEmote } from "@/structures/EmoteSet";
import { useModal } from "@/store/modal";
import { useActor } from "@/store/actor";
import ModalEmoteSetSelectorConflict from "@/components/emote-set/ModalEmoteSetSelectorConflict.vue";
import EmoteSetDetail from "./EmoteSetSelectorDetail.vue";

const UserTag = defineAsyncComponent(() => import("@/components/utility/UserTag.vue"));

const props = defineProps<{
	group: SetGroup;
	emote?: Emote | null;
}>();

const userColor = props.group.user.style.color ? ConvertIntColorToHex(props.group.user.style.color) : "gray";

const { toggleActiveEmote } = useSetSelector();
const actor = useActor();
const modal = useModal();

function onSetClick(set: SetMeta) {
	if (data.mode === "emote") {
		if (!props.emote) return;

		// Maybe assign as default set
		if (!actor.defaultEmoteSetID) {
			actor.setDefaultEmoteSetID(set.data.id);
		}

		if (set.conflict) {
			modal.open("emote-name-conflict", {
				component: ModalEmoteSetSelectorConflict,
				events: {
					remove: () => toggleActiveEmote(set, (props.emote as Emote).id, (set.conflict as ActiveEmote).id),
				},
				props: {
					set: set.data,
					emote: props.emote,
					activeEmote: set.conflict,
				},
			});

			return;
		}

		toggleActiveEmote(set, props.emote.id).catch((err) => actor.showErrorModal(err, [704610, 704611]));
	} else if (data.mode === "assign") {
		actor.setDefaultEmoteSetID(set.data.id);
	}
}
</script>

<style lang="scss">
@import "@scss/themes.scss";

div.emote-set-group {
	padding: 0.33em;
	border-left: 0.25em solid v-bind(userColor);
	> div.header {
		margin-bottom: 0.75em;
	}

	> div.sets {
		display: grid;
		gap: 0.5em;
		margin-left: 1em;
	}
}
</style>
