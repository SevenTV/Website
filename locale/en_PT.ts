export default {
	locale: "English (Pirate)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Learn Moarr",
		more: "Moarr",
		retry: "Retry",
		downloads: "Booty",
		features: "Featurrr-es",
		comments: "Comments",
		search: "Searrrch",
		update: "Update",
		report: "Report",
		activity: "Activity",
		object: {
			user: "Pirate",
			emote_set: "Emote Set",
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
				name: "Emote Versioning",
				detail: "Swap between themed variants or update an emote to an improved version.",
			},
			next_gen: {
				name: "Next-gen image formats like WEBP and AVIF",
				detail: "We use newer, more optimized image formats to reduce bandwidth usage.",
			},
			source_available: {
				name: "Source-available",
				detail: "Arr entire blueprint be available on GitHub wit' a source-available letter o' marque. Any pirate can view 'n contribute.",
			},
		},
		socials: {
			discord: "Join @:common.appName on Discord",
			discord_online_count: "{0} sailers online",
			twitter: "Follow us on Twitter",
			github: "Contribute",
		},
	},
	// Nav Bar
	nav: {
		home: "Main Deck",
		about: "About",
		emotes: "Emotes",
		store: "Brothel",
		admin: "Captain's Quarters",
		sign_in: "Join Aboard",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Add Emote",
		author: "Added by",
		created_at: "Forged",
		versions: "Versions",
		use: "Use Emote",
		switch_version: "Switch to 'tis version",
		in_n_sets: "be in {0} set | be in {0} sets",
		disable: "Let th' Emote walk the plank",
		update: "Amend",
		report: "Report Emote",
		makePrivate: "Make Private",
		makeGlobal: "Make Global",
		comments: "Comments",
		channels: "Channels",
		common_names: "Other names for this emote",
		usage_stats: "Emote Statistics",
		list: {
			searching: "Searrrchin'",
			emote_count: "{0} emotes",
			no_emotes_listed: "No emotes found",
			fetching_slowly: "Arrgh, 'tis be takin' a while",
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
			as_child: "Yar be creatin' a {IS_DIVERGED} version o' {0}. ",
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
			hint: "Emote Sets be a collection o' emotes which can be bound t' yer channels or shared wit' other pirates.",
		},
		no_space: "Slots Full",
		none_selected: "No Set Selected",
		editing: "Editing {0}",
		owner: "{USER}'s Emote Set",
		owned: "Owned Emote Set",
		modal: {
			selected_channel_count: "no channel selected | {0} channel selected | {0} channels selected",
			create_button: "Create @:common.object.emote_set",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Sets",
		channel_emotes: "Channel Emotes",
		editors: "Crew",
		roles: "Jobs",
		no_channel_emotes: "{0} has nay emotes on ther {1} channel",
		no_channels: "{0} nay has any ships fastened!",
		card: {
			view_full_profile: "View Yer-self",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Report",
		emote_reason: {
			i_made_this: "Me made 'tis emote but it be uploaded by another gentleman o' fortune",
			duplicate: "'Tis emote be a forgery",
			pornographic: "'Tis emote holds pornographic or overly sexualized imagery",
			violence_gore: "'Tis emote exhibits' extreme violence or gore",
			i_appear_there: "'Tis emote depicts me n' I nay like it",
			offensive: "Me find 'tis emote offensive",
			other: "Somethin' else",
		},
		uncategorized_prompt: "What be the matter?",
		details: "Details (additional info an'/or evidence fer yer report)",
		success: "Report be victoriously submitted",
		notify: "You will be notified via the inbox once your report is handled or further information is requested.",
		complete_step_one: "Continue",
		abuse_notice: "Abuse of the report feature may lead to your access being revoked.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Inbox",
		tabs: {
			all: "All Messages",
			unread: "Unread",
			important: "Important",
		},
		unread_tag: "Unread",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Yer emote be found worthy to set sail fer the seas",
				content: `
# Yer emote "{EMOTE_NAME}" be found sanctioned to set sail \n
It will now be found on the Emote Directory 'n begin appearin' on @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Yer emote be unsuit for sailing the seas, matey",
				content: `
# Yer emote "{EMOTE_NAME}" be unworthy to set sail. 
It will nah be available via the public Emote Directory or seen on @:common.appHost,
but will remain available fer users wit' the link.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitation to become th' captain of an emote",
				content: `
## {OWNER_DISPLAY_NAME} wants ye t' be the captain of '{EMOTE_NAME}'

[View Emote]({EMOTE_URL})

**[Accept Request]({EMOTE_CLAIM_URL})** | [Decline Request]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Yar've been banished to Davy Jones' Locker",
				reason: {
					pornographic_content: "",
				},
				content: `
# Account Banished
Your sailor status to @:common.appName is now limited.<br/><br/>
### Reason for this action
{BAN_REASON} <br/><br/>
### Restrictions Applied<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>This decision expires **{BAN_EXPIRE_AT}**.
_If you believe thi' a drunkened decision, send a messenger bird @:common.supportEmail{'.'}_
 
en_US.inbox.generic.client_banned.content.0
`,
				effect: {
					no_permissions: "* Ye shall no longer interact wit' th' app ye scurvy",
					no_auth: "* You may no longer sign in",
					no_ownership: "* Any content ye made shall no longer be found ye scurvy",
					memory_hole: "* Ye won't be seen by other pirates",
					ip_blocked: "* Yar IP be blocked from accessin' all @:common.appName services",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "We could nah find th' treasure, matey",
		doctor_wtf: "What in Davy Jones's this?",
		pot_friend: "Me be a pot, matey",
	},
};
