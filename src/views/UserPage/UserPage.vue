<template>
	<main class="user-page">
		<template v-if="partial || user || loading">
			<!-- User Details - name tag, roles, channels, etc -->
			<div class="container">
				<UserDetails :user="user" />

				<router-view class="user-data" />
				<div v-if="route.name === 'User'" class="user-data">
					<h3 section-title>
						<span> {{ t("user.emote_sets") }}</span>
					</h3>
					<div section-body>
						<div selector="emote-set-list">
							<EmoteSetCard v-for="set of emoteSets" :key="set.id" :set="set" />
						</div>
					</div>

					<!-- Display Channel Emotes -->
					<h3 section-title>
						<span
							>{{ t("user.channel_emotes") }} ({{ channelPager.length }}/{{
								conn?.emote_slots ?? 0
							}})</span
						>
						<span selector="search-bar">
							<TextInput v-model="channelEmoteSearch" icon="search" :label="t('common.search')" />
						</span>
					</h3>
					<div v-if="pagedChannelEmotes.length" section-body>
						<div class="channel-emotes emote-list">
							<EmoteCard
								v-for="emote of pagedChannelEmotes"
								:key="emote.id"
								:spooky="theme === 'halloween'"
								:emote="emote.emote"
								:emote-actor="emote.actor"
								:alias="emote.name"
							/>
						</div>
						<div v-if="channelPager.length / channelPager.pageSize > 1">
							<Paginator
								:page="channelPager.page"
								:items-per-page="channelPager.pageSize"
								:length="channelPager.length"
								@change="(change) => (channelPager.page = change.page)"
							/>
						</div>
					</div>
					<div v-else class="section-has-nothing">
						<p v-if="loading || emotesLoading">Loading...</p>
						<p v-else-if="user && conn">
							{{
								t("user.no_channel_emotes", [
									user.display_name,
									conn.platform.charAt(0) + conn.platform.slice(1).toLowerCase(),
								])
							}}.
						</p>
						<p v-else-if="user">{{ t("user.no_channels", [user?.display_name]) }}.</p>
					</div>

					<!-- Display Owned Emotes -->
					<h3 v-if="user && user.owned_emotes?.length" section-title>
						<span>Owned Emotes ({{ ownedPager.length }})</span>
						<span selector="search-bar">
							<TextInput v-model="ownedEmoteSearch" icon="search" :label="t('common.search')" />
						</span>
					</h3>
					<div v-if="user" section-body>
						<div class="owned-emotes emote-list">
							<EmoteCard
								v-for="emote of pagedOwnedEmotes"
								:key="emote.id"
								:spooky="theme === 'halloween'"
								:emote="emote"
							/>
						</div>
						<div v-if="ownedPager.length / ownedPager.pageSize > 1">
							<Paginator
								:page="ownedPager.page"
								:items-per-page="ownedPager.pageSize"
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
import { GetUser, GetUserActivity, GetUserEmoteData, GetUserOwnedEmotes, WatchUser } from "@gql/users/user";
import { User } from "@structures/User";
import { useQuery, useSubscription } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { computed, onBeforeUnmount, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ConvertIntColorToHex } from "@structures/util/Color";
import { ApplyMutation } from "@structures/Update";
import { EmoteSet } from "@structures/EmoteSet";
import { storeToRefs } from "pinia";
import { useActorStore } from "@/store/actor";
import { useObjectWatch } from "@/store/object-watch";
import { Common } from "@/structures/Common";
import type { AuditLog } from "@/structures/Audit";
import NotFound from "@views/404.vue";
import UserDetails from "@views/UserPage/UserDetails.vue";
import EmoteCard from "@components/utility/EmoteCard.vue";
import Paginator from "@views/EmoteList/Paginator.vue";
import TextInput from "@components/form/TextInput.vue";
import EmoteSetCard from "@components/utility/EmoteSetCard.vue";
import Activity from "../../components/activity/Activity.vue";
import { useStore } from "@/store/main";

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

const { theme } = storeToRefs(useStore());
const { preferredFormat } = storeToRefs(useActorStore());
const activity = ref([] as AuditLog[]);

// Subscribe to emote set changes
const objectWatch = useObjectWatch();

// Fetch user data
const { onResult: onUserFetched, refetch, loading } = useQuery<GetUser>(GetUser, { id: userID.value });

