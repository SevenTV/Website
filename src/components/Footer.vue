<template>
	<footer :class="$route.path === '/' ? 'filled' : ''">
		<div class="breadcrumbs">
			<div>
				<router-link to="/contact" class="crumb">Contact</router-link>
				<font-awesome-icon :icon="['fas', 'circle']" class="splitter" />
				<a href="https://github.com/SevenTV" class="crumb">GitHub</a>
				<font-awesome-icon :icon="['fas', 'circle']" class="splitter" />
				<router-link to="/privacy" class="crumb blue">Privacy Policy</router-link>
				<font-awesome-icon :icon="['fas', 'circle']" class="splitter" />
				<router-link to="/tos" class="crumb blue">Terms of Service</router-link>
				<font-awesome-icon :icon="['fas', 'circle']" class="splitter" />
				<router-link to="/dmca" class="crumb blue">DMCA</router-link>
			</div>
		</div>
	</footer>
</template>

<script lang="ts">
export default {
	props: ["footerFilled"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/footer.scss";
</style>
