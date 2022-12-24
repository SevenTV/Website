<template>
	<main ref="mainEl" class="admin-mod-queue">
		<div class="mod-queue-stats">
			<p>{{ total }} pending requests</p>

			<section class="mod-queue-categories">
				<div class="mod-queue-category-item">
					<Icon icon="globe" />
					Public Listing
				</div>
				<div class="mod-queue-category-item">
					<Icon icon="user-lock" />
					Personal Use
				</div>
			</section>
		</div>
		<Transition name="cardlist">
			<div class="mod-request-card-list">
				<template v-for="r of requests" :key="r.id">
					<div
						v-if="r.target"
						:ref="(el) => observeCard(el as HTMLElement)"
						:target-id="r.target_id"
						class="mod-request-card-wrapper"
						tabindex="-1"
					>
						<ModRequestCard
							:read="readCards.has(r.id)"
							:request="r"
							:target="targetMap[r.target_id]"
							@decision="(t, undo) => onDecision(r, t, undo)"
						/></div
				></template>
			</div>
		</Transition>
	</main>
</template>

<script setup lang="ts">
import { GetModRequests } from "@/apollo/query/mod-queue.query";
import { useActor } from "@/store/actor";
import { useDataLoaders } from "@/store/dataloader";
import { useModal } from "@/store/modal";
import { useMutationStore } from "@/store/mutation";
import { ObjectKind } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { Message } from "@/structures/Message";
import { useQuery } from "@vue/apollo-composable";
import { reactive, ref } from "vue";
import EmoteDeleteModal from "@/views/emote/EmoteDeleteModal.vue";
import ModRequestCard from "./ModRequestCard.vue";
import Icon from "@/components/utility/Icon.vue";

const after = ref<string | null>(null);

const { onResult } = useQuery<GetModRequests.Result, GetModRequests.Variables>(GetModRequests, {
	after: after.value,
	limit: 250,
});

const dataloaders = useDataLoaders();

const total = ref(0);
const requests = ref([] as Message.ModRequest[]);
const targetMap = reactive({} as Record<string, Emote>);

await new Promise<void>((resolve) => {
	onResult(({ data }) => {
		requests.value = data.modRequests.messages;
		total.value = data.modRequests.total;

		// Fetch target
		const emoteRequests = requests.value.filter((r) => r.target_kind === ObjectKind.EMOTE);
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
			});
		});

		resolve();
	});
});

const observer = new IntersectionObserver((entries, observer) => {
	const fetchList = [] as string[];

	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		}
		const id = entry.target.getAttribute("target-id");
		if (!id || targetMap[id]) return;

		fetchList.push(id);

		observer.unobserve(entry.target);
	});
	if (fetchList.length === 0) return;

	dataloaders.loadEmotes(fetchList).then((e) => {
		e.forEach((emote) => {
			if (!emote) return;

			targetMap[emote.id] = emote;
		});
	});
});

const observeCard = (el: HTMLElement | null) => {
	if (!el) return;

	observer.observe(el);
};

const actor = useActor();
const modal = useModal();

const m = useMutationStore();

const readCards = ref(new Set<string>());

// Called when a decision on a request is made
const onDecision = async (req: Message.ModRequest, t: string, isUndo?: boolean) => {
	readCards.value.delete(req.id);

	if (req.target_kind === ObjectKind.EMOTE && req.wish === "list") {
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
		}
	} else if (req.target_kind === ObjectKind.EMOTE && req.wish === "personal_use") {
		switch (t) {
			case "validate":
				// todo: validate emote for personal use
				m.editEmote(req.target_id, {
					personal_use: true,
				});
				break;
			case "deny":
				m.editEmote(req.target_id, {
					personal_use: false,
				});
				break;
		}
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
	z-index: 1;

	@include themify() {
		.mod-queue-stats {
			background-color: opacify(themed("navBackgroundColor"), 1);
		}

		.mod-queue-categories > .mod-queue-category-item {
			background-color: lighten(themed("backgroundColor"), 4);

			&:hover {
				background-color: lighten(themed("backgroundColor"), 6);
			}
			&[active="true"] {
				background-color: lighten(themed("backgroundColor"), 8);
			}
		}
	}

	.mod-queue-stats {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 3em;
		padding: 0.5em;
	}

	.mod-queue-categories {
		display: flex;
		column-gap: 0.5em;
		justify-content: space-between;
		height: 100%;

		> .mod-queue-category-item {
			display: flex;
			align-items: center;
			padding: 0.5em;
			column-gap: 0.5em;
			height: 100%;
			cursor: pointer;
		}
	}

	.mod-request-card-list {
		display: grid;
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
