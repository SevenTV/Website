<template>
	<div class="locale-switcher" data-locale-switcher>
		<!-- Currently selected language -->
		<div v-if="current" class="current-locale" @click="open = !open">
			<font-awesome-icon :icon="['fas', 'language']" />
		</div>

		<div v-if="open" class="locale-dropdown">
			<div class="locale-list">
				<div
					v-for="locale of icons"
					:key="locale.key"
					:locale="locale.name"
					:selected="locale.key === current.key"
					@click="() => setLocale(locale?.key)"
				>
					<component :is="locale.icon" />
					<span> {{ locale?.name }} </span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import type { Component } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@store/main";
import { conversions, options } from "@/i18n";

const i18n = useI18n();
const store = useStore();
const current = computed(() => ({ key: i18n.locale.value }));
const open = ref(false);

const mdListener = (evt: MouseEvent) => {
	if (!open.value) {
		return;
	}

	let target = evt.target as HTMLElement | null;
	while (target != null) {
		if (target.dataset.localeSwitcher !== undefined) {
			return;
		}

		target = target.parentElement;
	}

	open.value = false;
};

onUnmounted(() => {
	document.removeEventListener("mousedown", mdListener);
});

onMounted(() => {
	document.addEventListener("mousedown", mdListener);
});

const icons: {
	key: string;
	name: string;
	icon: Component;
}[] = [];

for (const lang in options) {
	icons.push({
		icon: defineAsyncComponent(() =>
			import(`../base/flags/${lang}.vue`).catch((err) => {
				if (import.meta.env.DEV) {
					console.warn(`flag not found ${lang}`, err);
				}
			}),
		),
		key: lang,
		name: conversions[lang] || lang,
	});
}

const setLocale = async (name: string) => {
	store.setLocale(name);
};
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.locale-switcher {
	cursor: pointer;
	margin-right: 0.5em;
	margin-left: 0.5em;
}

.current-locale {
	> svg {
		height: 1em;
		vertical-align: -0.17em;
	}
}

.locale-dropdown {
	position: absolute;
	max-width: 12em;
	margin-top: 1rem;
	transform: translateX(-1em);
	border-radius: 0.25rem;
	box-shadow: 0.25rem 0.25rem 1rem rgb(0, 0, 0);
	overflow: hidden;
	font-size: min(1.25em, 2rem);

	> .locale-list {
		display: flex;
		flex-direction: column;
		max-height: 12em;
		overflow: auto;
		@include themify() {
			background-color: lighten(themed("backgroundColor"), 4%);
		}

		> [locale] {
			display: grid;
			grid-template-columns: 1.5em auto;
			align-items: center;
			padding: 0.25em;
			min-height: 1.8em;
			grid-gap: 0.25em;

			@include themify() {
				&:hover {
					background-color: lighten(themed("backgroundColor"), 6%);
				}
				&[selected="true"] {
					background-color: lighten(themed("backgroundColor"), 15%);
				}
			}
			> svg {
				width: 1.5em;
				min-width: 1.5em;
				grid-column: 1;
			}
			> span {
				font-size: 0.5em;
				grid-column: 2;
			}
		}
	}
}
</style>
