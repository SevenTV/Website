export enum ImageFormat {
	AVIF = "AVIF",
	WEBP = "WEBP",
	GIF = "GIF",
	PNG = "PNG",
}

export interface ImageFile {
	name: string;
	format: ImageFormat;
	width: number;
	height: number;
	animated: boolean;
	time: number;
	size: number;
}

export interface ImageHost {
	url: string;
	files: ImageFile[];
}

export function getImage(host: ImageHost, format: ImageFormat, size: number): Partial<ImageFile> & { url: string } {
	if (!host) return { url: "" };

	const file = host.files.filter((fi) => fi.format === format)[size - 1];
	if (!file) {
		return { url: "" };
	}

	return {
		...file,
		url: `${host.url}/${file.name}`,
	};
}

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

export type ListItemAction = "ADD" | "UPDATE" | "REMOVE";

export const RegExp = {
	EMOTE_NAME: /^[-_A-Za-z(!?&)$+:0-9]{2,100}$/,
	EMOTE_SET_NAME: /^[a-zA-Z0-9&'_-~# ]{1,40}$/,
};

export interface APIError {
	status: string;
	status_code: number;
	error: string;
	error_code: number;
	details: Record<string, string>;
}

export function humanByteSize(size: number, decimals = 1): string {
	const sizes = ["B", "KB", "MB", "GB", "TB"];
	if (size == 0) return "0B";

	const i = parseInt(Math.floor(Math.log(size) / Math.log(1024)).toString());
	return (size / Math.pow(1024, i)).toFixed(i < 2 ? 0 : decimals) + sizes[i];
}
