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

export const correctLocale = (locale: string) => {
	const splits = locale.split("_");
	return `${splits[0]}_${splits[1].toUpperCase()}`;
};

export const conversions: { [key: string]: string } = {
	af_ZA: "Afrikaans (South Africa)",
	ar_SA: "Arabic (Saudi Arabia)",
	be_BY: "Belarusian (Belarus)",
	ca_ES: "Catalan (Spain)",
	cs_CZ: "Czech (Czech Republic)",
	da_DK: "Danish (Denmark)",
	de_AT: "Austrian German (Austria)",
	de_DE: "German (Germany)",
	el_GR: "Greek (Greece)",
	en_GB: "British English (United Kingdom)",
	en_PT: "Pirate English (Ahoy!)",
	en_US: "American English (United States)",
	es_ES: "European Spanish (Spain)",
	et_EE: "Estonian (Estonia)",
	fa_IR: "Persian (Iran)",
	fi_FI: "Finnish (Finland)",
	fr_FR: "French (France)",
	ga_IE: "Irish (Ireland)",
	he_IL: "Hebrew (Israel)",
	hu_HU: "Hungarian (Hungary)",
	it_IT: "Italian (Italy)",
	ja_JP: "Japanese (Japan)",
	ka_GE: "Georgian (Georgia)",
	kk_KZ: "Kazakh (Kazakhstan)",
	ko_KR: "Korean (South Korea)",
	nb_NO: "Norwegian Bokmål (Norway)",
	nl_NL: "Dutch (Netherlands)",
	nn_NO: "Norwegian Nynorsk (Norway)",
	pl_PL: "Polish (Poland)",
	pt_BR: "Brazilian Portuguese (Brazil)",
	pt_PT: "European Portuguese (Portugal)",
	ro_RO: "Romanian (Romania)",
	ru_RU: "Russian (Russia)",
	sq_AL: "Albanian (Albania)",
	sr_SP: "Serbian Serbia",
	sv_SE: "Swedish (Sweden)",
	tr_TR: "Turkish (Turkey)",
	uk_UA: "Ukrainian (Ukraine)",
	vi_VN: "Vietnamese (Vietnam)",
};
