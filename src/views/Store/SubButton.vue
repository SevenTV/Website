<template>
	<div class="sub-button">
		<button v-wave :colored="!gift" @click="checkout">
			<Icon :icon="gift ? 'gift' : 'star'" />
			<span>{{ (gift ? t("store.button_gift") : t("store.button_self")).toUpperCase() }}</span>
		</button>

		<div v-if="usedPlan" ref="priceDetail" class="price-detail" @click="priceSelectorOpen = !priceSelectorOpen">
			<span>€{{ usedPlan?.price / 100 }}</span>

			<Icon size="lg" icon="chevron-down" />
			<div v-if="priceSelectorOpen" class="price-selector">
				<option v-for="plan of product?.plans" :key="plan.price" @click="usedPlan = plan">
					{{ plan.interval }} {{ plan.interval_unit.toLowerCase() }} - €{{ plan.price / 100 }}
				</option>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ProductPlan, useEgVault } from "./egvault";

const props = defineProps<{
	gift?: boolean;
}>();

const { t } = useI18n();
const router = useRouter();

const { products } = storeToRefs(useEgVault());

const product = computed(() => products.value.find((p) => p.name === "subscription"));
const usedPlan = ref<ProductPlan | null>(product.value?.plans[0] ?? null);

const ok = watch(product, (newVal) => {
	if (newVal) {
		usedPlan.value = newVal.plans[0];
		ok();
	}
});

const priceSelectorOpen = ref(false);

const priceDetail = ref<HTMLElement | null>(null);
onClickOutside(priceDetail, () => (priceSelectorOpen.value = false));

const checkout = () => {
	router.push({
		name: "StorePurchase",
		params: {
			productData: JSON.stringify(product.value),
			planData: JSON.stringify(usedPlan.value),
			gift: JSON.stringify(props.gift || false),
		},
	});
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
div.sub-button {
	display: flex;
	padding: 1em;

	@include themify() {
		> button[colored="false"] {
			color: currentColor;
			background-color: lighten(themed("backgroundColor"), 8);
		}

		> button[colored="true"] {
			background-image: linear-gradient(160.5deg, #e9b42c 20%, #f2855d);
		}

		> div.price-detail {
			background-color: lighten(themed("backgroundColor"), 6);

			> .price-selector > option:hover {
				background-color: lighten(themed("extreme"), 8);
			}
		}
	}

	> button {
		cursor: pointer;
		display: grid;
		grid-template-columns: 1.5em auto;
		border-top-left-radius: 0.25em;
		border-bottom-left-radius: 0.25em;
		font: inherit;
		letter-spacing: 0.125em;
		font-weight: 600;
		padding: 0.66em;
		background-color: transparent;
		border: none;
	}

	> div.price-detail {
		display: grid;
		text-align: center;
		grid-template-columns: auto auto;
		padding: 0.66em;
		border-top-right-radius: 0.25em;
		border-bottom-right-radius: 0.25em;
		color: currentColor;
		gap: 0.5em;
		cursor: pointer;

		> .price-selector {
			display: grid;
			position: absolute;
			margin-top: 2em;
			background-color: black;
			border-radius: 0.25em;

			> option {
				padding: 0.5em;
				text-transform: capitalize;
			}
		}
	}
}
</style>
