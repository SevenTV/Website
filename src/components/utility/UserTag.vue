<template>
	<div ref="popper" class="user-card-popper">
		<UserCard v-if="cardVisible" :user="user" @close="cardVisible = false"></UserCard>
	</div>

	<a
		ref="userTag"
		class="user-tag unstyled-link"
		:clickable="clickable && user?.id"
		:href="clickable && user?.id ? `/users/${user?.id}` : undefined"
		@click.right="toggleCard"
		@click="toggleCard"
	>
		<!-- Profile Picture -->
		<span
			v-if="!hideAvatar"
			:loading="!user?.id"
			class="avatar"
			:style="{
				padding: `calc(${scale} / 2)`,
				backgroundImage: `url('${user?.avatar_url}')`,
				borderColor: tagColor,
			}"
		></span>

		<span class="username" :loading="!user?.id" :style="{ color: tagColor, fontSize: textScale }">
			{{ user?.display_name ?? user?.username }}
		</span>
	</a>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from "vue";
import { User } from "@/structures/User";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import { createPopper, Instance } from "@popperjs/core";
import UserCard from "./UserCard.vue";

export default defineComponent({
	components: {
		UserCard,
	},
	props: {
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
	},
	setup(props) {
		const userTag = ref<HTMLElement | null>(null); // Popper trigger
		const popperEl = ref<HTMLElement | null>(null);
		onMounted(() => {
			if (!userTag.value || !popperEl.value) {
				return;
			}
		});

		const tagColor = computed(() =>
			(props.user?.tag_color ?? 0) !== 0 ? ConvertIntColorToHex(props.user?.tag_color ?? 0) : "currentColor"
		);
		const cardVisible = ref(false);

		let popper: Instance;
		const toggleCard = (ev: MouseEvent) => {
			if (!props.clickable) {
				return;
			}
			ev.preventDefault();
			cardVisible.value = !cardVisible.value;
			// Place user card
			popper = createPopper(userTag.value as HTMLElement, popperEl.value as HTMLElement, {
				placement: "auto",
				modifiers: [
					{
						name: "offset",
						options: {
							offset: [0, 24],
						},
					},
				],
			});
		};
		onBeforeUnmount(() => {
			if (!popper) {
				return;
			}
			popper.destroy();
		});
		return {
			tagColor,
			userTag,
			popper: popperEl,
			cardVisible,
			toggleCard,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/user-tag.scss";
</style>