await new Promise<void>((resolve) => {
	onUserFetched(({ data }) => {
		if (!data.user) {
			return;
		}

		user.value = data?.user;
		document.documentElement.style.setProperty(
			"--user-page-sections-color",
			user.value?.tag_color !== 0 ? ConvertIntColorToHex(user.value.tag_color) : "#FFFFFF40",
		);

		resolve();
	});
});

// Fetch user's emote data
const {
	onResult: onEmoteDataFetched,
	refetch: refetchEmoteData,
	loading: emotesLoading,
} = useQuery(GetUserEmoteData, {
	id: userID.value,
	formats: [preferredFormat.value],
});

onEmoteDataFetched(({ data }) => {
	if (!data.user || !user.value) {
		return;
	}

	user.value.emote_sets = data.user.emote_sets;

	for (let i = 0; i < user.value.emote_sets.length; i++) {
		const { stop } = objectWatch.subscribeToObject(Common.ObjectKind.EMOTE_SET, user.value.emote_sets[i], (x) => {
			if (!user.value) return;

			user.value.emote_sets[i] = x;
		});

		dones.push(stop);
	}
});

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

// Subscribe for user updates
const { onResult: onUserUpdate, stop } = useSubscription<GetUser>(WatchUser, { id: userID.value });
onUserUpdate((res) => {
	if (!res.data || !user.value) {
		return;
	}

	for (const k of Object.keys(res.data.user)) {
		ApplyMutation(user.value, {
			action: "set",
			field: k,
			value: JSON.stringify(res.data.user[k as keyof User]),
		});
	}
});
dones.push(stop);

// Handle route changes
const route = useRoute();
watch(route, () => {
	if (route.name !== "User") {
		return;
	}
	userID.value = String(route.params.userID);

	refetch({ id: userID.value });
	refetchEmoteData({ id: userID.value, formats: [preferredFormat.value] });
	refetchLogs({ id: userID.value });
});

// Handle unmount
onBeforeUnmount(() => {
	dones.forEach((f) => f());
});

const conn = computed(() => user.value?.connections?.[0]);
const emoteSets = computed(() => user.value?.emote_sets ?? []);
const activeSetIDs = computed(() => user.value?.connections.map((c) => c.emote_set_id));

const channelPager = reactive({
	pageSize: 68,
	page: 1,
	length: computed(() => channelEmotes.value.filter((e) => channelEmotesSearched(e.name)).length),
});

const pagedChannelEmotes = computed(() => {
	const start = (channelPager.page - 1) * channelPager.pageSize;
	const end = start + channelPager.pageSize;
	return channelEmotes.value.filter((e) => channelEmotesSearched(e.name)).slice(start, end);
});

const channelEmotes = computed(() => {
	if (!user.value || !Array.isArray(user.value.emote_sets)) {
		return [];
	}
	const m =
		user.value?.emote_sets.filter((set) => activeSetIDs.value?.includes(set.id)).map((set) => set.emotes) ?? [];
	return m.length > 0 ? m.reduce((a, b) => [...a, ...b]) : [];
});

const ownedEmotes = computed(() => {
	return user.value?.owned_emotes ?? [];
});
const ownedPager = reactive({
	pageSize: 68,
	page: 1,
	length: computed(() => ownedEmotes.value.length),
});

const pagedOwnedEmotes = computed(() => {
	const start = (ownedPager.page - 1) * ownedPager.pageSize;
	const end = start + ownedPager.pageSize;
	return ownedEmotes.value.filter((e) => ownedEmotesSearched(e.name)).slice(start, end);
});

// Search
const channelEmotesSearched = (s: string) =>
	!channelEmoteSearch.value || s.toLowerCase().includes(channelEmoteSearch.value.toLowerCase());

const channelEmoteSearch = ref("");
watch(channelEmoteSearch, () => {
	channelPager.page = 1;
});

const ownedEmotesSearched = (s: string) =>
	!ownedEmoteSearch.value || s.toLowerCase().includes(ownedEmoteSearch.value.toLowerCase());

const ownedEmoteSearch = ref("");
watch(ownedEmoteSearch, () => {
	ownedPager.page = 1;
});
</script>

<style lang="scss" scoped>
@import "@scss/user-page/user-page.scss";
</style>
