<template>
	<div class="comment">
		<UserTag :user="clientUser" scale="2em" text-scale="1.125rem"></UserTag>

		<span class="comment-text">
			Anyways uhm... I bought a whole bunch of shungite, rocks, do you know what shungite is? Anybody know what
			shungite is. No, no Suge Knight, I think hes locked up in prison. Talking shungite. Anyways, its a 2 billion
			year old like rock, stone that protects against frequencies and unwanted frequencies that may be traveling
			in the air. So thats my story. I bought a whole bunch of stuff, put them around the la casa. Little
			pyramids. Stuff like that.
		</span>
		<div class="time">{{ date.toLocaleTimeString() + " " + date.toLocaleDateString() }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: {
		UserTag,
	},
	setup() {
		const store = useStore();

		return {
			clientUser: store.getters.clientUser,
			date: new Date(),
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/comment.scss";
</style>
