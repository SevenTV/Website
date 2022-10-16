<template>
	<div class="user-card-popper">
		<UserCard v-if="cardVisible" :user="user" @close="cardVisible = false"></UserCard>
	</div>

	<a
		ref="userTag"
		class="user-tag unstyled-link"
		:clickable="clickable"
		:href="clickable && user?.id ? `/users/${user?.id}` : undefined"
		@click.right="toggleCard"
		@click="toggleCard"
	>
		<!-- Profile Picture -->
		<span v-if="!hideAvatar" class="user-picture-wrapper">
			<img :suspense="!user?.id" :src="user?.avatar_url" :style="{ height: scale, width: scale }" />
		</span>

		<span class="username" :loading="!user?.id">
			{{ user?.display_name ?? user?.username }}
		</span>
	</a>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { ConvertIntColorToHex } from "@structures/util/Color";
import UserCard from "@components/utility/UserCard.vue";
import type { User } from "@structures/User";

const props = defineProps({
	scale: String,
	textScale: String,
	hideAvatar: Boolean,
	user: {
		type: Object as PropType<User | null>,
	},
	clickable: {
		type: Boolean,
		default: false,
	},
});

const userTag = ref<HTMLElement | null>(null);

const tagColor = computed(() =>
	((props.user && props.user.style?.color) ?? 0) !== 0
		? ConvertIntColorToHex(props.user?.style.color ?? 0)
		: "currentColor",
);

const cardVisible = ref(false);
const toggleCard = (ev: MouseEvent) => {
	if (!props.clickable) {
		return;
	}
	ev.preventDefault();
	cardVisible.value = !cardVisible.value;
};
</script>

<style lang="scss" scoped>
.user-tag {
	display: inline-block;
	vertical-align: middle;

	cursor: inherit;
	&[clickable="true"] {
		cursor: pointer;
	}

	.user-picture-wrapper > img {
		vertical-align: middle;
		border-radius: v-bind(scale);
		box-sizing: border-box;
		border: 0.01em solid v-bind(tagColor);
		clip-path: circle(99% at 50% 50%);
		height: v-bind(scale);
		width: v-bind(scale);
		margin-right: calc(v-bind(scale) * 0.15);
		text-indent: calc(v-bind(scale) * 2);

		&[suspense="true"] {
			border: 0.25em solid currentColor;
			opacity: 0.05;
		}
	}

	[loading="true"] {
		&.avatar {
			border-style: none;
		}
		&.username {
			min-width: 6em;
			height: 1em;
		}
	}

	.username {
		display: inline-block;
		vertical-align: middle;
		font-size: v-bind(textScale);
		color: v-bind(tagColor);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
.user-card-popper {
	position: absolute;
	z-index: 100;
}
</style>
