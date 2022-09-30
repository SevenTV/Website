<template>
	<div class="theme-switcher">
		<div class="" />

		<Icon
			v-if="store.seasonalTheme"
			class="unselectable"
			icon="moon"
			@click="() => [store.setSeasonalTheme(false), changeTheme('dark')]"
		/>
		<Icon v-else-if="theme === 'dark'" class="unselectable" icon="sun-bright" @click="() => changeTheme('light')" />
		<Icon v-else-if="theme === 'light'" class="unselectable" icon="pumpkin" @click="store.setSeasonalTheme(true)" />
	</div>
</template>

<script setup lang="ts">
import { Theme, useStore } from "@/store/main";
import { computed } from "vue";
import Icon from "./Icon.vue";

const store = useStore();

const theme = computed(() => store.getTheme);

const changeTheme = (theme: Theme) => {
	store.setTheme(theme);
};
</script>
