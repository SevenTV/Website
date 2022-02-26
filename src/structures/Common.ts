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
		EMOTE_NAME: /^[-_A-Za-z(!)$:0-9]{2,100}$/,
	};
}
