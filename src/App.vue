<template>
	<Nav :class="{ navOpen }" />

	<main class="entrypoint">
		<router-view class="bouncy" :class="{ hidden: navOpen }" />
	</main>

	<Footer />

	<div v-if="showWAYTOODANK" class="waytoodank">
		<img src="@/assets/img/waytoodank.webp" />
	</div>

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
import { Component, computed, defineComponent, provide, reactive, shallowRef, watch } from "vue";
import { useStore } from "@/store/main";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { useActorStore } from "./store/actor";
import { storeToRefs } from "pinia";
import { provideApolloClient, useQuery, useSubscription } from "@vue/apollo-composable";
import { ClientRequiredData, GetClientRequiredData, GetCurrentUser, WatchCurrentUser } from "./assets/gql/users/self";
import { GetUser } from "./assets/gql/users/user";
import { GetEmoteSet, WatchEmoteSet } from "./assets/gql/emote-set/emote-set";
import { EmoteSet } from "./structures/EmoteSet";
import { ApplyMutation } from "./structures/Update";
import { apolloClient } from "./apollo";
import Nav from "@components/Nav.vue";
import Footer from "@components/Footer.vue";
import ContextMenu from "@/components/overlay/ContextMenu.vue";

export default defineComponent({
	components: { Nav, Footer },
	setup() {
		const store = useStore();
		const theme = computed(() => {
			switch (store.notFoundMode) {
				case "troll-despair":
					return "troll-despair";
				case "doctor-wtf":
					return "doctor-wtf";
				default:
					return store.getTheme as "light" | "dark";
			}
		});
		const changeCount = computed(() => store.changeCount as number);
		const navOpen = computed(() => store.navOpen as boolean);
		const noTransitions = computed(() => store.noTransitions as boolean);
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
		let i: NodeJS.Timeout; // eslint-disable-line

		// Set up client user
		const stoppers = [] as (() => void)[]; // stop functions for out of context subscriptions
		(async () => {
			const actorStore = useActorStore();
			provideApolloClient(apolloClient);
			const authToken = computed(() => store.authToken);

			await new Promise((resolve) => {
				if (store.authToken) {
					return resolve(undefined);
				}
				watch(authToken, (t) => (t ? resolve(undefined) : undefined));
			});

			const { user: clientUser } = storeToRefs(actorStore);
			const updateActiveEmotes = () => {
				if (!clientUser.value) {
					return;
				}
				// Update value of active emotes
				const activeSets = actorStore.channelEmoteSets;
				actorStore.updateActiveEmotes(
					activeSets.length > 0 ? activeSets.map((es) => es.emotes).reduce((a, b) => [...a, ...b]) : []
				);
			};

			// Fetch authed user
			const { onResult } = useQuery<GetUser>(GetCurrentUser);
			onResult((res) => {
				if (!res.data || !res.data.user) {
					return;
				}
				const u = res.data.user;
				actorStore.setUser(u);

				// Start subscriptions on emote se.ts
				for (const con of res.data.user.connections ?? []) {
					if (!con || !con.emote_set_id) {
						continue;
					}
					const set = u.emote_sets.filter((es) => es.id === con.emote_set_id)[0];
					if (!set) {
						continue;
					}

					const { onResult: onEmoteSetUpdate, stop } = useSubscription<GetEmoteSet>(WatchEmoteSet, {
						id: set.id,
					});
					onEmoteSetUpdate((es) => {
						if (!es.data?.emoteSet) {
							return;
						}
						for (const k of Object.keys(es.data.emoteSet)) {
							ApplyMutation(set, {
								action: "set",
								field: k,
								value: JSON.stringify(es.data.emoteSet[k as keyof EmoteSet]),
							});
						}
						updateActiveEmotes();
					});
					stoppers.push(stop);
				}
				updateActiveEmotes();
			});

			// Watch for user updates
			const { result: currentUser } = useSubscription<GetUser>(WatchCurrentUser);
			watch(currentUser, (u) => {
				if (!u?.user) {
					return;
				}
				actorStore.updateUser(u.user);
				updateActiveEmotes();
			});

			const { onResult: onClientRequiredData } = useQuery<ClientRequiredData>(GetClientRequiredData);
			onClientRequiredData((res) => {
				store.SET_GLOBAL_EMOTE_SET(res.data.globalEmoteSet);
			});
		})();

		// dank
		watch(changeCount, () => {
			if (changeCount.value > 8) {
				data.showWAYTOODANK = true;
				if (i) clearTimeout(i);
				i = setTimeout(() => {
					data.showWAYTOODANK = false;
				}, 1000);
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
			data.contextMenu.x = ev.pageX;
			data.contextMenu.y = ev.pageY;
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
