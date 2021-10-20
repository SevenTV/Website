<template>
	<main clas="oauth2callback">
		<span>This window should close...</span>
	</main>
</template>

<script lang="ts">
import { GetUser } from "@/assets/gql/users/user";
import { useStore } from "@/store";
import { useQuery } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import { watch } from "vue";
import { defineComponent } from "vue-demi";
import { useRoute } from "vue-router";

export default defineComponent({
	setup() {
		useHead({
			title: "7TV | Authentication (OAuth2 Calllback)",
		});

		const route = useRoute();
		const token = route.query.token;
		if (typeof token === "string") {
			localStorage.setItem("token", token);
		}
		const store = useStore();
		const { onResult, loading } = useQuery<GetUser>(GetUser, { id: "@me" });
		onResult((res) => {
			window.postMessage(
				{
					seventv_msg: true,
					data: {
						user: res.data.user,
					},
				},
				"*"
			);
			store.commit("SET_USER", res.data.user);
		});
		watch(loading, (v) => {
			if (v === false) {
				window.close();
			}
		});

		return {};
	},
});
</script>
