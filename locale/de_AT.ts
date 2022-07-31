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
		loading: "Wird gloden",
		save_changes: "Ändarungan speichan",
		reset: "Zrucksetzn",
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
		emote_created: "{T} is erstöt wordn",
		emote_renamed: "{T} is vo {O} zu {N} umbenannt wordn",
		emote_listing_approved: "{T} froagebn fia öffentliche Listung",
		emote_listing_revoked: "{T} vo da öffentlichn Liste entfeant",
		emote_merged: "{T} zu {0} hinzuagfiagt",
		emote_ownership_transferred: "Bistza vo {T} zu {U} g'ändert",
		emote_restored: "{T} wiedahergstöt",
		emote_updated: "Oagnschaftn vo {T} g'ändert",
		emote_deleted: "{T} g'löscht",
		emote_processed: "Verorbeitung für {T} gstartet",
		emote_version_created: "Version '{VER}' vo {T} erstöt",
		emote_version_renamed: "Version '{VER}' vo {T} is vo {1} zu {2} umbennant wordn",
		emote_version_approved: "Version '{VER}' vo {T} froagebn fia öffentliche Listung",
		emote_version_restored: "Version '{VER}' vo {T} wiedahergstöt",
		emote_version_deleted: "Version '{VER}' vo {T} g'löscht",
		user_created: "{T} is erstöt wordn",
		user_deleted: "{T} is g'löscht wordn",
		user_editor_added: "{U} is als editor hinzugfiagt wordn",
		user_editor_added_other: "{U1} is als editor vo {U2} hinzugfiagt wordn",
		user_editor_removed: "{U}s editor Rechte sein entfeant wordn",
		user_editor_removed_other: "{U1}s editor Rechte fia {U2} sein entfeant wordn",
		user_banned: "{T} is g'bannt wordn",
		user_unbanned: "{T} is entbannt wordn",
		user_updated: "Oagnschaftn vo {T} g'ändert",
		user_sign_in: "{T} hat sich angmeldet",
		user_sign_out: "{T} hat sich ausgloggt",
		user_forbidden: "{T} is da Zugriff auf {0} verwoagert wordn",
		emote_set_created: "{T} is erstöt wordn",
		emote_set_emote_added: "Es Emote {AE} is zu {T} hinzuagfiagt wordn",
		emote_set_emote_removed: "Emote {AE} is vo {T} entfeant wordn",
		emote_set_emote_renamed: "Emote {AE} in {T} is vo {O} zu {N} unbenannt wordn",
		emote_set_updated: "Oagnschaftn vo {T} g'ändert",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Emote hinzuafügn",
		author: "Hinzuagfügt von",
		created_at: "Erstöt am",
		versions: "Versionen",
		preview_loading: "Vorschau wird glodn... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Vorschau hat net gladen werden kennen",
		processing: "Emote wiad verorbeitet - de konn a bissl dauern.",
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
		unlisted: {
			heading: "Achtung!",
			warning: "Des Emote is net öffentlich.",
			warning_flagged: "Des Emote is aus folgenden Gründen privat gscholtn: {FLAG_LIST}",
			notice: "Es kou zu deinem Kanal hinzugefügt wean, aber wir kennan net überprüfn, ob's sicha is, es in am Livestream zu zagn.",
			notice_flagged:
				"Es kou zu deim Kanal hizugfügt wean, aber wia glabn, das es unsicha is, es in am Livestream zu zagn.",
			show_button: "Emote ozeign",
			flag_sexual_content: "Sexuelle oder sexuell anzügliche Inholte",
			flag_epilepsy: "Schnös Blinden / Epilepsiewornung",
			flag_edgy: "Edgy oder gschmocklos",
			flag_twitch_banned: "Verbotn auf Twitch",
		},
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
		label_renamed: "Umgnannt",
		label_conflict: "Konflikt",
		label_default: "Stondart",
		modal: {
			selected_channel_count: "koa Kanal ausgwöt | {0} Kanal ausgwöt | {0} Kanäle ausgwöt",
			create_button: "@:common.object.emote_set erstön",
			rename_in_set: "Umbenennen in {0}",
			context_rename: "Emote-Noman ändern",
			context_set_default: "Als Stondart zuaweisen",
			context_unset_default: "Als Stondart entfernan",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Gruppn",
		channel_emotes: "Kanal Emotes",
		joined_at: "{0} beigetretn",
		editors: "Editorn",
		roles: "Rolln",
		connections: "Kanäle | Kanäle & Accounts",
		new_connections: "Verbind Accounts...",
		no_channel_emotes: "{0} hot koane Emotes auf seim {1} Kanal",
		no_channels: "{0} hot koane Kanäle verbundn!",
		card: {
			view_full_profile: "Des gonze Profil uschaun",
		},
		settings: {
			button: "Profü beorbeitn",
			section_profile: "Profil",
			username: "Benutzanoman",
			display_name: "Onzeigenoman",
			profile_picture: "Profübüd",
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
			report_closed: {
				subject: "Bericht ogschlossn",
				content: `
Herzlichn Donk für die Benochrichtigung, dei Mödung {'#'}{CASE_ID} is bearbeitet gwoan.				`,
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
