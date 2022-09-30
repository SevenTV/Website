export default {
	locale: "Magyar (Magyarország)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Tudj meg többet",
		more: "Több",
		retry: "Próbáld újra",
		back: "Vissza",
		download: "Letöltés | Letöltések",
		features: "Jellemzők",
		comments: "Hozzászólások",
		search: "Keresés",
		update: "Frissítés",
		report: "Jelentés",
		delete: "Törlés",
		cancel: "Mégse",
		submit: "Beküldés",
		activity: "Tevékenységek",
		loading: "Betöltés",
		save_changes: "Változtatások mentése",
		reset: "Visszaállítás",
		object: {
			user: "Felhasználó",
			emote_set: "Hangulatjel készlet",
			emote: "Hangulatjel",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "A hangulatjel felület mindenkinek",
		app_description: "Könnyedén kezelhetsz több száz hangulatjelet a Twitch vagy YouTube csatornáidhoz",
		why_app: "Miért @:common.appName{'?'}",
		download_browser: "Böngészőbővítmények",
		download_mobile: "Mobil alkalmazások",
		download_misc: "További alkalmazások",
		features: {
			emote_sets: {
				name: "Hangulatjel készletek",
				detail: "Csoportosítsd hangulatjeleket testreszabható készletekbe, amelyeket megoszthatsz más felhasználókkal vagy gyorsan rácserélheted a csatornádra.",
			},
			many_emote_slots: {
				name: "Több száz hangulatjel hely",
				detail: "Kezdésnek már {0} hely, amit {1} -ra is bővíthetsz bármilyen fizetés nélkül.",
			},
			channel_emote_names: {
				name: "Csatornánkénti nevek",
				detail: "Nem tetszik a név, amelyet a szerzője adott egy hangulatjelnek? Semmi gond, módosíthatod azokat csak a te csatornád számára.",
			},
			real_time: {
				name: "Valós idejű",
				detail: "A hangulatjelek megváltoztatása a csatornádon azonnal megtörténik minden néződ számára. F5-re sincs szükség.",
			},
			emote_versions: {
				name: "Hangulatjel változatok",
				detail: "Válts különböző témák között vagy frissítsd a hangulatjelet egy újabb verzióra.",
			},
			userbase: {
				name: "Nagy közösség",
				detail: "@:common.appName serves {0}+ daily unique users and has a library of over {1} public emotes",
			},
			next_gen: {
				name: "Következő generációs képformátumok, mint WEBP és AVIF",
				detail: "Újabb, jobban optimalizált képformátumokat használunk a sávszélesség használat csökkentése érdekében.",
			},
			source_available: {
				name: "Elérhető forráskód",
				detail: "A teljes kódbázisunk elérhető GitHub-on, amely nyilvános forráskóddal rendelkezik. Bárki megtekintheti és hozzájárulhat.",
			},
		},
		socials: {
			discord: "Csatlakozz a @:common.appName-hez Discordon",
			discord_online_count: "{0} jelenleg elérhető",
			twitter: "Kövess minket Twitteren",
			github: "Hozzájárulás",
		},
		legal: {
			terms: "Felhasználási feltételek",
			privacy: "Adatvédelmi irányelvek",
			unaffiliated: "@:common.appName és a Twitch Interactive nem áll kapcsolatban egymással",
		},
	},
	// Nav Bar
	nav: {
		home: "Kezdőlap",
		about: "Névjegy",
		emotes: "Hangulatjelek",
		store: "Előfizetés",
		admin: "Admin",
		sign_in: "Bejelentkezés",
		user_search: "Profilok keresése",
		locale_contribute: "Translate @:common.appName{'!'}",
		wip_notice: {
			heading: "Üdvözlünk az új @:common.appName weboldalon",
			text1: "Ez egy korai előnézete az új @:common.appName{'.'} élménynek",
			text2: "Fedezd fel az újdonságokat és küldj visszajelzést! Vedd figyelembe, hogy a weboldal gyors változásokon megy keresztül és gyakran összeomolhat.",
		},
	},
	activity: {
		emote_created: "Létrehozta {T}",
		emote_renamed: "{T} át lett nevezve. Régi: {O} új: {N}",
		emote_listing_approved: "{T} el lett fogadva és nyilávnosságra került",
		emote_listing_revoked: "{T} többé nem nyilvános",
		emote_merged: "{T} bele lett olvasztva {0} -ba",
		emote_ownership_transferred: "{T} új tulajdonosa {U} lett",
		emote_restored: "{T} vissza lett állítva",
		emote_updated: "{T} tulajdonságai módosítva lettek",
		emote_deleted: "{T} törölve lett",
		emote_tags_updated: "Cimkék beállítása {T} -nek: {N}",
		emote_processed: "Új feldolgozási feladat lett végrehajtva a következőnek: {T}",
		emote_version_created: "Verzió készült '{VER}' {T} -hez",
		emote_version_renamed: "Verzió átnevezve lett '{VER}' {T} {1} -ről {2} -re",
		emote_version_approved: "Verzió elfogadva '{VER}' {T} és nyilvánosságra került",
		emote_version_restored: "Verzió visszaállítva: '{VER}' {T}",
		emote_version_deleted: "Verzió törölve: '{VER}' {T}",
		emote_flag_added: "{FLAG} jelző hozzáadva ehhez: {T}",
		emote_flag_removed: "{FLAG} jelző eltávolítva innen: {T}",
		user_created: "Létrehozta {T}",
		user_deleted: "Törölte {T}",
		user_editor_added: "Hozzáadta {U} szerkesztőként",
		user_editor_added_other: "{U1} mostantól {U2} szerkesztője",
		user_editor_updated: "Updated editor privileges for {U}",
		user_editor_updated_other: "Updated editor privileges for {U1}, an editor of {U2}",
		user_editor_removed: "Visszavonta {U} szerkesztői jogát",
		user_editor_removed_other: "{U1} többé nem szerkesztője {U2} -nak/nek",
		user_banned: "{T} ki lett tilva",
		user_unbanned: "{T} többé nincs kitiltva",
		user_updated: "{T} tulajdonságai módosultak",
		user_sign_in: "{T} bejelentkezett",
		user_sign_out: "{T} kijelentkezett",
		user_forbidden: "{T} -nek nincs hozzáférése {0} -hez",
		emote_set_created: "Létrehozta {T}",
		emote_set_emote_added: "{AE} hozzá lett adva {T} -hez",
		emote_set_emote_removed: "{AE} el lett távolítva {T} -ből",
		emote_set_emote_renamed: "{AE} át lett nevezve {O} -ról {N} -re {T} -ben",
		emote_set_updated: "{T} tulajdonásgai megváltoztak",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Hozzáadás",
		author: "Hozzáadta",
		created_at: "Létrehozva",
		versions: "Verziók",
		preview_loading: "Előnézetek betöltése... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Nem sikerült betölteni az előnézeteket",
		processing: "Hangulatjel feldolgozása - ez eltarthat egy ideig.",
		processing_failed: "A feldolgozás sikertelen: {0}",
		use: "Hozzáadás",
		use_menu: "Hangulatjel hozzáadása ide...",
		switch_version: "Válts erre a verzióra",
		in_n_sets: "{0} készletben | {0} készletekben",
		disable: "Eltávolítás",
		properties: "Tulajdonságok",
		new_version: "Új Verzió",
		report: "Hangulatjel jelentése",
		Privacy: "Adatvédelem",
		comments: "Hozzászólások",
		channels: "Csatornák",
		common_names: "Hangulatjel más elnevezései",
		usage_stats: "Hangulatjel statisztikák",
		no_longer_available: "Ez a hangulatjel már nem elérhető",
		tags: "Címkék",
		add_tag: "Címke hozzáadása",
		trending_rank: "#{0}. a felkapottakban",
		avif_no_support: "A böngésződ {BROWSER} nem támogatja az AVIF formátumú fájlokat.",
		delete_prompt: {
			heading: "{0} törlése",
			heading_versions: "Verzió '{0}' törlése a {1} -ből",
			notice: "Biztos vagy benne hogy ki akarod törölni a {0} hangulatjelet {'?'}",
			notice_versions: "Biztos vagy benne hogy ki akarod törölni a '{0}' verziót {1} -ből {'?'}",
			reason: "Miért törlöd?",
		},
		properties_prompt: {
			heading: "{0} szerkesztése",
		},
		unlisted: {
			heading: "Figyelem!",
			warning: "Ez a hangulatjel nem nyilvános.",
			warning_flagged: "Ez a hangulatjel nem nyilvános, mert: {FLAG_LIST}",
			notice: "Hozzá adhatod a csatornádhoz, de nem tudjuk megerősíteni, hogy egy élő adásban is biztonságos lenne.",
			notice_flagged: "Hozzá lehet adni a csatornádhoz, de szerintűnk nem biztonságos egy élő adásban.",
			show_button: "Hangulatjel megtekintése",
			flag_sexual_content: "Felnőtt vagy túlzottan szexuális tartalom",
			flag_epilepsy: "Gyors villanások / roham gerjesztő",
			flag_edgy: "Ingerlő vagy gusztustalan",
			flag_twitch_banned: "Twitch-en nem engedélyezett",
		},
		list: {
			searching: "Keresés",
			emote_count: "{0} hangulatjel",
			no_emotes_listed: "Nem található hangulatjel",
			fetching_slowly: "Sajnálom, úgy tűnik ez egy kis időbe fog kerülni",
			category: {
				name: "Kategória",
				top: "Legjobb",
				trending: "Felkapott",
				featured: "Kiemelt",
				global: "Globális",
				new: "Új",
			},
			filters: {
				case_sensitive: "Kis-nagybetű érzékeny",
				exact_match: "Pontos egyezés",
				ignore_tags: "Címkék figyelmen kívül hagyása",
			},
		},
		upload: {
			emote_name: "Hangulatjel neve",
			version_name: "Verzió neve",
			version_description: "Verzió leírása",
			submit_emote: "Hangulatjel feltöltése",
			create_emote_version: "Hangulatjel verzió létrehozása",
			image_upload: "Kép feltöltése",
			accepted_formats: "Elfogadott formátumok",
			filetype: "Fájl",
			animation: "Animáció",
			transparency: "Átlátszóság",
			emote_details: "Hangulatjel részletei",
			version_details: "Verzió részletei",
			attribution: "Forrásmegjelölések",
			original_creator: "Eredeti készítő",
			as_child: "Létrehozol egy {IS_DIVERGED} vátozatát a {0} -nak. ",
			content_moderation: "Tartalom moderálása",
			half_transparency_tooltip:
				"A képpontok csak teljesen átlátszóak vagy teljesen átlátszatlanok lehetnek (nem lehetséges változó átlátszóság)",
		},
	},
	emote_set: {
		create: "Új @:common.object.emote_set",
		select: "@:common.object.emote_set kiválasztása",
		explain: {
			section: "What are Emote Sets?",
			hint: "A Hangulatjel készletek gyűjtemények, amelyeket a csatornádhoz köthetsz vagy megoszthatsz más felhasználókkal.",
		},
		no_space: "Összes helyed megtelt",
		none_selected: "Nincs készlet kiválasztva",
		editing: "{0} szerkesztése",
		owner: "{USER} hangulatjel készlete",
		owned: "Saját hangulatjel készlet",
		label_renamed: "Átnevezett",
		label_conflict: "Hiba",
		label_default: "Alapértelmezett",
		label_actor: "Elfogadta {0}",
		// "enabled by <display_name of actor>"
		context_emote_add: "Hozzáadás {SET_NAME} -hez",
		context_emote_remove: "Eltávolítás {SET_NAME} -ből",
		modal: {
			selected_channel_count:
				"nincs kiválasztva csatorna | {0} kiválasztott csatorna | {0} kiválasztott csatorna",
			create_button: "@:common.object.emote_set létrehozása",
			rename_in_set: "Átnevezés {0}",
			context_rename: "Hangulatjel nevének testreszabása",
			context_set_default: "Beállítás alapértelmezettként",
			context_unset_default: "Ne legyen alapértelmezett",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Készletek",
		channel_emotes: "Hangulatjelek",
		joined_at: "Csatlakozott: {0}",
		editors: "Szerkesztők",
		roles: "Rangok",
		connections: "Csatornák | Csatornák és fiókok",
		new_connections: "Fiókok összekapcsolása...",
		add_editor: "Szerkesztő hozzáadása",
		editor_modal_heading: "Módosítsd {0} szerkesztőit",
		editor_modal_user_search: "Kit szeretnél hozzáadni szerkesztőnek?",
		editor_modal_user_update: "Szerkesztő",
		no_channel_emotes: "{0} nem rendelkezik hangulatjellel a(z) {1} csatornáján",
		no_channels: "{0} nincs egyetlen csatornája sem csatlakoztatva!",
		card: {
			view_full_profile: "Teljes profil megtekintése",
		},
		settings: {
			button: "Profil szerkesztése",
			section_profile: "Profil",
			username: "Felhasználónév",
			display_name: "Megjelenő név",
			profile_picture: "Profilkép",
			section_badges: "Rangok",
			section_paints: "Festések",
			no_badges: "Nincsenek rangjaid",
			no_paints: "Nincsenek festéseid",
			sign_out: "Kijelentkezés",
			cosmetics_updated: "Kozmetikumok frissültek",
			cosmetics_updated_message: "Akár 30 perc is eltelhet mire a módosításaid életbe lépnek.",
		},
		editor_permissions: {
			modify_emotes: "Csatorna hangulatjeleinek szerkesztése",
			use_private_emotes: "Privát hangulatjel használata",
			manage_profile: "Profil kezelése",
			manage_owned_emotes: "Saját hangulatjelek szerkesztése",
			manage_emote_sets: "Hangulatjel készletek szerkesztése",
			manage_billing: "Számlázás kezelése",
			manage_editors: "Szerkesztők kezelése",
			view_messages: "Üzenetek megtekintése",
		},
	},
	store: {
		subscribe_cta: "Légy @:common.appName előfizető!",
		subscribed: "Köszönjük, hogy előfizettél",
		button_self: "Előfizetés",
		button_gift: "Előfizetés ajándékozása",
		billing_information_heading: "Számlázási információk",
		payment_information_heading: "Fizetési információ",
		payment_gift_heading: "Válaszd ki, hogy kinek szeretnél ajándékozni",
		payment_methods: "Fizetési módok",
		payment_methods_hint: "Válassz fizetési módot",
		payment_method_paypal: "PayPal",
		payment_method_stripe: "Bankkártya",
		payment_popup_cta: "Fejezd be a tranzakciót a másik ablakban",
		pay_button: "Fizess {0} -val/vel",
		product_type_subscription: "Előfizetés",
		purchase_success: {
			heading: "Vásárlás sikeres",
			text1: "A pénzt megkaptuk és az előfizetésed aktiválva lett.",
			text2: "Köszönjük a támogatást! Bármi kérdésed van, nyugodtan írj a weboldalon található módok egyikén.",
		},
		sub: {
			incentive: "Kapni fogsz...",
			creator_tier: "Extrák tartalomkészítőknek",
			creator_tier_desc: 'Fizess elő a "Tartalomkészítő" szintre, hogy a csatornád még királyabb legyen',
			feature_t1_badge: "Előfizetői rang",
			feature_t1_paints: "Név festések",
			feature_t1_animated_profile_picture: "Animált profilkép",
			feature_t1_zero_width: "Egymásra rakható hangulatjelek",
			feature_t1_global_raffle: "Részvétel globális hangulatjel sorsoláson",
			feature_t1_personal_emotes: "Saját hangulatjelek",
			feature_t2_animated_profile_banner: "Animált borítókép",
			feature_t2_animated_offline_screen: "Animált offline kép",
			feature_t2_extended_sub_emotes: "Extra hangulatjelek az előfizetőidnek",
			current_plan: "Előfizetésed",
			cancel: "Lemondás",
			update_payment: "Fizetési mód frissítése",
			reactivate: "Előfizetés újraaktiválása",
			cancel_prompt: "Biztos, hogy le akarod mondani az előfizetésedet?",
			state_heading: "Előfizetésed",
			state_badge_progress: "Jelvényed állapota",
			state_paints: "Festések",
			state_anniversary:
				"Előfizetésed fordulópontja ma van | A követlező fordulópontod {0} napon belül lesz | A követlező fordulópontod {0} napon belül lesz",
			state_age: "Ma fizettél elő | {0} napja vagy előfizető | {0} napja vagy előfizető",
			state_ending:
				"Ma jár le az előfizetésed | {0} napon belül fog lejárni az előfizetésed | {0} napon belül fog lejárni az előfizetésed",
			state_collection_heading: "Gyűjtemény",
			state_paints_heading: "Feloldott festések ({0})",
			state_raffle: "Globális hangulatjel sorsolás",
			state_leaderboards: "Legtöbbet ajándékozók",
			raffle: {
				starts_at: "{0} nap",
				starts_at_hint: "A következő előfizető sorsolás {0} napon belül kezdődik",
			},
		},
	},
	// Text that is relating to the reporting system
	reporting: {
		report: "Jelentés",
		emote_reason: {
			i_made_this: "Ezt a hangulatjelet én készítettem, de valaki más feltöltötte",
			duplicate: "Ez a hangulatjel egy másolat",
			pornographic: "Ez a hangulatjel pornográf vagy túlzottan szexuális",
			violence_gore: "Ez a hangulatjel szélsőséges erőszakot vagy testi sebesülést ábrázol",
			i_appear_there: "Ez a hangulatjel engem ábrázol és ez nem tetszik",
			offensive: "Sértőnek találom ezt a hangulatjelet",
			other: "Valami más",
		},
		uncategorized_prompt: "Mi a probléma?",
		details: "Részletek (további információ és/vagy bizonyíték a jelentéshez)",
		success: "A jelentés sikeresen elküldve",
		notify: "A beérkező leveleken keresztül értesítést kapsz a bejelentésednek kezeléséről vagy további információ kéréséről.",
		complete_step_one: "Folytatás",
		abuse_notice: "A jelentési funkció helytelen használata, a hozzáférésed visszavonásával járhat.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Bejövő",
		tabs: {
			all: "Minden üzenet",
			unread: "Olvasatlan",
			important: "Fontos",
		},
		unread_tag: "Olvasatlan",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Hangulatjel nyilvánosságra került",
				content: `
# "{EMOTE_NAME}" nevű hangulatjeled jóvá lett hagyva \n
Mostantól elérhető lesz a Hangulatjel Könyvtárban és meg fog jelenni a@:common.appHost{'.'} weboldalán
`,
			},
			emote_not_listed: {
				subject: "A hangulatjel nem lett nyilvános",
				content: `
# A hangulatjeled "{EMOTE_NAME}" ellett utasítva
Nem lesz elérhető a Hangulatjel Könyvtárban és nem lesz látható a @:common.appHost weboldalán, de elérhető marad a linkkel rendelkező felhasználók számára.
`,
			},
			emote_ownership_claim_request: {
				subject: "Meghívtak egy hangulatjel tulajdonjogának átvételére",
				content: `
## {OWNER_DISPLAY_NAME} akarja, hogy a '{EMOTE_NAME}' hangulatjel tulajdonosa legyél

[Hangulatjel megtekintése]({EMOTE_URL})

**[Kérés elfogadása]({EMOTE_CLAIM_URL})** | [Kérés elutasítása]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Ki lettél tiltva",
				reason: {
					pornographic_content: "",
				},
				content: `
# Fiók kitiltva
A hozzáférésed a @:common.appName-hez korlátozott.<br/><br/>
### Kitiltás oka
{BAN_REASON} <br/><br/>
### Korlátozások<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Ez a döntés lejár **{BAN_EXPIRE_AT}**.
_Ha úgy gondolod, hogy ez egy tévedés, akkor kérlek küldj egy emailt a @:common.supportEmail{'.'} címre_
`,
				effect: {
					no_permissions: "* Többé már nem használhatod az alkalmazást",
					no_auth: "* Többé már nem jelentkezhetsz be",
					no_ownership: "* Az általad létrehozott tartalmak többé nem lesznek elérhetőek",
					memory_hole: "* Nem leszel látható más felhasználók számára",
					ip_blocked:
						"* Az IP-címed blokkolva van a @:common.appName összes szolgáltatásához való hozzáféréshez",
				},
			},
			report_closed: {
				subject: "Jelentés zárva",
				content: `
Köszönjük észrevételed. A {'#'}{CASE_ID} számú jelentésed feldolgoztuk.`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Nem tudtuk megtalálni",
		doctor_wtf: "Mi a fene ez?",
		pot_friend: "Én egy fazék vagyok, cimborám",
	},
};
