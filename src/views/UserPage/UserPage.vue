<template>
	<main class="user-page">
		<template v-if="partial || user || loading">
			<!-- User Details - name tag, roles, channels, etc -->
			<div class="container">
				<UserDetails :user="user" />
				<div class="user-data">
					<!-- Display Editors -->
					<h3 v-if="user && user.editors?.length" section-title>{{ t("user.editors") }}</h3>
					<div v-if="user && user.editors?.length" class="user-editors" section-body>
						<div
							v-for="ed of user.editors"
							:key="ed.id"
							class="editor"
							:style="{
								backgroundColor: ed.user?.tag_color
									? ConvertIntColorToHex(ed.user?.tag_color ?? 0, 0.25)
									: '',
							}"
						>
							<UserTag :clickable="true" scale="2em" :user="ed.user" />
						</div>
					</div>

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
						<span>{{ t("user.channel_emotes") }} ({{ length }}/{{ conn?.emote_slots ?? 0 }})</span>
						<div selector="search-bar">
							<TextInput v-model="search" :label="t('common.search')">
								<template #icon>
									<font-awesome-icon :icon="['fas', 'search']" />
								</template>
							</TextInput>
						</div>
					</h3>
					<div v-if="emotes.length" section-body>
						<div class="channel-emotes emote-list">
							<EmoteCard
								v-for="emote of emotes"
								:key="emote.id"
								:emote="emote.emote"
								:alias="emote.name"
							/>
						</div>
						<div v-if="length / pageSize > 1">
							<Paginator
								:page="page"
								:items-per-page="pageSize"
								:length="length"
								@change="(change) => (page = change.page)"
							/>
						</div>
					</div>
					<div v-else class="section-has-nothing">
						<p v-if="loading">Loading...</p>
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
					<h3 v-if="user && user.owned_emotes?.length" section-title>Owned Emotes</h3>
					<div v-if="user" class="owned-emotes emote-list">
						<EmoteCard v-for="emote of user.owned_emotes" :key="emote.id" :emote="emote" />
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

<script lang="ts">
import { GetUser, WatchUser } from "@/assets/gql/users/user";
import { User } from "@/structures/User";
import { useQuery, useSubscription } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { computed, defineComponent, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { ApplyMutation } from "@/structures/Update";
import { GetEmoteSet, WatchEmoteSet } from "@/assets/gql/emote-set/emote-set";
import { EmoteSet } from "@/structures/EmoteSet";
import UserTag from "@/components/utility/UserTag.vue";
import NotFound from "../404.vue";
import UserDetails from "./UserDetails.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";
import Paginator from "../EmoteList/Paginator.vue";
import TextInput from "@/components/form/TextInput.vue";
import EmoteSetCard from "@/components/utility/EmoteSetCard.vue";

export default defineComponent({
	components: { UserTag, NotFound, UserDetails, EmoteCard, Paginator, TextInput, EmoteSetCard },
	props: {
		userID: String,
		userData: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const userID = ref(props.userID as string);
		const user = ref((props.userData ? JSON.parse(props.userData) : null) as User | null);
		const title = computed(() =>
			"".concat(user.value !== null ? user.value.display_name + "'s User Page" : "User", " - 7TV"),
		);
		useHead({ title });
		const { t } = useI18n();
		/** Whether or not the page was initiated with partial emote data  */
		const partial = computed(() => user.value !== null);

		const { result: userQuery, refetch, loading } = useQuery<GetUser>(GetUser, { id: userID.value });
		watch(userQuery, (v) => {
			if (!v?.user) {
				return;
			}
			user.value = v.user;
			updateEmoteSetSubscriptions(v.user.emote_sets.map((set) => set.id));
			document.documentElement.style.setProperty(
				"--user-page-sections-color",
				user.value?.tag_color !== 0 ? ConvertIntColorToHex(user.value.tag_color) : "#FFFFFF40",
			);
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

		// Subscribe for emote set updates
		const stoppers = new Set<() => void>();
		const updateEmoteSetSubscriptions = (ids: string[]) => {
			stoppers.forEach((s) => s());
			stoppers.clear();
			for (const setID of ids) {
				const { onResult: onEmoteSetUpdate, stop } = useSubscription<GetEmoteSet>(WatchEmoteSet, { id: setID });
				onEmoteSetUpdate((res) => {
					const set = user.value?.emote_sets.filter((v) => v.id === res.data?.emoteSet.id)[0];
					if (!set || !res.data?.emoteSet) {
						return;
					}
					for (const k of Object.keys(res.data.emoteSet)) {
						ApplyMutation(set, {
							action: "set",
							field: k,
							value: JSON.stringify(res.data.emoteSet[k as keyof EmoteSet]),
						});
					}
				});
				stoppers.add(stop);
			}
		};

		// Handle route changes
		const route = useRoute();
		watch(route, () => {
			if (route.name !== "User") {
				return;
			}
			userID.value = String(route.params.userID);
			refetch({ id: userID.value });
		});

		// Handle unmount
		onBeforeUnmount(() => {
			stop();
		});

		const pageSize = ref(68);
		const page = ref(1);
		const conn = computed(() => user.value?.connections?.[0]);
		const emoteSets = computed(() => user.value?.emote_sets ?? []);
		const activeSetIDs = computed(() => user.value?.connections.map((c) => c.emote_set_id));
		const allEmotes = computed(() => {
			if (!user.value || !Array.isArray(user.value.emote_sets)) {
				return [];
			}
			const m =
				user.value?.emote_sets.filter((set) => activeSetIDs.value?.includes(set.id)).map((set) => set.emotes) ??
				[];
			return m.length > 0 ? m.reduce((a, b) => [...a, ...b]) : [];
		});
		const isSearched = (s: string) => s.toLowerCase().includes(search.value.toLowerCase());
		const emotes = computed(() => {
			const start = (page.value - 1) * pageSize.value;
			const end = start + pageSize.value;
			const a = allEmotes.value.filter((e) => isSearched(e.name)).slice(start, end);
			if (search.value.length > 0) {
				return a;
			} else {
				return a;
			}
		});
		const length = computed(() => allEmotes.value.filter((e) => isSearched(e.name)).length);

		// Search
		const search = ref("");
		watch(search, () => {
			page.value = 1;
		});

		return {
			user,
			partial,
			loading,
			conn,
			emotes,
			emoteSets,
			search,
			page,
			pageSize,
			length,
			ConvertIntColorToHex,
			t,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/user-page/user-page.scss";
</style>
