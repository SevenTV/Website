import type { Language } from "../type";

export const fr_FR: Language = {
	// Mots et phrases communes ou souvent répété
	common: {
		appHost: "", // TODO
		appName: "", // TODO
		comments: "", // TODO
		features: "", // TODO
		more: "", // TODO
		object: {
			emote: "", // TODO
			emote_set: "", // TODO
			user: "", // TODO
		},
		report: "", // TODO
		retry: "", // TODO
		search: "", // TODO
		supportEmail: "", // TODO
		update: "", // TODO
		learnMore: "En savoir plus",
		downloads: "Téléchargements",
	},

	// Texte qui apparait sur la page d'acceuil
	home: {
		download_browser: "", // TODO
		download_misc: "", // TODO
		download_mobile: "", // TODO
		features: {
			channel_emote_names: {
				name: "", // TODO
				detail: "", // TODO
			},
			emote_sets: {
				name: "", // TODO
				detail: "", // TODO
			},
			emote_versions: {
				name: "", // TODO
				detail: "", // TODO
			},
			many_emote_slots: {
				name: "", // TODO
				detail: "", // TODO
			},
			next_gen: {
				name: "", // TODO
				detail: "", // TODO
			},
			real_time: {
				name: "", // TODO
				detail: "", // TODO
			},
			source_available: {
				name: "", // TODO
				detail: "", // TODO
			},
		},
		socials: {
			discord: "", // TODO
			discord_online_count: "", // TODO
			github: "", // TODO
			twitter: "", // TODO
		},
		why_app: "", // TODO
		slogan: "C'est une troisième partie",
		app_description: "A new emote service and extension for Twitch",
	},

	// Navigation
	nav: {
		home: "Accueil",
		about: "Info",
		emotes: "Emotes",
		store: "Souscrire",
		admin: "Admin",
		sign_in: "Se connecter",
	},

	// Texte qui concernes les emotes
	emote: {
		author: "Autheur",
		versions: "Versions",
		add: "", // TODO
		created_at: "", // TODO
		disable: "", // TODO
		in_n_sets: "", // TODO
		list: {
			emote_count: "", // TODO
			fetching_slowly: "", // TODO
			no_emotes_listed: "", // TODO
			searching: "", // TODO
		},
		switch_version: "", // TODO
		upload: {
			accepted_formats: "", // TODO
			animation: "", // TODO
			as_child: "", // TODO
			attribution: "", // TODO
			content_moderation: "", // TODO
			create_emote_version: "", // TODO
			emote_details: "", // TODO
			emote_name: "", // TODO
			filetype: "", // TODO
			half_transparency_tooltip: "", // TODO
			image_upload: "", // TODO
			original_creator: "", // TODO
			submit_emote: "", // TODO
			transparency: "", // TODO
			version_description: "", // TODO
			version_details: "", // TODO
			version_name: "", // TODO
		},
		use: "", // TODO
		update: "Metre a jour l'emote",
		report: "Signaler l'emote",
		makePrivate: "Rendre privé",
		makeGlobal: "Rendre global",
		comments: "Commentaires",
		channels: "Chaines",
	},

	// Texte qui concernes les utilisateurs
	user: {
		channel_emotes: "Emotes sur la chaine",
		editors: "Editeurs",
		card: {
			view_full_profile: "", // TODO
		},
		emote_sets: "", // TODO
		no_channel_emotes: "", // TODO
		no_channels: "", // TODO
		roles: "", // TODO
	},

	store: {},

	// Text that is relating to the reporting system
	reporting: {
		report: "Signaler",
		emote_reason: {
			i_made_this: "I made this emote but it was uploaded by someone else",
			duplicate: "This emote is a duplicate",
			pornographic: "This emote contains pornographic or overly sexualized imagery",
			violence_gore: "This emote displays extreme violence or gore",
			i_appear_there: "This emote depicts me and I don't like it",
			offensive: "I find this emote offensive",
			other: "Something else",
		},
		details: "", // TODO
		notify: "", // TODO
		success: "", // TODO
		uncategorized_prompt: "", // TODO
		complete_step_one: "", // TODO
		abuse_notice: "Abuse of the report feature may lead to your access being revoked.",
	},

	// Messages pour erreur 404
	notFound: {
		pot_friend: "", // TODO
		troll_despair: "Nous n'avons pas trouvé la page",
		doctor_wtf: "C'est quoi c'bordel?",
	},
	emote_set: {
		create: "", // TODO
		editing: "", // TODO
		explain: {
			hint: "", // TODO
			section: "", // TODO
		},
		modal: {
			create_button: "", // TODO
			selected_channel_count: "", // TODO
		},
		no_space: "", // TODO
		none_selected: "", // TODO
		owned: "", // TODO
		owner: "", // TODO
		select: "", // TODO
	},
	inbox: {
		generic: {
			client_banned: {
				content: "", // TODO
				effect: {
					ip_blocked: "", // TODO
					memory_hole: "", // TODO
					no_auth: "", // TODO
					no_ownership: "", // TODO
					no_permissions: "", // TODO
				},
				reason: {
					pornographic_content: "", // TODO
				},
				subject: "", // TODO
			},
			emote_listed: {
				content: "", // TODO
				subject: "", // TODO
			},
			emote_not_listed: {
				content: "", // TODO
				subject: "", // TODO
			},
			emote_ownership_claim_request: {
				content: "", // TODO
				subject: "", // TODO
			},
		},
		inbox: "", // TODO
		tabs: {
			all: "", // TODO
			important: "", // TODO
			unread: "", // TODO
		},
		unread_tag: "", // TODO
	},
};
