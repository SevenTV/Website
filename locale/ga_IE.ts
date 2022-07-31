export default {
	locale: "Gaeilge (Éireann)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Tuilleadh eolais",
		more: "Níos mó",
		retry: "Atriail",
		downloads: "Íoslódálacha",
		features: "Gnéithe",
		comments: "Tráchtanna",
		search: "Cuardaigh",
		update: "Nuashonrú",
		report: "Tuarascáil",
		activity: "Activity",
		loading: "Loading",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "Úsáideoir",
			emote_set: "Foireann Straoiseog",
			emote: "Straoiseog",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "An Iargúlta do Gach Ardán",
		app_description: "A bhainistiú na céadta de straoiseoga do do Bpreabfaidh nó bealaí YouTube gan stró",
		why_app: "Cén fáth @:common.appName{'?'}",
		download_browser: "Síneadh Bhrabhsálaí",
		download_mobile: "Aip Mhóibíleach",
		download_misc: "Apps Eile",
		features: {
			emote_sets: {
				name: "Emote Leagann",
				detail: "Grúpa straoiseoga i customizable leagann gur féidir a roinnt le húsáideoirí eile nó go tapa a mhalartú isteach do an cainéal.",
			},
			many_emote_slots: {
				name: "Na céadta straoiseog sliotáin",
				detail: "Tús a chur leis an {0} sliotán, leis ar féidir uasmhéid de {1} agus aon paywall.",
			},
			channel_emote_names: {
				name: "In aghaidh an-cainéal iargúlta ainmneacha",
				detail: "Nár thaitin an t-ainm a thug an t-údar ar iomaire? Sin ceart, is féidir leat é a athrú do do chainéil amháin.",
			},
			real_time: {
				name: "Fíor-ama",
				detail: "Athrú straoiseoga i do cainéal a tharlaíonn sé láithreach, le haghaidh gach lucht féachana. Aon F5 ag teastáil.",
			},
			emote_versions: {
				name: "Iargúlta Versioning",
				detail: "Babhtála idir téamaí leagan nó a thabhairt cothrom le dáta ar straoiseog chun an leagan feabhsaithe.",
			},
			next_gen: {
				name: "Next-gen formáidí íomhá cosúil leis WEBP agus AVIF",
				detail: "Úsáid againn níos nuaí, níos mó optamaithe le formáidí íomhá a laghdú ar úsáid bandaleithead.",
			},
			source_available: {
				name: "Foinse-ar fáil",
				detail: "Ár ar fad codebase ar fáil ar GitHub le foinse atá ar fáil cheadúnais. Is féidir aon duine féachaint ar agus cur.",
			},
		},
		socials: {
			discord: "Bí @:common.appName ar Discord",
			discord_online_count: "{0} ar líne anois",
			twitter: "Lean orainn ar Twitter",
			github: "Cur",
		},
	},
	// Nav Bar
	nav: {
		home: "Baile",
		about: "Faoi",
		emotes: "Straoiseoga",
		store: "Liostáil",
		admin: "Riarachán",
		sign_in: "Sínigh isteach",
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
		emote_processed: "Executed a new processing job for {T}",
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
		add: "Cuir straoiseog",
		author: "Curtha leis ag",
		created_at: "Cruthaithe ag",
		versions: "Leaganacha",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Úsáid",
		switch_version: "Aistrigh go dtí an leagan seo",
		in_n_sets: "i {0} socraigh | ar an {0} leagann",
		disable: "Dhíchumasú Straoiseog",
		update: "Nuashonrú",
		report: "Tuairisce Straoiseog",
		makePrivate: "Dhéanamh Príobháideach",
		makeGlobal: "Make Global",
		comments: "Tráchtanna",
		channels: "Cainéil",
		common_names: "Other names for this emote",
		usage_stats: "Emote Statistics",
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
			searching: "Ag cuardach",
			emote_count: "{0} straoiseoga",
			no_emotes_listed: "Straoiseoga gan aimsiú",
			fetching_slowly: "Brón, is cosúil go bhfuil sé seo ag cur le tamall",
		},
		upload: {
			emote_name: "Ainm Straoiseog",
			version_name: "Ainm Leagan",
			version_description: "Cur síos ar leagan",
			submit_emote: "Cuir isteach straoiseog",
			create_emote_version: "Cruthaigh Leagan Straoiseog",
			image_upload: "Uaslódáil Íomhá",
			accepted_formats: "Formáidí Glactha",
			filetype: "Comhad",
			animation: "Beochan",
			transparency: "Trédhearcacht",
			emote_details: "Sonraí a straoiseog",
			version_details: "Sonraí an Leagan",
			attribution: "Admháil",
			original_creator: "Cruthaitheoir Bunaidh",
			as_child: "Tá tú ag a chruthú {IS_DIVERGED} leagan ar an {0}. ",
			content_moderation: "Modhnóireacht ábhair",
			half_transparency_tooltip:
				"Pixel ach is féidir a bheith go hiomlán trédhearcach nó go hiomlán teimhneach (aon athróg trédhearcacht)",
		},
	},
	emote_set: {
		create: "Cruthaigh @:common.object.emote_set",
		select: "Roghnaigh @:common.object.emote_set",
		explain: {
			section: "Cad iad @:common.object.emote_set{'s'}?",
			hint: "Straoiseog Leagann an bhfuil bailiúchán de na straoiseoga is féidir a bheith ceangailte le do cainéil nó roinnte le húsáideoirí eile.",
		},
		no_space: "Sliotáin Iomlán",
		none_selected: "Níl Aon Leagtha Roghnaithe",
		editing: "Eagarthóireacht ar an {0}",
		owner: "{USER}'s a Leagtar Iargúlta",
		owned: "Úinéireacht Straoiseog Leagtha",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "níl aon cainéal roghnaithe | {0} cainéal roghnaithe | {0} cainéil roghnaithe",
			create_button: "Cruthaigh @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Straoiseog Leagann",
		channel_emotes: "Channel Straoiseoga",
		joined_at: "Joined {0}",
		editors: "Eagarthóirí",
		roles: "Róil",
		connections: "Channels | Channels & Accounts",
		new_connections: "Link accounts...",
		no_channel_emotes: "{0} nach bhfuil aon emote ar a n - {1} channel",
		no_channels: "{0} nach bhfuil aon cainéil ceangailte!",
		card: {
			view_full_profile: "Féach Ar Phróifíl Iomlán",
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
		report: "Tuarascáil",
		emote_reason: {
			i_made_this: "Rinne mé seo ar emote ach bhí sé a uaslódáil ag duine éigin eile",
			duplicate: "Seo straoiseog dúblach",
			pornographic: "Seo straoiseog tá pornagrafach nó ró sexualized imagery",
			violence_gore: "Seo iargúlta taispeántais mhór foréigean nó gore",
			i_appear_there: "Seo straoiseog léiríonn me agus ní maith liom sé",
			offensive: "Bhfaighidh mé seo emote ionsaitheach",
			other: "Rud éigin eile",
		},
		uncategorized_prompt: "Cad é an t-ábhar?",
		details: "Sonraí (eolas breise agus/nó fianaise ar do tuarascáil)",
		success: "Tuairisc curtha faoi bhráid go rathúil a",
		notify: "Beidh tú in iúl tríd an r-phost nuair a bhfuil do tuarascáil a láimhseáil nó tuilleadh eolais a iarradh.",
		complete_step_one: "Leanúint ar aghaidh",
		abuse_notice: "Mí-úsáid an tuarascáil gné d ' fhéadfadh do rochtain á chúlghairm.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "R-phost isteach",
		tabs: {
			all: "Gach Teachtaireachtaí",
			unread: "Neamhléite",
			important: "Tábhachtach",
		},
		unread_tag: "Neamhléite",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Straoiseog Ceadaithe le haghaidh Liosta",
				content: `
# Do emote "{EMOTE_NAME}" a bhí ceadaithe do liosta \n
Beidh sé a bheith anois ar fáil ar an Emote Eolaire agus tús a chur le feiceáil ar @:coitianta.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote Nach Ceadaithe le haghaidh Liosta",
				content: `
# Do emote "{EMOTE_NAME}" a bhí diúltaithe
Ní bheidh sé a bheith ar fáil tríd an bpobal ar Emote Eolaire nó le feiceáil ar @:coitianta.appHost,
ach beidh sé fós ar fáil le haghaidh úsáideoirí a bhfuil an nasc.
`,
			},
			emote_ownership_claim_request: {
				subject: "Cuireadh chun éileamh úinéireacht ar emote",
				content: `
## {OWNER_DISPLAY_NAME} ba mhaith leat a bheith ar an úinéir '{EMOTE_NAME}'

[Féach ar Emote]({EMOTE_URL})

**[Glacadh leis an Iarratas]({EMOTE_CLAIM_URL})** | [Meath Iarraidh]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Tá tú toirmeasc",
				reason: {
					pornographic_content: "",
				},
				content: `
# Cuntas Toirmiscthe
Do rochtain ar @:common.appName tá teoranta anois. <br/><br/>
### Cúis leis an ngníomh seo
{BAN_REASON} <br/><br/>
### Srianta i bhFeidhm <br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/> Téann an cinneadh seo in éag **{BAN_EXPIRE_AT}**.
_Má chreideann tú gur botún é seo, seol ríomhphost chuig @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "Ní féidir leat idirghníomhú leis an aip seo a thuilleadh",
					no_auth: "Ní féidir leat síniú isteach a thuilleadh",
					no_ownership: "Ní bheidh aon ábhar a chruthaigh tú ar fáil a thuilleadh",
					memory_hole: "Ní bheidh tú infheicthe ag úsáideoirí eile",
					ip_blocked: "Tá bac ar do IP a rochtain go léir @:common.appName services",
				},
			},
			report_closed: {
				subject: "Report closed",
				content: `
Thank you for notifying us, your report {'#'}{CASE_ID} has been handled.
				`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Níorbh fhéidir linn é a fháil",
		doctor_wtf: "Cad é an diabhal é seo?",
		pot_friend: "Is pota mé, cara",
	},
};
