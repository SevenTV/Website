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
			const { globalEmoteSet } = storeToRefs(useStore());

			const ok = watch(
				globalEmoteSet,
				(val) => {
					if (!val) {
						return;
					}

					next({ name: "EmoteSet", params: { setID: val.id } });
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
