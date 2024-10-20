<template>
	<i18n-t v-if="layout === 'TAE'" :keypath="'activity.' + name" tag="span">
		<template #T> {{ (target as EmoteSet).name }} </template>
		<template v-if="(variables.AE as unknown as ActiveEmote).data" #AE>
			<EmoteMention :emote="(variables.AE as unknown as ActiveEmote).data" :clickable="true" />
		</template>
	</i18n-t>

	<i18n-t v-if="layout === 'TAEON'" :keypath="'activity.' + name" tag="span">
		<template #T> {{ (target as EmoteSet).name }} </template>
		<template v-if="(variables.AE as unknown as ActiveEmote).data" #AE>
			<EmoteMention :emote="(variables.AE as unknown as ActiveEmote).data" :clickable="true" />
		</template>
		<template #O> {{ variables.O }} </template>
		<template #N> {{ variables.N }} </template>
	</i18n-t>

	<i18n-t v-if="layout === 'U'" :keypath="'activity.' + name" tag="span">
		<template #U>
			<UserTag :scale="'1.25em'" :user="((variables.U as unknown as User.Editor).user as User)" />
		</template>
	</i18n-t>

	<!-- Layout: Target, OldValue, NewValue -->
	<i18n-t v-if="layout === 'TON'" :keypath="'activity.' + name" tag="span">
		<template #T> {{ (target as EmoteSet).name }} </template>
		<template #O> {{ variables.O }} </template>
		<template #N> {{ variables.N }} </template>
	</i18n-t>
</template>

<script setup lang="ts">
import type { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import EmoteMention from "../utility/EmoteMention.vue";
import UserTag from "../utility/UserTag.vue";

const props = defineProps<{
	name: string;
	icon: string;
	variables: Record<string, string>;
	target: User | EmoteSet;
}>();

const layout = Object.keys(props.variables).join("");
</script>
