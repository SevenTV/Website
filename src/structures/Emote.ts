import { store } from "@/store";
import { User } from "@/structures/User";
import { DataStructure } from "@typings/typings/DataStructure";

export class Emote {
	owner: User | null = null;

	get id(): string {
		return this.data.id;
	}

	constructor(public data: DataStructure.Emote) {
		if (data.owner) {
			store.commit("SET_USER", { id: data.owner.id, data: data.owner });
			this.owner = store.getters.user(data.owner.id);
		}
	}

	update(data: Partial<DataStructure.Emote>): void {
		this.data = {
			...this.data,
			...data,
		};
		if (data.owner) {
			store.commit("SET_USER", { id: data.owner.id ?? this.owner?.id, data: data.owner });
		}
	}

	getName(): string {
		return this.data.name;
	}

	getURL(size: "1" | "2" | "3" | "4"): string | null {
		const url = this.data.urls?.filter((url) => url[0] === size)[0];

		if (Array.isArray(url) && typeof url[1] === "string") {
			return url[1];
		} else {
			return null;
		}
	}

	static Create(data: DataStructure.Emote): Emote {
		return new Emote(data);
	}
}
