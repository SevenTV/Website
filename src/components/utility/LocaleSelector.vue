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
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue-demi";
import { useI18n } from "vue-i18n";
import { langs } from "@/i18n/i18n";
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
			localStorage.setItem("7tv_language_setting", name);
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
	display: flex;
	width: auto;
	height: 1.25rem;
}

.locale-dropdown {
	position: absolute;
	max-width: 12em;
	margin-top: 1em;
	border-radius: 0.25em;
	box-shadow: 0.25em 0.25em 1em rgb(0, 0, 0);
	overflow: hidden;

	> .locale-list {
		display: flex;
		flex-direction: column;
		max-height: 12em;
		overflow: auto;
		@include themify() {
			background-color: lighten(themed("backgroundColor"), 4);
		}

		> [locale] {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0.25em;

			@include themify() {
				&:hover {
					background-color: lighten(themed("backgroundColor"), 6);
				}
				&[selected="true"] {
					background-color: lighten(themed("backgroundColor"), 8);
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
