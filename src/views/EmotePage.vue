<template>
	<main v-if="emote">
		{{ emote.name }}
	</main>
	<main v-else-if="loading">loading...</main>
	<NotFound v-else />
</template>

<script lang="ts">
/* eslint-disable */
import { useQuery, useResult } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import gql from "graphql-tag";
import { defineComponent, computed, watch } from "vue";
import { useRoute } from "vue-router";
import NotFound from "./404.vue";

interface Emote {
	emote: {
		id: string;
		name: string;
		owner_id: string;
		visibility: number;
		mime: string;
		status: string;
		tags: string[];
		created_at: string;
		urls: string[];
		width: number[];
		height: number[];
	};
}

export default defineComponent({
	components: { NotFound },
	setup() {
		const route = useRoute();
		const { result, loading } = useQuery<Emote>(
			gql`
				query fetchEmote($id: String!) {
					emote(id: $id) {
						id
						name
						owner_id
						visibility
						mime
						status
						tags
						created_at
						urls
						width
						height
					}
				}
			`,
			{ id: route.params.id }
		);

		const emote = useResult(result, null, (data) => data?.emote);
		watch(loading, () => {
			if (!emote.value) {
				console.log("not found");
			}
		});

		useHead({
			title: computed(() => `7TV | ${emote.value?.name || "Emote"}`),
		});

		return {
			emote,
			loading,
		};
	},
});
</script>
