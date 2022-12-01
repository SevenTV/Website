import { reactive } from "vue";
import { useMutationStore } from "@/store/mutation";
import type { Emote } from "@/structures/Emote";
import type { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
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
	conflict: ActiveEmote | null;
}

export type Mode = "assign" | "emote";

export function useSetSelector() {
	const m = useMutationStore();

	async function toggleActiveEmote(set: SetMeta, emoteID: string, replace?: string) {
		const action: ListItemAction = set.enabled ? "REMOVE" : "ADD";

		if (replace) {
			await m.setEmoteInSet(set.data.id, "REMOVE", replace).catch(() => {
				/* */
			});
		}

		return m.setEmoteInSet(set.data.id, action, emoteID, data.customName);
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
