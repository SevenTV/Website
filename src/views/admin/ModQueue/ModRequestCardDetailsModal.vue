<template>
	<ModalBase width="85%" height="85%" @close="close">
		<template #heading>
			<h2 v-if="isKind('EMOTE')">{{ attr.title }}</h2>
		</template>

		<template #content>
			<!-- Display Emote Request -->
			<div v-if="isKind('EMOTE')" class="mod-request-details">
				<h3>{{ (request.target as Emote).name }}</h3>
				<div class="previews">
					<EmotePreviews :emote="(request.target as Emote)" :visible="true" :format="format" />
				</div>
			</div>
		</template>

		<template #footer>
			<div class="button-list">
				<router-link v-wave :to="{ name: 'Emote', params: { emote: request.target_id } }" target="_blank">
					<button name="full-page">VIEW FULL PAGE</button>
				</router-link>
				<button v-for="b of attr.buttons" :key="b.name" :name="b.name" @click="close(b.name)">
					{{ b.name.toUpperCase() }}
				</button>
				<button v-wave name="close" @click="close()">CLOSE</button>
			</div>
		</template>
	</ModalBase>
</template>

<script setup lang="ts">
import { ModalEvent } from "@/store/modal";
import { Message } from "@/structures/Message";
import { Emote, EmoteVersion } from "@/structures/Emote";
import { ObjectKind, ImageFormat } from "@/structures/Common";
import { reactive } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GetEmote } from "@/apollo/query/emote.query";
import type { ModRequestAttr } from "./ModRequestCard.vue";
import ModalBase from "@/components/modal/ModalBase.vue";
import EmotePreviews from "@/components/emote/EmotePreviews.vue";

const emit = defineEmits<{
	(e: "close"): void;
	(e: "modal-event", t: ModalEvent): void;
}>();

const props = defineProps<{
	request: Message.ModRequest;
	format: ImageFormat;
	attr: ModRequestAttr;
}>();

const isKind = (kind: keyof typeof ObjectKind) => props.request.target_kind === ObjectKind[kind];

const data = reactive({
	emote: {
		channelCount: 0,
		versions: [] as EmoteVersion[],
	},
});

// Fetch further data
switch (props.request.target_kind) {
	case ObjectKind.EMOTE:
		useQuery<GetEmote>(GetEmote, { id: props.request.target_id }).onResult((result) => {
			data.emote.channelCount = result.data.emote.channel_count;
			data.emote.versions = result.data.emote.versions;
		});
		break;

	default:
		break;
}

const close = (ev?: string) => {
	emit("modal-event", { name: "dismiss", args: [] });
	if (ev) {
		emit("modal-event", { name: ev, args: [] });
	}

	emit("close");
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.mod-request-details {
	display: block;
	text-align: center;
	width: 100%;

	@include themify() {
		background-color: darken(themed("backgroundColor"), 2);
	}

	.previews {
		padding: 1em;
	}
}

.button-list {
	display: grid;
	grid-template-columns: repeat(3, minmax(1em, 1fr));
	height: 100%;

	@include themify() {
		background-color: darken(themed("backgroundColor"), 2);

		button {
			&[name="full-page"] {
				background-color: themed("primary");
			}
			&[name="approve"] {
				background-color: darken(themed("accent"), 3);
			}
			&[name="unlist"] {
				color: black;
				background-color: adjust-hue(themed("warning"), 35);
			}
			&[name="delete"] {
				color: black;
				background-color: themed("warning");
			}
			&[name="close"] {
				background-color: themed("backgroundColor");
			}
		}
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(4, minmax(1em, 1fr));
	}

	button,
	a {
		all: unset;
		height: 3em;
		width: 100%;
		text-align: center;
		cursor: pointer;
	}
}
</style>
