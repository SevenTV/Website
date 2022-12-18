<template>
	<template v-if="(!emoteId && ctx.emote.id) || route.name === 'EmoteList'">
		<RouterView />
	</template>
	<template v-else>
		<EmoteRoot />
	</template>
</template>

<script setup lang="ts">
import { EmoteContext, EMOTE_CONTEXT_KEY } from "@/composables/useContext";
import { getFirstParam } from "@/router/util.router";
import { emoteForEmotePageQuery } from "@/apollo/query/emote.query";
import { provide, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import type { Emote } from "@/structures/Emote";
import { useQuery } from "@vue/apollo-composable";
import { onFirstResult } from "@/apollo/util";
import { useHead } from "@unhead/vue";
import EmoteRoot from "../emote/EmoteRoot.vue";

const props = defineProps<{
	emoteId?: string;
}>();

const route = useRoute();
const ctx: EmoteContext = reactive({
	emote: {
		id: "",
	} as Emote,
	currentVersion: null,
});

provide(EMOTE_CONTEXT_KEY, ctx);

// Fetch initial emote identifying data
const emoteID = ref(props.emoteId ?? "");
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
	emoteID.value = props.emoteId ?? emoteID.value;

	switch (route.name) {
		case "Emote": {
			emoteID.value = getFirstParam(route, "emote") ?? "";

			await onFirstResult(query).catch(() => void 0);

			if (ctx.emote.id) {
				let owner = "";
				if (ctx.emote.owner) {
					owner = " by " + ctx.emote.owner?.display_name;
				}

				useHead(() => ({
					title: `${ctx.emote.name}${owner} - 7TV`,
				}));
			}

			break;
		}
		default:
			ctx.emote = { id: "" } as Emote;
			break;
	}
});
</script>
