import { LocalStorageKeys } from "@/store/lskeys";
import manifest from "@locale/manifest.json";
import { createI18n } from "vue-i18n";
import en_US from "@locale/en_US";
import type { Locale } from "@locale/type";

const locales: { [key: string]: string } = manifest;

const getBrowserLocale = () => {
	let locale: string;
	const setting = localStorage.getItem(LocalStorageKeys.LOCALE);
	if (setting) {
		locale = setting;
	} else {
		const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;

		if (!navigatorLocale) {
			return "en_US";
		}

		locale = navigatorLocale;
	}

	locale = locale.trim().replace("-", "_").toLowerCase();

	if (!locales[locale]) {
		return "en_US";
	}

	return locale;
};

const l = getBrowserLocale();

export const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: l,
	fallbackLocale: "en_US",
	silentTranslationWarn: !import.meta.env.DEV,
	silentFallbackWarn: !import.meta.env.DEV,
	warnHtmlMessage: import.meta.env.DEV,
	useScope: "default",
	messages: {
		en_US: JSON.parse(JSON.stringify(en_US)),
	},
});

import(`../../locale/${l}.ts`)
	.then((locale: Locale) => {
		i18n.global.locale.value = l;
		i18n.global.setLocaleMessage(l, JSON.parse(JSON.stringify(locale)));
		console.log(i18n.global, l);
	})
	.catch((err) => {
		console.error("failed to download locale", err);
	});

export const t = ((key: string, ...args: unknown[]) => {
	return i18n.global.t(`default.${key}`, ...(args as []));
}) as typeof i18n.global.t;
