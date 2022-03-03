export const en_US = {
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Learn More",
		downloads: "Downloads",
		comments: "Comments",
		search: "Search",

		object: {
			user: "User",
			emote_set: "Emote Set",
			emote: "Emote",
		},
	},

	// Text that appears on the home page
	home: {
		slogan: "It's like a third party thing",
		app_description: "A new emote service and extension for Twitch",
	},

	// Navigation
	nav: {
		home: "Home",
		about: "About",
		emotes: "Emotes",
		store: "Subscribe",
		admin: "Admin",
		sign_in: "Sign In",
	},

	// Text that is relevant to emotes
	emote: {
		author: "Added by",
		created_at: "Created",
		versions: "Versions",
		addToChannel: "Add To Channel",
		removeFromChannel: "Remove From Channel",
		update: "Update Emote",
		report: "Report Emote",
		makePrivate: "Make Private",
		makeGlobal: "Make Global",
		comments: "Comments",
		channels: "Channels",

		list: {
			searching: "Searching",
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
			moderation_notice:
				"Your emote will be set unlisted until it is reviewed by a moderator, however you may still enable the emote or share it with others. Please avoid submitting pornographic or overly sexual content, or content which may otherwise be unsafe to show on a live broadcast.",
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

		no_channel_emotes: "{0} does not have any emote on their {1} channel",
		no_channels: "{0} doesn't have any channels connected!",
	},

	store: {},

	// Text that is relating to the reporting system
	reporting: {
		report: "Report",
		emote_reason: {
			i_made_this: "I made this emote but it was uploaded by someone else",
			duplicate: "This emote is a duplicate",
			pornographic: "This emote contains pornographic or overly sexualized imagery",
			violence_gore: "This emote displays extreme violence or gore",
			i_appear_there: "This emote depicts me and I don't like it",
			offensive: "I find this emote offensive",
			other: "Something else",
		},
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
			client_banned: {
				subject: "You've been banned",
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
					no_permissions: "* You may no longer interact with the app",
					no_auth: "* You may no longer sign in",
					no_ownership: "* Any content you created will no longer be available",
					memory_hole: "* You won't be visible to other users",
					ip_blocked: "* Your IP is blocked from accessing all @:common.appName services",
				},
			},
		},
	},

	// 404 Messages
	notFound: {
		troll_despair: "We couldn't find it",
		doctor_wtf: "The hell's this?",
	},
};
