export default {
	locale: "Afrikaans (Suid-Afrika)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Leer Meer",
		more: "Meer",
		retry: "Probeer weer",
		downloads: "Aflaaie",
		features: "Funksies",
		comments: "Kommentaar",
		search: "Soek",
		update: "Opdateer",
		report: "Rapporteer",
		activity: "Aktiwiteit",
		loading: "Laai tans",
		save_changes: "Stoor veranderinge",
		reset: "Herstel",
		object: {
			user: "Gebruiker",
			emote_set: "Emotie-stel",
			emote: "Emosie",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Die Emote Platform vir Almal",
		app_description: "Bestuur honderde emosies vir jou Twitch- of YouTube-kanale met gemak",
		why_app: "Hoekom @:common.appName{'?'}",
		download_browser: "Blaaier uitbreiding",
		download_mobile: "Mobiele toepassings",
		download_misc: "Ander toepassings",
		features: {
			emote_sets: {
				name: "Stel emosies",
				detail: "Groepeer emosies in aanpasbare stelle wat met ander gebruikers gedeel of vinnig na jou kanaal omgeruil kan word.",
			},
			many_emote_slots: {
				name: "Honderde emote slots",
				detail: "Begin met {0} gleuwe, met 'n moontlike maksimum van {1} en geen betaalmuur nie.",
			},
			channel_emote_names: {
				name: "Emosie name per kanaal",
				detail: "Hou jy nie van die naam wat die skrywer aan 'n emosie gegee het nie? Dit is goed, jy kan dit net vir jou kanaal verander.\n",
			},
			real_time: {
				name: "Ware tyd",
				detail: "Veranderende emosies in jou kanaal vind onmiddellik plaas, vir alle kykers. Geen F5 word vereis nie.",
			},
			emote_versions: {
				name: "Emosionele weergawe",
				detail: "Skakel tussen temavariasies of 'n emosie-opdatering na 'n verbeterde weergawe.",
			},
			next_gen: {
				name: "Volgende generasie beeldformate soos WEBP en AVIF",
				detail: "Ons gebruik nuwer, meer geoptimaliseerde beeldformate om bandwydtegebruik te verminder.",
			},
			source_available: {
				name: "Bron beskikbaar",
				detail: "Ons hele kodebasis is beskikbaar op GitHub met 'n bronbeskikbare lisensie. Enigiemand kan bekyk en bydra.",
			},
		},
		socials: {
			discord: "Sluit aan by @:common.appName op Discord",
			discord_online_count: "{0} nou aanlyn",
			twitter: "Volg ons op Twitter",
			github: "Dra by",
		},
	},
	// Nav Bar
	nav: {
		home: "Tuiste",
		about: "Omtrent",
		emotes: "Emosies",
		store: "Skryf in",
		admin: "Admin",
		sign_in: "Teken In",
		wip_notice: {
			heading: "Welkom by die nuwe @:common.appName webwerf",
			text1: "Dit is 'n vroeë voorskou van die volgende manier om te ervaar @:common.appName{'.'}",
			text2: "Verken wat nuut is en gee ons terugvoer! Let daarop dat dit vinnige veranderinge sal ondergaan en gereeld kan breek.",
		},
	},
	activity: {
		emote_created: "Geskep {T}",
		emote_renamed: "Hernoem {T} van {O} na {N}",
		emote_listing_approved: "Goedgekeur {T} vir publieke lysinskrywing",
		emote_listing_revoked: "Het {T} van publieke lysinskrywing verwyder",
		emote_merged: "Saamgevoeg {T} in {0}",
		emote_ownership_transferred: "Eienaarskap oorgedra van {T} na {U}",
		emote_restored: "Herstel {T}",
		emote_updated: "Eienskappe vir {T} is verander",
		emote_deleted: "Het {T} uitgevee",
		emote_processed: "Executed a new processing job for {T}",
		emote_version_created: "Geskep weergawe '{VER}' vir {T}",
		emote_version_renamed: "Hernoem weergawe '{VER}' vir {T} van {1} na {2}",
		emote_version_approved: "Goedgekeurde weergawe '{VER}' vir {T} vir publieke lysinskrywing",
		emote_version_restored: "Herstel weergawe '{VER}' vir {T}",
		emote_version_deleted: "Weergawe '{VER}' vir {T} is uitgevee",
		user_created: "Geskep {T}",
		user_deleted: "Het {T} uitgevee",
		user_editor_added: "Bygevoeg {U} as 'n redigeerder",
		user_editor_added_other: "Bygevoeg {U1} as 'n redakteur van {U2}",
		user_editor_removed: "Het {U} se redakteursregte herroep",
		user_editor_removed_other: "Het {U1} se redigeerderregte op {U2} herroep",
		user_banned: "Verban {T}",
		user_unbanned: "Onbebanned {T}",
		user_updated: "Eienskappe vir {T} is verander",
		user_sign_in: "{T} het aangemeld",
		user_sign_out: "{T} het afgemeld",
		user_forbidden: "{T} is toegang tot {0} geweier",
		emote_set_created: "Geskep {T}",
		emote_set_emote_added: "Het die emosie {AE} by {T} gevoeg",
		emote_set_emote_removed: "Het die emosie {AE} van {T} verwyder",
		emote_set_emote_renamed: "Hernoem die emosie {AE} van {O} na {N} in {T}",
		emote_set_updated: "Eienskappe vir {T} is verander",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Voeg Emote by",
		author: "Bygevoeg deur",
		created_at: "Geskep",
		versions: "Weergawes",
		preview_loading: "Laai tans voorskoue... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Kon nie voorskoue laai nie",
		processing: "Verwerk Emote - dit kan 'n rukkie neem.",
		use: "Gebruik Emote",
		switch_version: "Skakel oor na hierdie weergawe",
		in_n_sets: "in {0} stel | in {0} stelle",
		disable: "Deaktiveer Emote",
		update: "Opdateer",
		report: "Rapporteer Emote",
		makePrivate: "Maak privaat",
		makeGlobal: "Maak Global",
		comments: "Kommentaar",
		channels: "Kanale",
		common_names: "Ander name vir hierdie emote",
		usage_stats: "Emote statistieke",
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
			searching: "Soek",
			emote_count: "{0} Emosies",
			no_emotes_listed: "Geen emosies gevind nie",
			fetching_slowly: "Jammer, dit lyk asof dit 'n rukkie neem",
		},
		upload: {
			emote_name: "Emosie Naam",
			version_name: "Emosie Naam",
			version_description: "Weergawe beskrywing",
			submit_emote: "Gee emosie in",
			create_emote_version: "Skep Emote-weergawe",
			image_upload: "Laai prent op",
			accepted_formats: "Aanvaarde formate",
			filetype: "Lêer",
			animation: "Animasie",
			transparency: "Deursigtigheid",
			emote_details: "Emosie Besonderhede",
			version_details: "Weergawe besonderhede",
			attribution: "Toeskrywing",
			original_creator: "Oorspronklike Skepper",
			as_child: "Jy skep tans 'n {IS_DIVERGED} weergawe van {0}. ",
			content_moderation: "Inhoud Moderering",
			half_transparency_tooltip:
				"Pixels kan slegs heeltemal deursigtig of heeltemal ondeursigtig wees (geen veranderlike deursigtigheid nie)",
		},
	},
	emote_set: {
		create: "Nuwe @:common.object.emote_set",
		select: "Kies @:common.object.emote_set",
		explain: {
			section: "Wat is @:common.object.emote_set{'s'}?",
			hint: "Emote-stelle is 'n versameling emosies wat aan jou kanale gebind kan word of met ander gebruikers gedeel kan word.",
		},
		no_space: "Gleuwe Vol",
		none_selected: "Geen stel gekies nie",
		editing: "Redigering {0}",
		owner: "{USER} se emosiestel",
		owned: "Emote stel eienaar",
		label_renamed: "Hernoem",
		label_conflict: "Konflik",
		label_default: "Verstek",
		modal: {
			selected_channel_count: "geen kanaal gekies nie | {0} kanaal gekies | {0} kanale gekies",
			create_button: "Skep @:common.object.emote_set",
			rename_in_set: "Hernoem in {0}",
			context_rename: "Pas Emoticon Naam aan",
			context_set_default: "Ken as verstek toe",
			context_unset_default: "Onttrek as verstek",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Stel Emosies",
		channel_emotes: "Kanaal Emotes",
		joined_at: "Aangesluit by {0}",
		editors: "Redakteurs",
		roles: "Rolle",
		connections: "Kanale | Kanale en rekeninge",
		new_connections: "Koppel rekeninge...",
		no_channel_emotes: "{0} het geen emosie op hul {1}-kanaal nie",
		no_channels: "{0} het geen kanale gekoppel nie!",
		card: {
			view_full_profile: "Bekyk volledige profiel",
		},
		settings: {
			button: "Wysig profiel",
			section_profile: "Profiel",
			username: "Gebruikersnaam",
			display_name: "Vertoon Naam",
			profile_picture: "Profielfoto",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Rapporteer",
		emote_reason: {
			i_made_this: "Ek het hierdie emote gemaak, maar dit is deur iemand anders opgelaai",
			duplicate: "Hierdie emosie is 'n duplikaat",
			pornographic: "Hierdie emosie bevat pornografiese of oordrewe geseksualiseerde beelde",
			violence_gore: "Hierdie emosie toon uiterste geweld of bloed",
			i_appear_there: "Hierdie emosie beeld my uit en ek hou nie daarvan nie",
			offensive: "Ek vind hierdie emosie aanstootlik",
			other: "Lets anders",
		},
		uncategorized_prompt: "Wat makeer?",
		details: "Besonderhede (bykomende inligting en/of bewyse vir jou verslag)",
		success: "Verslag suksesvol ingedien",
		notify: "Jy sal via die inkassie in kennis gestel word sodra jou verslag verwerk is of verdere inligting aangevra is.",
		complete_step_one: "Aanhou",
		abuse_notice: "Misbruik van die rapporteerkenmerk kan daartoe lei dat jou toegang herroep word.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Inboks",
		tabs: {
			all: "Alle boodskappe",
			unread: "Ongelees",
			important: "Belangrik",
		},
		unread_tag: "Ongelees",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote goedgekeur vir notering",
				content: `
# Jou emosie "{EMOTE_NAME}" is goedgekeur vir lys \n
Dit sal nou beskikbaar wees op die Emote Directory en sal begin verskyn op @: common.appHost {'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote nie goedgekeur vir notering nie",
				content: `
# Jou emosie "{EMOTE_NAME}" is verwerp
Dit sal nie beskikbaar wees via die publieke Emote Directory of sigbaar wees op @: common.appHost,
maar sal beskikbaar bly vir gebruikers met die skakel.
`,
			},
			emote_ownership_claim_request: {
				subject: "Uitnodiging om eienaarskap van 'n emosie op te eis",
				content: `
## {OWNER_DISPLAY_NAME} wil hê jy moet die eienaar van '{EMOTE_NAME}' word

[Bekyk emosie] ({EMOTE_URL})

** [Aanvaar versoek] ({EMOTE_CLAIM_URL}) ** | [Verwerp versoek] ({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Jy is verban",
				reason: {
					pornographic_content: "",
				},
				content: `
# Rekening verban
Jou toegang tot @: common.appName is nou beperk. <br/> <br/>
### Rede vir hierdie aksie
{BAN_REASON} <br/> <br/>
### Beperkings toegepas <br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/> Hierdie besluit verval ** {BAN_EXPIRE_AT} **.
_As jy glo dat dit 'n fout is, stuur asseblief 'n e-pos aan @: common.supportEmail {'.'} _
`,
				effect: {
					no_permissions: "Jy mag nie meer interaksie met die toepassing hê nie",
					no_auth: "Jy mag nie meer aanmeld nie",
					no_ownership: "Enige inhoud wat jy geskep het, sal nie meer beskikbaar wees nie",
					memory_hole: "Jy sal nie sigbaar wees vir ander gebruikers nie",
					ip_blocked: "Jou IP is geblokkeer om toegang tot alle @: common.appName-dienste te kry",
				},
			},
			report_closed: {
				subject: "Verslag gesluit",
				content: `
Dankie dat jy ons in kennis gestel het, jou verslag {'#'}{CASE_ID} is hanteer.`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Ons kon dit nie vind nie",
		doctor_wtf: "De hel is dit?",
		pot_friend: "Ek is 'n pot, vriend",
	},
};
