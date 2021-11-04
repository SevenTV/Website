<template>
	<span class="user-tag" v-if="user !== null">
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
	</span>
</template>

<script lang="ts">
import { ConvertIntColorToHex, User } from "@/structures/User";
import { defineComponent, PropType } from "vue-demi";

export default defineComponent({
	props: {
		scale: String,
		textScale: String,
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
