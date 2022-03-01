<template>
	<div class="locale-switcher" data-locale-switcher>
		<!-- Currently selected language -->
		<div v-if="current" class="current-locale" @click="open = !open">
			<component :is="current.icon" />
		</div>

		<div v-if="open" class="locale-dropdown">
			<div class="locale-list">
				<div
					v-for="locale of locales"
					:key="locale.key"
					:locale="locale.name"
					:selected="locale.key === current.key"
					@click="() => setLocale(locale?.key)"
				>
					<component :is="locale?.icon" />
					<span> {{ locale?.name }} </span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { langs } from "@/i18n/i18n";
import { LS_KEYS } from "@/store/lskeys";
import Tooltip from "./Tooltip.vue";

export default defineComponent({
	components: { Tooltip },
	setup() {
		const i18n = useI18n();
		const current = computed(() => ({ key: i18n.locale.value, ...langs[i18n.locale.value] }));
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

		const locales = Object.keys(langs).map((key) => ({
			key,
			...langs[key],
		}));

		const setLocale = (name: string) => {
			i18n.locale.value = name;
			localStorage.setItem(LS_KEYS.LOCALE, name);
			open.value = false;
		};
		return {
			open,
			locales,
			current,
			setLocale,
		};
	},
});
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
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0.25em;

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
				margin-top: 0.25em;
				margin-bottom: 0.25em;
				margin-right: 0.5em;
			}
			> span {
				font-size: 0.5em;
			}
		}
	}
}
</style>
