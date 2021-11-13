import { createI18n } from "vue-i18n";
import { en_US } from "./lang/en_US";
import { fr_FR } from "./lang/fr_FR";

export const messages = {
	en_US,
	fr_FR,
};

export const i18n = createI18n({
	locale: "en_US",
	fallbackLocale: "en_US",
	messages,
});

export const langs = {
	en_US: {
		name: "English (United States)",
	},
	fr_FR: {
		name: "French (France)",
	},
} as {
	[key: string]: {
		name: string;
	};
};
