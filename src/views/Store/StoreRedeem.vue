<template>
	<main class="store-redeem">
		<div selector="heading">
			<Icon size="xl" icon="gift" />
			<div>
				<h2>{{ t("store.redeem_heading") }}</h2>
				<p>{{ t("store.redeem_hint") }}</p>
			</div>
		</div>

		<div selector="form">
			<div class="input-wrapper">
				<TextInput v-model="code" color="primary" label="Code" @keydown.enter="submit" />
			</div>
		</div>

		<div v-wave selector="button" @click="submit">
			<span>{{ t("store.redeem_submit").toUpperCase() }}</span>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useEgVault } from "./egvault";
import { useRouter } from "vue-router";
import { useModal } from "@/store/modal";
import TextInput from "@/components/form/TextInput.vue";
import Icon from "@/components/utility/Icon.vue";
import PurchaseSuccessModalVue from "./PurchaseSuccessModal.vue";

const { t } = useI18n();

const code = ref("");

const router = useRouter();
const egv = useEgVault();

const modal = useModal();
const submit = () => {
	if (!code.value) return;

	egv.redeemCode(code.value).then((resp) => {
		if (!resp.ok) return;

		modal.open("purchase-success", {
			component: PurchaseSuccessModalVue,
			events: {},
			props: {},
		});

		router.replace({ name: "Store" });
	});
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/themes.scss";

main.store-redeem {
	padding: 1em;

	@include themify() {
		> [selector="heading"] {
			background-color: darken(themed("backgroundColor"), 2);
		}

		> [selector="form"] {
			background-color: lighten(themed("backgroundColor"), 2);
		}

		> [selector="button"] {
			background-color: lighten(themed("backgroundColor"), 2);

			&:hover {
				background-color: lighten(themed("backgroundColor"), 4);
			}
		}
	}

	> [selector="heading"] {
		display: grid;
		grid-template-columns: 3em auto;
		align-items: center;
		padding: 1em;
		border-top-left-radius: 0.25em;
		border-top-right-radius: 0.25em;
	}

	> [selector="form"] {
		padding: 1em;
		border-bottom-left-radius: 0.25em;
		border-bottom-right-radius: 0.25em;

		.input-wrapper {
			margin-left: 25%;
			margin-right: 25%;
		}
	}

	> [selector="button"] {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2em;
		font-size: 1.5em;
		margin-top: 0.5em;
		border-radius: 0.25em;
	}
}
</style>
