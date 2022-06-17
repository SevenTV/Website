<template>
	<main class="home">
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
						<div v-for="f of features" :key="f" class="feature-point">
							<span class="feature-bullet" />
							<span> {{ t(`home.features.${f}.name`) }} </span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="page-body">
			<HomeContent />
		</div>
		<!--
			<div class="socials">
				<div class="social">
					<a href="https://discord.com/invite/k7b27z77" target="_BLANK" class="social-split">
						<DiscordLogo />
						<span>
							<p>{{ t("home.socials.discord") }}</p>
							<i v-if="discord.count >= 0">
								{{ t("home.socials.discord_online_count", [discord.count]) }}
							</i>
						</span>
					</a>
				</div>
				<div class="social">
					<a href="https://twitter.com/Official_7TV" target="_BLANK" class="social-split">
						<font-awesome-icon :icon="['fab', 'twitter']" />
						<p>{{ t("home.socials.twitter") }}</p>
					</a>
				</div>
				<div class="social">
					<a href="https://github.com/SevenTV" target="_BLANK" class="social-split">
						<font-awesome-icon :icon="['fab', 'github']" />
						<p>{{ t("home.socials.github") }}</p>
					</a>
				</div>
			</div>
			-->
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import Logo from "@base/Logo.vue";
// import ChatterinoLogo from "@base/ChatterinoLogo.vue";
// import FirefoxLogo from "@base/FirefoxLogo.vue";
// import DiscordLogo from "@base/DiscordLogo.vue";
import HomeContent from "@views/Home/HomeContent.vue";

const { t } = useI18n();

useHead({
	title: "Home - 7TV",
});

// Feature List
const features = [
	"many_emote_slots",
	"emote_sets",
	"emote_versions",
	"channel_emote_names",
	"real_time",
	"next_gen",
	"source_available",
] as string[];

// Discord member count
const discord = ref({
	name: "",
	invite: "",
	count: -1,
});
{
	const req = new XMLHttpRequest();
	req.open("GET", "https://canary.discord.com/api/guilds/817075418054000661/widget.json");
	req.onload = () => {
		const data = JSON.parse(req.responseText);
		discord.value.name = data.name;
		discord.value.invite = data.instant_invite;
		discord.value.count = data.presence_count;
	};
	req.send();
}
</script>

<style lang="scss" scoped>
@import "@scss/home.scss";
</style>
