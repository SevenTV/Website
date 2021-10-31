/* eslint-disable prettier/prettier */
<template>
	<div class="comment">
		<UserTag scale="1em"></UserTag>
		<div class="comment-text">
			Anyways uhm... I bought a whole bunch of shungite, rocks, do you know what shungite is? Anybody know what
			shungite is. No, no Suge Knight, I think hes locked up in prison. Talking shungite. Anyways, its a 2 billion
			year old like rock, stone that protects against frequencies and unwanted frequencies that may be traveling
			in the air. So thats my story. I bought a whole bunch of stuff, put them around the la casa. Little
			pyramids. Stuff like that.
		</div>
		<div class="time">03.09.2018, 19:02</div>
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

<style lang="scss" scoped>
@import "@scss/emotes.scss";
@import "@scss/components/user-tag.scss";
</style>
