export default {
	locale: "Svenska (Sverige)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Läs mer",
		more: "Mer",
		retry: "Försök igen",
		downloads: "Nedladdningar",
		features: "Funktioner",
		comments: "Kommentarer",
		search: "Sök",
		update: "Uppdatera",
		report: "Rapportera",
		activity: "Activity",
		loading: "Loading",
		object: {
			user: "Användare",
			emote_set: "Emote set",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "The Emote Platform for All",
		app_description: "Enkelt hantera hundratals av emotes för din Twitch eller Youtube kanal",
		why_app: "Varför @:common.appName{'?'}",
		download_browser: "Webbläsartillägg",
		download_mobile: "Mobil appar",
		download_misc: "Andra appar",
		features: {
			emote_sets: {
				name: "Emote set",
				detail: "Gruppera emotes i anpassningsbara set som kan delas med andra användare eller snabbt bytas ut till din kanal.",
			},
			many_emote_slots: {
				name: "Hundratals av emote slots",
				detail: "Börja med {0} slots, med ett möjligt maximum av {1} helt gratis.",
			},
			channel_emote_names: {
				name: "Emote namn per kanal",
				detail: "Gillar du inte namnet på en emote given av dess skapare? Det är okej, du kan ändra namnet på den för din kanal.",
			},
			real_time: {
				name: "Realtid",
				detail: "Ändring av emotes på din kanal sker omedelbart för alla tittare. Ingen F5 krävs.",
			},
			emote_versions: {
				name: "Emote versionshantering",
				detail: "Byt mellan temavarianterna eller uppdatera en emote till en förbättrad version.",
			},
			next_gen: {
				name: "Next-gen bildformat som WEBP och AVIF",
				detail: "Vi använder nyare och mer optimerade bildformat för att minska bandbreddsanvändningen.",
			},
			source_available: {
				name: "Källa tillgänglig",
				detail: "Hela vår kodbas finns tillgänglig på GitHub med en källkodslicens. Vem som helst kan se och bidra.",
			},
		},
		socials: {
			discord: "Gå med @:common.appName på Discord",
			discord_online_count: "{0} online nu",
			twitter: "Följ oss på Twitter",
			github: "Bidra",
		},
	},
	// Nav Bar
	nav: {
		home: "Hem",
		about: "Om",
		emotes: "Emotes",
		store: "Prenumerera",
		admin: "Administratör",
		sign_in: "Logga in",
		wip_notice: {
			heading: "Welcome to the new @:common.appName website",
			text1: "This is an early preview of the next way to experience @:common.appName{'.'}",
			text2: "Explore what's new and give us some feedback! Note it will be undergoing rapid changes and may break frequently.",
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
		add: "Lägg till Emote",
		author: "Tillagd av",
		created_at: "Skapad",
		versions: "Versioner",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Använd Emote",
		switch_version: "Byt till den här versionen",
		in_n_sets: "om {0} sätt | i {0} sätt",
		disable: "Inaktivera Emote",
		update: "Uppdatera",
		report: "Rapportera Emote",
		makePrivate: "Gör privat",
		makeGlobal: "Gör global",
		comments: "Kommentarer",
		channels: "Kanaler",
		common_names: "Other names for this emote",
		usage_stats: "Emote Statistics",
		list: {
			searching: "Söker",
			emote_count: "{0} emotes",
			no_emotes_listed: "Inga emotes hittades",
			fetching_slowly: "Förlåt, det verkar som att detta tar ett tag",
		},
		upload: {
			emote_name: "Emote Namn",
			version_name: "Versionsnamn",
			version_description: "Versionens beskrivning",
			submit_emote: "Lägg till Emote",
			create_emote_version: "Skapa Emote Version",
			image_upload: "Ladda upp bild",
			accepted_formats: "Godkända format",
			filetype: "Fil",
			animation: "Animation",
			transparency: "Genomskinlighet",
			emote_details: "Emote Detaljer",
			version_details: "Versionsinformation",
			attribution: "Egenskap",
			original_creator: "Ursprunglig Skapare",
			as_child: "Du skapar en {IS_DIVERGED} version av {0}. ",
			content_moderation: "Moderering av innehåll",
			half_transparency_tooltip:
				"Pixlar kan endast vara helt transparenta eller helt ogenomskinliga (ingen variabel transparens)",
		},
	},
	emote_set: {
		create: "Ny @:common.object.emote_set",
		select: "Välj @:common.object.emote_set",
		explain: {
			section: "Vad är @:common.object.emote_set{'s'}?",
			hint: "Emote Sets är en samling av emotes som kan bindas till dina kanaler eller delas med andra användare.",
		},
		no_space: "Emote platser fulla",
		none_selected: "Inget set valt",
		editing: "Redigering {0}",
		owner: "{USER}'s Emote Set",
		owned: "Ägda Emote Set",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "ingen kanal vald | {0} kanal vald | {0} kanaler valda",
			create_button: "Skapa @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Set",
		channel_emotes: "Kanal Emotes",
		editors: "Redigerare",
		roles: "Roller",
		no_channel_emotes: "{0} har inga emotes på sin {1} kanal",
		no_channels: "{0} har inga kanaler anslutna!",
		card: {
			view_full_profile: "Visa fullständig profil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Rapportera",
		emote_reason: {
			i_made_this: "Jag gjorde denna emote men den laddades upp av någon annan",
			duplicate: "Denna emoten är en dubblett",
			pornographic: "Denna emoten innehåller pornografiskt eller alltför sexualiserat bildspråk",
			violence_gore: "Denna emoten visar extremt våld eller gore",
			i_appear_there: "Denna emoten avbildar mig och jag gillar det inte",
			offensive: "Jag tycker att denna emoten är kränkande",
			other: "Annat",
		},
		uncategorized_prompt: "Vad är problemet?",
		details: "Detaljer (ytterligare information och/ eller bevis för din rapport)",
		success: "Rapporten har skickats",
		notify: "Du kommer att meddelas via inkorgen när din rapport hanteras eller ytterligare information efterfrågas.",
		complete_step_one: "Fortsätt",
		abuse_notice: "Missbruk av rapportfunktionen kan leda till att din åtkomst återkallas.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Inkorg",
		tabs: {
			all: "Alla meddelanden",
			unread: "Oläst",
			important: "Viktigt",
		},
		unread_tag: "Oläst",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote godkänd för uppladdning",
				content: `
# Din emote "{EMOTE_NAME}" godkändes för uppladdning \n
Den kommer nu att finnas tillgänglig på Emote Directory och kommer att börja visas på @:common. ppHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote blev nekad för uppladdning",
				content: `
# Din emote "{EMOTE_NAME}" nekades
Den kommer inte att vara tillgänglig via den offentliga Emote Directory eller synlig på @:common. ppHost,
men kommer att förbli tillgänglig för användare med länken.
`,
			},
			emote_ownership_claim_request: {
				subject: "Inbjudan till att bli ägare av en emote",
				content: `
## {OWNER_DISPLAY_NAME} Vill at du ska bli ägaren av '{EMOTE_NAME}'

[Visa Emote]({EMOTE_URL})

**[Acceptera begäram]({EMOTE_CLAIM_URL})** | [Neka begäran]({EMOTE_DECLINE_URL})
						`,
			},
			client_banned: {
				subject: "Du har blivit bannad",
				reason: {
					pornographic_content: "",
				},
				content: `
# Kontot är avstängt
Din åtkomst till @:common.appName är nu begränsad.<br/><br/>
### Anledning till denna åtgärd
{BAN_REASON} <br/><br/>
### Begränsningar tillämpade<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Detta beslut löper ut **{BAN_EXPIRE_AT}**.
_Om du tror att detta är ett misstag, vänligen maila @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Du får inte längre interagera med appen",
					no_auth: "* Du får inte längre logga in",
					no_ownership: "* Allt innehåll som du har skapat kommer inte längre att vara tillgängligt",
					memory_hole: "* Du kommer inte vara synlig för andra användare",
					ip_blocked: "* Din IP-adress är blockerad från att komma åt alla @:common.appName tjänster",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Vi kunde inte hitta något",
		doctor_wtf: "Vad i helvete är det här?",
		pot_friend: "Jag är en pot, friend",
	},
};
