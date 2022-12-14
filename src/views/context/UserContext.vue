<template>
	<router-view v-if="ctx.user" />
</template>

<script setup lang="ts">
import { provide, reactive, ref, watch } from "vue";
import { UserContext, USER_CONTEXT_KEY } from "@/composables/useContext";
import { useQuery } from "@vue/apollo-composable";
import {
	userActivityQuery,
	userEmoteSetsQuery,
	userForUserPageQuery,
	userOwnedEmotesQuery,
} from "@/apollo/query/user.query";
import { useRoute } from "vue-router";
import { getFirstParam } from "@/router/util.router";
import { onFirstResult } from "@/apollo/util";
import { useHead } from "@vueuse/head";
import type { User } from "@/structures/User";

const route = useRoute();

const userID = ref("");
watch(
	route,
	(r) => {
		userID.value = getFirstParam(r, "user") ?? "";
	},
	{ immediate: true },
);

const ctx: UserContext = reactive({
	user: {
		id: "",
	} as User,
	currentConn: null,
	emoteSets: [],
	ownedEmotes: [],
	activity: [],
});

// Fetch initial user identifying data
const query = useQuery<userForUserPageQuery.Result, userForUserPageQuery.Variables>(
	userForUserPageQuery,
	() => ({ id: userID.value }),
	() => ({ enabled: !!userID.value }),
);

// Attach user data to context
query.onResult((res) => {
	if (res.data.user) {
		ctx.user = structuredClone(res.data.user);
		ctx.currentConn = res.data.user.connections?.[0] ?? null;
	} else {
		ctx.user = { id: "" } as User;
	}
});

// Relation: Emote Sets
useQuery<userEmoteSetsQuery.Result, userEmoteSetsQuery.Variables>(
	userEmoteSetsQuery,
	() => ({ id: ctx.user?.id ?? "" }),
	() => ({ enabled: !!ctx.user }),
).onResult((res) => {
	ctx.emoteSets = res.data.user?.emote_sets ?? [];
});

// Relation: Owned Emotes
useQuery<userOwnedEmotesQuery.Result, userOwnedEmotesQuery.Variables>(
	userOwnedEmotesQuery,
	() => ({ id: ctx.user?.id ?? "" }),
	() => ({ enabled: !!ctx.user }),
).onResult((res) => {
	ctx.ownedEmotes = res.data.user?.owned_emotes ?? [];
});

// Relation: Activity
useQuery<userActivityQuery.Result, userActivityQuery.Variables>(
	userActivityQuery,
	() => ({ id: ctx.user?.id ?? "" }),
	() => ({ enabled: !!ctx.user }),
).onResult((res) => {
	ctx.activity = res.data.user?.activity ?? [];
});

provide(USER_CONTEXT_KEY, ctx);

await onFirstResult(query).catch(() => void 0);

if (ctx.user) {
	useHead(() => ({
		title: `${ctx.user?.display_name} - User - 7TV`,
	}));
}
</script>
