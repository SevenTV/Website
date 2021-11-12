<template>
	<main class="user-page">
		<template v-if="partial || (user && !loading)">
			<!-- User Card -->
			<div class="user-card-wrapper">
				<div class="full-user-card">
					<UserTag :user="user" scale="4em" text-scale="0em" />
					<div class="tag-and-roles">
						<UserTag :user="user" :hide-avatar="true" text-scale="1.25em" />
						<div class="user-role-list">
							<div
								class="user-role-chip"
								v-for="role of user?.roles"
								:key="role.id"
								:style="{ color: ConvertIntColorToHex(role.color) }"
							>
								{{ role.name }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- User Details - name tag, roles, channels, etc -->
			<div class="container">
				<UserDetails :user="user" />
				<div class="user-data">
					<h3>{{ $t("user.channel_emotes") }}</h3>
					<div class="channel-emotes">
						<EmoteCard :emote="emote.emote" v-for="emote of user?.channel_emotes" :key="emote.emote.id" />
					</div>

					<div class="user-editors">
						<h3>{{ $t("user.editors") }}</h3>
						<div class="editor" v-for="ed of user?.editors" :key="ed.id">
							{{ ed.user?.display_name }}
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

<script lang="ts">
import { GetUser } from "@/assets/gql/users/user";
import { ConvertIntColorToHex, User } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { computed, defineComponent, onBeforeUnmount, ref } from "vue-demi";
import UserTag from "@/components/utility/UserTag.vue";
import NotFound from "../404.vue";
import UserDetails from "./UserDetails.vue";
import EmoteCard from "@/components/utility/EmoteCard.vue";

export default defineComponent({
	components: { UserTag, NotFound, UserDetails, EmoteCard },
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
		/** Whether or not the page was initiated with partial emote data  */
		const partial = user.value !== null;
		const { onResult, loading, stop } = useQuery<GetUser>(GetUser, { id: props.userID });
		onResult((res) => {
			if (!res.data) {
				return;
			}
			user.value = res.data.user;
		});

		const scrolled = ref(true);
		onBeforeUnmount(() => {
			stop();
		});

		return {
			user,
			partial,
			loading,
			scrolled,
			ConvertIntColorToHex,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/user-page/user-page.scss";
</style>
