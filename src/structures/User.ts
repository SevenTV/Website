import { DataStructure } from "@typings/typings/DataStructure";

export class User {
	get id(): string {
		return this.data.id;
	}

	constructor(public data: DataStructure.TwitchUser) {}

	update(data: Partial<DataStructure.TwitchUser>): void {
		this.data = {
			...this.data,
			...data,
		};
	}

	getDisplayName(): string {
		return this.data.display_name;
	}

	getLogin(): string {
		return this.data.login;
	}

	getRoleColor(): string {
		return "#" + (this.data.role?.color ?? 0).toString(16);
	}

	getAvatarURL(): string {
		return this.data.profile_image_url;
	}

	static Create(data: DataStructure.TwitchUser): User {
		return new User(data);
	}
}
