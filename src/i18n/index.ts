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
	console.log(options);
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

export const correctLocale = (locale: string) => {
	const splits = locale.split("_");
	if (splits.length < 2) {
		splits[0] = "en";
		splits[1] = "US";
	}

	return `${splits[0]}_${splits[1].toUpperCase()}`;
};
