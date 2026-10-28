import { toRef } from "vue";

const data = {
	chromium: "https://chromewebstore.google.com/detail/7tv/lppmekppnliemjclknbagdhoocikieoi",
	firefox: "https://addons.mozilla.org/en-US/firefox/addon/7tv-new/",

	mobile_chatsen: "https://chatsen.app",
	mobile_frosty: "https://frostyapp.io",
	mobile_dankchat: "https://dank.chat",

	desktop_chatterino: "https://github.com/SevenTV/chatterino7/releases",
};

export function useDownloadLink(key: keyof typeof data) {
	return toRef(data, key);
}
