<template>
	<main ref="mainEl" class="admin-mod-queue">
		<Transition name="cardlist">
			<div class="mod-request-card-list">
				<div v-for="r of requests" :key="r.id" class="mod-request-card-wrapper" tabindex="-1">
					<ModRequestCard
						v-if="r.target"
						:read="readCards.has(r.id)"
						:request="r"
						@decision="(t, undo) => onDecision(r, t, undo)"
					/>
				</div>
			</div>
		</Transition>
	</main>
</template>

<script setup lang="ts">
import { GetModRequests } from "@/assets/gql/messages/mod-queue";
import { useActorStore } from "@/store/actor";
import { useDataLoaders } from "@/store/dataloader";
import { useModal } from "@/store/modal";
import { useMutationStore } from "@/store/mutation";
import { useObjectWatch } from "@/store/object-watch";
import { Common } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { Message } from "@/structures/Message";
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import EmoteDeleteModal from "@/views/EmotePage/EmoteDeleteModal.vue";
import ModRequestCard from "./ModRequestCard.vue";

const after = ref<string | null>(null);

const { onResult } = useQuery<GetModRequests.Result, GetModRequests.Variables>(GetModRequests, {
	after: after.value,
});

const dataloaders = useDataLoaders();
const objectWatch = useObjectWatch();

const requests = ref([] as Message.ModRequest[]);

await new Promise<void>((resolve) => {
	onResult(({ data }) => {
		requests.value = data.modRequests;

		// Fetch target
		const emoteRequests = requests.value.filter((r) => r.target_kind === Common.ObjectKind.EMOTE);
		const emoteIDs = emoteRequests.map((r) => r.target_id);

		dataloaders.loadEmotes(emoteIDs).then((emotes) => {
			const m = new Map<string, Emote>();
			for (const e of emotes) {
				if (!e) {
					continue;
				}

				m.set(e.id, e);
			}

			requests.value.forEach((r) => {
				if (!m.has(r.target_id)) return;

				r.target = m.get(r.target_id);
				if (r.target) {
					objectWatch.subscribeToObject(Common.ObjectKind.EMOTE, r.target as Emote);
				}
			});
		});

		resolve();
	});
});

const actor = useActorStore();
const modal = useModal();

const m = useMutationStore();

const readCards = ref(new Set<string>());

// Called when a decision on a request is made
const onDecision = async (req: Message.ModRequest, t: string, isUndo?: boolean) => {
	readCards.value.delete(req.id);

	switch (t) {
		case "approve":
			await m.editEmote(req.target_id, {
				listed: true,
			});
			break;
		case "unlist":
			await m.editEmote(req.target_id, {
				listed: false,
			});
			break;
		case "delete": {
			if (
				!(await new Promise((resolve) => {
					modal.open("mod-request-delete-item", {
						component: EmoteDeleteModal,
						props: {
							emote: req.target as Emote,
						},
						events: {
							delete: () => resolve(true),
							close: () => resolve(false),
						},
					});
				}))
			) {
				return;
			}

			await m.editEmote(req.target_id, {
				deleted: true,
			});
			break;
		}
		case "undelete":
			await m.editEmote(req.target_id, {
				deleted: false,
			});
			break;

		default:
			return;
	}

	// Mark the request as read
	m.readMessage([req.id], !isUndo)
		.catch(actor.showErrorModal)
		.then(() => {
			if (!isUndo) {
				readCards.value.add(req.id);
			} else {
				readCards.value.delete(req.id);
			}
		});
};
</script>
<style scoped lang="scss">
@import "@scss/themes.scss";

main.admin-mod-queue {
	width: 100%;
	height: 100%;

	.mod-request-card-list {
		display: grid;
		height: 100%;
		grid-template-columns: repeat(auto-fit, minmax(24em, 1fr));
		text-align: center;
		gap: 0.5em;
		padding: 1em;
		transition: opacity 200ms;

		&[card-view="true"] {
			opacity: 0.25;
		}
	}

	.mod-request-focused {
		text-align: center;
	}
}

.req-card-move,
.req-card-enter-active,
.req-card-leave-active {
	transition: all 1s ease-in-out;
}

.req-card-enter-from,
.req-card-leave-to {
	opacity: 0;
	transform: translateY(1em);
}

.req-card-leave-active {
	position: absolute;
}
</style>
