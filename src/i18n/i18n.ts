import { createI18n } from "vue-i18n";
import { en_US } from "./lang/en_US";
import { fr_FR } from "./lang/fr_FR";

export const messages = {
	en_US,
	fr_FR,
};

export const i18n = createI18n({
	locale: "fr_FR",
	fallbackLocale: "en_US",
	messages,
});

import { Component } from "vue-demi";
import FlagUS from "@components/base/flags/US.vue";
import FlagFR from "@components/base/flags/FR.vue";

export const langs = {
	en_US: {
		name: "English (United States)",
		icon: FlagUS,
	},
	fr_FR: {
		name: "French (France)",
		icon: FlagFR,
	},
} as {
	[key: string]: {
		name: string;
		icon: Component | null;
	};
};
