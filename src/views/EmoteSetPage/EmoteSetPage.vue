<template>
	<main class="emote-set-page">
		<div>
			<div selector="heading">
				<span> {{ set?.name }} </span>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { GetEmoteSet } from "@gql/emote-set/emote-set";
import { EmoteSet } from "@structures/EmoteSet";
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";

const props = defineProps<{
	setID: string;
	setData: string;
}>();

const set = ref<EmoteSet>(props.setData ? JSON.parse(props.setData) : null);
const { onResult } = useQuery<GetEmoteSet>(GetEmoteSet, { id: props.setID });
onResult((res) => {
	if (!res.data?.emoteSet) {
		return;
	}
	set.value = res.data.emoteSet;
});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

main.emote-set-page {
	display: flex;
	align-items: center;
	justify-content: center;

	@include themify() {
		background-color: themed("navBackgroundColor");
		> div {
			background-color: themed("backgroundColor");
			> div[selector="heading"] {
				height: 3em;
				background-color: lighten(themed("backgroundColor"), 2);
				background-image: linear-gradient(145deg, themed("navBackgroundColor") 16em, transparent 0),
					linear-gradient(-145deg, themed("navBackgroundColor") 16em, transparent 0);
			}
		}
	}
	> div {
		width: calc(100% - 2.5em);
		height: calc(100% - 2.5em);

		$n1: 10%;
		$n2: 90%;
		$n3: 100%;
		clip-path: polygon(0 $n1, $n1 0, $n2 0, $n3 $n1, $n3 $n2, $n2 $n3, $n1 $n3, 0 $n2, 0 $n1);
		@media screen and (max-width: 600px) {
			clip-path: none;
		}

		> div[selector="heading"] {
			display: flex;
			justify-content: center;
			align-items: center;
			> span {
				font-size: 1.2em;
				text-align: center;
				margin-left: 10%;
				margin-right: 10%;
			}
		}
	}
}
</style>
