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

				<div class="terms-agreement">
					<Checkbox v-model="termsOk" />
					<span
						>I agree to the
						<RouterLink target="_blank" :to="{ name: 'LegalSales' }"
							>Terms and Conditions of Sale</RouterLink
						>.
					</span>
				</div>
			</div>

			<div v-wave selector="button" :ok="redeemable" @click="submit">
				<span>{{ t("store.redeem_submit").toUpperCase() }}</span>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useActor } from "@/store/actor";
import { useModal } from "@/store/modal";
import Checkbox from "@/components/form/Checkbox.vue";
import TextInput from "@/components/form/TextInput.vue";
import Icon from "@/components/utility/Icon.vue";
import LoginButton from "@/components/utility/LoginButton.vue";
import PurchaseSuccessModalVue from "./PurchaseSuccessModal.vue";
import { useEgVault } from "./egvault";

const { t } = useI18n();

const code = ref("");
const termsOk = ref(false);
const loading = ref(false);
const redeemable = computed(() => !!(!loading.value && code.value && termsOk.value));

const actor = useActor();
const router = useRouter();
const { query } = useRoute();
const egv = useEgVault();

const modal = useModal();
const submit = () => {
	if (!code.value || !actor.id || !termsOk.value || loading.value) return;

	loading.value = true;

	egv.redeemCode(code.value)
		.then(async (resp) => {
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
		})
		.finally(() => (loading.value = false));
};

onMounted(() => {
	if (query.code) {
		code.value = query.code?.toString() ?? "";
	}
});
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

			&[ok="true"] {
				background-color: themed("accent");
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
		cursor: not-allowed;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2em;
		font-size: 1.5em;
		margin-top: 0.5em;
		border-radius: 0.25em;

		&[ok="true"] {
			cursor: pointer;
		}
	}
}

.terms-agreement {
	margin: 1rem 1rem 0 0.25rem;
}

.terms-agreement > * {
	display: inline-block;
}
</style>
