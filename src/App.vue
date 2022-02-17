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
import Nav from "@components/Nav.vue";
import Footer from "@components/Footer.vue";
import ContextMenu from "@/components/overlay/ContextMenu.vue";
import { useStore } from "@/store";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { useQuery, useSubscription } from "@vue/apollo-composable";
import { ClientRequiredData, GetClientRequiredData } from "./assets/gql/users/self";
import { GetUser, WatchCurrentUser } from "./assets/gql/users/user";

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

		// Fetch authed user
		const { onResult } = useQuery<ClientRequiredData>(GetClientRequiredData);
		onResult((res) => {
			if (!res.data) {
				return;
			}
			store.commit("SET_USER", res.data.clientUser);
			store.commit("SET_GLOBAL_EMOTE_SET", res.data.globalEmoteSet);
		});

		const { result: currentUser } = useSubscription<GetUser>(WatchCurrentUser);
		watch(currentUser, (u) => {
			store.commit("SET_USER", u?.user);
		});

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
