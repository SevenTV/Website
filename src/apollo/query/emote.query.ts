import { Emote } from "@/structures/Emote";
import gql from "graphql-tag";

export const emoteForEmotePageQuery = gql`
	query Emote($id: ObjectID!) {
		emote(id: $id) {
			id
			created_at
			name
			lifecycle
			states
			trending
			tags
			owner {
				id
				username
				display_name
				avatar_url
				style {
					color
					paint_id
				}
			}
			flags
			host {
				...HostFragment
			}
			versions {
				id
				name
				description
				created_at
				lifecycle
				states
				host {
					...HostFragment
				}
			}
			animated
		}
	}

	fragment HostFragment on ImageHost {
		url
		files {
			name
			format
			width
			height
			size
		}
	}
`;

export namespace emoteForEmotePageQuery {
	export interface Result {
		emote: Emote;
	}
	export interface Variables {
		id: string;
	}
}

export const emoteActivityQuery = gql`
	query GetEmoteActivity($id: ObjectID!, $limit: Int) {
		emote(id: $id) {
			id
			activity(limit: $limit) {
				id
				kind
				created_at
				target_id
				target_kind
				actor {
					id
					username
					display_name
					style {
						color
					}
					avatar_url
				}
				changes {
					format
					key
					value
					array_value {
						added
						updated
						removed
					}
				}
			}
		}
	}
`;

export namespace emoteActivityQuery {
	export interface Result {
		emote: Emote;
	}
	export interface Variables {
		id: string;
		limit?: number;
	}
}

export const emoteChannelsQuery = gql`
	query GetEmoteChannels($id: ObjectID!, $page: Int, $limit: Int) {
		emote(id: $id) {
			id
			channels(page: $page, limit: $limit) {
				total
				items {
					id
					username
					display_name
					avatar_url
					style {
						color
						paint_id
					}
				}
			}
		}
	}
`;

export namespace emoteChannelsQuery {
	export interface Result {
		emote: Emote;
	}
	export interface Variables {
		id: string;
		page?: number;
		limit?: number;
	}
}

export const GetEmote = gql`
	query Emote($id: ObjectID!) {
		emote(id: $id) {
			id
			created_at
			name
			lifecycle
			states
			trending
			tags
			owner {
				id
				username
				display_name
				avatar_url
				style {
					color
					paint_id
				}
			}
			flags
			host {
				url
			}
			versions {
				id
				name
				description
				created_at
				lifecycle
				states
				host {
					url
					files {
						name
						format
						width
						height
						size
					}
				}
			}
			animated
		}
	}
`;

export const GetEmotes = gql`
	query EmotesByID($list: [ObjectID!]!, $formats: [ImageFormat!]) {
		emotesByID(list: $list) {
			id
			name
			flags
			states
			tags
			owner {
				id
				display_name
				style {
					color
				}
			}
			host {
				url
				files(formats: $formats) {
					name
					format
					width
					height
					size
				}
			}
		}
	}
`;

export const GetEmoteStatistics = gql`
	query GetEmoteStatistics($id: ObjectID!) {
		emote(id: $id) {
			id
			common_names {
				name
				count
			}
		}
	}
`;
export const GetMinimalEmote = gql`
	query GetMinimalEmote($id: ObjectID!, $formats: [ImageFormat!]) {
		emote(id: $id) {
			id
			name
			host {
				url
				files(formats: $formats) {
					name
					format
				}
			}
		}
	}
`;

export interface GetEmote {
	emote: Emote;
}
