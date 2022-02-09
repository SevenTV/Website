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
					<h3 section-title>{{ t("user.channel_emotes") }} ({{ length }}/{{ conn?.emote_slots }})</h3>
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
import { GetUser } from "@/assets/gql/users/user";
import { ConvertIntColorToHex, User } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { computed, defineComponent, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import UserTag from "@/components/utility/UserTag.vue";
import NotFound from "../404.vue";
import UserDetails from "./UserDetails.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";
import Paginator from "../EmoteList/Paginator.vue";

export default defineComponent({
	components: { UserTag, NotFound, UserDetails, EmoteCard, Paginator },
	props: {
		userID: String,
		userData: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const user = ref((props.userData ? JSON.parse(props.userData) : null) as User | null);
		const title = computed(() =>
			"".concat(user.value !== null ? user.value.display_name + "'s User Page" : "User", " - 7TV")
		);
		useHead({ title });
		const { t } = useI18n();
		/** Whether or not the page was initiated with partial emote data  */
		const partial = computed(() => user.value !== null);

		const { onResult, loading, stop, refetch } = useQuery<GetUser>(GetUser, { id: props.userID });
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
			refetch({ id: route.params.userID });
		});

		// Handle unmount
		onBeforeUnmount(() => {
			stop();
		});

		const pageSize = ref(36);
		const page = ref(1);
		const conn = computed(() => user.value?.connections[0]);
		const allEmotes = computed(() => conn.value?.emote_set?.emotes ?? []);
		const emotes = computed(() => {
			const start = (page.value - 1) * pageSize.value;
			const end = start + pageSize.value;
			return allEmotes.value.slice(start, end);
		});
		const length = computed(() => allEmotes.value.length);

		return {
			user,
			partial,
			loading,
			conn,
			emotes,
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
