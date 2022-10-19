import { reactive } from "vue";
import { useMutationStore } from "@/store/mutation";
import type { Emote } from "@/structures/Emote";
import type { EmoteSet } from "@/structures/EmoteSet";
import type { User } from "@/structures/User";
import { ListItemAction } from "@/structures/Common";

export const data = reactive({
	groups: [] as SetGroup[],
	mode: "emote" as Mode,
	customName: "",
	loading: false,
});

export interface SetGroup {
	user: User;
	sets: SetMeta[];
}

export interface SetMeta {
	data: EmoteSet;
	default: boolean;
	enabled: boolean;
	full: boolean;
	conflict: boolean;
}

export type Mode = "assign" | "emote";

export function useSetSelector() {
	const m = useMutationStore();

	function toggleActiveEmote(set: SetMeta, emote: Emote): void {
		const action: ListItemAction = set.enabled ? "REMOVE" : "ADD";

		m.setEmoteInSet(set.data.id, action, emote.id, data.customName);
	}

	function setMode(mode: Mode): void {
		data.mode = mode;
	}

	function setCustomName(name: string): void {
		data.customName = name;
	}

	function updateEmoteName(set: SetMeta, emote: Emote): void {
		m.setEmoteInSet(set.data.id, "UPDATE", emote.id, data.customName);
	}

	return {
		setMode,
		setCustomName,
		toggleActiveEmote,
		updateEmoteName,
	};
}
