<template>
	<main v-if="actor.id" class="store-purchase" :lock="waiting">
		<span v-if="waiting" class="lock-notice"> {{ t("store.payment_popup_cta") }} </span>

		<h2>
			<router-link :to="{ name: 'Store' }">
				<font-awesome-icon :icon="['far', 'arrow-left']" />
			</router-link>
			{{ t("store.billing_information_heading") }}
		</h2>
		<p></p>
		<BillingForm @update-form="formData = $event" />

		<h2 v-if="gift">{{ t("store.payment_gift_heading") }}</h2>
		<div v-if="gift" class="gift-recipient">
			<UserQuickSearch v-if="!recipient" :event-only="true" @select="recipient = $event" />
			<div v-else class="selected-recipient">
				<UserTag :user="recipient" scale="1.5rem" />
				<span @click="recipient = null">
					<font-awesome-icon :icon="['far', 'close']" />
				</span>
			</div>
		</div>

		<h2>{{ t("store.payment_information_heading") }}</h2>

		<!-- Show Payment Methods -->
		<p>{{ t("store.payment_methods_hint") }}</p>
		<div class="payment-methods">
			<span
				v-for="pm of paymentMethods"
				:key="pm.id"
				:class="{ selected: pm.id === selectedMethod }"
				@click="selectedMethod = pm.id"
			>
				<Tooltip :text="`Pay via ${pm.name}`" position="top">
					<font-awesome-icon size="xl" :icon="pm.icon"></font-awesome-icon>
				</Tooltip>
			</span>
		</div>

		<!-- Product settings -->
		<div v-if="product.name === 'subscription'" class="product-display" product="subscription">
			<p>
				<span :style="{ color: 'orange' }">
					<Logo />
				</span>
				{{ t("store.product_type_subscription").toUpperCase() }}
			</p>
			<span>
				<span>{{ plan.interval }} {{ plan.interval_unit }}</span>
				<span> €{{ Number(plan.price) / 100 }} </span>
			</span>
		</div>

		<Button
			:disabled="!selectedMethod || !formData || (gift && !recipient)"
			color="primary"
			:label="t('store.pay_button', [t(`store.payment_method_${selectedMethod}`)])"
			@click="checkout"
		/>
	</main>

	<main v-else class="store-purchase no-auth">
		<h2>Please sign in to purchase</h2>
		<div>
			<LoginButton />
		</div>
	</main>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { EgVault, Product, ProductPlan } from "./egvault";
import { LocalStorageKeys } from "@/store/lskeys";
import { useI18n } from "vue-i18n";
import { useModal } from "@/store/modal";
import { useRouter } from "vue-router";
import { useActorStore } from "@/store/actor";
import BillingForm from "./BillingForm.vue";
import Button from "@/components/utility/Button.vue";
import Logo from "@/components/base/Logo.vue";
import Tooltip from "@/components/utility/Tooltip.vue";
import PurchaseSuccessModal from "@/views/Store/PurchaseSuccessModal.vue";
import LoginButton from "@/components/utility/LoginButton.vue";
import UserQuickSearch from "@/components/utility/UserQuickSearch.vue";
import { User } from "@/structures/User";
import UserTag from "@/components/utility/UserTag.vue";

const props = defineProps<{
	productData: Product | string;
	planData: ProductPlan | string;
	gift?: boolean | string;
}>();

const { t } = useI18n();
const actor = useActorStore();

const product: Product = JSON.parse(props.productData as string);
const plan: ProductPlan = JSON.parse(props.planData as string);
const gift: boolean = props.gift === "true";

const selectedMethod = ref("stripe");
const paymentMethods = ref([
	{ id: "stripe", name: "Credit Card", icon: ["far", "credit-card"] },
	{ id: "paypal", name: "PayPal", icon: ["fab", "cc-paypal"] },
] as PaymentMethod[]);

const formData = ref("");

const recipient = ref<User | null>(null);

const waiting = ref(false);
const winID = Math.random().toString(36).substring(2);
const checkout = async () => {
	waiting.value = true;

	let renewInterval = "";
	switch (plan.interval_unit) {
		case "MONTH":
			renewInterval = "monthly";
			break;
		case "YEAR":
			renewInterval = "yearly";
			break;
	}

	const fd = JSON.parse(formData.value);

	const giftQuery = gift && recipient.value ? `&gift_for=${recipient.value.id}` : "";
	const resp = await fetch(
		`${EgVault.api}/v1/subscriptions?renew_interval=${renewInterval}&payment_method=${selectedMethod.value}&next=true${giftQuery}`,
		{
			method: "POST",
			body: JSON.stringify({
				prefill: {
					first_name: fd.firstName,
					last_name: fd.lastName,
					email: fd.email,
				},
			}),
			headers: {
				Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.TOKEN)}`,
			},
		},
	);
	if (!resp || !resp.ok) {
		waiting.value = false;

		return undefined;
	}

	const data = await resp.json();

	const win = window.open(
		data.url,
		"SEVENTV_CHECKOUT:" + winID,
		"_blank, width=1200, height=900, menubar=no, location=no",
	);

	const i = setInterval(() => {
		if (!win || win?.closed) {
			clearInterval(i);
			waiting.value = false;
		}
	}, 1000);
};

const onExit = () => true;
window.onbeforeunload = onExit;

const router = useRouter();
const modal = useModal();

// Waiting for message from transaction window
const onMessage = (ev: MessageEvent) => {
	const w = ev.target as Window;
	if (!w) {
		return undefined;
	}

	const data = JSON.parse(ev.data);
	if (!data || data.id !== winID) {
		return;
	}

	if (data.status === "COMPLETE") {
		modal.open("purchase-success", {
			component: PurchaseSuccessModal,
			events: {},
			props: {},
		});
	}

	router.replace({ name: "Store", force: true });
};
window.addEventListener("message", onMessage);

onUnmounted(() => {
	window.onbeforeunload = null;
	window.removeEventListener("message", onMessage);
});

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

		> div.product-display {
			background-color: themed("backgroundColor");
		}
	}

	&[lock="true"] {
		> span.lock-notice {
			z-index: 1;
			width: 100%;
			text-align: center;
			font-size: 1.5em;
		}
		> *:not(span.lock-notice) {
			opacity: 0.25;
		}
		user-select: none;
		pointer-events: none;
	}

	> h2 {
		width: 100%;
		text-align: start;
	}

	> div.gift-recipient {
		margin: 1em;

		> .selected-recipient {
			display: flex;
			align-items: center;
			gap: 0.25em;
		}
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

	> div.product-display {
		width: fit-content;
		padding: 0.66em;
		margin: 0.5em;
		margin-bottom: 1em;

		> p {
			font-size: 1.15em;
			font-weight: 600;
		}
		> span {
			display: flex;
			justify-content: space-between;
			text-transform: capitalize;
		}
	}

	&.no-auth {
		font-size: 1.5em;
		margin-left: 20%;
		margin-right: 20%;

		gap: 1em;
	}

	@media screen and (max-width: 600px) {
		margin: 0 !important;
	}
}
</style>
