<template>
	<div class="comment">
		<UserTag :user="clientUser" scale="2em" text-scale="1.125rem" :clickable="true"></UserTag>

		<span class="comment-text">
			Anyways uhm... I bought a whole bunch of shungite, rocks, do you know what shungite is? Anybody know what
			shungite is. No, no Suge Knight, I think hes locked up in prison. Talking shungite. Anyways, its a 2 billion
			year old like rock, stone that protects against frequencies and unwanted frequencies that may be traveling
			in the air. So thats my story. I bought a whole bunch of stuff, put them around the la casa. Little
			pyramids. Stuff like that.
		</span>
		<div class="time">{{ date }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from "vue";
import { useStore } from "@/store";
import formatDate from "date-fns/fp/format";
import formatDateDistance from "date-fns/fp/formatDistanceWithOptions";
import differenceInDays from "date-fns/fp/differenceInDays";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: {
		UserTag,
	},
	setup() {
		const store = useStore();

		// Set comment date
		const now = () => new Date();
		const date = new Date();
		let dateStr = ref("");
		if (differenceInDays(now())(date) === 0) {
			const updateDate = () =>
				(dateStr.value = formatDateDistance({ addSuffix: true, includeSeconds: true }, now())(date));
			updateDate();
			const i = setInterval(() => updateDate(), 5000);
			onUnmounted(() => clearInterval(i));
		} else if (now().getFullYear() === date.getFullYear()) {
			dateStr.value = formatDate("MMM. d, p")(date);
		} else {
			dateStr.value = formatDate("MMM. d, y")(date);
		}

		return {
			clientUser: store.getters.clientUser,
			date: dateStr,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/components/comment.scss";
</style>
