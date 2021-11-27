<template>
	<div ref="popper" class="user-card-popper">
		<UserCard v-if="cardVisible" :user="user" @close="cardVisible = false"></UserCard>
	</div>

	<a
		v-if="user !== null"
		ref="userTag"
		class="user-tag unstyled-link"
		:clickable="clickable"
		:href="clickable ? `/users/${user?.id}` : undefined"
		@click.right="toggleCard"
		@click="toggleCard"
	>
		<!-- Profile Picture -->
		<span
			v-if="!hideAvatar"
			class="avatar"
			:style="{
				width: scale,
				height: scale,
				backgroundImage: `url('${user?.avatar_url}')`,
				borderColor: tagColor,
			}"
		></span>

		<span class="username" :style="{ color: tagColor, fontSize: textScale }">
			{{ user?.display_name ?? user?.username }}
		</span>
	</a>
</template>

<script lang="ts">
import { ConvertIntColorToHex, User } from "@/structures/User";
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { createPopper } from "@popperjs/core";
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
		const popper = ref<HTMLElement | null>(null);
		onMounted(() => {
			if (!userTag.value || !popper.value) {
				return;
			}
			// Place user card
			createPopper(userTag.value as HTMLElement, popper.value as HTMLElement, {
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
		});

		const tagColor = computed(() =>
			(props.user?.tag_color ?? 0) !== 0 ? ConvertIntColorToHex(props.user?.tag_color ?? 0) : "currentColor"
		);
		const cardVisible = ref(false);
		const toggleCard = (ev: MouseEvent) => {
			if (!props.clickable) {
				return;
			}
			ev.preventDefault();
			cardVisible.value = !cardVisible.value;
		};
		return {
			tagColor,
			userTag,
			popper,
			cardVisible,
			toggleCard,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/user-tag.scss";
</style>
