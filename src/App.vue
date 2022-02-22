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
import { useStore } from "@/store";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { provideApolloClient, useQuery, useSubscription } from "@vue/apollo-composable";
import { ClientRequiredData, GetClientRequiredData } from "./assets/gql/users/self";
import { GetUser, GetCurrentUser, WatchCurrentUser } from "./assets/gql/users/user";
import { GetEmoteSet, WatchEmoteSet } from "./assets/gql/emote-set/emote-set";
import { EmoteSet } from "./structures/EmoteSet";
import { User } from "./structures/User";
import { ClientUser } from "./structures/ClientUser";
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
			switch (store.getters.notFoundMode) {
				case "troll-despair":
					return "troll-despair";
				case "doctor-wtf":
					return "doctor-wtf";
				default:
					return store.getters.theme as "light" | "dark";
			}
		});
		store.commit("SET_THEME", localStorage.getItem("7tv-theme") || "dark");
		const changeCount = computed(() => store.getters.changeCount as number);
		const navOpen = computed(() => store.getters.navOpen as boolean);
		const noTransitions = computed(() => store.getters.noTransitions as boolean);
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
			provideApolloClient(apolloClient);
			const authToken = computed(() => store.getters.authToken);

			await new Promise((resolve) => {
				if (store.getters.authToken) {
					return resolve(undefined);
				}
				watch(authToken, (t) => (t ? resolve(undefined) : undefined));
			});

			const clientUser = computed(() => store.getters.clientUser as ClientUser);
			const updateActiveEmotes = () => {
				// Update value of active emotes
				const activeSets = clientUser.value.connections
					?.map((uc) => uc.emote_set)
					.map((es) => es?.emotes ?? []);
				store.commit(
					"SET_ACTIVE_EMOTES",
					(activeSets.length > 0 ? activeSets.reduce((a, b) => [...a, ...b]) : []).map((ae) => ae.id)
				);
			};

			// Fetch authed user
			const { onResult } = useQuery<GetUser>(GetCurrentUser);
			onResult((res) => {
				if (!res.data || !res.data.user) {
					return;
				}
				store.commit("SET_USER", new ClientUser(res.data.user));

				// Start subscriptions on emote se.ts
				for (const con of res.data.user.connections ?? []) {
					if (!con || !con.emote_set) {
						continue;
					}
					const set = con.emote_set;

					const { onResult: onEmoteSetUpdate, stop } = useSubscription<GetEmoteSet>(WatchEmoteSet, {
						id: set.id,
					});
					onEmoteSetUpdate((es) => {
						if (!es.data?.emoteSet) {
							return;
						}
						for (const k of Object.keys(es.data.emoteSet)) {
							ApplyMutation(con.emote_set, {
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
				for (const k of Object.keys(u.user)) {
					ApplyMutation(clientUser.value, {
						action: "set",
						field: k,
						value: JSON.stringify(u?.user[k as keyof User]),
					});
				}
			});

			const { onResult: onClientRequiredData } = useQuery<ClientRequiredData>(GetClientRequiredData);
			onClientRequiredData((res) => {
				store.commit("SET_GLOBAL_EMOTE_SET", res.data.globalEmoteSet);
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
