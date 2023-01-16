import { watch } from "vue";
import { RouteRecordRaw } from "vue-router";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/main";

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
	component: () => import("@/views/emote-set/EmoteSetPage.vue"),
} as RouteRecordRaw;
