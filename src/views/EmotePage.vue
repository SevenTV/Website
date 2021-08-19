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
import { defineComponent, computed, watch } from "vue";
import { gql } from "graphql-tag";
import { useRoute } from "vue-router";
import { DataStructure } from '@typings/typings/DataStructure';
import NotFound from "./404.vue";

export default defineComponent({
	components: { NotFound },
	setup() {
		const route = useRoute();
		const { result, loading } = useQuery<{ emote: DataStructure.Emote }>(
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
			title: computed(() => `${process.env.VUE_APP_TITLE} | ${emote.value?.name || "Emote"}`),
		});

		return {
			emote,
			loading,
		};
	},
});
</script>
