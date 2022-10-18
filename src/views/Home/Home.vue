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
						<p>{{ t("home.app_description") }}.</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="page-body">
			<HomeContent />
		</div>

		<div class="socials">
			<div class="social">
				<a :href="discord.invite" target="_BLANK" class="social-split">
					<Icon lib="fab" icon="discord" />
					<span>
						<p>{{ t("home.socials.discord") }}</p>
						<i v-if="discord.count >= 0">
							<p>{{ t("home.socials.discord_online_count", [discord.count]) }}</p>
						</i>
					</span>
				</a>
			</div>
			<div class="social">
				<a href="https://twitter.com/Official_7TV" target="_BLANK" class="social-split">
					<Icon lib="fab" icon="twitter" />
					<p>{{ t("home.socials.twitter") }}</p>
				</a>
			</div>
			<div class="social">
				<a href="https://github.com/SevenTV" target="_BLANK" class="social-split">
					<Icon lib="fab" icon="github" />
					<p>{{ t("home.socials.github") }}</p>
				</a>
			</div>
		</div>

		<div class="legal">
			<div class="legal-links">
				<router-link :to="{ name: 'LegalTerms' }">{{ t("home.legal.terms") }}</router-link>
				<router-link :to="{ name: 'LegalPrivacy' }">{{ t("home.legal.privacy") }}</router-link>
			</div>
			<p class="unaffiliated">{{ t("home.legal.unaffiliated") }}</p>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import Logo from "@base/Logo.vue";
import HomeContent from "@/views/Home/HomeContent.vue";
import Icon from "@/components/utility/Icon.vue";

const { t } = useI18n();

useHead({
	title: "Home - 7TV",
});

// Discord member count
const discord = ref({
	name: "",
	invite: "",
	count: -1,
});
{
	const req = new XMLHttpRequest();
	req.open("GET", "https://discord.com/api/guilds/817075418054000661/widget.json");
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
