export default {
	locale: "Dansk (Danmark)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Lær mere",
		more: "Mere",
		retry: "Prøv igen",
		downloads: "Downloads",
		features: "Funktioner",
		comments: "Kommentarer",
		search: "Søg",
		update: "Opdater",
		report: "Rapporter",
		activity: "Aktivitet",
		object: {
			user: "Bruger",
			emote_set: "Emote sæt",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Emote platformen for alle",
		app_description: "Tilføj hundredvis af emotes til dine Twitch eller YouTube kanaler med lethed",
		why_app: "Hvorfor @:common.appName{'?'}",
		download_browser: "Browserudvidelse",
		download_mobile: "Mobil apper",
		download_misc: "Andre apps",
		features: {
			emote_sets: {
				name: "Emote Sets",
				detail: "Group emotes in customizable sets that can be shared with other users or quickly swapped onto your channel.",
			},
			many_emote_slots: {
				name: "Hundredvis af emote slots",
				detail: "Start med {0} slots, med et muligt maksimum på {1} og ingen paywall.",
			},
			channel_emote_names: {
				name: "Per-kanal emote navne",
				detail: "Kan du ikke lide navnet givet til en emote af dens forfatter? Intet problem, du kan ændre det kun for din kanal.",
			},
			real_time: {
				name: "Realtid",
				detail: "Ændring af emotes i din kanal sker med det samme, for alle seere. Ingen F5 krævet.",
			},
			emote_versions: {
				name: "Emote versionering",
				detail: "Skift mellem temavarianter eller opdater en emote til en forbedret version.",
			},
			next_gen: {
				name: "Next-gen billedformater som WEBP og AVIF",
				detail: "Vi bruger nyere og mere optimerede billedformater til at reducere brugen af data.",
			},
			source_available: {
				name: "Kildetilgængelig",
				detail: "Our entire codebase is available on GitHub with a source-available license. Anyone can view and contribute.",
			},
		},
		socials: {
			discord: "Join @:common.appName on Discord",
			discord_online_count: "{0} online nu",
			twitter: "Følg os på Twitter",
			github: "Contribute",
		},
	},
	// Nav Bar
	nav: {
		home: "Hjem",
		about: "Om",
		emotes: "Emotes",
		store: "Abonner",
		admin: "Admin",
		sign_in: "Log på",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Tilføj emote",
		author: "Tilføjet af",
		created_at: "Oprettet",
		versions: "Versioner",
		use: "Brug emote",
		switch_version: "Skift til denne version",
		in_n_sets: "i {0} sæt | i {0} sæt",
		disable: "Deaktiver emote",
		update: "Opdater",
		report: "Rapporter emote",
		makePrivate: "Gør privat",
		makeGlobal: "Gør global",
		comments: "Kommentarer",
		channels: "Kanaler",
		common_names: "Other names for this emote",
		usage_stats: "Emote Statistics",
		list: {
			searching: "Søger",
			emote_count: "{0} emotes",
			no_emotes_listed: "Ingen emotes fundet",
			fetching_slowly: "Beklager, det ser ud til at det tager et stykke tid",
		},
		upload: {
			emote_name: "Emote navn",
			version_name: "Versionsnavn",
			version_description: "Versionsbeskrivelse",
			submit_emote: "Indsend emote",
			create_emote_version: "Opret emotesversion",
			image_upload: "Billed upload",
			accepted_formats: "Accepted Formats",
			filetype: "Fil",
			animation: "Animation",
			transparency: "Gennemsigtighed",
			emote_details: "Emotesdetaljer",
			version_details: "Versionsdetaljer",
			attribution: "Attribution",
			original_creator: "Oprindelig skaber",
			as_child: "You are creating a {IS_DIVERGED} version of {0}. ",
			content_moderation: "Content Moderation",
			half_transparency_tooltip:
				"Pixels can only be fully transparent or fully opaque (no variable transparency)",
		},
	},
	emote_set: {
		create: "New @:common.object.emote_set",
		select: "Select @:common.object.emote_set",
		explain: {
			section: "What are @:common.object.emote_set{'s'}?",
			hint: "Emote Sets are a collection of emotes which can be bound to your channels or shared with other users.",
		},
		no_space: "Slots Full",
		none_selected: "Intet set valgt",
		editing: "Redigerer {0}",
		owner: "{USER}'s emote sæt",
		owned: "Owned Emote Set",
		modal: {
			selected_channel_count: "ingen kanal valgt - {0} kanal valgt - {0} kanaler valgt",
			create_button: "Opret @:common.object.emote_set",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Sets",
		channel_emotes: "Kanal emotes",
		editors: "Editors",
		roles: "Roller",
		no_channel_emotes: "{0} har ingen emotes på deres {1} kanal",
		no_channels: "{0} har ingen kanaler tilsluttet!",
		card: {
			view_full_profile: "Vis fuld profil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Rapporter",
		emote_reason: {
			i_made_this: "Jeg lavede denne emote, men den blev uploadet af en anden",
			duplicate: "Denne emote er en duplikat",
			pornographic: "This emote contains pornographic or overly sexualized imagery",
			violence_gore: "Denne emote viser ekstrem vold eller blod",
			i_appear_there: "This emote depicts me and I don't like it",
			offensive: "I find this emote offensive",
			other: "Noget andet",
		},
		uncategorized_prompt: "What's the matter?",
		details: "Oplysninger (yderligere oplysninger og/eller bevis for din rapport)",
		success: "Rapporten blev indsendt",
		notify: "Du får besked via indbakken, når din rapport håndteres eller der anmodes om yderligere oplysninger.",
		complete_step_one: "Fortsæt",
		abuse_notice: "Abuse of the report feature may lead to your access being revoked.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Indbakke",
		tabs: {
			all: "Alle beskeder",
			unread: "Ulæste",
			important: "Vigtige",
		},
		unread_tag: "Ulæst",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote Approved for Listing",
				content: `
# Din emote "{EMOTE_NAME}" blev godkendt for at blive vist alment \n
Den vil nu være tilgængelig i Emote-katalogen og vil begynde at dukke op på @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote Not Approved for Listing",
				content: `
# Din emote "{EMOTE_NAME}" blev afvist
Den vil ikke være tilgængelig via det offentlige Emote-katalog eller synlig på @:common.appHost, men forbliver tilgængelig for brugere med linket.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitation til at blive ejer af en emote",
				content: `
## {OWNER_DISPLAY_NAME} wants you to become the owner of '{EMOTE_NAME}'

[View Emote]({EMOTE_URL})

**[Accept Request]({EMOTE_CLAIM_URL})** | [Decline Request]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Du er blevet bandlyst",
				reason: {
					pornographic_content: "",
				},
				content: `
# Account Banned
Your access to @:common.appName is now limited.<br/><br/>
### Reason for this action
{BAN_REASON} <br/><br/>
### Restrictions Applied<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>This decision expires **{BAN_EXPIRE_AT}**.
_If you believe this is a mistake, please email @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Du kan ikke længere interagere med appen",
					no_auth: "* Du kan ikke længere logge ind",
					no_ownership: "* Alt indhold, du har oprettet, vil ikke længere være tilgængeligt",
					memory_hole: "* Du vil ikke være synlig for andre brugere",
					ip_blocked: "* Din IP er blokeret fra at få adgang til alle @:common.appName tjenester",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Vi kunne ikke finde det",
		doctor_wtf: "The hell's this?",
		pot_friend: "Jeg er en krukke, ven",
	},
};
