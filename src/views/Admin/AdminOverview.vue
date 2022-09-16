<template>
	<main class="admin-overview">
		<div class="online-staff">
			<h3>Online Staff</h3>

			<div v-for="user of users" :key="user.id">
				<UserTag :user="user" scale="1.5em" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { OnlineUsers } from "@/assets/gql/users/online";
import { User } from "@/structures/User";
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import UserTag from "@/components/utility/UserTag.vue";

const users = ref([] as User[]);

const { onResult } = useQuery(OnlineUsers);

onResult((result) => {
	users.value = result.data.onlineUsers;
});
</script>

<style setup lang="scss">
@import "@scss/themes.scss";

main.admin-overview {
	padding: 1em;

	@include themify() {
		> div.online-staff {
			display: grid;
			row-gap: 0.5em;

			padding: 1em;
			background-color: darken(themed("backgroundColor"), 2);
		}
	}
}
</style>
