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
		activity: "Activity",
		loading: "Loading",
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
		add: "Voeg Emote by",
		author: "Bygevoeg deur",
		created_at: "Geskep",
		versions: "Weergawes",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
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
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "geen kanaal gekies nie | {0} kanaal gekies | {0} kanale gekies",
			create_button: "Skep @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Stel Emosies",
		channel_emotes: "Kanaal Emotes",
		editors: "Redakteurs",
		roles: "Rolle",
		no_channel_emotes: "{0} het geen emosie op hul {1}-kanaal nie",
		no_channels: "{0} het geen kanale gekoppel nie!",
		card: {
			view_full_profile: "Bekyk volledige profiel",
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
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Ons kon dit nie vind nie",
		doctor_wtf: "De hel is dit?",
		pot_friend: "Ek is 'n pot, vriend",
	},
};
