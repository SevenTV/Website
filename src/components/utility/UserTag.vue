<template>
	<main>
		<div class="user-tag">
			<!-- Profile Picture -->
			<div
				v-if="!hideAvatar"
				class="avatar"
				:style="{
					width: scale,
					height: scale,
					borderColor: ConvertIntColorToHex(user?.tag_color ?? 0),
				}"
			></div>

			<div class="username" :style="{ color: ConvertIntColorToHex(user?.tag_color ?? 0) }">
				{{ user?.username }}
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { ConvertIntColorToHex, User } from "@/structures/User";
import { defineComponent, PropType } from "vue-demi";

export default defineComponent({
	props: {
		scale: String,
		hideAvatar: Boolean,
		user: {
			type: Object as PropType<User | null>,
		},
	},
	setup() {
		return {
			ConvertIntColorToHex,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/user-tag.scss";
</style>
