<template>
	<div class="user-card" v-click-outside="close">
		<div class="profile-banner">
			<!-- Profile Picture -->
			<span
				class="avatar"
				:style="{
					backgroundImage: `url('${user?.avatar_url}')`,
					borderColor: ConvertIntColorToHex(user?.tag_color ?? 0),
				}"
			/>

			<span class="username" :style="{ color: ConvertIntColorToHex(user?.tag_color ?? 0) }">
				{{ usr?.display_name }}
			</span>
		</div>

		<!-- Display roles -->
		<div class="user-roles">
			<div
				class="user-role-chip"
				v-for="role in roles"
				:key="role.id"
				:style="{ color: ConvertIntColorToHex(role.color) }"
			>
				<span> {{ role.name }} </span>
			</div>
		</div>

		<div class="user-actions"></div>
	</div>
</template>

<script lang="ts">
import { GetUser, GetUserForCard } from "@/assets/gql/users/user";
import { ConvertIntColorToHex, User } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
	props: {
		user: Object as PropType<User | null>,
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setup(props, { emit }) {
		let ready = false;
		setTimeout(() => (ready = true), 200);

		const close = () => {
			if (!ready) {
				return;
			}
			emit("close");
		};

		// Fetch full user information
		const usr = ref(props.user);
		const { onResult } = useQuery<GetUser>(GetUserForCard, { id: usr.value?.id });
		onResult((res) => {
			usr.value = res.data.user;
		});

		const roles = computed(() => usr.value?.roles ?? []);
		return {
			usr,
			roles,
			ConvertIntColorToHex,
			close,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/user-card.scss";
</style>
