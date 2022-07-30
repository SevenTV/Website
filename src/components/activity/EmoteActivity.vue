<template>
	<!-- Layout: Target -->
	<i18n-t v-if="layout === 'T'" :keypath="'activity.' + name" tag="span">
		<template #T> <EmoteMention :emote="(target as Emote)" /> </template>
	</i18n-t>

	<!-- Layout: Target, OldValue, NewValue -->
	<i18n-t v-if="layout === 'TON'" :keypath="'activity.' + name" tag="span">
		<template #T> <EmoteMention :emote="(target as Emote)" /> </template>
		<template #O> {{ variables.O }} </template>
		<template #N> {{ variables.N }} </template>
	</i18n-t>
</template>

<script setup lang="ts">
import { Emote } from "@/structures/Emote";
import EmoteMention from "../utility/EmoteMention.vue";

const props = defineProps<{
	name: string;
	icon?: string;
	variables: Record<string, string>;
	target?: Emote;
}>();

const layout = Object.keys(props.variables).join("");
</script>
