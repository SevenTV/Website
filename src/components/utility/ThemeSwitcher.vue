<template>
	<div class="theme-switcher">
		<div class="" />

		<Icon v-if="theme === 'dark'" class="unselectable" icon="pumpkin" @click="() => changeTheme('halloween')" />
		<Icon
			v-else-if="theme === 'halloween'"
			class="unselectable"
			icon="sun-bright"
			@click="() => changeTheme('light')"
		/>
		<Icon v-else-if="theme === 'light'" class="unselectable" icon="moon" @click="changeTheme('dark')" />
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
