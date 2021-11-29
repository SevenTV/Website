<template>
	<div class="inbox">
		<div class="heading">
			<font-awesome-icon :icon="['fas', 'inbox']" />
			<h3>xd</h3>
		</div>
	</div>
</template>

<script lang="ts">
import { GetInboxMessages } from "@/assets/gql/messages/inbox";
import { useQuery } from "@vue/apollo-composable";
import { defineComponent, computed } from "vue";

export default defineComponent({
	setup() {
		const { result } = useQuery<GetInboxMessages>(GetInboxMessages);
		const messages = computed(() => result.value?.inbox ?? []);

		return {
			messages,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/inbox/inbox.scss";
</style>
