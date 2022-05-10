import { LocalStorageKeys } from "@store/lskeys";
import { createI18n } from "vue-i18n";
import en_US from "@locale/en_US";
import manifest from "@locale/manifest.json";

export const options = Object.keys(manifest)
	.filter((k) => k !== "type")
	.reduce((m, v) => {
		m[v] = (manifest as { [key: string]: { hash: string; name: string } })[v].name;
		return m;
	}, {} as { [key: string]: string });

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
