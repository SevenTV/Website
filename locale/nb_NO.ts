export default {
	locale: "Norsk bokmål (Norge)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Finn ut mer",
		more: "Mer",
		retry: "Prøv igjen",
		downloads: "Nedlastninger",
		features: "Funksjoner",
		comments: "Kommentarer",
		search: "Søk",
		update: "Oppdater",
		report: "Rapporter",
		activity: "Aktivitet",
		loading: "Loading",
		object: {
			user: "Bruker",
			emote_set: "Emote-sett",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Emote-plattformen for alle",
		app_description: "Hold enkelt styr på hundrevis av emoter for Twitch eller YouTube-kanalen din",
		why_app: "Hvorfor @:common.appName{'?'}",
		download_browser: "Nettleserutvidelse",
		download_mobile: "Mobilapper",
		download_misc: "Andre Apper",
		features: {
			emote_sets: {
				name: "Emote-sett",
				detail: "Grupper emoter i egendefinerte sett som kan deles med andre eller raskt byttet mellom for kanalen din.",
			},
			many_emote_slots: {
				name: "Hundrevis av emote-plasser",
				detail: "Start med {0} plasser, med mulighet for å øke det opp til {1} uten å betale.",
			},
			channel_emote_names: {
				name: "Per-kanal emote-navn",
				detail: "Liker du ikke navnet på en emote? Endre det for bruk i din kanal.",
			},
			real_time: {
				name: "Sanntid",
				detail: "Endring av emoter oppdateres umiddelbart for alle seerne dine. Uten behov for F5.",
			},
			emote_versions: {
				name: "Emote-versjoner",
				detail: "Bytt mellom tematiserte varianter eller oppdater til en forbedret versjon av emoten.",
			},
			next_gen: {
				name: "Neste generasjons bildeformater som WEBP og AVIF",
				detail: "Vi bruker nyere, mer optimaliserte bildeformater for å redusere båndbreddebruken.",
			},
			source_available: {
				name: "Åpen kildekode",
				detail: "Hele vår kodebase er tilgjengelig på GitHub med en åpen kildekode-lisens. Hvem som helst kan se og bidra.",
			},
		},
		socials: {
			discord: "Bli med @:common.appName på Discord",
			discord_online_count: "{0} pålogget nå",
			twitter: "Følg oss på Twitter",
			github: "Bidra",
		},
	},
	// Nav Bar
	nav: {
		home: "Hjem",
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
		created_at: "Lagd",
		versions: "Versjoner",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Bruk emote",
		switch_version: "Bytt til denne versjonen",
		in_n_sets: "i {0} sett | i {0} sett",
		disable: "Deaktiver emote",
		update: "Oppdater",
		report: "Rapporter emote",
		makePrivate: "Gjør privat",
		makeGlobal: "Gjør Global",
		comments: "Kommentarer",
		channels: "Kanaler",
		common_names: "Andre navn for denne emoten",
		usage_stats: "Emote statistikk",
		list: {
			searching: "Søker",
			emote_count: "{0} emoter",
			no_emotes_listed: "Ingen emoter funnet",
			fetching_slowly: "Beklager, dette ser ut til å ta en stund",
		},
		upload: {
			emote_name: "Emote-navn",
			version_name: "Versjon-navn",
			version_description: "Versjon-beskrivelse",
			submit_emote: "Send inn emote",
			create_emote_version: "Opprett emote-versjon",
			image_upload: "Bilde-opplasting",
			accepted_formats: "Aksepterte formater",
			filetype: "Fil",
			animation: "Animasjon",
			transparency: "Gjennomsiktighet",
			emote_details: "Emote-detaljer",
			version_details: "Versjon-detaljer",
			attribution: "Kreditering",
			original_creator: "Original-skaper",
			as_child: "Du oppretter en {IS_DIVERGED} versjon av {0}. ",
			content_moderation: "Innholds-moderasjon",
			half_transparency_tooltip:
				"Piksler kan kun være helt gjennomsiktige eller helt opake (ingen delvis gjennomsiktighet)",
		},
	},
	emote_set: {
		create: "Nytt @:common.object.emote_set",
		select: "Velg @:common.object.emote_set",
		explain: {
			section: "Hva er @:common.object.emote_set{'s'}?",
			hint: "Emote-sett er en samling av emoter som kan kobles til dine kanaler eller deles med andre brukere.",
		},
		no_space: "Sett er fullt",
		none_selected: "Ingen sett valgt",
		editing: "Redigerer {0}",
		owner: "{USER}'s emote-sett",
		owned: "Eide emote-sett",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "ingen kanal valgt | {0} kanal valgt | {0} kanaler valgt",
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
		editors: "Forvaltere",
		roles: "Roller",
		no_channel_emotes: "{0} har ingen emoter på deres {1}-kanal",
		no_channels: "{0} har ingen kanaler tilkoblet!",
		card: {
			view_full_profile: "Vis full profil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Rapport",
		emote_reason: {
			i_made_this: "Jeg lagde denne emoten, men den var lastet opp av noen andre",
			duplicate: "Denne emoten er et duplikat",
			pornographic: "Denne emoten inneholder pornografi eller overflødig seksualisert bilde",
			violence_gore: "Denne emoten viser ekstrem vold eller gørr",
			i_appear_there: "Denne emoten skildrer meg og jeg liker det ikke",
			offensive: "Jeg synes denne emoten er støtende",
			other: "Noe annet",
		},
		uncategorized_prompt: "Hva gjelder det?",
		details: "Detaljer (tilleggsinformasjon og/eller bevis for rapporten)",
		success: "Rapport innsendt",
		notify: "Du vil bli varslet via innboksen din når rapporten er håndtert eller det er behov for ytterligere informasjon.",
		complete_step_one: "Fortsett",
		abuse_notice: "Misbruk av rapportfunksjonen kan føre til at du blir utestengt fra videre bruk.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Innboks",
		tabs: {
			all: "Alle meldinger",
			unread: "Uleste",
			important: "Viktige",
		},
		unread_tag: "Ulest",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote godkjent for oppføring",
				content: `
# Din emote "{EMOTE_NAME}" ble godkjent for oppføring \n
Den vil nå være tilgjengelig i emote-katalogen og vil vises på @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote ikke godkjent for oppføring",
				content: `
# Din emote "{EMOTE_NAME}" ble avvist
Den vil ikke være tilgjengelig via den offentlige emote-katalogen eller synlig på @:common.appHost,
men vil forbli tilgjengelig for brukere med lenken.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitasjon til å overta eierskap av en emote",
				content: `
## {OWNER_DISPLAY_NAME} ønsker at du skal overta eierskap av '{EMOTE_NAME}'

[Vis emote]({EMOTE_URL})

**[Godta forespørsel]({EMOTE_CLAIM_URL})** | [Avslå forespørsel]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Du har blitt utestengt",
				reason: {
					pornographic_content: "",
				},
				content: `
# Konto utestengt
Din tilgang til @:common.appName er nå begrenset.<br/><br/>
### Årsak til denne handlingen
{BAN_REASON} <br/><br/>
### Begrensninger tildelt<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Denne avgjørelsen utløper **{BAN_EXPIRE_AT}**.
_Hvis du tror dette er en feil, vennligst kontakt @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Du kan ikke lenger samhandle med appen",
					no_auth: "* Du kan ikke lenger logge inn",
					no_ownership: "* Alt innhold du har lagd vil ikke lenger være tilgjengelig",
					memory_hole: "* Du vil ikke være synlig for andre brukere",
					ip_blocked: "* Din IP er blokkert i fra å bruke alle @:common.appName tjenester",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Vi kunne ikke finne den",
		doctor_wtf: "Hva faen er dette?",
		pot_friend: "Jeg er en potte, venn",
	},
};
