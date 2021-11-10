import { createI18n } from "vue-i18n";
import { en_US } from "./lang/en_US";

export const messages = {
	en_US,
};

export const i18n = createI18n({
	locale: "fr_FR",
	fallbackLocale: "en_US",
	messages,
});
