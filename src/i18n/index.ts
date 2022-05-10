import { LocalStorageKeys } from "@store/lskeys";
import { createI18n } from "vue-i18n";
import en_US from "@locale/en_US";
import manifest from "@locale/manifest.json";
import { Locale } from "@locale/type";

export const options = Object.keys(manifest)
	.filter((k) => k !== "type")
	.reduce((m, v) => {
		m[v] = true;
		return m;
	}, {} as { [key: string]: boolean });

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
	if (!(locale in options)) {
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
	messages: {
		en_US,
	},
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
	de_AT: "German (Austria)",
	de_DE: "German (Germany)",
	el_GR: "Greek (Greece)",
	en_GB: "English (United Kingdom)",
	en_PT: "English (Pirate)",
	en_US: "English (United States)",
	es_ES: "Spanish (Spain)",
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
	pt_BR: "Portuguese (Brazil)",
	pt_PT: "Portuguese (Portugal)",
	ro_RO: "Romanian (Romania)",
	ru_RU: "Russian (Russia)",
	sq_AL: "Albanian (Albania)",
	sr_SP: "Serbian (Serbia)",
	sv_SE: "Swedish (Sweden)",
	tr_TR: "Turkish (Turkey)",
	uk_UA: "Ukrainian (Ukraine)",
	vi_VN: "Vietnamese (Vietnam)",
};

export const preload = () => {
	const promises: Promise<void>[] = [];
	for (const locale in options) {
		promises.push(
			import(`../../locale/${locale}.ts`)
				.then((messages: Locale) => {
					i18n.global.setLocaleMessage(locale, messages);
				})
				.catch((err) => {
					console.warn("couldnt find type??", err);
				}),
		);
	}

	return Promise.all(promises);
};
