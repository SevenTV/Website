<template>
	<div class="theme-switcher">
		<div class="" />
		<Icon
			v-if="theme === 'dark'"
			class="unselectable"
			icon="sun-bright"
			role="button"
			:aria-labelledby="labelId"
			tabindex="0"
			@click="() => changeTheme('light')" role="button"
		/>
		<Icon
			v-else class="unselectable"
			icon="moon"
			role="button"
			:aria-labelledby="labelId"
			tabindex="0"
			@click="() => changeTheme('dark')"
		/>
	</div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/main";
import { computed } from "vue";
import Icon from "./Icon.vue";

const store = useStore();

const theme = computed(() => store.getTheme as "light" | "dark");

const changeTheme = (theme: "dark" | "light") => {
	store.setTheme(theme);
};

defineProps({
	labelId: {
		type: String,
		default: "",
	},
});
</script>
