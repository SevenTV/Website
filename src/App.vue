<template>
	<ModalViewport />
	<Nav :class="{ navOpen }" />

	<main class="entrypoint">
		<router-view class="bouncy" :class="{ hidden: navOpen }" />
	</main>

	<template v-if="showWAYTOODANK">
		<div class="waytoodank">
			<img src="@/assets/img/waytoodank.webp" />
		</div>
	</template>

	<div class="app-overlay" :locked="!contextMenu.shown">
		<component
			:is="ContextMenuComponent"
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

<script lang="ts">
import { Component, computed, defineComponent, provide, reactive, ref, shallowRef, watch } from "vue";
import { useStore } from "@/store/main";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { useActorStore } from "./store/actor";
import { storeToRefs } from "pinia";
import { provideApolloClient, useQuery, useSubscription } from "@vue/apollo-composable";
import { ClientRequiredData, GetClientRequiredData, GetCurrentUser, WatchCurrentUser } from "./assets/gql/users/self";
import { GetUser } from "./assets/gql/users/user";
import { GetEmoteSet, WatchEmoteSetInternal } from "./assets/gql/emote-set/emote-set";
import { EmoteSet } from "./structures/EmoteSet";
import { User } from "./structures/User";
import { ApplyMutation } from "./structures/Update";
import { apolloClient } from "./apollo";
import Nav from "@components/Nav.vue";
import Footer from "@components/Footer.vue";
import ContextMenu from "@/components/overlay/ContextMenu.vue";
import ModalViewport from "./components/modal/ModalViewport.vue";

export default defineComponent({
	components: { Nav, Footer, ModalViewport },
	setup() {
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
		const data = reactive({
			navOpen,
			showWAYTOODANK: false,
			contextMenu: {
				shown: false,
				component: null as Component | null,
				props: {} as Record<string, unknown>,
				x: 0,
				y: 0,
			},
			ContextMenuComponent: shallowRef(ContextMenu),
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
						ed.user?.connections.map((uc) => uc.emote_set_id)
					);
					const editableSets =
						(editableSetIDs.length
							? editableSetIDs
									.reduce((a, b) => [...(a ?? []), ...(b ?? [])])
									?.map((v) => ({ id: v } as EmoteSet))
							: []) ?? [];
					// Start subscriptions on all editable sets
					for (const set of [...u.emote_sets, ...editableSets]) {
						const { onResult: onEmoteSetUpdate, stop } = useSubscription<GetEmoteSet>(
							WatchEmoteSetInternal,
							{
								id: set.id,
								init: true,
							}
						);
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
			{ immediate: true } // immediate is used to trigger this block with the initial startup
		);

		const { onResult: onClientRequiredData } = useQuery<ClientRequiredData>(GetClientRequiredData);
		onClientRequiredData((res) => {
			if (!res.data) {
				return;
			}
			store.setGlobalEmoteSet(res.data.globalEmoteSet);
		});

		// dank
		const themeChanges = ref(0);
		let timeouts = [] as ReturnType<typeof setTimeout>[];
		watch(theme, () => {
			themeChanges.value++;
			timeouts.push(
				setTimeout(() => {
					themeChanges.value > 0 ? themeChanges.value-- : null;
				}, 1000)
			);
			if (themeChanges.value > 5 && !data.showWAYTOODANK) {
				data.showWAYTOODANK = true;
				timeouts.push(
					setTimeout(() => {
						data.showWAYTOODANK = false;
						themeChanges.value = 0;
						timeouts.forEach((t) => clearTimeout(t));
						timeouts = [];
					}, 1500)
				);
			}
		});

		// Theme switcher
		useHead({
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

		// Provide right click context utility
		const contextMenu = (ev: MouseEvent, component: Component, props: Record<string, unknown>) => {
			ev.preventDefault();
			data.contextMenu.x = ev.clientX;
			data.contextMenu.y = ev.clientY;
			data.contextMenu.shown = true;
			data.contextMenu.component = shallowRef(component);
			data.contextMenu.props = props;
		};
		provide("ContextMenu", contextMenu);

		return data;
	},
});

export type ContextMenuFunction = (ev: MouseEvent, component: Component, props: Record<string, unknown>) => void;
</script>

<style lang="scss">
@import "@scss/default.scss";
</style>
