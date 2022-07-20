<template>
	<main class="admin-cosmetics">
		<div selector="heading">
			<h3>Cosmetics Manager</h3>

			<!-- Buttons -->
			<div selector="create-buttons">
				<Button
					use-route="/admin/cosmetics/paint-builder"
					label="New Paint"
					appearance="raised"
					color="accent"
				/>
				<Button label="New Badge" appearance="raised" color="accent" />
			</div>
		</div>

		<div selector="visible-content">
			<div v-if="route.name === 'AdminCosmetics'" class="cosmetics-list">
				<!-- Display Paints -->
				<h2>Paints</h2>
				<div selector="paints-list">
					<div v-for="paint in paints" :key="paint.id" class="paint-wrapper">
						<Paint :paint="paint" :text="true">
							<span>{{ paint.name }}</span>
						</Paint>
					</div>
				</div>

				<!-- Display Paints -->
				<div selector="badges-list"></div>
			</div>

			<router-view />
		</div>
	</main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Button from "@/components/utility/Button.vue";
import Paint from "@/components/utility/Paint.vue";
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GetCosmetics } from "@/assets/gql/cosmetics/cosmetics";

const route = useRoute();

const { result } = useQuery<GetCosmetics>(GetCosmetics);

const paints = computed(() => result.value?.cosmetics.paints);
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

main.admin-cosmetics {
	width: 100%;

	@include themify() {
		> [selector="heading"] {
			background-color: lighten(themed("backgroundColor"), 4);
		}

		.cosmetics-list > [selector="paints-list"] > .paint-wrapper {
			background-color: lighten(themed("backgroundColor"), 4);
		}
	}

	> div[selector="heading"] {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 4em;

		> h3 {
			margin: 1em;
		}

		> [selector="create-buttons"] {
			margin-right: 1em;
			> button {
				margin: 0.25em;
			}
		}
	}

	> div[selector="visible-content"] {
		margin: 1em;
	}
}

.cosmetics-list {
	display: block;
	width: 100%;

	> [selector="paints-list"] {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

		> .paint-wrapper {
			cursor: pointer;
			border-radius: 0.3em;
			padding: 0.5em;
			margin: 0.1em;
		}
	}
}
</style>
