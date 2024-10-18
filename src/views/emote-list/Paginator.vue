<template>
	<div class="paginator">
		<div class="controls unselectable">
			<div v-for="n of pageList" :key="n" class="page-button" :selected="page === n" @click="() => setPage(n)">
				<span selector="label"> {{ n }} </span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const PAN_OFFSET = 3;

const props = withDefaults(
	defineProps<{
		page: number;
		itemsPerPage: number;
		length: number;
		pageCount: number;
	}>(),
	{ page: 1 },
);

const emit = defineEmits({
	change: (payload: PageChangeEvent) => payload,
});
const pageList = computed(() =>
	Array.from<number, number>({ length: props.pageCount }, (_, i) => i + 1).filter(
		(n) =>
			// Check boundaries
			(n < props.pageCount && n < props.page + PAN_OFFSET && n > props.page - PAN_OFFSET) ||
			// Add last page
			n === props.pageCount ||
			// Add first page
			n === 1,
	),
);

const setPage = (page: number) =>
	emit("change", {
		page,
		previousPage: Number(props.page),
	});

interface PageChangeEvent {
	page: number;
	previousPage: number;
}
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";
@import "@scss/common/shape.scss";

.paginator {
	display: block;

	.controls {
		display: flex;

		> .page-button {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 2em;
			height: 2em;
			padding: 0.5em;
			margin-right: 0.25em;
			margin-left: 0.25em;

			clip-path: createbevel(0.15em);

			@include themify() {
				background-color: lighten(themed("backgroundColor"), 4%);

				&:hover {
					background-color: lighten(themed("backgroundColor"), 8%);
				}
				&[selected="true"] {
					background-color: lighten(themed("backgroundColor"), 12%);
				}
			}
		}
	}
}
</style>
