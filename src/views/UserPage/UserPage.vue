<template>
	<main class="user-page">
		<template v-if="partial || (user && !loading)">
			<div class="full-user-card" :class="{ scrolled: scrolled }">
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
			<div class="xd">hi</div>
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

export default defineComponent({
	components: { UserTag },
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
		const { onResult, loading } = useQuery<GetUser>(GetUser, { id: props.userID });
		onResult((res) => {
			if (!res.data) {
				return;
			}
			user.value = res.data.user;
		});

		const scrolled = ref(true);
		let stop = false;
		onBeforeUnmount(() => {
			stop = true;
		});
		const i = () => {
			if (stop) return;
			window.requestAnimationFrame(() => {
				scrolled.value = !!window.scrollY;
				i();
			});
		};
		i();

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
