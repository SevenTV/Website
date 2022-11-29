<template>
	<main class="user-page">
		<template v-if="partial || user || loading">
			<!-- User Details - name tag, roles, channels, etc -->
			<div class="container">
				<UserDetails :user="user" />

				<router-view class="user-data" />
				<div v-if="route.name === 'User'" ref="userData" class="user-data">
					<h3 section-title selector="emote-sets">
						<span> {{ t("user.emote_sets") }}</span>

						<!-- Migrate Button -->
						<div :style="{ display: 'flex', gap: '0.25em' }">
							<router-link :to="{ name: 'Migrate' }" class="migrate">
								<Button color="accent" fa-icon="check-double" :label="t('migrate.cta')" />
							</router-link>
							<Button
								v-if="actorCanManageSets"
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
						<div v-if="emoteSets.length" selector="emote-set-list">
							<EmoteSetCard v-for="set of emoteSets" :key="set.id" :set="set" />
						</div>
						<p v-else>{{ t("user.no_sets", [user?.display_name]) }}</p>
					</div>

					<!-- Display Channel Emotes -->
					<UserChannelEmotes v-if="user && !emotesLoading" :user="user" :page-size="cardCount" />
					<span v-else>{{ t("common.loading") }}...</span>

					<!-- Display Owned Emotes -->
					<h3 v-if="user && pagedOwnedEmotes?.length" section-title>
						<span>Owned Emotes ({{ ownedPager.length }})</span>
						<span selector="search-bar">
							<TextInput v-model="ownedEmoteSearch" icon="search" :label="t('common.search')" />
						</span>
					</h3>
					<div v-if="user" section-body>
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
					<h3 v-if="user && user.activity?.length" section-title>Activity</h3>

					<div v-if="user && user.emote_sets?.length" class="activity-list">
						<div v-for="log in activity" :key="log.id">
							<Activity :target="findActiveSet(log.target_id) ?? user" :log="log" />
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- Display 404 if request for user failed -->
		<template v-if="!user && !loading">
			<div class="user-unknown">
				<NotFound />
			</div>
		</template>
	</main>
</template>

