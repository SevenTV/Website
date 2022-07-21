export default {
	locale: "Norsk nynorsk (Noreg)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Lær meir",
		more: "Meir",
		retry: "Prøv igjen",
		downloads: "Nedlastingar",
		features: "Funksjonar",
		comments: "Kommentarar",
		search: "Søk",
		update: "Oppdater",
		report: "Rapporter",
		activity: "Aktivitet",
		loading: "Loading",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "Brukar",
			emote_set: "Emote-sett",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Emote-plattformen for alle",
		app_description: "Administrer hundrevis av emoter for Twitch eller YouTube-kanalane dine enkelt",
		why_app: "Kvifor @:common.appName{'?'}",
		download_browser: "Nettlesarutvidelse",
		download_mobile: "Mobilappar",
		download_misc: "Andre appar",
		features: {
			emote_sets: {
				name: "Emote-sett",
				detail: "Grupper emoter i eigendefinerte sett som kan delas med andre eller raskt byttas mellom for kanalen din.",
			},
			many_emote_slots: {
				name: "Hundrevis av emote-plassar",
				detail: "Start med {0} plassar, med høve til ein økning opp til {1} utan å betale.",
			},
			channel_emote_names: {
				name: "Per-kanal emote-namn",
				detail: "Likar du ikkje namnet som var gjeve til ein emote? Endre det for bruk i din kanal.",
			},
			real_time: {
				name: "Sanntid",
				detail: "Å bytta emoter i din kanal skjer ummidelbart, for alle seere. Ingen F5 kreves.",
			},
			emote_versions: {
				name: "Emote-versjonar",
				detail: "Bytt mellom tema-variantar eller oppdater ein emote til ein forbetra versjon.",
			},
			next_gen: {
				name: "Neste generasjons bilete-formater som WEBP og AVIF",
				detail: "Me brukar nyare, meir optimaliserte bileteformatar for å redusera bandbreddebruk.",
			},
			source_available: {
				name: "Åpen kjeldekode",
				detail: "Heile kodebasen vår er tilgjengelig på GitHub med ein åpen kjeldekode-lisens. Alle kan sjå og bidra.",
			},
		},
		socials: {
			discord: "Bli med @:common.appName på Discord",
			discord_online_count: "{0} pålogga nå",
			twitter: "Følg oss på Twitter",
			github: "Bidra",
		},
	},
	// Nav Bar
	nav: {
		home: "Heim",
		about: "Om",
		emotes: "Emoter",
		store: "Abonner",
		admin: "Admin",
		sign_in: "Logg inn",
		wip_notice: {
			heading: "Welcome to the new @:common.appName website",
			text1: "This is an early preview of the next way to experience @:common.appName{'.'}",
			text2: "Explore what's new and give us some feedback! Note it will be undergoing rapid changes and may break frequently.",
		},
	},
	activity: {
		emote_created: "Created {T}",
		emote_renamed: "Renamed {T} from {O} to {N}",
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
		user_editor_added: "Added {U} as an editor",
		user_editor_added_other: "Added {U1} as an editor of {U2}",
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
		add: "Legg til emote",
		author: "Lagt til av",
		created_at: "Oppretta",
		versions: "Versjonar",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Bruk emote",
		switch_version: "Bytt til denna versjonen",
		in_n_sets: "i {0} sett | i {0} sett",
		disable: "Deaktiver emote",
		update: "Oppdater",
		report: "Rapporter emote",
		makePrivate: "Gjer privat",
		makeGlobal: "Gjør Global",
		comments: "Kommentarar",
		channels: "Kanalar",
		common_names: "Andre namn på denne emoten",
		usage_stats: "Emote statistikk",
		list: {
			searching: "Søkjar",
			emote_count: "{0} emoter",
			no_emotes_listed: "Ingen emoter funne",
			fetching_slowly: "Beklaga, det ser ut til å ta ein stund",
		},
		upload: {
			emote_name: "Emote-namn",
			version_name: "Versjon-namn",
			version_description: "Versjon-beskriving",
			submit_emote: "Send inn emote",
			create_emote_version: "Opprett emote-versjon",
			image_upload: "Bilete-opplasting",
			accepted_formats: "Aksepterte formata",
			filetype: "Fil",
			animation: "Animasjon",
			transparency: "Gjennomsiktigheit",
			emote_details: "Emote-detaljar",
			version_details: "Versjon-detaljar",
			attribution: "Tillegging",
			original_creator: "Original-skapar",
			as_child: "Du opprettar ein {IS_DIVERGED} versjon av {0}. ",
			content_moderation: "Innhalds-moderasjon",
			half_transparency_tooltip:
				"Pikslar kan bare være heilt gjennomsiktige eller heilt opake (ingen delvis klarleik)",
		},
	},
	emote_set: {
		create: "Nytt @:common.object.emote_set",
		select: "Vel @:common.object.emote_set",
		explain: {
			section: "Kva er @:common.object.emote_set{'s'}?",
			hint: "Emote-sett er ein samling av emoter som kan tilkoblas til dine kanalar eller delas med andre brukare.",
		},
		no_space: "Sett er fullt",
		none_selected: "Ingen sett valgt",
		editing: "Redigerar {0}",
		owner: "{USER}'s emote-sett",
		owned: "Eid emote-sett",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "ingen kanal valt | {0} kanal valt | {0} kanalar valt",
			create_button: "Opprett @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote-sett",
		channel_emotes: "Kanal-emoter",
		joined_at: "Joined {0}",
		editors: "Forvaltarar",
		roles: "Rollar",
		no_channel_emotes: "{0} har ingen emoter på deira {1} kanal",
		no_channels: "{0} har ingen kanalar tilkopla!",
		card: {
			view_full_profile: "Vis full profil",
		},
		settings: {
			button: "Edit Profile",
			section_profile: "Profile",
			username: "Username",
			display_name: "Display Name",
			profile_picture: "Profile Picture",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Rapporter",
		emote_reason: {
			i_made_this: "Eg lagde denne emoten, men den var lasta opp av nokon andre",
			duplicate: "Denne emoten er ein duplikat",
			pornographic: "Denne emoten innehalder pornografisk eller overflødig seksualiserte bilete",
			violence_gore: "Denne emoten visar ekstrem vald eller gørr",
			i_appear_there: "Denne emoten skildrar meg og eg likar det ikkje",
			offensive: "Eg synast denne emoten er støtande",
			other: "Noko anna",
		},
		uncategorized_prompt: "Kva gjeld saka?",
		details: "Detaljar (tilleggsinformasjon og/eller bevis for din rapport)",
		success: "Rapporten er sendt vellykka",
		notify: "Du vil bli varsla via innboksen når rapporten er behandla eller det er behov for ytterligera informasjon.",
		complete_step_one: "Fortset",
		abuse_notice: "Misbruk av rapportfunksjonen kan føra til at din tilgang blir oppheva.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Innboks",
		tabs: {
			all: "Alle meldingar",
			unread: "Uleste",
			important: "Viktig",
		},
		unread_tag: "Ulest",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote godkjent for oppføring",
				content: `
# Din emote "{EMOTE_NAME}" var godkjent for oppføring \n
Den vil bli tilgjengeleg i emote-katalogen og dukke opp på @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote ikkje godkjent for oppføring",
				content: `
# Din emote "{EMOTE_NAME}" vorte avvist 
Den vil ikkje være tilgjengeleg via den offentlege emote-katalogen eller synleg på @:common.appHost, 
men vil forbli tilgjengeleg for brukarar med lenken. 
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitasjon til å overta eigarskap av ein emote",
				content: `
## {OWNER_DISPLAY_NAME} ynske du skal bli eigar av '{EMOTE_NAME}'
 
[Vis Emote]({EMOTE_URL})
 
**[Godta førespurnad]({EMOTE_CLAIM_URL})* * | [Avslå førespurnad]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Du har vorte utestengd",
				reason: {
					pornographic_content: "",
				},
				content: `
# Konto utestengd 
Din tilgang til @:common.appName er nå avgrensa.<br/><br/> 
### Årsak til denne handlinga 
{BAN_REASON} <br/><br/> 
### Avgrensningar anvendt<br/> 
{EFFECT_NO_PERMISSIONS} 
{EFFECT_NO_AUTH} 
{EFFECT_NO_OWNERSHIP} 
{EFFECT_MEMORY_HOLE} 
 
<br/>Dette vedtaket går ut **{BAN_EXPIRE_AT}**. 
_Hvis du tror dette er ein feil, vær vennelig å send epost til @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Du kan ikkje lenger samhandla med appen",
					no_auth: "* Du kan ikkje lenger logga inn",
					no_ownership: "* Alt innhald du har lagd vil ikkje lenger være tilgjengeleg",
					memory_hole: "* Du vil ikkje være synleg for andre brukare",
					ip_blocked: "* Din IP er blokkert i frå å bruka alle @:common.appName sine tjenestar",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Me kunne ikkje finna det",
		doctor_wtf: "Kva er dette?",
		pot_friend: "Eg er ein potte, venn",
	},
};
