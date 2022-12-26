<template>
	<main ref="mainEl" class="user-quick-search">
		<TextInput v-model="arg" :label="t('nav.user_search')" :autofocus="true" @keyup.enter="useExactResult" />

		<div v-if="users.length && !eventOnly" class="result-tray">
			<router-link
				v-for="(user, index) of users"
				:key="user.id"
				:aria-colindex="index"
				:aria-colcount="users.length"
				:to="{ name: 'UserOverview', params: { user: user.id } }"
				class="user-result unstyled-link"
				@click.prevent="dismiss"
			>
				<UserTag scale="1.5em" text-scale="0.85rem" :user="user" />
			</router-link>
		</div>
		<div v-else-if="users.length" class="result-tray">
			<span
				v-for="(user, index) of users"
				:key="user.id"
				:aria-colindex="index"
				:aria-colcount="users.length"
				class="user-result"
				@click="emit('select', user)"
				@click.prevent="dismiss"
			>
				<UserTag scale="1.5em" text-scale="0.85rem" :user="user" />
			</span>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useLazyQuery, useQuery } from "@vue/apollo-composable";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { SearchUsers, GetUserEditorOf, GetUser } from "@/apollo/query/user.query";
import { User } from "@/structures/User";
import { useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { useActor } from "@/store/actor";
import { useI18n } from "vue-i18n";
import TextInput from "../form/TextInput.vue";
import UserTag from "./UserTag.vue";

const props = defineProps<{
	eventOnly?: boolean;
	noRelevantPrefetch?: boolean;
}>();

const emit = defineEmits<{
	(e: "select", user: User | null): void;
	(e: "done"): void;
}>();

const { t } = useI18n();

const editedUsers = ref<User[]>([]);
const queriedUsers = ref<User[]>([]);
const arg = ref("");

const users = computed(() =>
	[
		...editedUsers.value.filter((u) => !queriedUsers.value.find((u2) => u2.id === u.id)),
		...queriedUsers.value,
	].filter((u) => !arg.value || u.username.toLowerCase().includes(arg.value.toLowerCase())),
);

const actor = useActor();

// Get the users actor can edit for
const { onResult: onEditorOfResult } = useQuery<GetUser>(
	GetUserEditorOf,
	{
		id: actor.id,
	},
	{ fetchPolicy: "cache-and-network" },
);

onEditorOfResult((res) => {
	if (!res.data.user || !res.data.user.editor_of.length) {
		return;
	}

	editedUsers.value = res.data.user.editor_of.map((u) => u.user as User);
});

const query = useLazyQuery(SearchUsers, {}, { debounce: 500 });

query.onResult((res) => (queriedUsers.value = res.data.users));

watch(arg, (v) => {
	if (v.length < 2) {
		return;
	}

	query.load(query.document.value, { query: v.toLowerCase() });
});

const router = useRouter();
const useExactResult = () => {
	let result = queriedUsers.value.find((u) => u.username.toLowerCase() === arg.value.toLowerCase());
	if (!result) {
		// if no exact result, try to find a partial match
		result = queriedUsers.value.find((u) => u.username.toLowerCase().includes(arg.value.toLowerCase()));
	}

	if (result && !props.eventOnly) {
		router.push({
			name: "User",
			params: { user: result.id, userData: JSON.stringify(result) },
		});

		dismiss();
	}
	emit("select", result ?? null);
};

const dismiss = () => {
	queriedUsers.value = [];
	emit("done");
};

const mainEl = ref<HTMLElement | null>(null);
onMounted(() => {
	onClickOutside(mainEl, dismiss);
});
onUnmounted(() => query.stop());
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.user-quick-search {
	font-size: 1rem;

	@include themify() {
		> div.result-tray {
			border: 1px solid mix(themed("color"), themed("extreme"), 50%);
			border-radius: 0.175em;
			box-shadow: 0.2em 0.2em 0.4em darken(themed("backgroundColor"), 2%);
			background-color: mix(themed("backgroundColor"), themed("extreme"), 90%);
		}
	}

	> :deep(.text-input) {
		width: 9em;
	}

	> div.result-tray {
		position: absolute;
		margin-top: 0.5em;
		width: 12em;
		max-height: 16em;
		overflow: auto;
		overflow-x: hidden;
		white-space: nowrap;

		> .user-result {
			display: block;
			cursor: pointer;
			padding: 0.25em;
		}
	}
}
</style>
