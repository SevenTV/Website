<template>
	<main ref="userOverview" class="user-overview">
		<h3 section-title selector="emote-sets">
			<span> {{ t("user.emote_sets") }}</span>

			<div :style="{ display: 'flex', gap: '0.25em' }">
				<Button
					v-if="actorMayManageSets"
					:label="t('emote_set.create')"
					appearance="raised"
					color="primary"
					fa-icon="hexagon-plus"
					selector="emote-set-create"
					@click="createEmoteSet"
				/>
			</div>
		</h3>
		<div section-body>
			<div v-if="ctx.emoteSets.length" selector="emote-set-list">
				<EmoteSetCard v-for="set of ctx.emoteSets" :key="set.id" :set="set" />
			</div>
			<p v-else>{{ t("user.no_sets", [ctx.user?.display_name]) }}</p>
		</div>

		<!-- Display Channel Emotes -->
		<UserChannelEmotes v-if="ctx.user" :user="ctx.user" :page-size="cardCount" />
		<span v-else>{{ t("common.loading") }}...</span>

		<!-- Display Owned Emotes -->
		<h3 v-if="ctx.user && ctx.ownedEmotes.length" section-title>
			<span>Owned Emotes ({{ ownedPager.length }})</span>
			<span selector="search-bar">
				<TextInput v-model="ownedEmoteSearch" icon="search" :label="t('common.search')" />
			</span>
		</h3>
		<div v-if="ctx.user" section-body>
			<div class="owned-emotes emote-list">
				<EmoteCardList :items="pagedOwnedEmotes" />
			</div>
			<div v-if="ownedPager.length / cardCount > 1">
				<Paginator
					:page="ownedPager.page"
					:items-per-page="cardCount"
					:length="ownedPager.length"
					@change="(change) => (ownedPager.page = change.page)"
				/>
			</div>
		</div>

		<!-- Display Activity -->
		<h3 v-if="ctx.user && ctx.activity.length" section-title>Activity</h3>

		<div v-if="ctx.user && ctx.emoteSets.length" class="activity-list">
			<div v-for="log in ctx.activity" :key="log.id">
				<Activity :target="findActiveSet(log.target_id) ?? ctx.user" :log="log" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useActor } from "@/store/actor";
import { useModal } from "@/store/modal";
import type { Emote } from "@/structures/Emote";
import { EmoteSet } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import { ConvertDecimalToHex } from "@/structures/util/Color";
import { useContext } from "@/composables/useContext";
import { useSizedRows } from "@/composables/useSizedRows";
import Paginator from "@/views/emote-list/Paginator.vue";
import EmoteSetCard from "@/components/emote-set/EmoteSetCard.vue";
import TextInput from "@/components/form/TextInput.vue";
import Button from "@/components/utility/Button.vue";
import UserChannelEmotes from "./UserChannelEmotes.vue";
import EmoteCardList from "../../components/utility/EmoteCardList.vue";

const ModalCreateEmoteSet = defineAsyncComponent(() => import("@/components/modal/ModalCreateEmoteSet.vue"));
const Activity = defineAsyncComponent(() => import("@/components/activity/Activity.vue"));

const { t } = useI18n();

const ctx = useContext("USER");
if (!ctx?.user) throw new Error("No user context provided");

const actor = useActor();

const userOverview = ref<HTMLElement>();
const cardCount = ref(1);
const { update: updateSizing } = useSizedRows([128, 160]);
const sizedRows = ref(0);

const ownedPager = reactive({
	page: 1,
	length: 0,
	start: 0,
	end: 0,
});
const pagedOwnedEmotes = ref([] as Emote[]);

const actorMayManageSets = ref(false);

// Search
const ownedEmotesSearched = (s: string) =>
	!ownedEmoteSearch.value || s.toLowerCase().includes(ownedEmoteSearch.value.toLowerCase());

const ownedEmoteSearch = ref("");
watch(ownedEmoteSearch, () => {
	ownedPager.page = 1;
});

watchEffect(() => {
	if (!ctx?.user) return;

	document.documentElement.style.setProperty(
		"--user-page-sections-color",
		ctx.user.style && ctx.user.style.color !== 0 ? ConvertDecimalToHex(ctx.user.style.color) : "#FFFFFF40",
	);

	sizedRows.value = updateSizing(userOverview.value as HTMLElement).rows;
	cardCount.value = sizedRows.value * 5;

	actorMayManageSets.value = actor.hasEditorPermission(ctx.user, User.EditorPermission.ManageEmoteSets);

	// Paginate owned emotes
	ownedPager.length = ctx.ownedEmotes.length;
	ownedPager.start = (ownedPager.page - 1) * cardCount.value;
	ownedPager.end = ownedPager.start + cardCount.value;
	pagedOwnedEmotes.value = ctx.ownedEmotes
		.filter((e) => ownedEmotesSearched(e.name))
		.slice(ownedPager.start, ownedPager.end);
});

const findActiveSet = (id: string): EmoteSet | null => {
	for (const set of ctx?.emoteSets ?? []) {
		if (set.id === id) {
			return set;
		}
	}

	return null;
};

const modal = useModal();
const createEmoteSet = () => {
	if (!ctx?.user) return;

	modal.open("create-emote-set", {
		component: ModalCreateEmoteSet,
		props: {
			user: ctx.user,
			startingValue: {
				connections: [null],
			},
		},
		events: {
			created: (set: EmoteSet) => {
				ctx.user.emote_sets.push(set);
			},
		},
	});
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.user-overview {
	display: flex;
	flex-direction: column;
	width: 100%;

	@include themify() {
		background-color: lighten(themed("backgroundColor"), 1);

		h3[section-title] {
			background-image: linear-gradient(
				60deg,
				var(--user-page-sections-color, themed("backgroundColor")) 16em,
				transparent 0,
				themed("navBackgroundColor") 0
			);
		}

		div[section-body] {
			background-color: lighten(themed("backgroundColor"), 2);
		}

		.section-has-nothing {
			color: darken(themed("color"), 20);
		}
	}

	.emote-list {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		margin-bottom: 1em;
		gap: 1em;
	}

	h3[section-title] {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 3em;
		font-size: 1.25em;
		padding-left: 1em;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		width: 100%;
		padding-right: 0.5em;

		&[selector="emote-sets"] {
			span {
				z-index: 1;
			}
			button {
				font-size: 1rem;
			}
		}

		> [selector="search-bar"] {
			font-weight: 400;
			> div {
				width: min(12em, 25vw);
			}
		}
	}
	div[section-body] {
		border-radius: 0.5em;
		padding: 0.5em;
		padding-bottom: 1em;

		[selector="emote-set-list"] {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			> .emote-set-card {
				margin: 0.25em;
			}
		}
	}
	.section-has-nothing {
		padding: 1em;
	}
}

.user-unknown {
	display: flex;
	width: 100%;
	height: 100%;
	place-content: center;
}
</style>
