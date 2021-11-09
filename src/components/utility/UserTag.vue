<template>
	<div ref="popper" class="user-card-popper">
		<UserCard v-if="cardVisible" :user="user" @close="cardVisible = false"></UserCard>
	</div>

	<a
		ref="userTag"
		class="user-tag unstyled-link"
		:clickable="clickable"
		@click.right="toggleCard"
		@click="toggleCard"
		:href="`/users/${user?.id}`"
		v-if="user !== null"
	>
		<!-- Profile Picture -->
		<span
			v-if="!hideAvatar"
			class="avatar"
			:style="{
				width: scale,
				height: scale,
				backgroundImage: `url('${user?.avatar_url}')`,
				borderColor: ConvertIntColorToHex(user?.tag_color ?? 0),
			}"
		></span>

		<span class="username" :style="{ color: ConvertIntColorToHex(user?.tag_color ?? 0), fontSize: textScale }">
			{{ user?.username }}
		</span>
	</a>
</template>

<script lang="ts">
import { ConvertIntColorToHex, User } from "@/structures/User";
import { defineComponent, onMounted, PropType, ref } from "vue-demi";
import { createPopper } from "@popperjs/core";
import UserCard from "./UserCard.vue";

export default defineComponent({
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
	components: {
		UserCard,
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

		const cardVisible = ref(false);
		const toggleCard = (ev: MouseEvent) => {
			ev.preventDefault();
			if (!props.clickable) {
				return;
			}
			cardVisible.value = !cardVisible.value;
		};
		return {
			ConvertIntColorToHex,
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
