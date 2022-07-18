export default {
	locale: "English (Pirate)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Learn Moarr",
		more: "Moarr",
		retry: "Resail",
		downloads: "Booty",
		features: "Featurrr-es",
		comments: "Scrobbles",
		search: "Searrrch",
		update: "Amend",
		report: "Tattle",
		activity: "Bounties",
		loading: "Sailing",
		object: {
			user: "Pirate",
			emote_set: "Emote in Deck",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "The Emote Platform fer All",
		app_description: "Manage hundreds o' emotes fer yer Twitch or YouTube channels wit' ease",
		why_app: "Why @:common.appName{'?'}",
		download_browser: "Brow-serr Extension",
		download_mobile: "Movin' Trinkets",
		download_misc: "Otherrr Trinkets",
		features: {
			emote_sets: {
				name: "Emote Chests",
				detail: "Group emotes in changeable chests that ye can share wit' other pirates or handsomely swapped onto yer ship.",
			},
			many_emote_slots: {
				name: "Bounty o' emote slots",
				detail: "Begin wit' {0} slots, wit' a doable most o' {1} and no rum-expense.",
			},
			channel_emote_names: {
				name: "Per-ship treasure names",
				detail: "Don't like the name given t' an emote by its authurrr? That's fine, ye can change it fer yer channel only.",
			},
			real_time: {
				name: "Real-time",
				detail: "Changin' emotes on yer ship 'appens instantly, fer all yer viewers. No F5 required.",
			},
			emote_versions: {
				name: "Emote versionin'",
				detail: "Swap between pirated variants or forge an emote t' a betterr' vurrsion.",
			},
			next_gen: {
				name: "Next-gen image formats like WEBP 'n AVIF laddy",
				detail: "We use newerrr' n' more optimized image formats t' reduce bandwidth usage.",
			},
			source_available: {
				name: "Sourrrrce-available",
				detail: "Arr entire blueprint be available on GitHub wit' a source-available letter o' marque. Any pirate can view 'n contribute.",
			},
		},
		socials: {
			discord: "Join @:common.appName crew on Discord",
			discord_online_count: "{0} sailers online",
			twitter: "Join our ship on Twitter",
			github: "'elp us",
		},
	},
	// Nav Bar
	nav: {
		home: "Main Deck",
		about: "Map",
		emotes: "Treasure",
		store: "Brothel",
		admin: "Captain's Quarters",
		sign_in: "Join Aboard",
		wip_notice: {
			heading: "Greetings' onboard to ze new @:common.appName website",
			text1: "T'is be a early view of ze next ship to experience @:common.appName{'.'}",
			text2: "Sail through what be new n' hand us some feedback! Ahoy, it be undergoing hasty changes n' may sink frequently.",
		},
	},
	activity: {
		emote_created: "Created {T}",
		emote_renamed: "{ICO} Renamed {T} from {O} to {N}",
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
		user_editor_added: "Added {T} as an editor",
		user_editor_added_other: "Added {U1} as an editor of {U2}",
		user_editor_removed: "Removed {U} as an editor",
		user_editor_removed_other: "Removed {U1} as an editor of {U2}",
		user_banned: "Banished {T}",
		user_unbanned: "Unbanned {T}",
		user_updated: "Changed properties for {T}",
		user_sign_in: "{T} has hopped on board",
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
		add: "Add ye Emote",
		author: "Discovered by",
		created_at: "Forged",
		versions: "Versions",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Use 'tis Emote",
		switch_version: "Switch to 'tis version",
		in_n_sets: "be in {0} set | be in {0} sets",
		disable: "Let th' Emote walk the plank",
		update: "Amend",
		report: "Tattle tis' Emote",
		makePrivate: "Make th' Emote yer own",
		makeGlobal: "Make Global",
		comments: "Scrobbles",
		channels: "Ships",
		common_names: "Otherrr titles for yis' emote",
		usage_stats: "Emote Lore",
		list: {
			searching: "Searrrchin'",
			emote_count: "{0} emotes in the chest",
			no_emotes_listed: "Nay emotes be discovered",
			fetching_slowly: "Arrgh, 'tis be takin' a while",
		},
		upload: {
			emote_name: "Emote Name",
			version_name: "Version Name",
			version_description: "Version Description",
			submit_emote: "Submit Yer' Emote",
			create_emote_version: "Create Yer' Emote Version",
			image_upload: "Upload Yer' image matey",
			accepted_formats: "Accepted Forrrmats",
			filetype: "File",
			animation: "Animation",
			transparency: "Transparency",
			emote_details: "Emote Details",
			version_details: "Verrrrrsion Details",
			attribution: "Attrrrribution",
			original_creator: "Original Pirate",
			as_child: "Yar be creatin' a {IS_DIVERGED} version o' {0}. ",
			content_moderation: "Content Moderation",
			half_transparency_tooltip:
				"Yer' pixels can only be fully transparent or fully opaque (no variable transparency)",
		},
	},
	emote_set: {
		create: "New @:common.object.emote_set",
		select: "Pick @:common.object.emote_set",
		explain: {
			section: "What be @:common.object.emote_set{'s'}?",
			hint: "Emote Sets be a collection o' emotes which can be bound t' yer channels or shared wit' other pirates.",
		},
		no_space: "Chest Full",
		none_selected: "No Chest Selected",
		editing: "Crafting {0}",
		owner: "{USER}'s Emote Chest",
		owned: "Owned Emote Chest",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "nay ships be selected | {0} channel selected | {0} channels selected",
			create_button: "Create @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Chests",
		channel_emotes: "Deck Emotes",
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
		report: "Tattle",
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
		notify: "Ye will be told with aid of yer scroll once yer report be handled or till further information be requested.",
		complete_step_one: "Bring a Spring Upon ‘er",
		abuse_notice: "Abuse o' th' report feature may lead t' yar access bein' taken.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Scroll",
		tabs: {
			all: "All Scrolls",
			unread: "Sealed",
			important: "Salient",
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
					no_auth: "* Ye shall no longer join aboard, ye scabby",
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
