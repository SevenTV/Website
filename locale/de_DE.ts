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
		wip_notice: {
			heading: "Willkommen auf der neuen @:common.appName Website",
			text1: "Dies ist ein erster Vorgeschmack auf die neuste Art, @:common.appName{'.'} zu nutzen",
			text2: "Entdecke die Neuheiten und gib uns dein Feedback! Bitte beachte, dass sich die Website oft verändern wird und es zu regelmäßigen Unterbrechungen kommen kann.",
		},
	},
	activity: {
		emote_created: "{T} erstellt",
		emote_renamed: "{T} von {O} in {N} umbenannt",
		emote_listing_approved: "{T} für öffentliche Auflistung freigegeben",
		emote_listing_revoked: "{T} aus der öffentlichen Liste entfernt",
		emote_merged: "{T} zu {0} zusammengeführt",
		emote_ownership_transferred: "Eigentum von {T} an {U} übertragen",
		emote_restored: "{T} wiederhergestellt",
		emote_updated: "Eigenschaften für {T} geändert",
		emote_deleted: "{T} gelöscht",
		emote_version_created: "Version '{VER}' für {T} erstellt",
		emote_version_renamed: "Version '{VER}' für {T} von {1} in {2} umbenannt",
		emote_version_approved: "Version '{VER}' für {T} ist für die öffentliche Auflistung genehmigt",
		emote_version_restored: "Version '{VER}' für {T} wiederhergestellt",
		emote_version_deleted: "Version '{VER}' für {T} gelöscht",
		user_created: "{T} erstellt",
		user_deleted: "{T} gelöscht",
		user_editor_added: "{U} als Editor hinzugefügt",
		user_editor_added_other: "{U1} als Editor von {U2} hinzugefügt",
		user_editor_removed: "{U} als Editor entfernt",
		user_editor_removed_other: "{U1} als Editor von {U2} entfernt",
		user_banned: "{T} gebannt",
		user_unbanned: "{T} entbannt",
		user_updated: "Eigenschaften für {T} geändert",
		user_sign_in: "{T} hat sich angemeldet",
		user_sign_out: "{T} hat sich abgemeldet",
		user_forbidden: "{T} wurde der Zugriff auf {0} verwehrt",
		emote_set_created: "{T} erstellt",
		emote_set_emote_added: "Das Emote {AE} wurde zu {T} hinzugefügt",
		emote_set_emote_removed: "Das Emote {AE} wurde von {T} entfernt",
		emote_set_emote_renamed: "Das Emote {AE} in {T} von {O} zu {N} umbenannt",
		emote_set_updated: "Eigenschaften für {T} geändert",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Emote hinzufügen",
		author: "Hinzugefügt von",
		created_at: "Erstellt am",
		versions: "Versionen",
		preview_loading: "Vorschau wird geladen... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Beim Laden der Vorschau ist ein Fehler aufgetreten",
		processing: "Emote wird verarbeitet - dies kann eine Weile dauern.",
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
		common_names: "Weitere Namen für dieses Emote",
		usage_stats: "Emote-Statistik",
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
		label_renamed: "Umbenannt",
		label_conflict: "Konflikt",
		label_default: "Standard",
		modal: {
			selected_channel_count: "kein Kanal ausgewählt | {0} Kanal ausgewählt | {0} Kanäle ausgewählt",
			create_button: "@:common.object.emote_set erstellen",
			rename_in_set: "Umbennen für {0}",
			context_rename: "Emote-Name anpassen",
			context_set_default: "Standardmäßig nutzen",
			context_unset_default: "Als Standard entfernen",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote-Gruppen",
		channel_emotes: "Kanal-Emotes",
		joined_at: "{0} beigetreten",
		editors: "Editoren",
		roles: "Rollen",
		no_channel_emotes: "{0} hat keine Emotes auf {1}",
		no_channels: "{0} hat keine Kanäle verbunden!",
		card: {
			view_full_profile: "Ganzes Profil anzeigen",
		},
		settings: {
			button: "Profil bearbeiten",
			section_profile: "Profil",
			username: "Benutzername",
			display_name: "Angezeigename",
			profile_picture: "Profilbild",
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
