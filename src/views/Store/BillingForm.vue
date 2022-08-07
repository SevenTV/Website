<template>
	<main class="purchase-form">
		<form>
			<!-- Contact -->
			<div class="form-column">
				<TextInput v-model="v$.firstName.$model" label="First Name" />
				<TextInput v-model="v$.email.$model" label="Email" width="16em" />
				<TextInput v-model="v$.lastName.$model" label="Last Name"></TextInput>
			</div>

			<!-- Billing Address -->
			<TextInput v-model="v$.address.$model" label="Street Address" width="max(50%, 14em)" />
			<TextInput v-model="v$.address_2.$model" label="Street Address, Line 2 (Optional)" width="max(50%, 14em)" />
			<div class="form-column">
				<TextInput v-model="v$.zipCode.$model" label="Zip Code" width="6em" />
				<Dropdown
					v-model="v$.country.$model"
					:tabindex="0"
					:default-value="{ id: 'US', name: 'United States' }"
					:options="countryMap"
					width="12em"
				>
				</Dropdown>
			</div>
		</form>
	</main>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive } from "vue";
import { countries } from "./countries";
import TextInput from "@/components/form/TextInput.vue";
import Dropdown from "../../components/form/Dropdown.vue";

const form = reactive({
	firstName: "",
	lastName: "",
	email: "",
	address: "",
	address_2: "",
	zipCode: "",
	region: "",
	country: "US",
});

const formRules = {
	firstName: { required },
	lastName: { required },
	email: { required, email },
	address: { required },
	address_2: {},
	zipCode: { required },
	region: { required },
	country: { required },
};

const v$ = useVuelidate(formRules, form);

const countryMap = countries.map((c) => ({ id: c.code, name: c.name }));
</script>

<style scoped async lang="scss">
@import "@scss/themes.scss";

main.purchase-form {
	> form {
		border-radius: 0.25em;
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 1em;

		> .form-column {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			gap: 1em;
		}
	}
}
</style>
