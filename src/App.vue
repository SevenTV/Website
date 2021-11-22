<template>
	<Nav :class="{ navOpen }" />
	<router-view class="entrypoint" :class="{ hidden: navOpen }" />
	<Footer />
	<div v-if="showWAYTOODANK" class="waytoodank">
		<img src="@/assets/waytoodank.webp" />
	</div>

	<div class="app-overlay" :locked="!contextMenu.shown">
		<component
			:is="ContextMenuComponent"
			v-if="contextMenu.shown"
			@close="contextMenu.shown = false"
			v-bind="{
				open: contextMenu.shown,
				component: contextMenu.component,
				position: { x: contextMenu.x, y: contextMenu.y },
				innerProps: contextMenu.props,
			}"
		/>
	</div>
</template>

<script lang="ts">
import { Component, computed, defineComponent, provide, reactive, shallowRef, watch } from "vue-demi";
import Nav from "@components/Nav.vue";
import Footer from "@components/Footer.vue";
import ContextMenu from "@/components/overlay/ContextMenu.vue";
import { useStore } from "@/store";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { GetUser } from "./assets/gql/users/user";

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
		const { onResult } = useQuery<GetUser>(GetUser, { id: "@me" });
		onResult((res) => {
			if (!res.data) {
				return;
			}
			store.commit("SET_USER", res.data.user);
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
				class: computed(() => `theme-${theme.value}`),
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
