export default {
	locale: "Eesti keel (Eesti)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Loe lähemalt",
		more: "Rohkem",
		retry: "Proovi uuesti",
		downloads: "Allalaadimised",
		features: "Funktsioonid",
		comments: "Kommentaarid",
		search: "Otsing",
		update: "Uuenda",
		report: "Teavita",
		activity: "Aktiivsus",
		loading: "Loading",
		object: {
			user: "Kasutaja",
			emote_set: "Emotei komplekt",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Emotei platvorm kõigile",
		app_description: "Halda oma Twitchi või YouTubei kanalite jaoks hõlpsasti sadu emote",
		why_app: "Milleks @:common.appName{'?'}",
		download_browser: "Brauseri laiendus",
		download_mobile: "Mobiilirakendused",
		download_misc: "Muud rakendused",
		features: {
			emote_sets: {
				name: "Emotei komplektid",
				detail: "Grupeeri emote kohandatavateks komplektideks, mida saab jagada teiste kasutajatega või kiiresti lisada oma kanalile.",
			},
			many_emote_slots: {
				name: "Sadu emotei pesasi",
				detail: "Alusta {0} emotei pesaga, saa maksimaalselt {1} emotei pesa ja kõik ilma sentigi maksmata.",
			},
			channel_emote_names: {
				name: "Kanalipõhised emotei nimed",
				detail: "Ei meeldi nimi, mille autor on emoteile andnud? Pole hullu, saate seda muuta just enda kanali jaoks.",
			},
			real_time: {
				name: "Reaalajas",
				detail: "Emoteide muutmine teie kanalil toimub koheselt kõikide vaatajate jaoks. Lehekülje värskendamist pole vaja.",
			},
			emote_versions: {
				name: "Emotei versioonid",
				detail: "Vahetage teemavariantide vahel või uuendage emotei täiendatud versioonile.",
			},
			next_gen: {
				name: "Järgmise põlvkonna pildiformaadid nagu WEBP ja AVIF",
				detail: "Kasutame uuemaid, rohkem optimeerituid pildiformaate, et vähendada ribalaiuse kasutamist.",
			},
			source_available: {
				name: "Source-available",
				detail: "Kogu meie koodibaas on saadaval GitHubis koos source-available litsentsiga. Igaüks saab vaadata ning panustada.",
			},
		},
		socials: {
			discord: "Liituge @:common.appName Discordiga",
			discord_online_count: "{0} kasutajat hetkel online",
			twitter: "Jälgi meid Twitteris",
			github: "Panusta",
		},
	},
	// Nav Bar
	nav: {
		home: "Avaleht",
		about: "Teave",
		emotes: "Emoteid",
		store: "Telli",
		admin: "Admin",
		sign_in: "Logi sisse",
		wip_notice: {
			heading: "Tere tulemast uuele @:common.appName leheküljele",
			text1: "See on varajane eelvaade uuest viisist kogeda @:common.appName{'.'}",
			text2: "Uurige, mis on uus ja andke meile tagasisidet! Pange tähele, et see läbib tihedasti muudatusi ning võib sageli katkeda.",
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
		add: "Lisa emote",
		author: "Emotei lisas",
		created_at: "Loodud",
		versions: "Versioonid",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Kasuta emotei",
		switch_version: "Lülitu sellele versioonile",
		in_n_sets: "{0} komplekti sees | {0} komplekti sees",
		disable: "Keela emote",
		update: "Uuenda",
		report: "Raporti emotei",
		makePrivate: "Määra privaatseks",
		makeGlobal: "Make Global",
		comments: "Kommentaarid",
		channels: "Kanalid",
		common_names: "Muud nimed selle emotei jaoks",
		usage_stats: "Emotei statistika",
		list: {
			searching: "Laeb",
			emote_count: "{0} emotei",
			no_emotes_listed: "Tulemusi ei leitud",
			fetching_slowly: "Vabandame. Tundub, et see võtab pisut aega",
		},
		upload: {
			emote_name: "Emotei nimi",
			version_name: "Versiooni nimi",
			version_description: "Versiooni kirjeldus",
			submit_emote: "Esita emote",
			create_emote_version: "Loo emotei versioon",
			image_upload: "Pildi üleslaadimine",
			accepted_formats: "Lubatud formaadid",
			filetype: "Fail",
			animation: "Animatsioon",
			transparency: "Läbipaistvus",
			emote_details: "Emotei detailid",
			version_details: "Versiooni detailid",
			attribution: "Omadused",
			original_creator: "Algne looja",
			as_child: "Loote rakendusest {0} {IS_DIVERGED} versiooni. ",
			content_moderation: "Sisu modereerimine",
			half_transparency_tooltip:
				"Pikslid võivad olla ainult täielikult läbipaistvad või täielikult läbipaistmatud (varieeritav läbipaistvus puudub)",
		},
	},
	emote_set: {
		create: "Uus @:common.object.emote_set",
		select: "Vali @:common.object.emote_set",
		explain: {
			section: "Mis on @:common.object.emote_set{'s'}?",
			hint: "Emotei komplektid on emoteide kogu, mida saab siduda enda kanalitega või jagada teiste kasutajatega.",
		},
		no_space: "Emotei pesad täis",
		none_selected: "Komplekti pole valitud",
		editing: "{0} muutmine",
		owner: "Kasutaja {USER} emotei komplekt",
		owned: "Oma emotei komplekt",
		label_renamed: "Ümbernimetatud",
		label_conflict: "Konflikt",
		label_default: "Default",
		modal: {
			selected_channel_count: "kanalit pole valitud | {0} kanal valitud | {0} kanalit valitud",
			create_button: "Loo @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emotei komplektid",
		channel_emotes: "Kanali emoteid",
		editors: "Töötlejad",
		roles: "Rollid",
		no_channel_emotes: "Kasutajal {0} pole ühtegi emotei enda {1} kanalil",
		no_channels: "{0} pole ühegi kanaliga ühendatud!",
		card: {
			view_full_profile: "Kuva profiili",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Teavita",
		emote_reason: {
			i_made_this: "Mina lõin selle emotei, kuid keegi muu laadis selle ülesse",
			duplicate: "See emote on duplikaat",
			pornographic: "See emote sisaldab pornograafilist või liiga seksuaalset kujutust",
			violence_gore: "See emote kujutab ekstreemset vägivalda",
			i_appear_there: "See emote kujutab mind ja see ei meeldi mulle",
			offensive: "Minu arvates on see emote solvav",
			other: "Midagi muud",
		},
		uncategorized_prompt: "Milles asi?",
		details: "Detailid (lisainfo ja/või tõendusmaterjal teie raporti jaoks)",
		success: "Raport edukalt esitatud",
		notify: "Teiega võetakse ühendust postkasti kaudu, kui teie raport on käsitletud või kui nõuame lisateavet.",
		complete_step_one: "Jätka",
		abuse_notice: "Teavitusfunktsiooni kuritarvitamine võib teie juurdepääsu teenusele tühistada.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Postkast",
		tabs: {
			all: "Kõik sõnumid",
			unread: "Lugemata",
			important: "Tähtis",
		},
		unread_tag: "Lugemata",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote aktsepteeritud",
				content: `
# Sinu emote "{EMOTE_NAME}" aktsepteeriti \n
See on nüüdsest leitav avaliku emotei kataloogi kaudu ning nähtav teenusel @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote mitte aktsepteeritud",
				content: `
# Sinu emote "{EMOTE_NAME}" ei aktsepteeritud
See ei ole leitav avaliku emotei kataloogi kaudu ega pole nähtav teenusel @:common.appHost,
kuid see jääb kättesaadavaks kasutajatele koos lingiga.
`,
			},
			emote_ownership_claim_request: {
				subject: "Kutse emotei omandiõiguse taotlemiseks",
				content: `
## {OWNER_DISPLAY_NAME} soovib, et sinust saaks '{EMOTE_NAME}' omanik

[Kuva emotei]({EMOTE_URL})

**[Nõustuge taotlusega]({EMOTE_CLAIM_URL})** | [Keelduge taotlusega]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Sind on bannitud",
				reason: {
					pornographic_content: "",
				},
				content: `
# Konto bannitud
Sinu ligipääs @:common.appName teenustele on nüüdsest piiratud.<br/><br/>
### Selle teo põhjus
{BAN_REASON} <br/><br/>
### Rakendatud piirangud<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>See otsus aegub **{BAN_EXPIRE_AT}**.
_Kui usute, et tegemist on olnud veaga, palun saatke e-mail aadressile @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Teie ei tohi rakendust enam kasutada",
					no_auth: "* Sa ei või enam sisse logida",
					no_ownership: "* Teie loodud sisu edaspidi ei eksisteeri",
					memory_hole: "* Edaspidi sa pole nähtav teistele kasutajatele",
					ip_blocked: "* Teie IP-le on blokeeritud juurdepääs kõikidest @:common.appName teenustest",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Me ei suutnud seda leida",
		doctor_wtf: "Mis see veel on?",
		pot_friend: "Ma olen pott, sõber",
	},
};
