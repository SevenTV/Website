export default {
	locale: "Nederlands (Nederland)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Lees Meer",
		more: "Meer",
		retry: "Opnieuw proberen",
		downloads: "Downloads",
		features: "Functies",
		comments: "Reacties",
		search: "Zoeken",
		update: "Bijwerken",
		report: "Rapporteer",
		activity: "Activiteit",
		loading: "Laden",
		save_changes: "Wijzigingen Opslaan",
		reset: "Reset",
		object: {
			user: "Gebruiker",
			emote_set: "Emote Set",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Het Emote Platform voor iedereen",
		app_description: "Beheer gemakkelijk honderden emotes voor je Twitch of YouTube kanalen",
		why_app: "Waarom @:common.appName{'?'}",
		download_browser: "Browserextensie",
		download_mobile: "Mobiele Apps",
		download_misc: "Andere Apps",
		features: {
			emote_sets: {
				name: "Emote Sets",
				detail: "Groepeer emotes in aanpasbare sets die kunnen worden gedeeld met andere gebruikers of snel verwisseld kunnen worden op jouw kanaal.",
			},
			many_emote_slots: {
				name: "Honderden emote slots",
				detail: "Begin met {0} slots, met een mogelijk maximum van {1} zonder paywall.",
			},
			channel_emote_names: {
				name: "Emote namen per kanaal",
				detail: "Vind je de emote naam gegeven door de auteur niet leuk? Dat is prima, je kunt deze voor jouw kanaal aanpassen.",
			},
			real_time: {
				name: "Real-time",
				detail: "Het veranderen van emotes in jouw kanaal gebeurt direct, voor alle kijkers. Geen F5 vereist.",
			},
			emote_versions: {
				name: "Emote Versiebeheer",
				detail: "Wissel tussen thematische varianten of update een emote naar een verbeterde versie.",
			},
			next_gen: {
				name: "Nieuwste generatie afbeeldingsformaten zoals WEBP en AVIF",
				detail: "We gebruiken nieuwere, meer geoptimaliseerde afbeeldingsformaten om het verbruik van bandbreedte te verminderen.",
			},
			source_available: {
				name: "Beschikbare bron",
				detail: "Onze hele codebase is beschikbaar op GitHub met een Bron beschikbare licentie. Iedereen kan de code bekijken en bijdragen.",
			},
		},
		socials: {
			discord: "Word lid van @:common.appName op Discord",
			discord_online_count: "{0} momenteel online",
			twitter: "Volg ons op Twitter",
			github: "Bijdragen",
		},
	},
	// Nav Bar
	nav: {
		home: "Startpagina",
		about: "Over ons",
		emotes: "Emotes",
		store: "Abonneren",
		admin: "Beheerder",
		sign_in: "Inloggen",
		wip_notice: {
			heading: "Welkom op de nieuwe @:common.appName website",
			text1: "Dit is een voorproefje van de volgende manier om @:common.appName{'.'} te ervaren.",
			text2: "Ontdek wat er nieuw is en geef ons feedback! Let op dat dingen veel zullen veranderen en mogelijk regelmatig kapot kunnen gaan.",
		},
	},
	activity: {
		emote_created: "{T} aangemaakt",
		emote_renamed: "{T} hernoemd van {O} naar {N}",
		emote_listing_approved: "{T} goedgekeurd voor de openbare lijst",
		emote_listing_revoked: "{T} verwijderd van de openbare lijst",
		emote_merged: "{T} samengevoegd in {0}",
		emote_ownership_transferred: "Eigendom van {T} naar {U} overgedragen",
		emote_restored: "{T} hersteld",
		emote_updated: "Eigenschappen voor {T} gewijzigd",
		emote_deleted: "{T} verwijderd",
		emote_processed: "Een nieuwe verwerkingstaak voor {T} uitgevoerd",
		emote_version_created: "Versie '{VER}' aangemaakt voor {T}",
		emote_version_renamed: "Versie '{VER}' voor {T} hernoemd van {1} naar {2}",
		emote_version_approved: "Versie '{VER}' voor {T} goedgekeurd voor de openbare lijst",
		emote_version_restored: "Versie '{VER}' voor {T} hersteld",
		emote_version_deleted: "Versie '{VER}' voor {T} verwijderd",
		user_created: "{T} aangemaakt",
		user_deleted: "{T} verwijderd",
		user_editor_added: "{U} toegevoegd als een editor",
		user_editor_added_other: "{U1} toegevoegd als een editor van {U2}",
		user_editor_removed: "{U}'s editor rechten ingetrokken",
		user_editor_removed_other: "{U1}'s editor rechten ingetrokken voor {U2}",
		user_banned: "{T} is verbannen",
		user_unbanned: "{T} is ontbannen",
		user_updated: "Eigenschappen voor {T} gewijzigd",
		user_sign_in: "{T} is ingelogd",
		user_sign_out: "{T} is uitgelogd",
		user_forbidden: "Toegang van {0} geweigerd voor {T}",
		emote_set_created: "{T} aangemaakt",
		emote_set_emote_added: "Heeft de emote {AE} toegevoegd aan {T}",
		emote_set_emote_removed: "Heeft de emote {AE} verwijderd van {T}",
		emote_set_emote_renamed: "Heeft de emote {AE} van {O} naar {N} hernoemd in {T}",
		emote_set_updated: "Eigenschappen voor {T} gewijzigd",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Emote toevoegen",
		author: "Toegevoegd door",
		created_at: "Aangemaakt",
		versions: "Versies",
		preview_loading: "Voorbeelden laden... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Mislukt om voorbeelden te laden",
		processing: "Emote wordt verwerkt - dit kan even duren.",
		use: "Gebruik emote",
		switch_version: "Schakel over naar deze versie",
		in_n_sets: "in {0} set | in {0} sets",
		disable: "Emote uitschakelen",
		update: "Bijwerken",
		report: "Emote rapporteren",
		makePrivate: "Maak privé",
		makeGlobal: "Make Global",
		comments: "Reacties",
		channels: "Kanalen",
		common_names: "Andere namen voor deze emote",
		usage_stats: "Emote Statistieken",
		unlisted: {
			heading: "Attentie!",
			warning: "Deze emote staat niet in de openbare lijst.",
			warning_flagged: "Deze emote is van de lijst afgehaald voor de volgende redenen: {FLAG_LIST}",
			notice: "Het kan worden toegevoegd aan je kanaal, maar we kunnen niet verifiëren of het veilig is om te laten zien in een livestream.",
			notice_flagged:
				"Het kan worden toegevoegd aan je kanaal, maar we denken dat het onveilig is om te laten zien in een livestream.",
			show_button: "Emote tonen",
			flag_sexual_content: "Seksuele of seksueel suggestieve inhoud",
			flag_epilepsy: "Snel knipperen / epileptische aanvallen",
			flag_edgy: "Aanvallend of onsmakelijk",
			flag_twitch_banned: "Verboden op Twitch",
		},
		list: {
			searching: "Zoeken",
			emote_count: "{0} emotes",
			no_emotes_listed: "Geen emotes gevonden",
			fetching_slowly: "Sorry, dit duurt langer dan normaal",
		},
		upload: {
			emote_name: "Emote naam",
			version_name: "Versie naam",
			version_description: "Versie omschrijving",
			submit_emote: "Emote toevoegen",
			create_emote_version: "Maak emote versie aan",
			image_upload: "Upload afbeelding",
			accepted_formats: "Toegestane formaten",
			filetype: "Bestand",
			animation: "Animatie",
			transparency: "Transparantie",
			emote_details: "Emote Details",
			version_details: "Versie details",
			attribution: "Attributie",
			original_creator: "Originele maker",
			as_child: "Je maakt een {IS_DIVERGED} versie van {0}. ",
			content_moderation: "Content Moderatie",
			half_transparency_tooltip:
				"Pixels kunnen alleen volledig transparant of ondoorzichtig zijn (geen variabele transparantie)",
		},
	},
	emote_set: {
		create: "Nieuwe @:common.object.emote_set",
		select: "Selecteer @:common.object.emote_set",
		explain: {
			section: "Wat zijn @:common.object.emote_set{'s'}?",
			hint: "Emote Sets zijn een collectie van emotes die verbonden kunnen worden met jouw kanaal of gedeeld kunnen worden met andere gebruikers.",
		},
		no_space: "Alle slots zijn vol",
		none_selected: "Geen Set geselecteerd",
		editing: "{0} Bewerken",
		owner: "Emote Set van {USER}",
		owned: "Jouw Emote Set",
		label_renamed: "Hernoemd",
		label_conflict: "Conflict",
		label_default: "Standaard",
		modal: {
			selected_channel_count: "geen kanaal geselecteerd | {0} kanaal geselecteerd | {0} kanalen geselecteerd",
			create_button: "Maak @:common.object.emote_set",
			rename_in_set: "Hernoemen in {0}",
			context_rename: "Emote naam aanpassen",
			context_set_default: "Als standaard instellen",
			context_unset_default: "Als standaard verwijderen",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Sets",
		channel_emotes: "Kanaal Emotes",
		joined_at: "Lid geworden op {0}",
		editors: "Bewerkers",
		roles: "Rollen",
		connections: "Kanalen | Kanalen & Accounts",
		new_connections: "Accounts koppelen...",
		no_channel_emotes: "{0} heeft geen emotes op zijn/haar {1} kanaal",
		no_channels: "{0} heeft geen kanalen verbonden!",
		card: {
			view_full_profile: "Volledig profiel bekijken",
		},
		settings: {
			button: "Profiel Wijzigen",
			section_profile: "Profiel",
			username: "Gebruikersnaam",
			display_name: "Weergavenaam",
			profile_picture: "Profielfoto",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Rapporteren",
		emote_reason: {
			i_made_this: "Ik heb deze emote gemaakt, maar het is door iemand anders geüpload",
			duplicate: "Deze emote is een kopie",
			pornographic: "Deze emote bevat pornografisch of te geseksualiseerd beeld materiaal",
			violence_gore: "Deze emote toont extreem geweld of bloed",
			i_appear_there: "Deze emote bevat mij en dat vind ik niet leuk",
			offensive: "Ik vind deze emote beledigend",
			other: "Anders",
		},
		uncategorized_prompt: "Wat is er aan de hand?",
		details: "Details (aanvullende informatie en/of bewijs voor uw rapport)",
		success: "Rapport succesvol ingediend",
		notify: "Je krijgt een melding via de inbox wanneer je rapport is behandeld of wanneer verdere informatie wordt aangevraagd.",
		complete_step_one: "Verder",
		abuse_notice: "Misbruik van de rapporteer-functie kan ertoe leiden dat uw toegang wordt ingetrokken.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Inbox",
		tabs: {
			all: "Alle Berichten",
			unread: "Ongelezen",
			important: "Belangrijk",
		},
		unread_tag: "Ongelezen",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote goedgekeurd voor de Lijst",
				content: `
# Je emote "{EMOTE_NAME}" is goedgekeurd voor aanbieding \n
Het zal nu beschikbaar zijn op de Emote Bibliotheek en verschijnt op @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote niet goedgekeurd voor de Lijst",
				content: `
# Je emote "{EMOTE_NAME}" is afgewezen
Het zal niet beschikbaar zijn via de openbare Emote Bibliotheek of zichtbaar zijn op @:common.appHost,
maar zal beschikbaar blijven voor gebruikers met de link.
`,
			},
			emote_ownership_claim_request: {
				subject: "Uitnodiging om eigendom van een emote op te eisen",
				content: `
## {OWNER_DISPLAY_NAME} wil dat jij eigenaar wordt van '{EMOTE_NAME}'

[Bekijk Emote]({EMOTE_URL})

**[Accepteer Verzoek]({EMOTE_CLAIM_URL})** | [Weiger Verzoek]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Je bent verbannen",
				reason: {
					pornographic_content: "",
				},
				content: `
# Account verbannen
Je toegang tot @:common.appName is nu beperkt.<br/><br/>
### Reden voor deze actie 
{BAN_REASON} <br/><br/>
### Toegepaste Beperkingen<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Dit besluit vervalt **{BAN_EXPIRE_AT}**.
_Als je denkt dat dit een vergissing is, e-mail alsjeblieft @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Je hebt geen toegang meer tot de app",
					no_auth: "* Je mag niet meer inloggen",
					no_ownership: "* Alle content die je hebt gemaakt zal niet langer beschikbaar zijn",
					memory_hole: "* U zult niet zichtbaar zijn voor andere gebruikers",
					ip_blocked: "* Uw IP is geblokkeerd voor de toegang tot alle @:common.appName services",
				},
			},
			report_closed: {
				subject: "Rapport gesloten",
				content: `
Bedankt voor je melding, je rapport {'#'}{CASE_ID} is behandeld. 				`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "We konden het niet vinden",
		doctor_wtf: "Wat in hemelsnaam is dit?",
		pot_friend: "Ik ben een pot, vriend",
	},
};
