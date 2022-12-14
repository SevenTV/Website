<template>
	<ModalViewport />
	<Nav :class="{ navOpen }" />

	<!-- Christmas Lights -->
	<GachiLights v-if="seasonalTheme" />

	<span v-if="announcement && announcement.value" class="global-announcement">
		<div>
			<Icon size="xl" icon="megaphone" />
			<span>{{ announcement.value }}</span>
		</div>
	</span>

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

	<!-- Render tooltip -->
	<div id="tooltip-container" ref="tooltipContainer" :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }">
		<template v-if="typeof tooltip.content === 'string'">
			<div class="simple">
				<span>{{ tooltip.content }}</span>
			</div>
		</template>
		<template v-else>
			<component :is="tooltip.content" v-bind="tooltip.contentProps" />
		</template>
	</div>

	<template v-if="contextMenu.shown">
		<div class="ctx-menu-overlay" :locked="!contextMenu.shown">
			<component
				:is="ContextMenu"
				v-if="contextMenu.shown"
				v-bind="{
					open: contextMenu.shown,
					component: contextMenu.component,
					innerProps: contextMenu.props,
				}"
				@close="contextMenu.shown = false"
				@ctx-interact="contextMenu.interact = $event"
			/>
		</div>
	</template>

	<template v-if="showWAYTOODANK">
		<div class="waytoodank">
			<img src="@img/waytoodank.webp" />
		</div>
	</template>

	<!-- Christmas Props -->
	<div v-if="seasonalTheme">
		<SnowLayer :density="36" />
		<Footer />
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { SEASONAL_THEME_START, useStore } from "@store/main";
import { tooltip } from "@/composables/useTooltip";
import { AppState, GetAppState } from "@/apollo/query/user-self.query";
import { apolloClient } from "@/apollo/apollo";
import { useI18n } from "vue-i18n";
import { useContextMenu } from "@/composables/useContextMenu";
import { options } from "@/i18n";
import { setupActor } from "@/ActorLogic";
import { LocalStorageKeys } from "./store/lskeys";
import { useWorker } from "@/composables/useWorker";
import type { Locale } from "@locale/type";
import gql from "graphql-tag";
import Nav from "@/components/Nav.vue";
import ContextMenu from "@/components/overlay/ContextMenu.vue";
import ModalViewport from "@/components/modal/ModalViewport.vue";
import Icon from "./components/utility/Icon.vue";
import SnowLayer from "./components/special/SnowLayer.vue";
import Footer from "./components/Footer.vue";
import GachiLights from "./components/special/GachiLights.vue";

const store = useStore();
const { authToken, notFoundMode, navOpen, noTransitions, getTheme, seasonalTheme } = storeToRefs(store);
const theme = computed(() => {
	if (seasonalTheme.value) return "christmas";
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

// Set up SharedWorker
const { createWorker } = useWorker();
createWorker();

// Set up client user
provideApolloClient(apolloClient);

// Set up the actor user
setupActor(authToken);

const { onResult: onClientRequiredData } = useQuery<AppState>(GetAppState);
onClientRequiredData((res) => {
	if (!res.data) {
		return;
	}
	store.setGlobalEmoteSet(res.data.globalEmoteSet);
	store.setRoleList(res.data.roles);
});

// dank
const showWAYTOODANK = ref(false);
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
if (localStorage.getItem(LocalStorageKeys.SEASONAL_THEME) === "true") {
	localStorage.removeItem(LocalStorageKeys.SEASONAL_THEME);
	store.setTheme("dark");
}

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

// seasonal theme
if (!store.themeTimestamp || store.themeTimestamp < SEASONAL_THEME_START) {
	store.setSeasonalTheme(true);
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

// Tooltip positioning data
const tooltipContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
	if (tooltipContainer.value) {
		tooltip.container = tooltipContainer.value;
	}
});

// Provide right click context utility
const { options: contextMenu } = useContextMenu();

// global announcement
const { result: announcement } = useQuery<{ value: string }>(gql`
	query Annoucement {
		value: announcement
	}
`);
</script>

<style lang="scss">
@import "@scss/default.scss";

.global-announcement {
	position: absolute;
	z-index: 10;
	pointer-events: none;
	top: 4.5em;
	display: grid;
	width: 100%;
	height: 2em;
	filter: drop-shadow(0 0.1em 0 rgb(230, 40, 40));

	> div {
		display: grid;
		grid-template-columns: auto auto;
		justify-self: center;
		align-items: center;
		gap: 1em;
		clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
		padding-left: 3em;
		padding-right: 3em;
		background-color: black;
		animation: flare 3s infinite;

		@keyframes flare {
			70% {
				color: currentColor;
			}
			80% {
				color: rgb(1509, 35, 35);
			}
			100% {
				color: currentColor;
			}
		}
	}
}

#tooltip-container {
	all: unset;
	z-index: 1000;
	position: absolute;
	pointer-events: none;
	top: 0;
	left: 0;

	> .simple {
		display: inline-block;
		word-wrap: break-word;
		vertical-align: middle;
		text-align: center;
		padding: 0.33em;
		border-radius: 0.25em;
		max-width: 18em;

		@include themify() {
			background-color: mix(themed("backgroundColor"), themed("extreme"), 75%);
			box-shadow: inset 0 0 0.25em themed("extreme");
		}
	}
}
</style>
