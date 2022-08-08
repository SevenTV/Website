<template>
	<div class="sub-button">
		<button v-wave @click="checkout">
			<font-awesome-icon :icon="['far', 'star']" />
			<span>SUBSCRIBE</span>
		</button>

		<div class="price-detail">
			<span>€3.99</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { SubPlan } from "./egvault";

const router = useRouter();

const plan = ref<SubPlan>("monthly");

const checkout = () => {
	router.push({ name: "StorePurchase", params: { productType: "subscription", plan: plan.value, price: 399 } });
};
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
div.sub-button {
	display: flex;
	padding: 1em;

	@include themify() {
		> button {
			background-image: linear-gradient(160.5deg, #e9b42c 20%, #f2855d);
		}

		> div.price-detail {
			background-color: lighten(themed("backgroundColor"), 6);
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
		color: black;
		padding: 0.66em;
		background-color: transparent;
		border: none;
	}

	> div.price-detail {
		padding: 0.66em;
		border-top-right-radius: 0.25em;
		border-bottom-right-radius: 0.25em;
		color: currentColor;
	}
}
</style>
