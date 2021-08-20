import { DataStructure } from "@typings/typings/DataStructure";

export class Emote {
	constructor(public data: DataStructure.Emote) {}

	update(data: Partial<DataStructure.Emote>): void {
		this.data = {
			...this.data,
			...data,
		};
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
