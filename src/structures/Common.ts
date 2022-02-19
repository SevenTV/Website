export namespace Common {
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
}
