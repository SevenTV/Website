<template>
	<div class="sub-raffle">
		<h3>{{ t("store.sub.state_raffle") }}</h3>

		<p class="start-time">
			{{ t("store.sub.raffle.starts_at", [daysLeft]) }}
			<Icon
				v-tooltip="t('store.sub.raffle.starts_at_hint', [formattedDate])"
				v-tooltip:position="'top'"
				icon="square-question"
			/>
		</p>

		<EmoteCard :emote="emote" :unload="true" />
	</div>
</template>

<script setup lang="ts">
import { Emote } from "@/structures/Emote";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import differenceInDays from "date-fns/fp/differenceInDays";
import formatDate from "date-fns/fp/format";
import EmoteCard from "@/components/utility/EmoteCard.vue";
import Icon from "@/components/utility/Icon.vue";

const { t } = useI18n();

const startDate = new Date(2022, 10, 1, 0, 0, 0, 0);
const formattedDate = computed(() => formatDate("MMM. d, y")(startDate));
const daysLeft = computed(() => differenceInDays(Date.now())(startDate));

const emote = ref<Emote>({
	id: "0",
	name: "TO BE DECIDED",
	listed: true,
} as Emote);
</script>

<style scoped lang="scss">
div.sub-raffle {
	> h3 {
		margin: 0.5rem;
	}

	> p.start-time {
		text-align: center;
		opacity: 0.75;
		font-size: 0.88rem;
	}
}
</style>
