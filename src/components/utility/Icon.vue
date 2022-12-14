<template>
	<font-awesome-icon :size="size" :icon="[lib ?? 'fass', icon]" />
</template>

<script setup lang="ts">
defineProps<{
	icon: string;
	lib?: string;
	size?: Size;
}>();

type Size = "xs" | "sm" | "md" | "lg" | "xl";
</script>
