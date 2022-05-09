import { createI18n } from "vue-i18n";
import { en_US } from "./lang/en_US";
import { fr_FR } from "./lang/fr_FR";
import { en_PI } from "./lang/en_PI";
import { ru_RU } from "./lang/ru_RU";

export const messages = {
	en_US,
	fr_FR,
	en_PI,
	ru_RU,
};

import { Component, defineAsyncComponent } from "vue";
import { LS_KEYS } from "@/store/lskeys";

const FlagUS = defineAsyncComponent(() => import("@components/base/flags/US.vue"));
const FlagFR = defineAsyncComponent(() => import("@components/base/flags/FR.vue"));
const FlagPirate = defineAsyncComponent(() => import("@components/base/flags/PIRATE.vue"));
const FlagRussia = defineAsyncComponent(() => import("@components/base/flags/RU.vue"));

export const langs = {
	en_US: {
		name: "English (United States)",
		icon: FlagUS,
	},
	fr_FR: {
		name: "French (France)",
		icon: FlagFR,
	},

	en_PI: {
		name: "English (Pirate)",
		icon: FlagPirate,
	},
	ru_RU: {
		name: "Russian (Russia)",
		icon: FlagRussia,
	},
} as {
	[key: string]: {
		name: string;
		icon: Component | null;
	};
};

const getBrowserLocale = () => {
	let locale: string;
	const setting = localStorage.getItem(LS_KEYS.LOCALE);
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
	legacy: false,
	locale: getBrowserLocale(),
	pluralizationRules: {
		ru_RU: dankPluralization,
	},
	fallbackLocale: "en_US",
	silentTranslationWarn: true,
	silentFallbackWarn: true,
	warnHtmlMessage: false,
	allowComposition: true,
	messages,
});

function dankPluralization(choice: number, choicesLength: number): number {
	if (choice === 0) {
		return 0;
	}

	const teen = choice > 10 && choice < 20;
	const endsWithOne = choice % 10 === 1;
	if (!teen && endsWithOne) {
		return 1;
	}
	if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
		return 2;
	}

	return choicesLength < 4 ? 2 : 3;
}
