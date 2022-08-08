<template>
	<main class="purchase-form">
		<form>
			<!-- Contact -->
			<div class="form-column">
				<TextInput v-model="v$.firstName.$model" :error="v$.firstName.$error" label="First Name" />
				<TextInput v-model="v$.email.$model" :error="v$.email.$error" label="Email" width="16em" />
				<TextInput v-model="v$.lastName.$model" :error="v$.lastName.$error" label="Last Name"></TextInput>
			</div>

			<!-- Billing Address
			<TextInput
				v-model="v$.address.$model"
				:error="v$.address.$error"
				label="Street Address"
				width="max(50%, 14em)"
			/>
			<TextInput
				v-model="v$.address_2.$model"
				:error="v$.address_2.$error"
				label="Street Address, Line 2 (Optional)"
				width="max(50%, 14em)"
			/>
			<div class="form-column">
				<TextInput v-model="v$.city.$model" :error="v$.city.$error" label="City" />
				<TextInput v-model="v$.region.$model" :error="v$.region.$error" label="State / Province / Region" />
			</div>
			<div class="form-column">
				<TextInput v-model="v$.zipCode.$model" :error="v$.zipCode.$error" label="Zip Code" width="6em" />

				<Dropdown
					v-model="v$.country.$model"
					:tabindex="0"
					:default-value="{ id: 'US', name: 'United States' }"
					:options="countryMap"
					width="12em"
				>
				</Dropdown>
			</div>
			-->
		</form>
	</main>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, watch } from "vue";
// import { countries } from "./countries";
import TextInput from "@/components/form/TextInput.vue";

const emit = defineEmits<{
	(e: "update-form", data: string): void;
}>();

const form = reactive({
	firstName: "",
	lastName: "",
	email: "",
	address: "",
	address_2: "",
	city: "",
	zipCode: "",
	region: "",
	country: "US",
});

const formRules = {
	firstName: { required },
	lastName: { required },
	email: { required, email },
	address: {
		/*required*/
	},
	address_2: {},
	city: {
		/*required*/
	},
	zipCode: {
		/*required*/
	},
	region: {
		/*required*/
	},
	// country: { /*required* },
};

const v$ = useVuelidate(formRules, form);

// const countryMap = countries.map((c) => ({ id: c.code, name: c.name }));

watch(form, (v) => {
	if (v$.value.$invalid) {
		emit("update-form", ""); // invalid
	} else {
		emit("update-form", JSON.stringify(v));
	}
});
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
