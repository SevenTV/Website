<template>
	<div class="home-content">
		<!-- Downloads -->
		<section selector="downloads">
			<HomeDownloads />
		</section>

		<!-- Features -->
		<section selector="features">
			<HomeFeatures />
		</section>
	</div>
</template>

<script setup lang="ts">
import HomeDownloads from "@views/Home/HomeDownloads.vue";
import HomeFeatures from "@views/Home/HomeFeatures.vue";
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";
.home-content {
	display: flex;
	flex-direction: column;
	flex-grow: 1;

	@include themify() {
		> section[selector="features"] {
			.feature-card {
				$color: darken(themed("backgroundColor"), 2);
				border-color: lighten($color, 8);
				background-color: $color;
				box-shadow: 0.075em 0.075em 0.25em darken($color, 8);
			}
		}
		> section[selector="downloads"] {
			background-color: themed("navBackgroundColor");
		}
	}

	> section {
		@media screen and (max-width: 800px) {
			margin: 0;
		}
	}

	> section[selector="features"] {
		display: flex;
		flex-direction: column;
	}

	> section[selector="downloads"] {
		display: flex;
		padding-bottom: 3em;
	}
}
</style>
