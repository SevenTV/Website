<template>
	<main class="user-root">
		<template v-if="ctx?.user">
			<!-- User Details - name tag, roles, channels, etc -->
			<div class="container">
				<UserDetails />

				<RouterView />
			</div>
		</template>
	</main>
</template>

<script setup lang="ts">
import { useContext } from "@/composables/useContext";
import UserDetails from "./UserDetails.vue";

const ctx = useContext("USER");
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

$smallWidth: 800px;

main.user-root {
	.container {
		display: flex;
		flex-direction: row;
		height: 100%;

		@include themify() {
			background-color: themed("navBackgroundColor");
		}

		@media screen and (max-width: $smallWidth) {
			flex-direction: column;
			.user-overview {
				margin-top: 2em;

				.emote-list {
					justify-content: center;
				}
			}
		}
	}
}
</style>
