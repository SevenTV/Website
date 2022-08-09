<template>
	<span class="annotated-badge" :unlocked="!locked">
		<span class="badge-lock">
			<font-awesome-icon :icon="['far', 'lock']" />
		</span>
		<Badge :logo="badge.logo" :border="badge.border" :background="badge.background" />
		<p>{{ badge.name }}</p>
	</span>
</template>

<script setup lang="ts">
import { BadgeDef } from "@components/utility/BadgeDefs";
import Badge from "@/components/base/Badge.vue";

defineProps<{
	badge: BadgeDef;
	size: string;
	locked?: boolean;
}>();
</script>

<style scoped lang="scss">
.annotated-badge {
	text-align: center;
	font-size: v-bind(size);

	> span.badge-lock {
		display: none;
	}

	&:not([unlocked="true"]) > span.badge-lock {
		position: absolute;
		color: rgb(255, 70, 70);
		border-radius: 0.25em;
		margin-left: calc(v-bind(size) - 1em);
		font-size: 33%;
	}

	> p {
		font-size: 17.5%;
		text-align: center;
	}

	> svg {
		opacity: 0.5;
	}
}
</style>
