<template>
	<span class="annotated-badge" :locked="locked" :selected="selected">
		<span class="badge-lock">
			<Icon icon="lock" />
		</span>
		<Badge :logo="badge.logo" :border="badge.border" :background="badge.background" />
		<p v-if="!hideName">{{ badge.name }}</p>
	</span>
</template>

<script setup lang="ts">
import { BadgeDef } from "@components/utility/BadgeDefs";
import Badge from "@/components/base/Badge.vue";
import Icon from "@/components/utility/Icon.vue";

defineProps<{
	badge: BadgeDef;
	size: string;
	locked?: boolean;
	selected?: boolean;
	hideName?: boolean;
}>();
</script>

<style scoped lang="scss">
.annotated-badge {
	text-align: center;
	font-size: v-bind(size);

	> span.badge-lock {
		display: none;
	}

	&[locked="true"] {
		> span.badge-lock {
			display: block;
			position: absolute;
			color: rgb(255, 70, 70);
			border-radius: 0.25em;
			margin-left: calc(v-bind(size) - 1em);
			font-size: 33%;
		}

		> svg {
			opacity: 0.5;
		}
	}

	> p {
		font-size: 17.5%;
		text-align: center;
	}
}
</style>
