<template>
	<main>
		<div class="user-tag">
			<!-- Profile Picture -->
			<div
				class="avatar"
				:style="{
					width: scale,
					height: scale,
					borderColor: color,
				}"
			></div>

			<div class="username" :style="{ color: 'red' }">{{ user?.username }}</div>
		</div>
	</main>
</template>

<script lang="ts">
import { User } from "@/structures/User";
import { defineComponent, PropType } from "vue-demi";

export default defineComponent({
	props: {
		scale: String,
		color: String,
		user: {
			type: Object as PropType<User | null>,
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setup() {},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/user-tag.scss";
</style>
