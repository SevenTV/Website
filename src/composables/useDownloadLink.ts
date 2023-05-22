import { toRef } from "vue";

const data = {
	chromium: "https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh",
	chromium_nightly: "https://chrome.google.com/webstore/detail/7tv-nightly/fphegifdehlodcepfkgofelcenelpedj",

	mobile_chatsen: "https://chatsen.app",
	mobile_frosty: "https://frostyapp.io",
	mobile_dankchat: "https://dank.chat",

	desktop_chatterino: "https://github.com/SevenTV/chatterino7/releases",
};

export function useDownloadLink(key: keyof typeof data) {
	return toRef(data, key);
}
