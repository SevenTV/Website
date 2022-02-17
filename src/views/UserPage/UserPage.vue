<template>
	<main class="user-page">
		<template v-if="partial || (user && !loading)">
			<!-- User Details - name tag, roles, channels, etc -->
			<div v-if="user" class="container">
				<UserDetails :user="user" />
				<div class="user-data">
					<!-- Display Editors -->
					<h3 v-if="user.editors.length" section-title>{{ t("user.editors") }}</h3>
					<div v-if="user.editors.length" class="user-editors" section-body>
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

					<!-- Display Channel Emotes -->
					<h3 section-title>
						<span>{{ t("user.channel_emotes") }} ({{ length }}/{{ conn?.emote_slots }})</span>
						<div selector="search-bar">
							<TextInput v-model="search" label="Search">
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
								:key="emote.emote.id"
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
						<p v-if="conn">
							{{
								t("user.no_channel_emotes", [
									user.display_name,
									conn.platform.charAt(0) + conn.platform.slice(1).toLowerCase(),
								])
							}}.
						</p>
						<p v-else>{{ t("user.no_channels", [user.display_name]) }}.</p>
					</div>

					<!-- Display Owned Emotes -->
					<h3 v-if="user.owned_emotes?.length" section-title>Owned Emotes</h3>
					<div class="owned-emotes emote-list">
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
import { useSubscription } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { computed, defineComponent, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import UserTag from "@/components/utility/UserTag.vue";
import NotFound from "../404.vue";
import UserDetails from "./UserDetails.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";
import Paginator from "../EmoteList/Paginator.vue";
import TextInput from "@/components/form/TextInput.vue";

export default defineComponent({
	components: { UserTag, NotFound, UserDetails, EmoteCard, Paginator, TextInput },
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
			"".concat(user.value !== null ? user.value.display_name + "'s User Page" : "User", " - 7TV")
		);
		useHead({ title });
		const { t } = useI18n();
		/** Whether or not the page was initiated with partial emote data  */
		const partial = computed(() => user.value !== null);

		const { onResult, loading, stop } = useSubscription<GetUser>(WatchUser, { id: userID });
		onResult((res) => {
			if (!res.data) {
				return;
			}
			user.value = res.data.user;
			document.documentElement.style.setProperty(
				"--user-page-sections-color",
				user.value?.tag_color !== 0 ? ConvertIntColorToHex(user.value.tag_color) : "#FFFFFF40"
			);
		});

		// Handle route changes
		const route = useRoute();
		watch(route, () => {
			if (route.name !== "User") {
				return;
			}
			userID.value = String(route.params.userID);
		});

		// Handle unmount
		onBeforeUnmount(() => {
			stop();
		});

		const pageSize = ref(36);
		const page = ref(1);
		const conn = computed(() => user.value?.connections[0]);
		const allEmotes = computed(() => conn.value?.emote_set?.emotes ?? []);
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
