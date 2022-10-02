import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { RouteRecordRaw } from "vue-router";

export const EmoteSetRoute = {
	path: "/emote-sets/:setID",
	name: "EmoteSet",
	props: true,
	beforeEnter(to, from, next) {
		// global set permalink
		if (to.params.setID === "global") {
			const { namedSets } = storeToRefs(useStore());

			const ok = watch(
				namedSets.value.global,
				(val) => {
					if (!val[0]) {
						return;
					}

					next({ name: "EmoteSet", params: { setID: val[0].id } });
					ok();
				},
				{ immediate: true },
			);

			return;
		}

		next();
	},
	component: () => import("@views/EmoteSetPage/EmoteSetPage.vue"),
} as RouteRecordRaw;
