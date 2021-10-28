<template>
	<div class="comment">
		test
		<div class="time">42.56</div>
		<UserTag scale="1em">Siri</UserTag>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: {
		UserTag,
	},
});
</script>
