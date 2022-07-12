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
		downloads: "Downloads",
		features: "Funktionen",
		comments: "Kommentare",
		search: "Suchen",
		update: "Aktualisieren",
		report: "Melden",
		activity: "Activity",
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
				name: "In Echtzeit",
				detail: "Das Ändern von Emotes auf deinem Kanal geschieht sofort - ohne die Seite neuladen zu müssen.",
			},
			emote_versions: {
				name: "Emote-Versionierung",
				detail: "Wechsle zwischen themenbasierten Varianten oder tausche ein Emote durch eine verbesserte Version aus.",
			},
			next_gen: {
				name: "Next-Generation Bildformate wie WEBP und AVIF",
				detail: "Wir verwenden neuere, optimiertere Bildformate um Bandbreite zu sparen.",
			},
			source_available: {
				name: "Quelle öffentlich einsehbar",
				detail: "Unsere gesamte Codebasis ist mit einer Quell-verfügbaren Lizenz auf GitHub verfügbar. Jeder kann sie betrachten und mitwirken.",
			},
		},
		socials: {
			discord: "Trete @:common.appName auf Discord bei",
			discord_online_count: "{0} sind gerade online",
			twitter: "Folge uns auf Twitter",
			github: "Mitwirken",
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
	},
	// Text that is relevant to emotes
	emote: {
		add: "Emote hinzufügen",
		author: "Hinzugefügt von",
		created_at: "Erstellt am",
		versions: "Versionen",
		use: "Emote nutzen",
		switch_version: "Zu dieser Version wechseln",
		in_n_sets: "in {0} Emote-Gruppe | in {0} Emote-Gruppen",
		disable: "Emote deaktivieren",
		update: "Aktualisieren",
		report: "Emote melden",
		makePrivate: "Privat stellen",
		makeGlobal: "Make Global",
		comments: "Kommentare",
		channels: "Kanäle",
		common_names: "Other names for this emote",
		usage_stats: "Emote Statistics",
		list: {
			searching: "Suche",
			emote_count: "{0} Emotes",
			no_emotes_listed: "Keine Emotes gefunden",
			fetching_slowly: "Entschuldigung, es scheint so als würde dies eine Weile dauern",
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
			section: "Was sind @:common.object.emote_set{'s'}?",
			hint: "Emote-Gruppen sind Sammlungen von Emotes, die an deine Kanäle gebunden oder mit anderen Benutzern geteilt werden können.",
		},
		no_space: "Alle Emote-Slots belegt",
		none_selected: "Keine Gruppe ausgewählt",
		editing: "Bearbeite {0}",
		owner: "Emote-Gruppe von {USER}",
		owned: "Deine Emote-Gruppe",
		modal: {
			selected_channel_count: "kein Kanal ausgewählt | {0} Kanal ausgewählt | {0} Kanäle ausgewählt",
			create_button: "@:common.object.emote_set erstellen",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote-Gruppen",
		channel_emotes: "Kanal-Emotes",
		editors: "Editoren",
		roles: "Rollen",
		no_channel_emotes: "{0} hat keine Emotes auf {1}",
		no_channels: "{0} hat keine Kanäle verbunden!",
		card: {
			view_full_profile: "Ganzes Profil anzeigen",
		},
	},
	store: {},
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
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Wir konnten dies nicht finden",
		doctor_wtf: "Was zur Hölle ist das?",
		pot_friend: "Ich bin ein Topf, Freund",
	},
};
