<template>
	<div class="help-kick">
		<div class="help-kick-header">
			<Logo />
			<h2>{{ route.meta.title }}</h2>
			<LogoKick :full="true" />

			<p>7TV is now available on Kick. You can enable this functionality with a few steps!</p>
		</div>

		<div class="help-kick-content">
			<h3>Turn on extension functionality</h3>
			<ul>
				<li>
					Install the
					<RouterLink to="/">7TV Extension</RouterLink>
					if you don't already have it
				</li>
				<li>
					Open
					<a href="https://kick.com/" target="_blank" rel="noopener noreferrer">kick.com</a>.
				</li>
				<li>
					Click on the extension icon in the top right corner of your browser, then click on 7TV
					<img src="@/assets/img/kick-help1.avif" />
				</li>
				<li>
					Click on the big button to grant permissions
					<img src="@/assets/img/kick-help2.avif" />
					<img src="@/assets/img/kick-help3.avif" />
				</li>
				<li>Refresh the page and the extension should now be fully functional!</li>
			</ul>

			<h3>Add emotes to your Kick channel</h3>
			<p>Get up to a thousand customizable emotes for your channel, visible to all viewers using 7TV</p>
			<ul>
				<li>Follow the extension setup guide above</li>
				<li>Visit your channel page on kick</li>
				<li>
					Click the banner above the "about" section
					<img src="@/assets/img/kick-help4.avif" />
				</li>
				<li>
					Optional: if you'd like the channel to be connected to an existing 7TV account, you must sign in on
					7tv.app first and ensure that third-party cookies are turned on in your browser.
				</li>
				<li>
					Click on "Continue". Wait 10 seconds for the link to be made.
					<img src="@/assets/img/kick-help5.avif" />
				</li>
				<li>
					On your 7TV profile, select an Emote Set to assign to your channel or create a new set
					<img src="@/assets/img/kick-help6.avif" />
					<img src="@/assets/img/kick-help7.avif" />
				</li>
				<li>
					It may take up to 10 minutes for emotes to first appear on your channel, but you should be all set!
					Start adding some emotes via our <RouterLink to="/emotes">Emote Directory</RouterLink>.
				</li>
			</ul>
		</div>

		<strong class="kick-help-footnote">
			This integration is in beta. Please reach out via our
			<a href="discord.gg/7tv" target="_blank">discord server</a> for support.
		</strong>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Logo from "@/components/base/Logo.vue";
import LogoKick from "@/components/base/LogoKick.vue";

const route = useRoute();
</script>

<style scoped lang="scss">
.help-kick {
	width: 100%;
	position: absolute;
	top: 0;
	background: linear-gradient(-180deg, transparent 85%, rgba(0, 255, 0, 10%) 100%), black;
}

.help-kick-header {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	color: rgb(0, 255, 0);
	border-top: 0.1rem solid rgb(0, 255, 0);
	place-items: center;
	margin: 4.5em 0;

	svg {
		font-size: 3rem;
		margin: 0.5rem 0;
	}

	p {
		grid-column: 1 / 4;
		font-size: 1.5rem;
		text-align: center;
	}
}

.help-kick-content {
	display: grid;
	justify-content: start;
	margin: 4.5em 2rem;

	h3 {
		font-size: 2rem;
		color: rgb(0, 255, 0);
	}

	li {
		margin: 1rem 0;
	}

	li > img {
		display: grid;
		max-height: 12rem;
		margin: 0.5rem 0 0;
		border-radius: 0.25rem;
		padding: 0.25rem;
		background: lime;
	}
}

.kick-help-footnote {
	display: grid;
	grid-auto-flow: column dense;
	justify-content: center;
	margin: 1rem;
	column-gap: 0.25rem;
	text-align: center;
}
</style>
