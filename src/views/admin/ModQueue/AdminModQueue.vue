<template>
	<main ref="mainEl" class="admin-mod-queue">
		<div class="mod-queue-stats">
			<p>{{ total }} pending requests</p>
			<section class="mod-queue-categories">
				<div>
					<TextInput v-model="searchQuery" icon="search" label="Search requests" width="12em" />
				</div>
				<div>
					<TextInput v-model="cIn" icon="search" label="Country" width="6em" />
				</div>
			</section>
			<div class="mod-queue-category-item" @click="query.refetch()">Refetch</div>
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
		<div>
			<Transition name="cardlist">
				<div class="mod-request-card-list">
					<template v-if="query.loading.value">
						<template v-for="i of 12" :key="i">
							<div class="mod-request-card-wrapper" tabindex="-1">
								<ModRequestCard :request="fakeRequest" :target="null" /></div
						></template>
					</template>
					<template v-else>
						<template v-for="r of requests" :key="r.id">
							<div
								v-show="matchesSearch(r)"
								:ref="(el) => observe(el as Element)"
								:target-id="r.target_id"
								class="mod-request-card-wrapper"
								tabindex="-1"
							>
								<ModRequestCard
									:read="readCards.has(r.id)"
									:request="r"
									:target="r.target"
									@decision="(t, undo) => onDecision(r, t, undo)"
								/></div
						></template>
					</template>
				</div>
			</Transition>
		</div>
	</main>
</template>

<script setup lang="ts">
import { onUnmounted, ref, toRaw, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { debouncedRef } from "@vueuse/core";
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

const activeTab = ref("list");

const fakeRequest = {} as Message.ModRequest;

const cIn = ref("");
const country = debouncedRef(cIn, 250);

const query = useQuery<GetModRequests.Result, GetModRequests.Variables>(
	GetModRequests,
	() => ({
		after: null,
		limit: 500,
		wish: activeTab.value,
		country: country.value.length == 2 ? country.value : undefined,
	}),
	{
		fetchPolicy: "no-cache",
	},
);

const dataloaders = useDataLoaders();

const total = ref(0);
const requests = ref([] as Message.ModRequest<Emote>[]);

const searchQuery = ref("");
const debouncedSearch = debouncedRef(searchQuery, 100);

const targetMap = new Map<string, Emote>();

const loadEmotes = async (ids: string[]) => {
	const toLoad = ids.filter((id) => !targetMap.has(id));
	if (!toLoad.length) return;
	const emotes = await dataloaders.loadEmotes(toLoad);

	emotes.forEach((emote) => {
		targetMap.set(emote.id, emote);
		requests.value.forEach((r) => {
			if (r.target_id === emote.id) {
				r.target = emote;
				r.author = emote.owner ?? undefined;
			}
		});
	});
};

query.onResult(({ data }) => {
	if (!data) return;
	const d = structuredClone(toRaw(data)) as typeof data;
	query.loading.value = false;
	if (!d?.modRequests?.messages) return;

	total.value = d.modRequests.total;
	const rs = d.modRequests.messages.filter(
		(r) => r.target_kind === ObjectKind.EMOTE,
	) as unknown as Message.ModRequest<Emote>[];
	if (!rs.length) return;

	rs.forEach((r) => {
		const emote = targetMap.get(r.target_id);
		if (!emote?.owner) return;

		r.target = emote;
		r.author = emote.owner!;
	});
	requests.value = rs;
});

const observer = new IntersectionObserver((entries) => {
	const toLoad = [];
	for (const entry of entries) {
		if (entry.isIntersecting) {
			const id = entry.target.getAttribute("target-id");
			if (!id) return;

			toLoad.push(id);
		}
	}

	loadEmotes(toLoad);
});

const observe = (el?: Element) => {
	if (!el) return;
	observer.observe(el);
};

onUnmounted(() => {
	observer.disconnect();
});

const stop = watch(searchQuery, (s) => {
	if (!s) return false;
	const ids = requests.value.map((r) => r.target_id);
	stop();
	loadEmotes(ids);
});

const matchesSearch = (r: Message.ModRequest) => {
	const q = debouncedSearch.value.toLowerCase();
	if (!q) return true;

	if (r.target_kind !== ObjectKind.EMOTE) return false;

	const e = r.target as Emote;
	if (!e) return false;

	if (e.name.toLowerCase().includes(q)) return true;
	if (r.author && r.author.display_name.toLowerCase().includes(q)) return true;

	return false;
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

		.mod-queue-category-item {
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
	}

	.mod-queue-category-item {
		display: flex;
		align-items: center;
		padding: 0.5em;
		column-gap: 0.5em;
		height: 100%;
		cursor: pointer;
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
