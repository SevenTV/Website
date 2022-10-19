import { reactive } from "vue";
import { useMutationStore } from "@/store/mutation";
import type { Emote } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";
import type { User } from "@/structures/User";
import { ListItemAction } from "@/structures/Common";

const data = reactive({
	groups: [] as SetGroup[],
	loading: false,
});

export interface SetGroup {
	user: User;
	sets: SetMeta[];
}

export interface SetMeta {
	data: EmoteSet;
	enabled: boolean;
	full: boolean;
	conflict: boolean;
}

export function useSetSelector() {
	const m = useMutationStore();

	function toggleActiveEmote(set: SetMeta, emote: Emote): void {
		const action: ListItemAction = set.enabled ? "REMOVE" : "ADD";

		m.setEmoteInSet(set.data.id, action, emote.id);
	}

	return {
		groups: data.groups,
		toggleActiveEmote,
	};
}
