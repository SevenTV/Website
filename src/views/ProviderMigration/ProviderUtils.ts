import { ImageFormat } from "@/structures/Common";
import type { Emote } from "@/structures/Emote";

const provider1HostBase = "aHR0cHM6Ly9jZG4uYmV0dGVydHR2Lm5ldA==";

export function transformProvider1(data: Provider1Emote): Emote {
	return {
		id: data.id,
		name: data.code,
		host: {
			url: `${window.atob(provider1HostBase)}/emote/${data.id}`,
			files: [
				{
					name: "1x",
					format: ImageFormat.GIF,
				},
			],
		},
	} as Emote;
}

export interface Provider1Emote {
	id: string;
	code: string;
	imageType: string;
	images?: {
		"1x": string;
		"2x": string;
		"4x": string;
	};
	user: {
		id: string;
		name: string;
		displayName: string;
		providerId: string;
	} | null;
	userId: string;
}
