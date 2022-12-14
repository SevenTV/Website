<template>
	<template v-if="ctx.emote.id || route.name === 'EmoteList'">
		<KeepAlive>
			<router-view />
		</KeepAlive>
	</template>
</template>

<script setup lang="ts">
import { EmoteContext, EMOTE_CONTEXT_KEY } from "@/composables/useContext";
import { getFirstParam } from "@/router/util.router";
import { emoteForEmotePageQuery } from "@/apollo/query/emote.query";
import { onBeforeUnmount, provide, reactive, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import type { Emote } from "@/structures/Emote";
import { useQuery } from "@vue/apollo-composable";
import { onFirstResult } from "@/apollo/util";
import { useHead } from "@unhead/vue";

const route = useRoute();

const ctx: EmoteContext = reactive({
	emote: {
		id: "",
	} as Emote,
	currentVersion: null,
});

provide(EMOTE_CONTEXT_KEY, ctx);

// Fetch initial emote identifying data
const emoteID = ref("");
const query = useQuery<emoteForEmotePageQuery.Result, emoteForEmotePageQuery.Variables>(
	emoteForEmotePageQuery,
	() => ({ id: emoteID.value }),
	() => ({ enabled: !!emoteID.value }),
);

// Attach emote data to context
query.onResult((res) => {
	if (res.data.emote) {
		ctx.emote = structuredClone(res.data.emote);
		ctx.currentVersion = ctx.emote.versions?.filter((ver) => ctx.emote && ver.id === ctx.emote.id)[0];
	} else {
		ctx.emote = { id: "" } as Emote;
	}
});

watchEffect(async () => {
	switch (route.name) {
		case "Emote": {
			watch(
				route,
				(r) => {
					emoteID.value = getFirstParam(r, "emote") ?? "";
				},
				{ immediate: true },
			);

			await onFirstResult(query).catch(() => void 0);

			if (ctx.emote.id) {
				let owner = "";
				if (ctx.emote.owner) {
					owner = "by " + ctx.emote.owner?.display_name;
				}

				useHead(() => ({
					title: `${ctx.emote.name} by ${owner} - 7TV`,
				}));
			}
			break;
		}

		default:
			break;
	}
});

onBeforeUnmount(() => {
	emoteID.value = "";
	ctx.emote = { id: "" } as Emote;
});
</script>
