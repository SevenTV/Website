<template>
	<div class="theme-switcher">
		<div class="" />

		<font-awesome-icon
			v-if="theme === 'dark'"
			class="unselectable"
			:icon="['far', 'sun-bright']"
			@click="() => changeTheme('light')"
			@mousedown.prevent
		/>
		<font-awesome-icon
			v-else
			class="unselectable"
			:icon="['far', 'moon']"
			@click="() => changeTheme('dark')"
			@mousedown.stop
		/>
	</div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/main";
import { computed } from "vue";

const store = useStore();

const theme = computed(() => store.getTheme as "light" | "dark");

const changeTheme = (theme: "dark" | "light") => {
	store.setTheme(theme);
};
</script>
