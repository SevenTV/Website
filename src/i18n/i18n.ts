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
