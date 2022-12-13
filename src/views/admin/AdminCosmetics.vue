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
					<div v-for="paint in paints" :key="paint.id" class="paint-wrapper" @click="editPaint(paint)">
						<PaintComponent :paint="paint" :text="true">
							<span>{{ paint.name }}</span>
						</PaintComponent>
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
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/utility/Button.vue";
import { defineAsyncComponent, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GetCosmetics } from "@/assets/gql/cosmetics/cosmetics";
import { Paint } from "@/structures/Cosmetic";

const PaintComponent = defineAsyncComponent(() => import("@/components/utility/Paint.vue"));

const route = useRoute();

const { onResult, refetch } = useQuery<GetCosmetics>(GetCosmetics);

const paints = ref([] as Paint[]);

onResult((res) => (paints.value = res.data.cosmetics.paints ?? []));

const router = useRouter();

watch(route, () => refetch());

const editPaint = (paint: Paint) => {
	paints.value = [];
	router.push({
		name: "AdminPaintBuilder",
		params: {
			paint: JSON.stringify(paint),
		},
	});
};
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
