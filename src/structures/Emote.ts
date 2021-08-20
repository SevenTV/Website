import { DataStructure } from "@typings/typings/DataStructure";

export class Emote {
	constructor(private data: DataStructure.Emote) {}

	update(data: Partial<DataStructure.Emote>): void {
		this.data = {
			...this.data,
			...data,
		};
	}

	getName(): string {
		return this.data.name;
	}

	static Create(data: DataStructure.Emote): Emote {
		return new Emote(data);
	}
}
