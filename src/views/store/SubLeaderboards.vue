<template>
	<div class="sub-leaderboards">
		<!-- Ranks -->
		<div class="rank-list">
			<div v-for="r of ranks" :key="r.id" :style="{ color: r.color, width: r.width }">
				<Icon icon="trophy" />

				<span>N/A</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { User } from "@/structures/User";
import Icon from "@/components/utility/Icon.vue";

const ranks = [
	{ id: "1", color: "#c59c31", width: "100%" },
	{ id: "2", color: "#a9abad", width: "85%" },
	{ id: "1", color: "#b77233", width: "72.25%" },
] as Rank[];

interface Rank {
	id: string;
	color: string;
	width: string;
	user?: User;
}
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

div.sub-leaderboards {
	width: 20em;

	@include themify() {
		> div.rank-list > div {
			background-color: themed("backgroundColor");
		}
	}

	> h3 {
		font-size: 1.25rem;
		margin: 0.25em;
	}

	> div.rank-list {
		padding: 0.5em;

		> div {
			display: flex;
			column-gap: 0.5em;
			align-items: center;
			padding-left: 0.5em;
			height: 2em;
			clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
		}
	}
}
</style>
