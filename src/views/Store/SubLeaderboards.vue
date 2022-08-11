<template>
	<div class="sub-leaderboards">
		<h3>{{ t("store.sub.state_leaderboards") }}</h3>

		<!-- Ranks -->
		<div class="rank-list">
			<div v-for="r of ranks" :key="r.id" :style="{ color: r.color, width: r.width }">
				<font-awesome-icon :icon="['far', 'trophy']" />

				<span>N/A</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { User } from "@/structures/User";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
