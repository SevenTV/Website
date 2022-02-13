<template>
	<div class="home">
		<main>
			<div class="info">
				<div class="logo">
					<Logo />
				</div>
				<div class="slogan">
					<h1>{{ t("home.slogan") }}</h1>
					<p>
						{{ t("home.app_description") }}.
						<router-link to="/about" class="learn-more">{{ t("common.learnMore") }}.</router-link>
					</p>
				</div>
			</div>
			<div class="downloads">
				<div class="title">
					<i class="material-icons unselectable download-icon" @mousedown.stop>download</i>
					<span>{{ t("common.downloads") }}</span>
				</div>
				<div class="options">
					<a
						class="option"
						href="https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh"
					>
						<div class="tag">
							<span class="rainbow">1.6.1</span>
						</div>
						<font-awesome-icon :icon="['fab', 'chrome']" />
					</a>
					<a class="option" href="https://addons.mozilla.org/en-US/firefox/addon/7tv/">
						<div class="tag">
							<span class="rainbow">1.6.1</span>
						</div>
						<FirefoxLogo />
					</a>
					<div class="option" href="">
						<div class="tag">
							<span class="chatterino">7.3.4</span>
						</div>
						<ChatterinoLogo />
					</div>
					<div class="option">
						<span class="tag"><span class="mobile">Mobile</span></span>
						<i class="material-icons unselectable code-icon" @mousedown.stop>smartphone</i>
					</div>
					<div class="option">
						<span class="tag"><span>More</span></span>
						<i class="material-icons unselectable code-icon" @mousedown.stop>code</i>
					</div>
				</div>
			</div>
		</main>
		<div class="socials">
			<div class="social">
				<a href="https://discord.com/invite/k7b27z77" target="_BLANK" class="social-split">
					<DiscordLogo />
					<span>
						<p>Join 7TV on Discord</p>
						<i>7777 members online now</i>
					</span>
				</a>
			</div>
			<div class="social">
				<a href="https://twitter.com/Official_7TV" target="_BLANK" class="social-split">
					<font-awesome-icon :icon="['fab', 'twitter']" />
					<p>Follow us on Twitter!</p>
				</a>
			</div>
			<div class="social">
				<a href="https://github.com/SevenTV" target="_BLANK" class="social-split">
					<font-awesome-icon :icon="['fab', 'github']" />
					<p>Contribute</p>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useHead } from "@vueuse/head";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Logo from "@base/Logo.vue";
import ChatterinoLogo from "@base/ChatterinoLogo.vue";
import FirefoxLogo from "@base/FirefoxLogo.vue";
import DiscordLogo from "@base/DiscordLogo.vue";

export default defineComponent({
	components: {
		Logo,
		DiscordLogo,
		ChatterinoLogo,
		FirefoxLogo,
	},
	setup() {
		useHead({
			title: "Home - 7TV",
		});
		const { t } = useI18n();

		return {
			t,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/home.scss";
</style>
