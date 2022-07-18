export namespace Common {
	export type ListItemAction = "ADD" | "UPDATE" | "REMOVE";

	export interface Image {
		name: string;
		format: Image.Format;
		url: string;
		width: number;
		height: number;
		animated: boolean;
		time: number;
		length: number;
	}

	export namespace Image {
		export enum Format {
			AVIF = "AVIF",
			WEBP = "WEBP",
			GIF = "GIF",
			PNG = "PNG",
		}
	}

	export const RegExp = {
		EMOTE_NAME: /^[-_A-Za-z(!)$+:0-9]{2,100}$/,
	};

	export enum ObjectKind {
		USER = 1,
		EMOTE = 2,
		EMOTE_SET = 3,
		ROLE = 4,
		ENTITLEMENT = 5,
		BAN = 6,
		MESSAGE = 7,
		REPORT = 8,
	}
}

export interface APIError {
	status: string;
	status_code: number;
	error: string;
	error_code: number;
	details: Record<string, string>;
}
