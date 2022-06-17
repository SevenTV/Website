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
		features: "Features",
		comments: "Kommentarer",
		search: "Søg",
		update: "Opdater",
		report: "Rapporter",
		object: {
			user: "Bruger",
			emote_set: "Emote sæt",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "The Emote Platform for All",
		app_description: "Manage hundreds of emotes for your Twitch or YouTube channels with ease",
		why_app: "Why @:common.appName{'?'}",
		download_browser: "Browser Extension",
		download_mobile: "Mobile Apps",
		download_misc: "Other Apps",
		features: {
			emote_sets: {
				name: "Emote Sets",
				detail: "Group emotes in customizable sets that can be shared with other users or quickly swapped onto your channel.",
			},
			many_emote_slots: {
				name: "Hundreds of emote slots",
				detail: "Start with {0} slots, with a possible maximum of {1} and no paywall.",
			},
			channel_emote_names: {
				name: "Per-channel emote names",
				detail: "Don't like the name given to an emote by its author? That's fine, you can change it for your channel only.",
			},
			real_time: {
				name: "Real-time",
				detail: "Changing emotes in your channel happens instantly, for all viewers. No F5 required.",
			},
			emote_versions: {
				name: "Emote versionering",
				detail: "Swap between themed variants or update an emote to an improved version.",
			},
			next_gen: {
				name: "Next-gen image formats like WEBP and AVIF",
				detail: "We use newer, more optimized image formats to reduce bandwidth usage.",
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
		store: "Subscribe",
		admin: "Admin",
		sign_in: "Log på",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Add Emote",
		author: "Added by",
		created_at: "Created",
		versions: "Versions",
		use: "Use Emote",
		switch_version: "Switch to this version",
		in_n_sets: "in {0} set | in {0} sets",
		disable: "Disable Emote",
		update: "Update",
		report: "Report Emote",
		makePrivate: "Make Private",
		makeGlobal: "Make Global",
		comments: "Comments",
		channels: "Channels",
		list: {
			searching: "Søger",
			emote_count: "{0} emotes",
			no_emotes_listed: "No emotes found",
			fetching_slowly: "Sorry, it seems this is taking a while",
		},
		upload: {
			emote_name: "Emote Name",
			version_name: "Version Name",
			version_description: "Version Description",
			submit_emote: "Submit Emote",
			create_emote_version: "Create Emote Version",
			image_upload: "Image Upload",
			accepted_formats: "Accepted Formats",
			filetype: "File",
			animation: "Animation",
			transparency: "Transparency",
			emote_details: "Emote Details",
			version_details: "Version Details",
			attribution: "Attribution",
			original_creator: "Original Creator",
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
			violence_gore: "This emote displays extreme violence or gore",
			i_appear_there: "This emote depicts me and I don't like it",
			offensive: "I find this emote offensive",
			other: "Noget andet",
		},
		uncategorized_prompt: "What's the matter?",
		details: "Details (additional info and/or evidence for your report)",
		success: "Report submitted successfully",
		notify: "You will be notified via the inbox once your report is handled or further information is requested.",
		complete_step_one: "Continue",
		abuse_notice: "Abuse of the report feature may lead to your access being revoked.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Indbakke",
		tabs: {
			all: "All Messages",
			unread: "Unread",
			important: "Important",
		},
		unread_tag: "Unread",
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
					no_permissions: "* You may no longer interact with the app",
					no_auth: "* You may no longer sign in",
					no_ownership: "* Alt indhold, du har oprettet, vil ikke længere være tilgængeligt",
					memory_hole: "* Du vil ikke være synlig for andre brugere",
					ip_blocked: "* Your IP is blocked from accessing all @:common.appName services",
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