<script setup lang="ts">
import { GetUser, GetUserActivity, GetUserEmoteSets, GetUserOwnedEmotes } from "@gql/users/user";
import { User } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { computed, defineAsyncComponent, onBeforeUnmount, onUpdated, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { EmoteSet } from "@/structures/EmoteSet";
import { storeToRefs } from "pinia";
import { useActor } from "@/store/actor";
import { ObjectKind } from "@/structures/Common";
import { useObjectSubscription } from "@/composable/object-sub";
import type { AuditLog } from "@/structures/Audit";
import { useModal } from "@/store/modal";
import { useSizedRows } from "@/composable/calculate-sized-rows";
import NotFound from "@/views/404.vue";
import UserDetails from "@/views/UserPage/UserDetails.vue";
import Paginator from "@/views/EmoteList/Paginator.vue";
import TextInput from "@/components/form/TextInput.vue";
import EmoteSetCard from "@/components/emote-set/EmoteSetCard.vue";
import Button from "@/components/utility/Button.vue";
import EmoteCardList from "../../components/utility/EmoteCardList.vue";
import UserChannelEmotes from "./UserChannelEmotes.vue";

const ModalCreateEmoteSet = defineAsyncComponent(() => import("@/components/modal/ModalCreateEmoteSet.vue"));
const Activity = defineAsyncComponent(() => import("@/components/activity/Activity.vue"));

const { t } = useI18n();

const props = defineProps({
	userID: String,
	userData: {
		type: String,
		required: false,
	},
});

const userID = ref(props.userID as string);
const user = ref((props.userData ? JSON.parse(props.userData) : null) as User | null);
const title = computed(() =>
	"".concat(user.value !== null ? user.value.display_name + "'s User Page" : "User", " - 7TV"),
);
useHead({ title });
/** Whether or not the page was initiated with partial emote data  */
const partial = computed(() => user.value !== null);

const actor = useActor();
const { preferredFormat } = storeToRefs(actor);
const activity = ref([] as AuditLog[]);

const { watchObject } = useObjectSubscription();

// Fetch user data
const { onResult: onUserFetched, onError, refetch, loading } = useQuery<GetUser>(GetUser, { id: userID.value });

await new Promise<void>((resolve) => {
	onUserFetched(({ data }) => {
		if (!data.user) {
			return;
		}

		user.value = data?.user;
		document.documentElement.style.setProperty(
			"--user-page-sections-color",
			user.value?.style.color !== 0 ? ConvertIntColorToHex(user.value.style.color) : "#FFFFFF40",
		);

		watchObject(ObjectKind.USER, user.value as User);
		resolve();
	});

	onError(() => resolve());
});

const userData = ref<HTMLElement>();
const { update: updateSizing } = useSizedRows([128, 160]);
const getSizedRows = (): number => (userData.value ? updateSizing(userData.value).rows : 0);

// Fetch user's emote data
const {
	onResult: onEmoteSetsFetched,
	refetch: refetchEmoteData,
	loading: emotesLoading,
} = useQuery(GetUserEmoteSets, {
	id: userID.value,
	formats: [preferredFormat.value],
});

onEmoteSetsFetched(({ data }) => {
	if (!data.user || !user.value) {
		return;
	}

	user.value.emote_sets = data.user.emote_sets;

	for (let i = 0; i < user.value.emote_sets.length; i++) {
		watchObject(ObjectKind.EMOTE_SET, user.value.emote_sets[i]);
	}
});

const cardCount = ref(1);

onUpdated(() => {
	cardCount.value = getSizedRows() * 5;
});

const actorCanManageSets = computed(() =>
	!user.value ? false : actor.hasEditorPermission(user.value, User.EditorPermission.ManageEmoteSets),
);

// Fetch user's owned emotes
const { onResult: onOwnedEmoteDataFetched } = useQuery<GetUser>(GetUserOwnedEmotes, {
	id: userID.value,
	formats: [preferredFormat.value],
});

onOwnedEmoteDataFetched(({ data }) => {
	if (!data.user || !user.value) {
		return;
	}

	user.value.owned_emotes = data.user.owned_emotes;
});

// Fetch logs
const { onResult: onLogsFetched, refetch: refetchLogs } = useQuery<GetUser>(GetUserActivity, { id: props.userID });

const findActiveSet = (id: string): EmoteSet | null => {
	for (const set of user.value?.emote_sets ?? []) {
		if (set.id === id) {
			return set;
		}
	}

	return null;
};

const dones = [] as (() => void)[];
onLogsFetched(({ data }) => {
	const done = watch(
		user,
		(u) => {
			if (!u) {
				return;
			}

			activity.value = data.user.activity;
		},
		{ immediate: true },
	);
	dones.push(done);
});

// Handle route changes
const route = useRoute();
watch(route, (r) => {
	if (r.name !== "User") {
		return;
	}

	userID.value = String(r.params.userID);

	refetch({ id: userID.value });
	refetchEmoteData({ id: userID.value, formats: [preferredFormat.value] });
	refetchLogs({ id: userID.value });
});

// Handle unmount
onBeforeUnmount(() => {
	dones.forEach((f) => f());
});

const emoteSets = computed(() => user.value?.emote_sets ?? []);

const ownedEmotes = computed(() => {
	return user.value?.owned_emotes ?? [];
});
const ownedPager = reactive({
	page: 1,
	length: computed(() => ownedEmotes.value.length),
});

const pagedOwnedEmotes = computed(() => {
	const start = (ownedPager.page - 1) * cardCount.value;
	const end = start + cardCount.value;
	return ownedEmotes.value.filter((e) => ownedEmotesSearched(e.name)).slice(start, end);
});

// Search

const ownedEmotesSearched = (s: string) =>
	!ownedEmoteSearch.value || s.toLowerCase().includes(ownedEmoteSearch.value.toLowerCase());

const ownedEmoteSearch = ref("");
watch(ownedEmoteSearch, () => {
	ownedPager.page = 1;
});

const modal = useModal();
const createEmoteSet = () => {
	modal.open("create-emote-set", {
		component: ModalCreateEmoteSet,
		props: {
			user: user.value,
			startingValue: {
				connections: [null],
			},
		},
		events: {
			created: (set: EmoteSet) => {
				user.value?.emote_sets.push(set);
			},
		},
	});
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

$smallWidth: 800px;
.user-page {
	.container {
		display: flex;
		flex-direction: row;
		height: 100%;

		@include themify() {
			background-color: themed("navBackgroundColor");
		}

		@media screen and (max-width: $smallWidth) {
			flex-direction: column;
			.user-data {
				margin-top: 2em;

				.emote-list {
					justify-content: center;
				}
			}
		}

		.user-data {
			display: flex;
			flex-direction: column;
			width: 100%;

			@include themify() {
				background-color: lighten(themed("backgroundColor"), 1);
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

				@include themify() {
					background-image: linear-gradient(
						60deg,
						var(--user-page-sections-color, themed("backgroundColor")) 16em,
						transparent 0,
						themed("navBackgroundColor") 0
					);
				}
			}
			div[section-body] {
				border-radius: 0.5em;
				padding: 0.5em;
				padding-bottom: 1em;
				@include themify() {
					background-color: lighten(themed("backgroundColor"), 2);
				}

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
				@include themify() {
					color: darken(themed("color"), 20);
				}
			}
		}
	}
}

.user-unknown {
	display: flex;
	width: 100%;
	height: 100%;
	place-content: center;
}
</style>
