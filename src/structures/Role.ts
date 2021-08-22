export class Role {
	get id(): string {
		return this.data.id;
	}

	constructor(private data: Role.Type) {}

	static Create(data: Role.Type): Role {
		return new Role(data);
	}
}

export namespace Role {
	export interface Type {
		id: string;
		name: string;
		color: number;
		allowed: BigInt;
		denied: BigInt;
		position: number;
	}
}
