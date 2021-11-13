<template>
	<div class="user-details">
		<!-- Connections -->
		<div class="user-connections">
			<div class="user-conn" v-for="conn of connections ?? []" :key="conn.id" :platform="conn.platform">
				<h4 class="conn-title">
					<span>{{ conn.platform.toLowerCase() }}</span>
					-
					<span>{{ conn.display_name }}</span>
				</h4>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue-demi";
import { User } from "@/structures/User";

export default defineComponent({
	props: {
		user: {
			type: Object as PropType<User | null>,
			required: true,
		},
	},
	setup(props) {
		const connections = computed(() =>
			props.user?.connections.map((c) => ({
				...c,
				parsedData: JSON.parse(c.data),
			}))
		);

		return {
			connections,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/user-page/user-details";
</style>
