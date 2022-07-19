export default {
	locale: "Čeština (Česko)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Další informace",
		more: "Více",
		retry: "Znovu",
		downloads: "Ke stažení",
		features: "Funkce",
		comments: "Komentáře",
		search: "Hledat",
		update: "Aktualizace",
		report: "Nahlásit",
		activity: "Aktivita",
		loading: "Načítání",
		object: {
			user: "Uživatel",
			emote_set: "Set emotů",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Emote Platforma pro Všechny",
		app_description: "Jednoduše spravujte stovky emotů pro váš Twitch nebo YouTube kanál",
		why_app: "Proč @:common.appName{'?'}",
		download_browser: "Rozšíření Prohlížeče",
		download_mobile: "Mobilní Aplikace",
		download_misc: "Jiné Aplikace",
		features: {
			emote_sets: {
				name: "Emoty",
				detail: "Seskupte emoty do přizpůsobitelných setů, které mohou být sdíleny s jinými uživateli nebo rychle přidat na váš kanál.",
			},
			many_emote_slots: {
				name: "Stovky emote slotů",
				detail: "Začněte s {0} sloty s maximálním množstvím {1} a bez platební brány.",
			},
			channel_emote_names: {
				name: "Názvy emotů pro jednotlivé kanály",
				detail: "Nelíbí se ti název emotu od autora? V pořádku, můžete si název změnit pro svůj kanál.",
			},
			real_time: {
				name: "Reálný čas",
				detail: "Změny emotů ve vašem kanálu nastanou okamžitě, pro všechny diváky. Nepotřebujete dávat F5.",
			},
			emote_versions: {
				name: "Verzování Emotů",
				detail: "Vyměňujte mezi tématickými variantami nebo aktualizujte emote na vylepšenou verzi.",
			},
			next_gen: {
				name: "Next-gen formáty obrázků jako WEBP a AVIF",
				detail: "Používáme novější, více optimalizované formáty obrázků na snížení použítí šířky pásma.",
			},
			source_available: {
				name: "Dostupný-zdroj",
				detail: "Náš celý codebase je dostupný na GitHubu se zdrojově dostupnou licencí. Kdokoliv se může podívat a přispět.",
			},
		},
		socials: {
			discord: "Připojte se k @:common.appName na Discordu",
			discord_online_count: "{0} členů online",
			twitter: "Sledujte nás na Twitteru",
			github: "Přispějte",
		},
	},
	// Nav Bar
	nav: {
		home: "Domů",
		about: "O aplikaci",
		emotes: "Emoty",
		store: "Odebírat",
		admin: "Admin",
		sign_in: "Přihlásit se",
		wip_notice: {
			heading: "Vítejte na nové stránce @:common.appName",
			text1: "Toto je raný náhled další cesty používání @:common.appName{'.'}",
			text2: "Prozkoumejte, co je nové a poskytněte nám zpětnou vazbu! Berte v potaz, že stránka bude procházet rychlými změnami a může se často rozbít.",
		},
	},
	activity: {
		emote_created: "Vytvořil/a {T}",
		emote_renamed: "Přejmenoval/a {T} z {O} na {N}",
		emote_listing_approved: "Schválil/a {T} pro veřejný seznam",
		emote_listing_revoked: "Odebral/a {T} z veřejného seznamu",
		emote_merged: "Sloučil/a {T} do {0}",
		emote_ownership_transferred: "Převedl/a vlastnictví {T} na {U}",
		emote_restored: "Obnovil/a {T}",
		emote_updated: "Změnil/a vlastnosti {T}",
		emote_deleted: "Smazal/a {T}",
		emote_version_created: "Vytvořil/a verzi '{VER}' emotu {T}",
		emote_version_renamed: "Přejmenoval/a verzi '{VER}' emotu {T} z {1} na {2}",
		emote_version_approved: "Schválil/a verzi '{VER}' emotu {T} pro veřejný seznam",
		emote_version_restored: "Obnovil/a verzi '{VER}' emotu {T}",
		emote_version_deleted: "Smazal/a verzi '{VER}' emotu {T}",
		user_created: "Vytvořil/a {T}",
		user_deleted: "Smazal/a {T}",
		user_editor_added: "Přidal/a {U} jako editora",
		user_editor_added_other: "Přidal/a {U1} jako editora uživatele {U2}",
		user_editor_removed: "Odebral/a editorská práva uživatele {U}",
		user_editor_removed_other: "Odebral/a editorská práva uživatele {U1} v {U2}",
		user_banned: "Zablokoval/a {T}",
		user_unbanned: "Zrušil/a zablokování {T}",
		user_updated: "Změnil/a vlastnosti emotu {T}",
		user_sign_in: "{T} se přihlásil/a",
		user_sign_out: "{T} se odhlásil/a",
		user_forbidden: "{T} byl odepřen přístup k {0}",
		emote_set_created: "Vytvořil/a {T}",
		emote_set_emote_added: "Přidal/a emote {AE} do {T}",
		emote_set_emote_removed: "Odebral/a emote {AE} z {T}",
		emote_set_emote_renamed: "Přejmenoval/a emote {AE} v {T} z {O} ns {N}",
		emote_set_updated: "Změnil/a vlastnosti {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Přidat emote",
		author: "Přidáno uživatelem",
		created_at: "Vytvořeno",
		versions: "Verze",
		preview_loading: "Načítání náhledů... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Nepodařilo se načíst náhledy",
		processing: "Zpracovávání emotu - může to chvíli trvat.",
		use: "Použít emote",
		switch_version: "Přejít na tuto verzi",
		in_n_sets: "v {0} setu | v {0} setech",
		disable: "Zakázat emote",
		update: "Update",
		report: "Nahlásit emote",
		makePrivate: "Nastavit jako soukromý",
		makeGlobal: "Nastavit jako globální",
		comments: "Komentáře",
		channels: "Kanály",
		common_names: "Jiné názvy pro tento emote",
		usage_stats: "Statistiky emotu",
		list: {
			searching: "Vyhledávání",
			emote_count: "{0} emotů",
			no_emotes_listed: "Nenalezeny žádné emoty",
			fetching_slowly: "Omlouváme se, zdá se, že to chvíli zabere",
		},
		upload: {
			emote_name: "Název emotu",
			version_name: "Název verze",
			version_description: "Popis verze",
			submit_emote: "Nahrát emote",
			create_emote_version: "Vytvořit novou verzi emotu",
			image_upload: "Nahrát obrázek",
			accepted_formats: "Povolené formáty",
			filetype: "Soubor",
			animation: "Animace",
			transparency: "Průhlednost",
			emote_details: "Podrobnosti emotu",
			version_details: "Detaily verze",
			attribution: "Atributy",
			original_creator: "Původní autor",
			as_child: "Vytváříte {IS_DIVERGED} verzi {0}. ",
			content_moderation: "Moderace obsahu",
			half_transparency_tooltip:
				"Pixely mohou být pouze zcela průhledné nebo zcela neprůhledné (bez proměnlivé průhlednosti)",
		},
	},
	emote_set: {
		create: "Nový @:common.object.emote_set",
		select: "Vyberte @:common.object.emote_set",
		explain: {
			section: "Co jsou @:common.object.emote_set{'s'}?",
			hint: "Emote sety jsou kolekce emotů které můžete přidat na svůj kanál, a sdílet je s ostatními uživateli v chatu.",
		},
		no_space: "Plné sloty",
		none_selected: "Nebyl vybrán žádný set",
		editing: "Upravování {0}",
		owner: "Sada emotů uživatele {USER}",
		owned: "Vlastněné Sety emotů",
		label_renamed: "Přejmenované",
		label_conflict: "Problém",
		label_default: "Výchozí",
		modal: {
			selected_channel_count: "nebyl vybrán žádný kanál | {0} kanál vybrán | {0} kanálů",
			create_button: "Vytvořit @:common.object.emote_set",
			rename_in_set: "Přejmenovat v {0}",
			context_rename: "Upravit název emotu",
			context_set_default: "Nastavit jako výchozí",
			context_unset_default: "Odebrat jako výchozí",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Sety Emotů",
		channel_emotes: "Emoty kanálu",
		editors: "Editoři",
		roles: "Role",
		no_channel_emotes: "{0} nemá žádný emote na jeho kanálu {1}",
		no_channels: "{0} nemáš žádné připojené kanály!",
		card: {
			view_full_profile: "Zobrazit Celý Profil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Nahlásit",
		emote_reason: {
			i_made_this: "Vytvořil jsem tento emote, ale byl nahrán někým jiným",
			duplicate: "Tento emote je duplikát",
			pornographic: "Tento emote obsahuje pornografické nebo přehnaně sexualizované snímky",
			violence_gore: "Tento emote ukazuje extrémní násilí",
			i_appear_there: "Tento emote mě zobrazuje a nelíbí se mi to",
			offensive: "Tenhle emote mi připadá ofenzivní",
			other: "Něco jiného",
		},
		uncategorized_prompt: "Co se stalo?",
		details: "Podrobnosti (další informace a/nebo důkazy pro vaše nahlášení)",
		success: "Nahlášení odesláno úspěšně",
		notify: "Budete upozorněni prostřednictvím doručené pošty, jakmile bude vaše nahlášení zpracováno nebo bude požadováno další informace.",
		complete_step_one: "Pokračovat",
		abuse_notice: "Zneužívání funkce nahlášení může vést k odebrání vašeho přístupu.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Inbox",
		tabs: {
			all: "Všechny zprávy",
			unread: "Nepřečtené",
			important: "Důležité",
		},
		unread_tag: "Nepřečtené",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote schválen pro zařazení do seznamu",
				content: `
# Váš emote "{EMOTE_NAME}" byl schválen pro zařazení do seznamu \n
Nyní bude dostupný na adrese emotu a bude se objevovat na @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote nebyl schválen pro zařazení do seznamu",
				content: `
# Tvůj emote "{EMOTE_NAME}" byl zamítnut
Nebude dostupný na adrese emotu a nebude se objevovat na @:common.appHost,
ale zůstane dostupný uživatelům s linkem.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invite k přijatí vlastnictví emotu",
				content: `
## {OWNER_DISPLAY_NAME} chce, aby jste se stal vlastníkem emotu '{EMOTE_NAME}'

[Ukázat Emote]({EMOTE_URL})

**[Příjmout Request]({EMOTE_CLAIM_URL})** | [Odmítnout Request]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Byl jste zabanován",
				reason: {
					pornographic_content: "",
				},
				content: `
# Účet zabanován
Váš přístup k @:common.appName je nyní omezen.<br/><br/>
### Důvod této akce
{BAN_REASON} <br/><br/>
### Uplatněná omezení<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Ban vyprší **{BAN_EXPIRE_AT}**.
_Pokud se domníváte, že se jedná o chybu, napište prosím na e-mail @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Už nemůžete používat aplikaci",
					no_auth: "* Nemůžete se již přihlásit",
					no_ownership: "* Žádný obsah, který jste vytvořili, již nebude dostupný",
					memory_hole: "* Nebudete viditelný pro ostatní uživatele",
					ip_blocked: "* Vaše IP adresa je zablokována v přístupu ke všem službám @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Nenašli jsme to",
		doctor_wtf: "Co to sakra je?",
		pot_friend: "Jsem hrnec, přítel",
	},
};
