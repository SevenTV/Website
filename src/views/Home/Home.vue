<template>
	<div class="home">
		<main>
			<div class="info">
				<div class="info-content">
					<!-- Slogan / Description -->
					<div>
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

					<!-- Features -->
					<div>
						<h3>{{ t("home.why_app") }}</h3>
						<div class="feature-list">
							<div v-for="f of features" :key="f.id" class="feature-point">
								<span class="feature-bullet" />
								<span> {{ t(`home.feature_list.${f.id}`) }} </span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Content -->
			<div class="heading-splitter" />
			<div class="page-body">
				<span class="TODO">TODO</span>
			</div>
		</main>
		<!--
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
-->
	</div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import Logo from "@base/Logo.vue";
// import ChatterinoLogo from "@base/ChatterinoLogo.vue";
// import FirefoxLogo from "@base/FirefoxLogo.vue";
// import DiscordLogo from "@base/DiscordLogo.vue";

useHead({
	title: "Home - 7TV",
});
const { t } = useI18n();

const features = [
	{ id: "a_lot_of_emotes" },
	{ id: "emote_sets" },
	{ id: "emote_versions" },
	{ id: "emote_aliases" },
	{ id: "really_fast" },
	{ id: "next_gen" },
	{ id: "open_source" },
	{ id: "more" },
] as FeaturePoint[];

interface FeaturePoint {
	id: string;
}
</script>

<style lang="scss" scoped>
@import "@scss/home.scss";
</style>
