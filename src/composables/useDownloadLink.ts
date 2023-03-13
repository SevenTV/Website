import { toRef } from "vue";

const data = {
	chromium: "https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh",
	firefox: "https://addons.mozilla.org/en-US/firefox/addon/7tv",
	chromium_beta: "https://chrome.google.com/webstore/detail/7tv-nightly/fphegifdehlodcepfkgofelcenelpedj",
	firefox_beta: "https://addons.mozilla.org/en-US/firefox/addon/7tv-nightly/",

	mobile_chatsen: "https://chatsen.app",
	mobile_frosty: "https://frostyapp.io",
	mobile_dankchat: "https://dank.chat",

	desktop_chatterino: "https://github.com/SevenTV/chatterino7/releases",
};

export function useDownloadLink(key: keyof typeof data) {
	return toRef(data, key);
}
