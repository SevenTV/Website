export default {
	locale: "Deitsch (Österreich)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Lean mea",
		more: "Mea",
		retry: "Nuamoi vasuachn",
		downloads: "Downloads",
		features: "Funktionen",
		comments: "Kommentare",
		search: "Suach",
		update: "Update",
		report: "Mödn",
		activity: "Aktivität",
		loading: "Loading",
		object: {
			user: "Benutza",
			emote_set: "Emote Gruppn",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "A plattform fia olle",
		app_description: "Veawoit hundert vo Emotes auf deine Youtube und Twitch Kanälen mit Oafachkeit",
		why_app: "Warum @:common.appName{'?'}",
		download_browser: "Browsa Erwoatarung",
		download_mobile: "Apps fias Handy",
		download_misc: "Ondere Apps",
		features: {
			emote_sets: {
				name: "Emote Gruppn",
				detail: "Gruppia Emotes in anpassboare Gruppn, dia mia ondern leicht getoalt werden kennen oda auf dein Kanal g'tauscht werden kennen.",
			},
			many_emote_slots: {
				name: "Hunderte vo Emote Plätz",
				detail: "Stoat mit {0} slots, am maximum vo {1} und des ois gratis.",
			},
			channel_emote_names: {
				name: "Channel sp'zifische Namen",
				detail: "Gfoid da da Nome vo am Emote nit? Koa problem, du kustn oafach füa nur dein Kanal ändern.",
			},
			real_time: {
				name: "Echtzeit",
				detail: "Emotes ändern sich vo söber füa alle Zuschaua. Brauchsch koa f5.",
			},
			emote_versions: {
				name: "Emote-Versionen",
				detail: "Tausch zwischn themenbasiatn Variantn, oda Lad a bessare Version vo am Emote hoch.",
			},
			next_gen: {
				name: "Büdvormate vo da nagsten Genaration, wia WEBP und AVIF",
				detail: "Wia benutzn nei're und besser optimierbare Büdvormate, um Bondbreit' z'spoan.",
			},
			source_available: {
				name: "Quö öffentlich sichtboa",
				detail: "Insrige gonze Codebase is auf GitHub verfügbor mit oana Source-verfiagbaren Lizenz. Jeda konns sich anschaun und mithöfen.",
			},
		},
		socials: {
			discord: "Treat @:common.appName auf Discord bei",
			discord_online_count: "{0} sein grad online",
			twitter: "Foig ins auf Twitter",
			github: "Hüf mit",
		},
	},
	// Nav Bar
	nav: {
		home: "Home",
		about: "Üba",
		emotes: "Emotes",
		store: "Abonniern",
		admin: "Admin",
		sign_in: "Einloggn",
		wip_notice: {
			heading: "Griaß eich auf der neien @:common.appName Website",
			text1: "Des is a ersta Vorgschmock auf die neiaste Oat @:common.appName{'.'} zu nutzn",
			text2: "Entdeck, wos Neies gibt und giab uns a Rückmödung. Bitte beocht, dass sie die Website oft verändert wiad und es zua regelmäßigen Unterbrechungen kumman kennt.",
		},
	},
	activity: {
		emote_created: "Created {T}",
		emote_renamed: "{ICO} Renamed {T} from {O} to {N}",
		emote_listing_approved: "Approved {T} for public listing",
		emote_listing_revoked: "Removed {T} from public listing",
		emote_merged: "Merged {T} into {0}",
		emote_ownership_transferred: "Transferred ownership of {T} to {U}",
		emote_restored: "Restored {T}",
		emote_updated: "Changed properties for {T}",
		emote_deleted: "Deleted {T}",
		emote_version_created: "Created version '{VER}' for {T}",
		emote_version_renamed: "Renamed version '{VER}' for {T} from {1} to {2}",
		emote_version_approved: "Approved version '{VER}' for {T} for public listing",
		emote_version_restored: "Restored version '{VER}' for {T}",
		emote_version_deleted: "Deleted version '{VER}' for {T}",
		user_created: "Created {T}",
		user_deleted: "Deleted {T}",
		user_editor_added: "Added {T} as an editor",
		user_editor_added_other: "Added {U1} as an editor of {U2}",
		user_editor_removed: "Removed {U} as an editor",
		user_editor_removed_other: "Removed {U1} as an editor of {U2}",
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
		add: "Emote hinzuafügn",
		author: "Hinzuagfügt von",
		created_at: "Erstöt am",
		versions: "Versionen",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Emote benutzn",
		switch_version: "Zu der Version wechsln",
		in_n_sets: "in {0} Gruppn | in {0} Gruppn",
		disable: "Emote deaktiviern",
		update: "Aktuoisian",
		report: "Emote mödn",
		makePrivate: "Privat mochn",
		makeGlobal: "Öffentlich machn",
		comments: "Kommentor",
		channels: "Kanäle",
		common_names: "Ondre Noman fia des Emote",
		usage_stats: "Emote-Statistik",
		list: {
			searching: "Suacht",
			emote_count: "{0} Emotes",
			no_emotes_listed: "Koane Emotes gfunden",
			fetching_slowly: "Tschuldige, es dauert a bissl",
		},
		upload: {
			emote_name: "Emote Name",
			version_name: "Version Name",
			version_description: "Version Beschreibung",
			submit_emote: "Emote eireichn",
			create_emote_version: "Neie Emote Version erstön",
			image_upload: "Bildl hochlodn",
			accepted_formats: "Erlaubte Formate",
			filetype: "Datei",
			animation: "Animation",
			transparency: "Transparenz",
			emote_details: "Emote Details",
			version_details: "Version Details",
			attribution: "Aufteilung",
			original_creator: "Original-Erzeuga",
			as_child: "Du erstöst a {IS_DIVERGED} version vo {0}. ",
			content_moderation: "Inholt wead gepriaft",
			half_transparency_tooltip:
				"Pixel kennen lei voll transparent oder komplett unduachsichtig sei (koa variable Transparenz)",
		},
	},
	emote_set: {
		create: "Neies @:common.object.emote_set",
		select: "@:common.object.emote_set auswön",
		explain: {
			section: "Wos san @:common.object.emote_set{'s'}?",
			hint: "Emote Gruppn sein auf an Packl g'haute Emotes die du an dein Kanal bindn, oder mit ondern Benutzan teiln konnst.",
		},
		no_space: "Oi Plätz san voi",
		none_selected: "Koa Gruppn Ausgwöd",
		editing: "{0} wiad beorbeitet",
		owner: "{USER}'s Emote Gruppn",
		owned: "Dei Emote Gruppn",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "koa Kanal ausgwöt | {0} Kanal ausgwöt | {0} Kanäle ausgwöt",
			create_button: "@:common.object.emote_set erstön",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Gruppn",
		channel_emotes: "Kanal Emotes",
		editors: "Editorn",
		roles: "Rolln",
		no_channel_emotes: "{0} hot koane Emotes auf seim {1} Kanal",
		no_channels: "{0} hot koane Kanäle verbundn!",
		card: {
			view_full_profile: "Des gonze Profil uschaun",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Mödn",
		emote_reason: {
			i_made_this: "I hu des Emote g'mocht, owa jemand andres hods aufeglodn",
			duplicate: "Des Emote gibts zwoa moi",
			pornographic: "Des Emote hat pornographische oder übersexualisierte Inhoite",
			violence_gore: "Des Emote zoagt extreme Gwalt oda Bluat",
			i_appear_there: "I bin in dem Büd und des gfoit ma net",
			offensive: "I find des Emote b'leidigend",
			other: "Wos ondares",
		},
		uncategorized_prompt: "Wo liegt's Problem?",
		details: "Details (mehr Infos oda Beweise für dei Meldung)",
		success: "Dei Meldung wurd eingereicht",
		notify: "Du griagst a Nochricht soboid dei Meldung durch is oda wia mehr Infos brauchn.",
		complete_step_one: "Weita",
		abuse_notice: "Da Missbrauch vom Meldesystem konn dazua fian, dass du koan Zuagriff mehr drau griagscht.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Postkastl",
		tabs: {
			all: "Olle Nachrichtn",
			unread: "Unglesn",
			important: "Wichtig",
		},
		unread_tag: "Unglesn",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote is freigebn wordn zum Listen",
				content: `
# Dei Emote "{EMOTE_NAME}" is freigebn wordn yum Listen \n
Es is jetz verfiagbar im Emote Katalog und wird auf @:common.appHost{'.'} erschoanen
`,
			},
			emote_not_listed: {
				subject: "Emote is net freigebn zum Listn",
				content: `
# Dei Emote "{EMOTE_NAME}" is obglehnt wordn
Es wird net im Emote Katalog verfiagbar sei oda auf @:common.appHost erschainen,
oba Leit mit'm Link kennans no findn.
`,
			},
			emote_ownership_claim_request: {
				subject: "Einladung um zum Besitza vu am Emote z'werdn",
				content: `
## {OWNER_DISPLAY_NAME} Wü, dass du da Besitza vo '{EMOTE_NAME}' wiast

[Emote Anschaun]({EMOTE_URL})

**[Anfrag Annehma]({EMOTE_CLAIM_URL})** | [Anfrag Ablehna]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Du bisch g'bannt wordn",
				reason: {
					pornographic_content: "",
				},
				content: `
# Account g'bannt
Dei zuagriff auf @:common.appName is jetz begrenzt<br/><br/>
### Grund füa die Aktion
{BAN_REASON} <br/><br/>
### Oaschrenkungen<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Der ban lauft aus **{BAN_EXPIRE_AT}**.
_Wenn du glaubsch, dass des a fehler is, email @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Du derfsch net länger mit da App interagiern",
					no_auth: "* Du derfsch di nimma einloggen",
					no_ownership: "* Alle Sachn die du erstöd hasch, sein nimma verfügboa",
					memory_hole: "* Du wiasch füa ondere Benutzer nimma uzoag",
					ip_blocked: "* Dei Ip is vo allen @:common.appName services g'blockt",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Wia haben's net findn kenna",
		doctor_wtf: "Wos isn des?",
		pot_friend: "I bin a Topf, Freind",
	},
};
