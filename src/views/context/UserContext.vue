<template>
	<template v-if="ctx.user.id">
		<router-view />
	</template>
</template>

<script setup lang="ts">
import { nextTick, provide, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { useHead } from "@vueuse/head";
import {
	userActivityQuery,
	userEmoteSetsQuery,
	userForUserPageQuery,
	userOwnedEmotesQuery,
} from "@/apollo/query/user.query";
import { onFirstResult } from "@/apollo/util";
import { getFirstParam } from "@/router/util.router";
import { ObjectKind } from "@/structures/Common";
import type { User } from "@/structures/User";
import { USER_CONTEXT_KEY, UserContext } from "@/composables/useContext";
import { useObjectSubscription } from "@/composables/useObjectSub";

const props = defineProps<{
	emoteId?: string;
}>();

const route = useRoute();

const userID = ref(props.emoteId ?? "");

const ctx: UserContext = reactive({
	user: {
		id: "",
	} as User,
	currentConn: null,
	emoteSets: [],
	ownedEmotes: [],
	activity: [],
});

const { watchObject } = useObjectSubscription();

// Fetch initial user identifying data
const ok1 = ref(false);
const ok2 = ref(false);
const query = useQuery<userForUserPageQuery.Result, userForUserPageQuery.Variables>(
	userForUserPageQuery,
	() => ({ id: userID.value }),
	() => ({ enabled: ok1.value && !!userID.value }),
);

nextTick(() => (ok1.value = true));

watchEffect(() => {
	userID.value = getFirstParam(route, "user") ?? "";
});

// Attach user data to context
query.onResult((res) => {
	if (res.data.user) {
		ctx.user = structuredClone(res.data.user);
		ctx.currentConn = res.data.user.connections?.[0] ?? null;

		watchObject(ObjectKind.USER, ctx.user);

		nextTick(() => (ok2.value = true));
	} else {
		ctx.user = { id: "" } as User;
	}
});

// Relation: Emote Sets
useQuery<userEmoteSetsQuery.Result, userEmoteSetsQuery.Variables>(
	userEmoteSetsQuery,
	() => ({ id: ctx.user.id, entitledSets: true }),
	() => ({ enabled: ok2.value && !!ctx.user.id }),
).onResult((res) => {
	ctx.emoteSets = res.data.user?.emote_sets ?? [];
});

// Relation: Owned Emotes
useQuery<userOwnedEmotesQuery.Result, userOwnedEmotesQuery.Variables>(
	userOwnedEmotesQuery,
	() => ({ id: ctx.user.id }),
	() => ({ enabled: ok2.value && !!ctx.user.id }),
).onResult((res) => {
	ctx.ownedEmotes = res.data.user?.owned_emotes ?? [];
});

// Relation: Activity
useQuery<userActivityQuery.Result, userActivityQuery.Variables>(
	userActivityQuery,
	() => ({ id: ctx.user.id }),
	() => ({ enabled: ok2.value && !!ctx.user.id }),
).onResult((res) => {
	ctx.activity = res.data.user?.activity ?? [];
});

provide(USER_CONTEXT_KEY, ctx);

await onFirstResult(query).catch(() => void 0);

if (ctx.user.id) {
	useHead(() => ({
		title: `${ctx.user?.display_name} - User - 7TV`,
	}));
}
</script>
