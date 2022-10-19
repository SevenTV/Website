<template>
	<div class="emote-set-group">
		<div class="header">
			<UserTag :user="group.user" scale="1.25em" />
		</div>

		<div class="sets">
			<EmoteSetDetail v-for="set of group.sets" :key="set.data.id" :set="set" @click="onSetClick(set)" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { SetGroup, SetMeta, useSetSelector } from "./EmoteSetSelector";
import type { Emote } from "@/structures/Emote";
import { useModal } from "@/store/modal";
import ModalEmoteSetSelectorConflict from "@/components/emote-set-selector/ModalEmoteSetSelectorConflict.vue";
import EmoteSetDetail from "./EmoteSetDetail.vue";

const UserTag = defineAsyncComponent(() => import("@/components/utility/UserTag.vue"));

const props = defineProps<{
	group: SetGroup;
	emote?: Emote | null;
}>();

const userColor = props.group.user.style.color ? ConvertIntColorToHex(props.group.user.style.color) : "gray";

const { toggleActiveEmote } = useSetSelector();
const modal = useModal();

function onSetClick(set: SetMeta) {
	if (!props.emote) return;
	if (set.conflict) {
		modal.open("emote-name-conflict", {
			component: ModalEmoteSetSelectorConflict,
			events: {},
			props: {
				set: set.data,
				emote: props.emote,
			},
		});

		return;
	}

	toggleActiveEmote(set, props.emote);
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
