import { LocaleMessageDictionary, VueMessageType } from "vue-i18n";

export interface Language extends LocaleMessageDictionary<VueMessageType> {
	// Common / Repeated words and phrases
	common: {
		appName: string;
		appHost: string;
		supportEmail: string;
		learnMore: string;
		more: string;
		retry: string;
		downloads: string;
		features: string;
		comments: string;
		search: string;
		update: string;
		report: string;

		object: {
			user: string;
			emote_set: string;
			emote: string;
		};
	};

	// Text that appears on the home page
	home: {
		slogan: string;
		app_description: string;
		why_app: string;
		download_browser: string;
		download_mobile: string;
		download_misc: string;
		features: {
			emote_sets: {
				name: string;
				detail: string;
			};
			many_emote_slots: {
				name: string;
				detail: string;
			};
			channel_emote_names: {
				name: string;
				detail: string;
			};
			real_time: {
				name: string;
				detail: string;
			};
			emote_versions: {
				name: string;
				detail: string;
			};
			next_gen: {
				name: string;
				detail: string;
			};
			source_available: {
				name: string;
				detail: string;
			};
		};

		socials: {
			discord: string;
			discord_online_count: string;
			twitter: string;
			github: string;
		};
	};

	// Navigation
	nav: {
		home: string;
		about: string;
		emotes: string;
		store: string;
		admin: string;
		sign_in: string;
	};

	// Text that is relevant to emotes
	emote: {
		add: string;
		author: string;
		created_at: string;
		versions: string;
		use: string;
		switch_version: string;
		in_n_sets: string;
		disable: string;
		update: string;
		report: string;
		makePrivate: string;
		makeGlobal: string;
		comments: string;
		channels: string;

		list: {
			searching: string;
			emote_count: string;
			no_emotes_listed: string;
			fetching_slowly: string;
		};

		upload: {
			emote_name: string;
			version_name: string;
			version_description: string;
			submit_emote: string;
			create_emote_version: string;
			image_upload: string;
			accepted_formats: string;
			filetype: string;
			animation: string;
			transparency: string;
			emote_details: string;
			version_details: string;
			attribution: string;
			original_creator: string;
			as_child: string;
			content_moderation: string;
			half_transparency_tooltip: string;
		};
	};

	emote_set: {
		create: string;
		select: string;
		explain: {
			section: string;
			hint: string;
		};
		no_space: string;
		none_selected: string;
		editing: string;
		owner: string;
		owned: string;

		modal: {
			selected_channel_count: string;
			create_button: string;
		};
	};

	// Text that is relevant to users
	user: {
		emote_sets: string;
		channel_emotes: string;
		editors: string;
		roles: string;

		no_channel_emotes: string;
		no_channels: string;

		card: {
			view_full_profile: string;
		};
	};

	store: {};

	// Text that is relating to the reporting system
	reporting: {
		report: string;
		emote_reason: {
			i_made_this: string;
			duplicate: string;
			pornographic: string;
			violence_gore: string;
			i_appear_there: string;
			offensive: string;
			other: string;
		};
		uncategorized_prompt: string;
		details: string;
		success: string;
		notify: string;
		complete_step_one: string;
		abuse_notice: string;
	};

	// Text that is relevant to the inbox
	inbox: {
		inbox: string;
		tabs: {
			all: string;
			unread: string;
			important: string;
		};
		unread_tag: string;

		// System inbox messages
		generic: {
			emote_listed: {
				subject: string;
				content: string;
			};
			emote_not_listed: {
				subject: string;
				content: string;
			};
			emote_ownership_claim_request: {
				subject: string;
				content: string;
			};
			client_banned: {
				subject: string;
				reason: {
					pornographic_content: string;
				};
				content: string;
				effect: {
					no_permissions: string;
					no_auth: string;
					no_ownership: string;
					memory_hole: string;
					ip_blocked: string;
				};
			};
		};
	};

	// 404 Messages
	notFound: {
		troll_despair: string;
		doctor_wtf: string;
		pot_friend: string;
	};
}
