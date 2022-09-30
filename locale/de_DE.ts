export default {
	locale: "Deutsch (Deutschland)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Mehr erfahren",
		more: "Mehr",
		retry: "Wiederholen",
		back: "Zurück",
		download: "Download | Downloads",
		features: "Funktionen",
		comments: "Kommentare",
		search: "Suchen",
		update: "Aktualisieren",
		report: "Melden",
		delete: "Löschen",
		cancel: "Abbrechen",
		submit: "Einreichen",
		activity: "Aktivität",
		loading: "Wird geladen",
		save_changes: "Änderungen speichern",
		reset: "Zurücksetzen",
		object: {
			user: "Benutzer",
			emote_set: "Emote-Gruppe",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Die Emoteplattform für Alle",
		app_description: "Verwalte einfach hunderte Emotes für deinen Twitch- oder YouTube-Kanal",
		why_app: "Warum @:common.appName{'?'}",
		download_browser: "Browser-Erweiterung",
		download_mobile: "Apps für Mobile Geräte",
		download_misc: "Andere Apps",
		features: {
			emote_sets: {
				name: "Emote-Gruppen",
				detail: "Gruppiere Emotes in anpassbare Sammlungen, die mit anderen Benutzern geteilt oder schnell auf deinen Kanal getauscht werden können.",
			},
			many_emote_slots: {
				name: "Hunderte Emote-Slots",
				detail: "Beginne bei {0} Slots, mit einem möglichen Maximum von {1} Emote Slots und das ohne Paywall.",
			},
			channel_emote_names: {
				name: "Kanalspezifische Emote-Namen",
				detail: "Dir gefällt nicht, wie der Ersteller sein Emote genannt hat? Das ist in Ordnung, du kannst den Namen für deinen Kanal ändern.",
			},
			real_time: {
				name: "Echtzeit",
				detail: "Das Ändern von Emotes auf deinem Kanal geschieht sofort - ohne die Seite neuladen zu müssen.",
			},
			emote_versions: {
				name: "Emote-Versionierung",
				detail: "Wechsle zwischen themenbasierten Varianten oder tausche ein Emote durch eine verbesserte Version aus.",
			},
			userbase: {
				name: "Große Community",
				detail: "@:common.appName serves {0}+ daily unique users and has a library of over {1} public emotes",
			},
			next_gen: {
				name: "Next-Generation Bildformate wie WEBP und AVIF",
				detail: "Wir verwenden neuere, optimiertere Bildformate um Bandbreite zu sparen.",
			},
			source_available: {
				name: "Source-Available",
				detail: "Unsere gesamte Codebasis ist mit einer Quell-verfügbaren Lizenz auf GitHub verfügbar. Jeder kann sie betrachten und mitwirken.",
			},
		},
		socials: {
			discord: "Trete @:common.appName auf Discord bei",
			discord_online_count: "{0} sind gerade online",
			twitter: "Folge uns auf Twitter",
			github: "Mitwirken",
		},
		legal: {
			terms: "Nutzungsbedingungen",
			privacy: "Datenschutzerklärung",
			unaffiliated: "@:common.appName is not affiliated with Twitch Interactive",
		},
	},
	// Nav Bar
	nav: {
		home: "Home",
		about: "Info",
		emotes: "Emotes",
		store: "Abonnieren",
		admin: "Admin",
		sign_in: "Anmelden",
		user_search: "Profile suchen",
		locale_contribute: "Translate @:common.appName{'!'}",
		wip_notice: {
			heading: "Willkommen auf der neuen @:common.appName Website",
			text1: "This is an early preview of the next way to experience @:common.appName{'.'}",
			text2: "Explore what's new and give us some feedback! Note it will be undergoing rapid changes and may break frequently.",
		},
	},
	activity: {
		emote_created: "Erstellte {T}",
		emote_renamed: "Renamed {T} from {O} to {N}",
		emote_listing_approved: "Approved {T} for public listing",
		emote_listing_revoked: "Removed {T} from public listing",
		emote_merged: "Merged {T} into {0}",
		emote_ownership_transferred: "Transferred ownership of {T} to {U}",
		emote_restored: "Restored {T}",
		emote_updated: "Changed properties for {T}",
		emote_deleted: "Deleted {T}",
		emote_tags_updated: "Set tags for {T}: {N}",
		emote_processed: "Executed a new processing job for {T}",
		emote_version_created: "Created version '{VER}' for {T}",
		emote_version_renamed: "Renamed version '{VER}' for {T} from {1} to {2}",
		emote_version_approved: "Approved version '{VER}' for {T} for public listing",
		emote_version_restored: "Restored version '{VER}' for {T}",
		emote_version_deleted: "Deleted version '{VER}' for {T}",
		emote_flag_added: "Added flag {FLAG} to {T}",
		emote_flag_removed: "Removed flag {FLAG} from {T}",
		user_created: "Created {T}",
		user_deleted: "Deleted {T}",
		user_editor_added: "Added {U} as an editor",
		user_editor_added_other: "Added {U1} as an editor of {U2}",
		user_editor_updated: "Updated editor privileges for {U}",
		user_editor_updated_other: "Updated editor privileges for {U1}, an editor of {U2}",
		user_editor_removed: "Revoked {U}'s editor privileges",
		user_editor_removed_other: "Revoked {U1}'s editor privileges to {U2}",
		user_banned: "Banned {T}",
		user_unbanned: "Unbanned {T}",
		user_updated: "Changed properties for {T}",
		user_sign_in: "{T} has signed in",
		user_sign_out: "{T} has logged out",
		user_forbidden: "{T} was denied access to {0}",
		emote_set_created: "Created {T}",
		emote_set_emote_added: "Added the emote {AE} to {T}",
		emote_set_emote_removed: "Removed the emote {AE} from {T}",
		emote_set_emote_renamed: "Renamed the emote {AE} from {O} to {N} in {T}",
		emote_set_updated: "Changed properties for {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Emote hinzufügen",
		author: "Hinzugefügt von",
		created_at: "Erstellt am",
		versions: "Versionen",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		processing_failed: "Processing failed: {0}",
		use: "Emote nutzen",
		use_menu: "Add this emote to...",
		switch_version: "Zu dieser Version wechseln",
		in_n_sets: "in {0} Emote-Gruppe | in {0} Emote-Gruppen",
		disable: "Emote deaktivieren",
		properties: "Properties",
		new_version: "New Version",
		report: "Emote melden",
		Privacy: "Privatsphäre",
		comments: "Kommentare",
		channels: "Kanäle",
		common_names: "Other names for this emote",
		usage_stats: "Emote Statistics",
		no_longer_available: "This emote is no longer available",
		tags: "Tags",
		add_tag: "Add Tag",
		trending_rank: "#{0} on Trending",
		avif_no_support:
			"Sorry, {BROWSER} does not support the AVIF format. Try updating to a newer version or try with a different browser.",
		delete_prompt: {
			heading: "Delete {0}",
			heading_versions: "Delete version '{0}' of {1}",
			notice: "Are you sure you want to delete the emote {0}{'?'}",
			notice_versions: "Are you sure you want to delete the version '{0}' from {1}{'?'}",
			reason: "Reason for deletion",
		},
		properties_prompt: {
			heading: "Edit {0}",
		},
		unlisted: {
			heading: "Heads up!",
			warning: "This emote is not publicly listed.",
			warning_flagged: "This emote has been unlisted for the following reasons: {FLAG_LIST}",
			notice: "It can be added to your channel, but we cannot verify if it is safe to show on a livestream.",
			notice_flagged: "It can be added to your channel, however we believe it is unsafe to show on a livestream.",
			show_button: "Show Emote",
			flag_sexual_content: "Sexual or sexually suggestive content",
			flag_epilepsy: "Rapid flashing / seizure-inducing",
			flag_edgy: "Edgy or distasteful",
			flag_twitch_banned: "Disallowed on Twitch",
		},
		list: {
			searching: "Suche",
			emote_count: "{0} Emotes",
			no_emotes_listed: "Keine Emotes gefunden",
			fetching_slowly: "Entschuldigung, es scheint so als würde dies eine Weile dauern",
			category: {
				name: "Category",
				top: "Top",
				trending: "Trending",
				featured: "Featured",
				global: "Global",
				new: "New",
			},
			filters: {
				case_sensitive: "Case Sensitive",
				exact_match: "Exact Match",
				ignore_tags: "Ignore Tags",
			},
		},
		upload: {
			emote_name: "Emote-Name",
			version_name: "Versionsname",
			version_description: "Versionsbeschreibung",
			submit_emote: "Emote einreichen",
			create_emote_version: "Emote-Version erstellen",
			image_upload: "Bild hochladen",
			accepted_formats: "Akzeptierte Formate",
			filetype: "Datei",
			animation: "Animation",
			transparency: "Transparenz",
			emote_details: "Emote-Details",
			version_details: "Versionsangaben",
			attribution: "Zuschreibung",
			original_creator: "Ursprünglicher Ersteller",
			as_child: "Du erstellst eine {IS_DIVERGED} Version von {0}. ",
			content_moderation: "Inhalts-Moderation",
			half_transparency_tooltip:
				"Pixel können nur vollständig transparent oder deckend sein (keine variable Transparenz)",
		},
	},
	emote_set: {
		create: "Neues @:common.object.emote_set",
		select: "@:common.object.emote_set auswählen",
		explain: {
			section: "What are Emote Sets?",
			hint: "Emote-Gruppen sind Sammlungen von Emotes, die an deine Kanäle gebunden oder mit anderen Benutzern geteilt werden können.",
		},
		no_space: "Alle Emote-Slots belegt",
		none_selected: "Keine Gruppe ausgewählt",
		editing: "Bearbeite {0}",
		owner: "Emote-Gruppe von {USER}",
		owned: "Deine Emote-Gruppe",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		label_actor: "Enabled by {0}",
		// "enabled by <display_name of actor>"
		context_emote_add: "Add to {SET_NAME}",
		context_emote_remove: "Remove from {SET_NAME}",
		modal: {
			selected_channel_count: "kein Kanal ausgewählt | {0} Kanal ausgewählt | {0} Kanäle ausgewählt",
			create_button: "@:common.object.emote_set erstellen",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote-Gruppen",
		channel_emotes: "Kanal-Emotes",
		joined_at: "Joined {0}",
		editors: "Editoren",
		roles: "Rollen",
		connections: "Channels | Channels & Accounts",
		new_connections: "Link accounts...",
		add_editor: "Add Editor",
		editor_modal_heading: "Modify {0}'s Editors",
		editor_modal_user_search: "Who would you like to add as an editor?",
		editor_modal_user_update: "Editor",
		no_channel_emotes: "{0} hat keine Emotes auf {1}",
		no_channels: "{0} hat keine Kanäle verbunden!",
		card: {
			view_full_profile: "Ganzes Profil anzeigen",
		},
		settings: {
			button: "Edit Profile",
			section_profile: "Profile",
			username: "Username",
			display_name: "Display Name",
			profile_picture: "Profile Picture",
			section_badges: "Badges",
			section_paints: "Paints",
			no_badges: "You do not own any badges",
			no_paints: "You do not own any paints",
			sign_out: "Sign Out",
			cosmetics_updated: "Cosmetics Updated",
			cosmetics_updated_message: "It may take between 10 to 30 minutes for your changes to appear in chat.",
		},
		editor_permissions: {
			modify_emotes: "Modify Channel Emotes",
			use_private_emotes: "Use Private Emotes",
			manage_profile: "Manage Profile",
			manage_owned_emotes: "Manage Owned Emotes",
			manage_emote_sets: "Manage Emote Sets",
			manage_billing: "Manage Billing",
			manage_editors: "Manage Editors",
			view_messages: "View Messages",
		},
	},
	store: {
		subscribe_cta: "Become a @:common.appName Subscriber!",
		subscribed: "Thank you for subscribing",
		button_self: "Subscribe",
		button_gift: "Gift a sub",
		billing_information_heading: "Billing Information",
		payment_information_heading: "Payment Information",
		payment_gift_heading: "Select the recipient for this gift",
		payment_methods: "Payment Methods",
		payment_methods_hint: "Choose a payment method",
		payment_method_paypal: "PayPal",
		payment_method_stripe: "Credit Card",
		payment_popup_cta: "Complete the transaction in the new window",
		pay_button: "Pay via {0}",
		product_type_subscription: "Subscription",
		purchase_success: {
			heading: "Purchase Successful",
			text1: "We've received your payment and your subscription has been activated.",
			text2: "Thank you for your support! If you have any questions, please contact us via the methods provided on this page.",
		},
		sub: {
			incentive: "You'll get...",
			creator_tier: "Extras for creators",
			creator_tier_desc: "Upgrade to the Creator tier and get extra coolness for your channel",
			feature_t1_badge: "Subscriber Badge",
			feature_t1_paints: "Nametag Paints",
			feature_t1_animated_profile_picture: "Animated Profile Picture",
			feature_t1_zero_width: "Zero Width Emotes",
			feature_t1_global_raffle: "Global Emote Raffle Ticket",
			feature_t1_personal_emotes: "Personal Emotes",
			feature_t2_animated_profile_banner: "Animated Profile Banner",
			feature_t2_animated_offline_screen: "Animated Offline Screen",
			feature_t2_extended_sub_emotes: "Extended Sub Emotes",
			current_plan: "Your Plan",
			cancel: "Do Not Renew",
			update_payment: "Update Payment Method",
			reactivate: "Reactivate Subscription",
			cancel_prompt: "Are you sure you want to cancel your subscription?",
			state_heading: "Your Subscription",
			state_badge_progress: "Badge Progress",
			state_paints: "Paints",
			state_anniversary:
				"Your Sub anniversary is today | Your next anniversary is in {0} day | Your next Sub anniversary is in {0} days",
			state_age:
				"You subscribed today | You've been subscribed for {0} day | You've been subscribed for {0} days",
			state_ending: "Your sub ends today | Your sub ends in {0} day | Your sub ends in {0} days",
			state_collection_heading: "Collection",
			state_paints_heading: "Unlocked Paints ({0})",
			state_raffle: "Global Emote Raffle",
			state_leaderboards: "Top Gifters",
			raffle: {
				starts_at: "{0} days",
				starts_at_hint: "The next sub raffle begins on {0}",
			},
		},
	},
	// Text that is relating to the reporting system
	reporting: {
		report: "Melden",
		emote_reason: {
			i_made_this: "Ich habe dieses Emote erstellt, aber es wurde von jemand anderem hochgeladen",
			duplicate: "Dieses Emote ist ein Duplikat",
			pornographic: "Dieses Emote enthält pornographische oder übersexualisierte Inhalte",
			violence_gore: "Dieses Emote zeigt extreme Gewalt oder verstörende Inhalte",
			i_appear_there: "Dieses Emote zeigt mich und ich möchte das nicht",
			offensive: "Ich finde dieses Emote offensiv",
			other: "Etwas anderes",
		},
		uncategorized_prompt: "Wo liegt das Problem?",
		details: "Details (zusätzliche Informationen oder Beweise für den Grund deiner Meldung)",
		success: "Meldung erfolgreich eingereicht",
		notify: "Du wirst per Posteingang benachrichtigt, sobald deine Meldung bearbeitet wurde oder weitere Informationen benötigt werden.",
		complete_step_one: "Weiter",
		abuse_notice: "Der Missbrauch der Meldefunktion kann dazu führen, dass du den Zugriff darauf verlierst.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Posteingang",
		tabs: {
			all: "Alle Nachrichten",
			unread: "Ungelesen",
			important: "Wichtig",
		},
		unread_tag: "Ungelesen",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote zur Listung freigegeben",
				content: `
# Dein Emote "{EMOTE_NAME}" wurde zur Listung freigegeben \n
Es ist jetzt im Emote-Verzeichnis verfügbar und wird auf @:common.appHost erscheinen.
`,
			},
			emote_not_listed: {
				subject: "Emote nicht zur Listung freigeschaltet",
				content: `
# Dein Emote "{EMOTE_NAME}" wurde abgelehnt
Es wird nicht in der öffentlichen Emote Bibliothek verfügbar oder auf @:common.appHost sichtbar sein,
jedoch bleibt es verfügbar für Nutzer mit direktem Link.
`,
			},
			emote_ownership_claim_request: {
				subject: "Einladung, das Eigentum an einem Emote zu beanspruchen",
				content: `
## {OWNER_DISPLAY_NAME} möchte, dass du der Besitzer von '{EMOTE_NAME}' wirst

[Emote Anzeigen]({EMOTE_URL})

**[Anfrage Akzeptieren]({EMOTE_CLAIM_URL})** | [Anfrage Ablehnen]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Du wurdest gebannt",
				reason: {
					pornographic_content: "",
				},
				content: `
# Account gesperrt
Dein Zugriff zu @:common.appName ist nun eingeschränkt.<br/><br/>
### Einschränkungsgrund
{BAN_REASON} <br/><br/>
### Einschränkungen<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Diese Entscheidung entfällt **{BAN_EXPIRE_AT}**.
_Falls du der Meinung bist, dass dies ist ein Fehler ist, kontaktiere bitte @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Du darfst die App nicht länger benutzen",
					no_auth: "* Du darfst dich nicht mehr anmelden",
					no_ownership: "* Alle von dir erstellten Inhalte werden nicht mehr verfügbar sein",
					memory_hole: "* Du wirst für andere Nutzer nicht mehr sichtbar sein",
					ip_blocked: "* Deine IP ist von allen @:common.appName Diensten blockiert",
				},
			},
			report_closed: {
				subject: "Report closed",
				content: `
Thank you for notifying us, your report {'#'}{CASE_ID} has been handled.
				`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Wir konnten dies nicht finden",
		doctor_wtf: "Was zur Hölle ist das?",
		pot_friend: "Ich bin ein Topf, Freund",
	},
};
