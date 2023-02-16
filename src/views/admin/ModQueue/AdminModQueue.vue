<template>
	<main ref="mainEl" class="admin-mod-queue">
		<div class="mod-queue-stats">
			<p>{{ total }} pending requests</p>

			<div>
				<TextInput v-model="searchQuery" icon="search" label="Search requests" />
			</div>
			<section class="mod-queue-categories">
				<div class="mod-queue-category-item" :active="activeTab === 'list'" @click="activeTab = 'list'">
					<Icon icon="globe" />
					Public Listing
				</div>
				<div
					class="mod-queue-category-item"
					:active="activeTab === 'personal_use'"
					@click="activeTab = 'personal_use'"
				>
					<Icon icon="user-lock" />
					Personal Use
				</div>
			</section>
		</div>
		<Transition name="cardlist">
			<div class="mod-request-card-list">
				<template v-for="r of filteredRequests" :key="r.id">
					<div
						v-if="r.target"
						:ref="(el) => observeCard(el as HTMLElement)"
						:target-id="r.target_id"
						:requester-id="r.author_id"
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
import { computed, onUnmounted, reactive, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useActor } from "@/store/actor";
import { useDataLoaders } from "@/store/dataloader";
import { useModal } from "@/store/modal";
import { useMutationStore } from "@/store/mutation";
import { GetModRequests } from "@/apollo/query/mod-queue.query";
import { ObjectKind } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { Message } from "@/structures/Message";
import EmoteDeleteModal from "@/views/emote/EmoteDeleteModal.vue";
import EmoteMergeModal from "@/views/emote/EmoteMergeModal.vue";
import TextInput from "@/components/form/TextInput.vue";
import Icon from "@/components/utility/Icon.vue";
import ModRequestCard from "./ModRequestCard.vue";

const after = ref<string | null>(null);
const activeTab = ref("list");

const { onResult } = useQuery<GetModRequests.Result, GetModRequests.Variables>(
	GetModRequests,
	() => ({
		after: after.value,
		limit: 350,
		wish: activeTab.value,
	}),
	{
		fetchPolicy: "cache-and-network",
	},
);

const dataloaders = useDataLoaders();

const total = ref(0);
const requests = ref([] as Message.ModRequest[]);
const targetMap = reactive({} as Record<string, Emote>);

const searchQuery = ref("");

onResult(({ data }) => {
	const d = structuredClone(data) as typeof data;
	requests.value = d.modRequests.messages;
	total.value = d.modRequests.total;

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
});

const filteredRequests = computed(() => {
	const q = searchQuery.value;

	if (!q) {
		return requests.value;
	}

	return requests.value.filter((r) => {
		if (r.target_kind === ObjectKind.EMOTE) {
			const e = r.target as Emote;
			return (
				e.name.toLowerCase().includes(q.toLowerCase()) ||
				(r.author && r.author.username.toLowerCase().includes(q.toLowerCase()))
			);
		}

		return false;
	});
});

const observer = new IntersectionObserver((entries, observer) => {
	const targetList = new Set<string>();
	const requesterList = new Set<string>();

	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		}
		const id = entry.target.getAttribute("target-id");
		if (!id || targetMap[id]) return;

		const rid = entry.target.getAttribute("requester-id");
		if (rid) {
			requesterList.add(rid);
		}

		targetList.add(id);

		observer.unobserve(entry.target);
	});
	if (targetList.size === 0) return;

	dataloaders.loadEmotes(Array.from(targetList.values())).then((e) => {
		e.forEach((emote) => {
			if (!emote) return;

			targetMap[emote.id] = emote;
		});
	});

	dataloaders.loadUsers(Array.from(requesterList.values())).then((u) => {
		u.forEach((user) => {
			if (!user) return;

			requests.value.forEach((r) => {
				if (r.author_id === user.id) {
					r.author = user;
				}
			});
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
			case "merge": {
				const [ok, targetID, reason] = await new Promise<[ok: boolean, targetID: string, reason: string]>(
					(resolve) => {
						modal.open("mod-request-merge-item", {
							component: EmoteMergeModal,
							props: {
								emote: req.target as Emote,
							},
							events: {
								merge: (targetID: string, reason: string) => resolve([true, targetID, reason]),
								close: () => resolve([false, "", ""]),
							},
						});
					},
				);
				if (!ok) return;

				const reqOK = !!(await m.mergeEmote(req.target_id, targetID, reason).catch(actor.showErrorModal));
				if (!reqOK) return;

				break;
			}
			case "delete": {
				const [ok, reason] = await new Promise<[ok: boolean, reason: string]>((resolve) => {
					modal.open("mod-request-delete-item", {
						component: EmoteDeleteModal,
						props: {
							emote: req.target as Emote,
						},
						events: {
							delete: (reason: string) => resolve([true, reason]),
							close: () => resolve([false, ""]),
						},
					});
				});
				if (!ok) return;

				await m
					.editEmote(
						req.target_id,
						{
							deleted: true,
						},
						reason,
					)
					.catch(actor.showErrorModal);
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

onUnmounted(() => {
	observer.disconnect();
});
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
		height: 3.5em;
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
