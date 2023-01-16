<template>
	<div class="theme-switcher">
		<div class="" />

		<Icon
			v-if="theme === 'dark'"
			v-tooltip="t('nav.theme', [t('nav.theme_light')])"
			v-tooltip:position="'bottom'"
			class="unselectable"
			icon="sun-bright"
			@click="() => changeTheme('light')"
		/>
		<Icon
			v-else-if="theme === 'light'"
			v-tooltip="t('nav.theme', [t('nav.theme_dark')])"
			v-tooltip:position="'bottom'"
			class="unselectable"
			icon="moon"
			@click="changeTheme('dark')"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Theme, useStore } from "@/store/main";
import Icon from "./Icon.vue";

const { t } = useI18n();
const store = useStore();

const theme = computed(() => store.getTheme);

const changeTheme = (theme: Theme) => {
	store.setTheme(theme);
};
</script>
