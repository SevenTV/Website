import { createI18n } from "vue-i18n";
import { en_US } from "./lang/en_US";
import { fr_FR } from "./lang/fr_FR";

export const messages = {
	en_US,
	fr_FR,
};

import { Component } from "vue";
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

const getBrowserLocale = () => {
	let locale: string;
	const setting = localStorage.getItem("7tv_language_setting");
	if (setting) {
		locale = setting;
	} else {
		const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;

		if (!navigatorLocale) {
			return undefined;
		}

		locale = navigatorLocale;
	}

	locale = locale.trim().replace("-", "_").toLowerCase();

	if (!langs[locale]) {
		return "en_US";
	}

	return locale;
};

export const i18n = createI18n({
	locale: getBrowserLocale(),
	fallbackLocale: "en_US",
	messages,
});
