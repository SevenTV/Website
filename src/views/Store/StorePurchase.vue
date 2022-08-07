<template>
	<main class="store-purchase">
		<h2>Billing Information</h2>
		<p></p>
		<BillingForm />

		<h2>Payment Information</h2>

		<!-- Show Payment Methods -->
		<p>Choose a payment method</p>
		<div class="payment-methods">
			<span
				v-for="pm of paymentMethods"
				:key="pm.id"
				:class="{ selected: pm.id === selectedMethod }"
				@click="selectedMethod = pm.id"
			>
				<font-awesome-icon size="xl" :icon="pm.icon"></font-awesome-icon>
			</span>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BillingForm from "./BillingForm.vue";

const selectedMethod = ref("");
const paymentMethods = ref([
	{ id: "stripe", name: "Stripe", icon: ["far", "credit-card"] },
	{ id: "paypal", name: "PayPal", icon: ["fab", "cc-paypal"] },
] as PaymentMethod[]);

interface PaymentMethod {
	id: string;
	name: string;
	icon: [string, string];
	selected?: boolean;
}
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.store-purchase {
	margin-top: 1em;
	margin-left: 15%;
	margin-right: 15%;
	padding: 1em;
	border-radius: 0.4em;

	display: flex;
	flex-direction: column;

	@include themify {
		background-color: darken(themed("backgroundColor"), 2);
	}

	> h2 {
		width: 100%;
		text-align: start;
	}

	> div.payment-methods {
		display: flex;
		margin: 1em;
		gap: 0.5em;

		> span {
			cursor: pointer;
			font-size: 3em;

			&.selected {
				color: rgb(160, 255, 160);
			}
		}
	}
}
</style>
