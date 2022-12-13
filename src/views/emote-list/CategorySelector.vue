<template>
	<div ref="displayRef" class="emote-category-display" :cat="cat" @click="open = !open">
		<label class="floating-label"> {{ t("emote.list.category.name").toUpperCase() }} </label>
		<p>{{ t(`emote.list.category.${cat.toLowerCase()}`).toUpperCase() }}</p>
	</div>

	<Transition name="emocat-dd">
		<div v-if="open" class="emote-category-dropdown">
			<div class="cat-list">
				<span v-for="c in cats.filter((x) => x !== cat)" :key="c" :cat="c" @click="setCategory(c)">
					{{ t(`emote.list.category.${c.toLowerCase()}`).toUpperCase() }}
				</span>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "update", category: string): void;
}>();

const props = defineProps<{
	initialValue?: string;
}>();

const { t } = useI18n();

const cat = ref<Category>("TOP");
const cats = ["TOP", "TRENDING"] as Category[];

if (props.initialValue) {
	const v = props.initialValue.split("_")[0].toUpperCase();

	if (cats.includes(v as Category)) {
		cat.value = v as Category;
	} else {
		cat.value = "TOP";
		emit("update", "TOP");
	}
}

const trendingPeriod = ref("DAY");

const open = ref(false);

const displayRef = ref<HTMLDivElement | null>(null);
onClickOutside(displayRef, () => (open.value = false));

const setCategory = (v: Category) => {
	if (v === "TRENDING") {
		emit("update", `${v}_${trendingPeriod.value}`);
	} else {
		emit("update", v);
	}

	cat.value = v;
};

type Category = "TOP" | "TRENDING" | "FEATURED" | "NEW";
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

$height: 2em;
$width: 8em;

[cat="TOP"] {
	--cat-color: rgb(100, 225, 170);
}
[cat="TRENDING"] {
	--cat-color: rgb(255, 150, 50);
}
[cat="FEATURED"] {
	--cat-color: rgb(250, 75, 225);
}
[cat="NEW"] {
	--cat-color: rgb(90, 140, 160);
}

.emote-category-dropdown {
	position: absolute;
	width: $width;
	min-height: $height;
	margin-top: 0.1em;

	display: flex;
	border-bottom-left-radius: 0.33em;
	border-bottom-right-radius: 0.33em;

	@include themify() {
		background-color: transparentize(darken(themed("navBackgroundColor"), 0.5), 0.1);
		box-shadow: 0.1em 0.1em 0.1em 0.1em lighten(themed("backgroundColor"), 4);

		> .cat-list > span {
			&:hover {
				background-color: transparentize(themed("color"), 0.85);
			}
		}
	}

	> .cat-list {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;

		> span {
			cursor: pointer;
			padding: 0.5em;
			color: var(--cat-color);
			user-select: none;
		}
	}
}

.emocat-dd-enter-active,
.emocat-dd-leave-active {
	transition: all 70ms;
}

.emocat-dd-enter-from,
.emocat-dd-leave-to {
	transform: translateY(-$height) scaleY(0);
}

.emote-category-display {
	width: $width;
	height: $height;

	display: flex;

	cursor: pointer;

	@include themify() {
		$bg: darken(themed("backgroundColor"), 2);

		background-color: $bg;
		box-shadow: 0.05em 0.05em 0.15em var(--cat-color);

		> label.floating-label {
			filter: drop-shadow(0.175em 0.175em 0 themed("backgroundColor"));
			color: mix(themed("color"), themed("extreme"), 75);
		}
	}

	> label.floating-label {
		font-size: 0.66em;
		position: absolute;
		top: 0.15em;
		margin-left: 0.25em;
		letter-spacing: 0.085em;
		user-select: none;
	}

	> p {
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;

		width: 100%;
		font-size: 1.15em;
		color: var(--cat-color);
	}
}
</style>
