<template>
	<i18n-t v-if="layout === 'TAE'" :keypath="'activity.' + name" tag="span">
		<template #T> {{ (props.target as EmoteSet).name }} </template>
		<template #AE> {{ (props.variables.AE as unknown as ActiveEmote).name }} </template>
	</i18n-t>
</template>

<script setup lang="ts">
import { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import { User } from "@/structures/User";

const props = defineProps<{
	name: string;
	icon: string;
	variables: Record<string, string>;
	target: User | EmoteSet;
}>();

const layout = Object.keys(props.variables).join("");
</script>
