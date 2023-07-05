<template>
	<main class="store-redeem">
		<div>
			<div selector="heading">
				<Icon size="xl" icon="gift" />
				<div>
					<h2>{{ t("store.redeem_heading") }}</h2>
					<p>{{ t("store.redeem_hint") }}</p>
				</div>
			</div>

			<div selector="form">
				<div v-if="actor.id" class="input-wrapper">
					<TextInput v-model="code" color="primary" label="Code" @keydown.enter="submit" />
				</div>
				<div v-else selector="need-login">
					<p>Please sign in to redeem a code</p>
					<LoginButton :style="{ transform: 'scale(2)' }" />
				</div>
			</div>

			<div v-wave selector="button" @click="submit">
				<span>{{ t("store.redeem_submit").toUpperCase() }}</span>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useActor } from "@/store/actor";
import { useModal } from "@/store/modal";
import TextInput from "@/components/form/TextInput.vue";
import Icon from "@/components/utility/Icon.vue";
import LoginButton from "@/components/utility/LoginButton.vue";
import PurchaseSuccessModalVue from "./PurchaseSuccessModal.vue";
import { useEgVault } from "./egvault";

const { t } = useI18n();

const code = ref("");

const actor = useActor();
const router = useRouter();
const egv = useEgVault();

const modal = useModal();
const submit = () => {
	if (!code.value) return;

	egv.redeemCode(code.value).then(async (resp) => {
		if (!resp.ok) return;

		const data = await resp.json();
		if (!data) return;

		if (!data.authorize_url) {
			modal.open("purchase-success", {
				component: PurchaseSuccessModalVue,
				events: {},
				props: {},
			});

			router.replace({ name: "Store" });
		} else {
			window.location.href = data.authorize_url;
		}
	});
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/themes.scss";

main.store-redeem {
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 1em;

	@include themify() {
		[selector="heading"] {
			background-color: darken(themed("backgroundColor"), 2);
		}

		[selector="form"] {
			background-color: lighten(themed("backgroundColor"), 2);
		}

		[selector="button"] {
			background-color: lighten(themed("backgroundColor"), 2);

			&:hover {
				background-color: lighten(themed("backgroundColor"), 4);
			}
		}
	}

	[selector="heading"] {
		display: grid;
		grid-template-columns: 3em auto;
		align-items: center;
		padding: 1em;
		border-top-left-radius: 0.25em;
		border-top-right-radius: 0.25em;
	}

	[selector="form"] {
		padding: 1em;
		border-bottom-left-radius: 0.25em;
		border-bottom-right-radius: 0.25em;

		.input-wrapper {
			margin-left: 25%;
			margin-right: 25%;
		}

		> [selector="need-login"] {
			display: flex;
			row-gap: 2em;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
			padding-bottom: 1em;
		}
	}

	[selector="button"] {
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
