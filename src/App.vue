<template>
	<ModalViewport />
	<Nav :class="{ navOpen }" />

	<main class="entrypoint">
		<router-view class="bouncy" :class="{ hidden: navOpen }" />
	</main>

	<template v-if="showWAYTOODANK">
		<div class="waytoodank">
			<img src="@img/waytoodank.webp" />
		</div>
	</template>

	<div class="app-overlay" :locked="!contextMenu.shown">
		<component
			:is="ContextMenu"
			v-if="contextMenu.shown"
			v-bind="{
				open: contextMenu.shown,
				component: contextMenu.component,
				position: { x: contextMenu.x, y: contextMenu.y },
				innerProps: contextMenu.props,
			}"
			@close="contextMenu.shown = false"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, shallowRef, watch } from "vue";
import type { Component } from "vue";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { provideApolloClient, useQuery, useSubscription } from "@vue/apollo-composable";

import { useActorStore } from "@store/actor";
import { useStore } from "@store/main";
import { AppState, GetAppState, GetCurrentUser, WatchCurrentUser } from "@gql/users/self";
import { GetUser } from "@gql/users/user";
import { GetEmoteSet, WatchEmoteSetInternal } from "@gql/emote-set/emote-set";
import { EmoteSet } from "@structures/EmoteSet";
import { User } from "@structures/User";
import { ApplyMutation } from "@structures/Update";
import { apolloClient } from "@/apollo";
import { useI18n } from "vue-i18n";
import { options } from "@/i18n";
import type { Locale } from "@locale/type";
import Nav from "@components/Nav.vue";
import ContextMenu from "@components/overlay/ContextMenu.vue";
import ModalViewport from "@components/modal/ModalViewport.vue";
// import Footer from "@components/Footer.vue";

const store = useStore();
const { authToken, notFoundMode, navOpen, noTransitions, getTheme } = storeToRefs(store);
const theme = computed(() => {
	switch (notFoundMode.value) {
		case "troll-despair":
			return "troll-despair";
		case "doctor-wtf":
			return "doctor-wtf";
		case "pot-friend":
			return "pot-friend";
		default:
			return getTheme.value as "light" | "dark";
	}
});

const showWAYTOODANK = ref(false);
const contextMenu = reactive({
	shown: false,
	component: null as Component | null,
	props: {} as Record<string, unknown>,
	x: 0,
	y: 0,
});

// Set up client user
const stoppers = [] as (() => void)[]; // stop functions for out of context subscriptions
const actor = useActorStore();
provideApolloClient(apolloClient);
const { user: clientUser } = storeToRefs(actor);

// Watch for token update
watch(
	authToken,
	(tok) => {
		stoppers.forEach((f) => f()); // stop previous subscriptions
		if (!tok) {
			return; // nothing if no token.
		}
		// Set up initial identity
		const identity = actor.getIdentity();
		if (identity) {
			actor.setUser({ ...identity, _idty: true });
		}

		// query the current user from api
		const { onResult, onError } = useQuery<GetUser>(GetCurrentUser);
		onResult((res) => {
			if (!res.data) {
				return;
			}
			const u = res.data.user;
			if (!u) {
				actor.setUser(null);
				return;
			}
			actor.setUser(u); // set as actor

			// Aggregate owned and emote sets of edited users
			const editableSetIDs = (clientUser.value as User).editor_of.map((ed) =>
				ed.user?.connections.map((uc) => uc.emote_set_id),
			);
			const editableSets =
				(editableSetIDs.length
					? editableSetIDs.reduce((a, b) => [...(a ?? []), ...(b ?? [])])?.map((v) => ({ id: v } as EmoteSet))
					: []) ?? [];
			// Start subscriptions on all editable sets
			for (const set of [...u.emote_sets, ...editableSets]) {
				const { onResult: onEmoteSetUpdate, stop } = useSubscription<GetEmoteSet>(WatchEmoteSetInternal, {
					id: set.id,
					init: true,
				});
				actor.addEmoteSet(set); // add set to the actor store
				onEmoteSetUpdate((es) => {
					// emote set update event
					const d = es.data?.emoteSet;
					if (!d) {
						return;
					}

					for (const k of Object.keys(d)) {
						ApplyMutation(set, {
							action: "set",
							field: k,
							value: JSON.stringify(d[k as keyof EmoteSet]),
						});
					}

					actor.updateActiveEmotes();
				});
				stoppers.push(stop);
			}
			actor.updateActiveEmotes();
		});
		onError(() => actor.setUser(null));

		// Watch for user updates
		const { result: currentUser, stop } = useSubscription<GetUser>(WatchCurrentUser);
		stoppers.push(stop);
		watch(currentUser, (u) => {
			if (!u?.user) {
				return;
			}
			actor.updateUser(u.user);
			actor.updateActiveEmotes();
		});
	},
	{ immediate: true }, // immediate is used to trigger this block with the initial startup
);

const { onResult: onClientRequiredData } = useQuery<AppState>(GetAppState);
onClientRequiredData((res) => {
	if (!res.data) {
		return;
	}
	store.setGlobalEmoteSet(res.data.globalEmoteSet);
	store.setRoleList(res.data.roles);
});

// dank
const themeChanges = ref(0);
let timeouts = [] as ReturnType<typeof setTimeout>[];
watch(theme, () => {
	themeChanges.value++;
	timeouts.push(
		setTimeout(() => {
			themeChanges.value > 0 ? themeChanges.value-- : null;
		}, 1000),
	);
	if (themeChanges.value > 5 && !showWAYTOODANK.value) {
		showWAYTOODANK.value = true;
		timeouts.push(
			setTimeout(() => {
				showWAYTOODANK.value = false;
				themeChanges.value = 0;
				timeouts.forEach((t) => clearTimeout(t));
				timeouts = [];
			}, 1500),
		);
	}
});

// Theme switcher
const locale = computed(() => store.locale);
useHead({
	htmlAttrs: {
		lang: locale,
	},
	bodyAttrs: {
		class: computed(() => {
			const classList = [`theme-${theme.value}`];
			if (noTransitions.value) {
				classList.push("no-transition");
			}

			return classList.join(" ");
		}),
	},
});

// Scroll to top when changing routes
const route = useRoute();
watch(route, () => {
	window.scroll({ top: 0, behavior: "smooth" });
});

const i18n = useI18n();

const updateLocale = (newLocale: string, prevLocale: string) => {
	// when the language changes we want to fetch a new one and then set it to the value of the locale
	if (!options[newLocale]) {
		store.setLocale(prevLocale);
		return;
	}

	// we need to do relative imports here since its dynamic.
	import(`../locale/${newLocale}.ts`)
		.then((messages: { default: Locale }) => {
			i18n.setLocaleMessage(newLocale, messages.default);
			i18n.locale.value = newLocale;
		})
		.catch((err) => {
			if (locale.value == newLocale) store.setLocale(prevLocale);
			if (import.meta.env.DEV) console.warn("couldnt find type??", err); // eslint-disable-line no-console
		});
};

watch(locale, updateLocale);
updateLocale(locale.value, "en_US");

// Provide right click context utility
provide("ContextMenu", (ev: MouseEvent, component: Component, props: Record<string, unknown>) => {
	ev.preventDefault();
	contextMenu.x = ev.clientX;
	contextMenu.y = ev.clientY;
	contextMenu.shown = true;
	contextMenu.component = shallowRef(component);
	contextMenu.props = props;
});
</script>

<style lang="scss">
@import "@scss/default.scss";
</style>
