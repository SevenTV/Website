<template>
	<div class="paginator">
		<div class="controls unselectable">
			<div v-for="n of pageList" :key="n" class="page-button" :selected="page === n" @click="() => setPage(n)">
				<span selector="label"> {{ n }} </span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

const PAN_OFFSET = 3;

export default defineComponent({
	props: {
		page: {
			type: Number,
			required: true,
			default: 1,
		},
		itemsPerPage: {
			type: Number,
			required: true,
		},
		length: {
			type: Number,
			required: true,
		},
	},
	emits: {
		change: (payload: PageChangeEvent) => payload,
	},
	setup(props, { emit }) {
		const pageCount = computed(() => Math.ceil(props.length / props.itemsPerPage));
		const pageList = computed(() =>
			Array.from<number, number>({ length: pageCount.value }, (_, i) => i + 1).filter(
				(n) => n < props.page + PAN_OFFSET && n > props.page - PAN_OFFSET
			)
		);

		const setPage = (page: number) =>
			emit("change", {
				page,
				previousPage: Number(props.page),
			});

		return {
			pageList,
			setPage,
		};
	},
});

interface PageChangeEvent {
	page: number;
	previousPage: number;
}
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.paginator {
	display: block;
	width: 100%;

	.controls {
		display: flex;
		height: 100%;
		justify-content: flex-end;
		align-items: center;

		> .page-button {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2em;
			height: 2em;
			margin-right: 0.25em;
			margin-left: 0.25em;
			border-radius: 0.25em;

			@include themify() {
				background-color: darken(themed("backgroundColor"), 2%);
				&:hover {
					background-color: darken(themed("backgroundColor"), 4%);
				}
				&[selected="true"] {
					background-color: darken(themed("backgroundColor"), 6%);
				}
			}
		}
	}
}
</style>
