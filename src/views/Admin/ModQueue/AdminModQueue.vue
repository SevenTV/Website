<template>
	<main class="admin-mod-queue">
		<div v-if="!currentCard" class="mod-request-card-list">
			<div v-for="r of requests" :key="r.id" class="mod-request-card-wrapper" tabindex="-1">
				<ModRequestCard v-if="r.target" :request="r" @select="expandCard($event)" />
			</div>
		</div>

		<!-- Display current card -->
		<div v-else-if="currentCard.target_kind === Common.ObjectKind.EMOTE" class="mod-request-focused">
			<EmotePage :emote-i-d="currentCard.target_id" :emote-data="JSON.stringify(currentCard.target)" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { GetModRequests } from "@/assets/gql/messages/mod-queue";
import { useDataLoaders } from "@/store/dataloader";
import { useObjectWatch } from "@/store/object-watch";
import { Common } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { Message } from "@/structures/Message";
import { useQuery } from "@vue/apollo-composable";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import ModRequestCard from "./ModRequestCard.vue";
import EmotePage from "@/views/EmotePage/EmotePage.vue";
const props = defineProps<{
	requestID?: string;
}>();

const after = ref<string | null>(null);

const { onResult } = useQuery<GetModRequests.Result, GetModRequests.Variables>(GetModRequests, {
	after: after.value,
});

const dataloaders = useDataLoaders();
const objectWatch = useObjectWatch();

const requests = ref([] as Message.ModRequest[]);
const currentCard = ref<Message.ModRequest | null>(null);

await new Promise<void>((resolve) => {
	onResult(({ data }) => {
		requests.value = data.modRequests;

		// Fetch target
		const emoteRequests = requests.value.filter((r) => r.target_kind === Common.ObjectKind.EMOTE);
		const emoteIDs = emoteRequests.map((r) => r.target_id);

		dataloaders.loadEmotes(emoteIDs).then((emotes) => {
			const m = new Map<string, Emote>(emotes.map((e) => [e.id, e]));

			requests.value.forEach((r) => {
				if (!m.has(r.target_id)) return;

				r.target = m.get(r.target_id);
				if (r.target) {
					objectWatch.subscribeToObject(Common.ObjectKind.EMOTE, r.target as Emote);
				}

				if (r.id === props.requestID) {
					currentCard.value = r;
				}
			});
		});

		resolve();
	});
});

const route = useRoute();

watch(route, () => {
	if (route.params.requestID) {
		currentCard.value = requests.value.find((r) => r.id === route.params.requestID) ?? null;
	} else {
		currentCard.value = null;
	}
});

const expandCard = (req: Message.ModRequest) => {
	currentCard.value = req;
};
</script>
<style scoped lang="scss">
@import "@scss/themes.scss";

main.admin-mod-queue {
	width: 100%;

	.mod-request-card-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24em, 1fr));
		text-align: center;
		gap: 0.5em;
		margin: 1em;
	}

	.mod-request-focused {
		text-align: center;
	}
}
</style>
