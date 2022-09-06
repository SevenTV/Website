<template>
	<ModalViewport />
	<Nav :class="{ navOpen }" />

	<main class="entrypoint">
		<router-view
			v-slot="{ Component: routeComponent, route: usedRoute }"
			class="bouncy"
			:class="{ hidden: navOpen }"
		>
			<Transition
				:name="(usedRoute.meta.transition as string)"
				:mode="usedRoute.meta.transitionMode as unknown as any ?? 'default'"
			>
				<Suspense>
					<component :is="routeComponent" />
				</Suspense>
			</Transition>
		</router-view>
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
			@ctx-interact="contextMenu.interact = $event"
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
import { useObjectWatch } from "./store/object-watch";
import { AppState, GetAppState, GetCurrentUser, WatchCurrentUser } from "@gql/users/self";
import { GetUser } from "@gql/users/user";
import { EmoteSet } from "@structures/EmoteSet";
import { User } from "@structures/User";
import { apolloClient } from "@/apollo";
import { useI18n } from "vue-i18n";
import { Common, ImageFormat } from "./structures/Common";
import { GetEmoteSet, GetEmoteSetMin } from "./assets/gql/emote-set/emote-set";
import { options } from "@/i18n";
import type { Locale } from "@locale/type";
import Nav from "@components/Nav.vue";
import ContextMenu from "@components/overlay/ContextMenu.vue";
import ModalViewport from "@components/modal/ModalViewport.vue";

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
	interact: "",
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

const objectWatch = useObjectWatch();

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
		onResult(async (res) => {
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
				ed.user ? ed.user.connections.filter((uc) => uc.emote_set_id).map((uc) => uc.emote_set_id) : [],
			);

			const editableSets =
				(editableSetIDs.length
					? editableSetIDs.reduce((a, b) => [...(a ?? []), ...(b ?? [])])?.map((v) => ({ id: v } as EmoteSet))
					: []) ?? [];

			// Start subscriptions on all editable sets
			for (const set of [...u.emote_sets, ...editableSets]) {
				const { onResult: onSetResult, loading } = useQuery<GetEmoteSet>(GetEmoteSetMin, { id: set.id });

				onSetResult(({ data }) => {
					actor.addEmoteSet(data.emoteSet);

					const { stop } = objectWatch.subscribeToObject(Common.ObjectKind.EMOTE_SET, set, (set) => {
						actor.updateEmoteSet(set); // update actor store
					});
					stoppers.push(stop);
				});

				await new Promise<void>((ok) => watch(loading, (l) => !l && ok()));

				actor.updateActiveEmotes();
			}
		});
		onError((err) => {
			actor.setUser(null);
			actor.showErrorModal(err);
		});

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

// Actor AVIF support
if (actor.avifSupported) {
	actor.preferredFormat = ImageFormat.AVIF;
}

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
provide("ContextMenu", (ev: MouseEvent, component: Component, props: Record<string, unknown>): Promise<string> => {
	ev.preventDefault();
	ev.stopPropagation();
	contextMenu.x = ev.clientX;
	contextMenu.y = ev.clientY;
	contextMenu.shown = true;
	contextMenu.component = shallowRef(component);
	contextMenu.props = props;

	return new Promise<string>((resolve) => {
		const stop = watch(contextMenu, (v) => {
			if (v.interact !== "") {
				resolve(v.interact);
			}

			v.interact = "";
			stop();
		});
	});
});
</script>

<style lang="scss">
@import "@scss/default.scss";
</style>
