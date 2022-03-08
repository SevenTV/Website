export const en_PI = {
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Learn More",
		more: "More",
		retry: "Retry",
		downloads: "Downloads",
		comments: "Comments",
		search: "Searrrch",
		object: {
			user: "User",
			emote_set: "Emote Set",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "It be like a third parrrty thin'",
		app_description: "A new emote service n' extension fer Twitch",
	},
	// Navigation
	nav: {
		home: "Main Deck",
		about: "About",
		emotes: "Emotes",
		store: "Subscribe",
		admin: "Captain's Quarters",
		sign_in: "Sign In",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Add Emote",
		author: "Added by",
		created_at: "Created",
		versions: "Versions",
		use: "Use Emote",
		switch_version: "Switch to 'tis version",
		in_n_sets: "be in {0} set | be in {0} sets",
		disable: "Disable Emote",
		update: "Update Emote",
		report: "Report Emote",
		makePrivate: "Make Private",
		makeGlobal: "Make Global",
		comments: "Comments",
		channels: "Channels",
		list: {
			searching: "Searrrchin'",
			emote_count: "{0} emotes",
			no_emotes_listed: "Nay emotes be discovered",
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
			moderation_notice:
				"Yar emote be set t' unlisted until it be reviewed by a captain, however ye may still enable th' emote or share it wit' others. Please avoid submittin' pornographic or overly sexual content, or content which may otherwise be unsafe t' show on a live broadcast.",
			half_transparency_tooltip:
				"Pixels can only be fully transparent or fully opaque (no variable transparency)",
		},
	},
	emote_set: {
		create: "New @:common.object.emote_set",
		select: "Select @:common.object.emote_set",
		explain: {
			section: "What be @:common.object.emote_set{'s'}?",
			hint: "Emote Sets be a collection o' emotes which can be bound t' yar channels or shared wit' other users.",
		},
		no_space: "Slots Full",
		modal: {
			selected_channel_count: "no channel selected | {0} channel selected | {0} channels selected",
			create_button: "Create @:common.object.emote_set",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Sets",
		channel_emotes: "Channel Emotes",
		editors: "Editors",
		no_channel_emotes: "{0} nay has any emotes on thar {1} channel",
		no_channels: "{0} nay has any channels connected!",
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Report",
		emote_reason: {
			i_made_this: "Me made 'tis emote but it be uploaded by someone else",
			duplicate: "'Tis emote be a duplicate",
			pornographic: "'Tis emote contains pornographic or overly sexualized imagery",
			violence_gore: "'Tis emote displays extreme violence or gore",
			i_appear_there: "'Tis emote depicts me n' I nay like it",
			offensive: "I find 'tis emote offensive",
			other: "Somethin' else",
		},
		complete_step_one: "Continue",
		abuse_notice: "Abuse o' th' report feature may lead t' yar access bein' revoked.",
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
			client_banned: {
				subject: "Yar've been banned",
				content: "".concat(
					"# Account Banned  \n",
					"Your access to @:common.appName is now limited.<br/><br/>\n",
					"### Reason for this action\n",
					"{BAN_REASON} <br/><br/>\n",
					"### Restrictions Applied<br/>\n",
					"{EFFECT_NO_PERMISSIONS} \n",
					"{EFFECT_NO_AUTH} \n",
					"{EFFECT_NO_OWNERSHIP} \n",
					"{EFFECT_MEMORY_HOLE} \n",
					"\r<br/>",
					"This decision expires **{BAN_EXPIRE_AT}**. \n",
					"_If you believe this is an error, please email @:common.supportEmail{'.'}_ \n"
				),
				effect: {
					no_permissions: "* Ye may no longer interact wit' th' app",
					no_auth: "* Ye may no longer sign in",
					no_ownership: "* Any content ye created will nay be available",
					memory_hole: "* Ye won't be visible to other users",
					ip_blocked: "* Yar IP be blocked from accessin' all @:common.appName services",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "We could nah find it",
		doctor_wtf: "Th' hell be 'tis?",
		pot_friend: "Me be a pot, matey",
	},
};
