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
		loading: "Indlæser",
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
				name: "Emote sæt",
				detail: "Gruppe emotes i tilpasselige sæt, der kan deles med andre brugere eller hurtigt blive byttet på din kanal.",
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
				detail: "Hele vores kodebase er tilgængelig på GitHub med en kildetilgængelig licens. Alle kan se og bidrage.",
			},
		},
		socials: {
			discord: "Deltag med andre @:common.appName brugere på Discord",
			discord_online_count: "{0} online nu",
			twitter: "Følg os på Twitter",
			github: "Bidrag til udviklingen",
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
		wip_notice: {
			heading: "Velkommen til den nye @:common.appName hjemmeside",
			text1: "This is an early preview of the next way to experience @:common.appName{'.'}",
			text2: "Explore what's new and give us some feedback! Note it will be undergoing rapid changes and may break frequently.",
		},
	},
	activity: {
		emote_created: "Oprettede {T}",
		emote_renamed: "{ICO} omdøbte {T} fra {O} til {N}",
		emote_listing_approved: "Godkendte {T} til offentlig visning",
		emote_listing_revoked: "Fjernede {T} fra offentlig visning",
		emote_merged: "Sammenflettet {T} til {0}",
		emote_ownership_transferred: "Overførte ejerskab af {T} til {U}",
		emote_restored: "Gendannede {T}",
		emote_updated: "Ændrede egenskaber for {T}",
		emote_deleted: "Slettede {T}",
		emote_version_created: "Oprettet version '{VER}' af {T}",
		emote_version_renamed: "Omdøbte version '{VER}' af {T} fra {1} til {2}",
		emote_version_approved: "Godkendte version '{VER}' af {T} til offentlig visning",
		emote_version_restored: "Gendannede version '{VER}' af {T}",
		emote_version_deleted: "Slettede version '{VER}' af {T}",
		user_created: "Oprettede {T}",
		user_deleted: "Slettede {T}",
		user_editor_added: "Tilføjede {T} som redaktør",
		user_editor_added_other: "Tilføjede {U1} som redaktør af {U2}",
		user_editor_removed: "Fjernede {U} som redaktør",
		user_editor_removed_other: "Fjernede {U1} som redaktør af {U2}",
		user_banned: "Bandlyste {T}",
		user_unbanned: "Ubandlyste {T}",
		user_updated: "Ændrede egenskaber for {T}",
		user_sign_in: "{T} har logget ind",
		user_sign_out: "{T} har logget ud",
		user_forbidden: "{T} blev nægtet adgang til {0}",
		emote_set_created: "Oprettede {T}",
		emote_set_emote_added: "Tilføjede emote {AE} til {T}",
		emote_set_emote_removed: "Fjernede emote {AE} fra {T}",
		emote_set_emote_renamed: "Omdøbte emote {AE} fra {O} til {N} i {T}",
		emote_set_updated: "Ændrede egenskaber for {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Tilføj emote",
		author: "Tilføjet af",
		created_at: "Oprettet",
		versions: "Versioner",
		preview_loading: "Indlæser previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Indlæsning af previews mislykkedes",
		processing: "Behandler emote - dette kan tage noget tid.",
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
		common_names: "Andre navne for denne emote",
		usage_stats: "Emote statistik",
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
			accepted_formats: "Godkendte formater",
			filetype: "Fil",
			animation: "Animation",
			transparency: "Gennemsigtighed",
			emote_details: "Emotesdetaljer",
			version_details: "Versionsdetaljer",
			attribution: "Kreditering",
			original_creator: "Oprindelig skaber",
			as_child: "Du opretter en {IS_DIVERGED} version af {0}. ",
			content_moderation: "Indholdsmoderering",
			half_transparency_tooltip:
				"Pixels kan kun være fuldt gennemsigtig eller fuldstændig uigennemsigtig (ingen foranderlig gennemsigtighed)",
		},
	},
	emote_set: {
		create: "Ny @:common.object.emote_set",
		select: "Vælg @:common.object.emote_set",
		explain: {
			section: "Hvad er @:common.object.emote_set{'s'}?",
			hint: "Emote sæt er en samling af emotes, som kan være bundet til dine kanaler eller deles med andre brugere.",
		},
		no_space: "Sæt fuld",
		none_selected: "Intet set valgt",
		editing: "Redigerer {0}",
		owner: "{USER}'s emote sæt",
		owned: "Ejet emote sæt",
		label_renamed: "Omdøbt",
		label_conflict: "Konflikt",
		label_default: "Standard",
		modal: {
			selected_channel_count: "ingen kanal valgt - {0} kanal valgt - {0} kanaler valgt",
			create_button: "Opret @:common.object.emote_set",
			rename_in_set: "Omdøb i {0}",
			context_rename: "Tilpas emote navn",
			context_set_default: "Tilknyt som standard",
			context_unset_default: "Fjern som standard",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote sæt",
		channel_emotes: "Kanal emotes",
		editors: "Redaktører",
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
			pornographic: "Denne emote indeholder pornografisk eller alt for seksualiserede billedsprog",
			violence_gore: "Denne emote viser ekstrem vold eller blod",
			i_appear_there: "Denne emote forestiller mig og jeg kan ikke lide det",
			offensive: "Jeg finder denne emote stødende",
			other: "Noget andet",
		},
		uncategorized_prompt: "Hvad er problemet?",
		details: "Oplysninger (yderligere oplysninger og/eller bevis for din rapport)",
		success: "Rapporten blev indsendt",
		notify: "Du får besked via indbakken, når din rapport håndteres eller der anmodes om yderligere oplysninger.",
		complete_step_one: "Fortsæt",
		abuse_notice: "Misbrug af rapportfunktionen kan medføre, at din adgang suspenderes.",
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
				subject: "Emote godkendt til visning",
				content: `
# Din emote "{EMOTE_NAME}" blev godkendt for at blive vist alment \n
Den vil nu være tilgængelig i Emote-katalogen og vil begynde at dukke op på @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote ikke godkendt til visning",
				content: `
# Din emote "{EMOTE_NAME}" blev afvist
Den vil ikke være tilgængelig via det offentlige Emote-katalog eller synlig på @:common.appHost, men forbliver tilgængelig for brugere med linket.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitation til at blive ejer af en emote",
				content: `
## {OWNER_DISPLAY_NAME} Ønsker at give dig ejerskab over: '{EMOTE_NAME}'

[Vis emote]({EMOTE_URL})

**[Accepter invitation]({EMOTE_CLAIM_URL})** | [Afslå invitation]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Du er blevet bandlyst",
				reason: {
					pornographic_content: "",
				},
				content: `
# Konto udelukket
Din adgang til @:common.appName er nu begrænset.<br/><br/>
### Årsag til denne handling
{BAN_REASON} <br/><br/>
### Begrænsninger anvendt<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Din suspendering udløber d. **{BAN_EXPIRE_AT}**.
_Hvis du mener, at dette er en fejl, kan du kontakte @:common.supportEmail{'.'}_
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
		doctor_wtf: "Hvad helvede er dette?",
		pot_friend: "Jeg er en krukke, ven",
	},
};
