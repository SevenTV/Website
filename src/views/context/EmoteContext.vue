<template>
	<template v-if="route.name === 'Emote' || route.name === 'EmoteList'">
		<RouterView />
	</template>
	<template v-else>
		<EmoteRoot />
	</template>
</template>

<script setup lang="ts">
import { nextTick, provide, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { emoteActivityQuery, emoteChannelsQuery, emoteForEmotePageQuery } from "@/apollo/query/emote.query";
import { onFirstResult } from "@/apollo/util";
import { getFirstParam } from "@/router/util.router";
import { ObjectKind } from "@/structures/Common";
import type { Emote } from "@/structures/Emote";
import { EMOTE_CONTEXT_KEY, EmoteContext } from "@/composables/useContext";
import { useObjectSubscription } from "@/composables/useObjectSub";
import EmoteRoot from "@/views/emote/EmoteRoot.vue";
import { useHead } from "@unhead/vue";

const props = defineProps<{
	emoteId?: string;
}>();

const route = useRoute();
const ctx: EmoteContext = reactive({
	emote: {
		id: "",
	} as Emote,
	logs: [],
	channels: {
		total: -1,
		items: Array(50).fill({ id: null }),
	},
	currentVersion: null,
});

provide(EMOTE_CONTEXT_KEY, ctx);

// Fetch initial emote identifying data
const emoteID = ref(props.emoteId ?? "");

const ok1 = ref(false);
const ok2 = ref(false);
const query = useQuery<emoteForEmotePageQuery.Result, emoteForEmotePageQuery.Variables>(
	emoteForEmotePageQuery,
	() => ({ id: emoteID.value }),
	() => ({ enabled: ok1.value && !!emoteID.value }),
);

const { watchObject } = useObjectSubscription();

// Attach emote data to context
query.onResult((res) => {
	if (res.data.emote) {
		ctx.emote = structuredClone(res.data.emote);
		ctx.currentVersion = ctx.emote.versions?.filter((ver) => ctx.emote && ver.id === ctx.emote.id)[0];

		// Subscribe to changes
		watchObject(ObjectKind.EMOTE, ctx.emote as Emote);

		nextTick(() => (ok2.value = true));
	} else {
		ctx.emote = { id: "" } as Emote;
	}
});

// Relation: Audit Logs
useQuery<emoteActivityQuery.Result, emoteActivityQuery.Variables>(
	emoteActivityQuery,
	() => ({ id: ctx.emote.id }),
	() => ({ enabled: ok2.value && !!ctx.emote.id }),
).onResult((res) => {
	ctx.logs = res.data.emote?.activity ?? [];
});

// Relation: Channels
useQuery<emoteChannelsQuery.Result, emoteChannelsQuery.Variables>(
	emoteChannelsQuery,
	() => ({ id: ctx.emote.id }),
	() => ({ enabled: ok2.value && !!ctx.emote.id }),
).onResult((res) => {
	if (!res.data.emote) return;

	ctx.channels = res.data.emote?.channels ?? {
		total: 0,
		items: Array(50).fill({ id: null }),
	};
});

watchEffect(async () => {
	emoteID.value = props.emoteId ?? emoteID.value;

	if (route.meta.requestEmoteContext) {
		nextTick(() => (ok1.value = true));
	}

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
		case "AdminReportEditor":
			break;
		default:
			emoteID.value = "";
			ok1.value = false;
			ok2.value = false;
			ctx.channels = {
				total: -1,
				items: Array(50).fill({ id: null }),
			};
			break;
	}
});
</script>
