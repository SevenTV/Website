export default {
	locale: "Română (România)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Află mai multe",
		more: "Mai mult",
		retry: "Încearcă din nou",
		downloads: "Descărcări",
		features: "Caracteristici",
		comments: "Comentarii",
		search: "Caută",
		update: "Actualizare",
		report: "Raportează",
		activity: "Activitate",
		loading: "Se încarcă",
		object: {
			user: "Utilizator",
			emote_set: "Set de emoticoane",
			emote: "Emoticon",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Platforma de emoticoane pentru toți",
		app_description: "Gestionează cu ușurință sute de emoticoane pentru canalele tale de Twitch sau YouTube",
		why_app: "De ce @:common.appName{'?'}",
		download_browser: "Extensie Browser",
		download_mobile: "Aplicații Mobile",
		download_misc: "Alte Aplicații",
		features: {
			emote_sets: {
				name: "Seturi de emoticoane",
				detail: "Grupați emoticoane în seturi personalizate care pot fi partajate cu alți utilizatori sau schimbate rapid pe canalul dumneavoastră.",
			},
			many_emote_slots: {
				name: "Sute de sloturi de emoticoane",
				detail: "Începe cu {0} sloturi, cu o valoare maximă posibilă de {1} și fără paywall.",
			},
			channel_emote_names: {
				name: "Nume de emoticoane per-canal",
				detail: "Nu-ți place numele dat unui emoticon de către autor? E în regulă, îl poți schimba doar pentru canalul tău.",
			},
			real_time: {
				name: "În timp real",
				detail: "Schimbarea emoticonului în canalul tău se întâmplă instantaneu, pentru toți utilizatorii. Nu este necesar F5.",
			},
			emote_versions: {
				name: "Versiune emoticon",
				detail: "Schimbă între variante tematice sau actualizează un emoticon la o versiune îmbunătățită.",
			},
			next_gen: {
				name: "Ultima generație de formate de imagine, precum WEBP și AVIF",
				detail: "Folosim formate de imagine mai noi și mai optimizate pentru a reduce utilizarea lățimii de bandă.",
			},
			source_available: {
				name: "Sursă disponibilă",
				detail: "Întregul nostru cod este disponibil pe GitHub cu o licență de sursă disponibilă. Oricine poate vizualiza și contribui.",
			},
		},
		socials: {
			discord: "Alătură-te @:common.appName pe Discord",
			discord_online_count: "{0} online acum",
			twitter: "Urmăriți-ne pe Twitter",
			github: "Contribuie",
		},
	},
	// Nav Bar
	nav: {
		home: "Acasă",
		about: "Despre",
		emotes: "Emoticoane",
		store: "Abonare",
		admin: "Administrator",
		sign_in: "Conectare",
		wip_notice: {
			heading: "Bun venit pe noul site @:common.appName",
			text1: "Aceasta este o previzualizare timpurie a următorului mod de a experimenta @:common.appName{'.'}",
			text2: "Explorează ce este nou și oferă-ne niște feedback! Reține că va trece prin schimbări rapide și s-ar putea strica frecvent.",
		},
	},
	activity: {
		emote_created: "Creat {T}",
		emote_renamed: "{ICO} Redenumit {T} din {O} în {N}",
		emote_listing_approved: "{T} aprobat pentru listare publică",
		emote_listing_revoked: "{T} eliminat din listarea publică",
		emote_merged: "{T} îmbinat în {0}",
		emote_ownership_transferred: "Proprietatea {T} a fost transferată către {U}",
		emote_restored: "Restaurat {T}",
		emote_updated: "Proprietăți schimbate pentru {T}",
		emote_deleted: "Șters {T}",
		emote_version_created: "Versiune creată '{VER}' pentru {T}",
		emote_version_renamed: "Versiune redenumită '{VER}' pentru {T} din {1} în {2}",
		emote_version_approved: "Versiune aprobată '{VER}' pentru {T} către listarea publică",
		emote_version_restored: "Versiune restaurată '{VER}' pentru {T}",
		emote_version_deleted: "Versiune eliminată '{VER}' pentru {T}",
		user_created: "Creat de {T}",
		user_deleted: "Șters de {T}",
		user_editor_added: "{T} adăugat ca editor",
		user_editor_added_other: "{U1} adăugat ca editor de {U2}",
		user_editor_removed: "{U} eliminat ca editor",
		user_editor_removed_other: "{U1} eliminat ca editor de {U2}",
		user_banned: "{T} banat",
		user_unbanned: "{T} debanat",
		user_updated: "Proprietăți schimbate pentru {T}",
		user_sign_in: "{T} s-a conectat",
		user_sign_out: "{T} s-a deconectat",
		user_forbidden: "{T} i-a fost refuzat accesul la {0}",
		emote_set_created: "Creat {T}",
		emote_set_emote_added: "A adăugat emoticonul {AE} la {T}",
		emote_set_emote_removed: "A eliminat emoticonul {AE} din {T}",
		emote_set_emote_renamed: "A redenumit emoticonul {AE} din {O} în {N} în {T}",
		emote_set_updated: "Proprietăți schimbate pentru {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Adaugă emoticon",
		author: "Adăugat de",
		created_at: "Creat",
		versions: "Versiuni",
		preview_loading: "Se încarcă previzualizările... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Încărcarea previzualizărilor a eșuat",
		processing: "Se procesează emoticonul - poate dura ceva timp.",
		use: "Folosește emoticon",
		switch_version: "Schimbă la versiunea asta",
		in_n_sets: "într-un set | în {0} seturi",
		disable: "Dezactivează emoticon",
		update: "Actualizare",
		report: "Raportează",
		makePrivate: "Setează ca privat",
		makeGlobal: "Make Global",
		comments: "Comentarii",
		channels: "Canale",
		common_names: "Alte nume pentru acest emoticon",
		usage_stats: "Statistici emoticoane",
		list: {
			searching: "Se caută",
			emote_count: "{0} emoticoane",
			no_emotes_listed: "Niciun emoticon găsit",
			fetching_slowly: "Ne pare rău, se pare că durează ceva vreme",
		},
		upload: {
			emote_name: "Nume emoticon",
			version_name: "Nume versiune",
			version_description: "Descriere versiune",
			submit_emote: "Trimite emoticon",
			create_emote_version: "Crează versiune emoticon",
			image_upload: "Încărcare imagine",
			accepted_formats: "Formate acceptate",
			filetype: "Fișier",
			animation: "Animaţie",
			transparency: "Transparență",
			emote_details: "Detalii emoticon",
			version_details: "Detalii versiune",
			attribution: "Atribuire",
			original_creator: "Creator original",
			as_child: "Creezi o versiune {IS_DIVERGED} a lui {0}. ",
			content_moderation: "Moderare conținut",
			half_transparency_tooltip:
				"Pixelii pot fi complet transparenți sau complet opaci (fără transparență variabilă)",
		},
	},
	emote_set: {
		create: "Nou @:common.object.emote_set",
		select: "Selectează @:common.object.emote_set",
		explain: {
			section: "Ce sunt @:common.object.emote_set{'s'}?",
			hint: "Seturile de Emoticoane sunt colecții de emoticoane care pot fi legate de canalele tale sau împărtășite cu alți utilizatori.",
		},
		no_space: "Locuri pline",
		none_selected: "Niciun set selectat",
		editing: "Editare {0}",
		owner: "Setul de emoticoane al {USER}",
		owned: "Set de emoticoane deținut",
		label_renamed: "Redenumit",
		label_conflict: "Conflict",
		label_default: "Predefinit",
		modal: {
			selected_channel_count: "niciun canal selectat | {0} canal selectat | {0} canale selectate",
			create_button: "Crează @:common.object.emote_set",
			rename_in_set: "Redenumește în {0}",
			context_rename: "Personalizează numele emoticonului",
			context_set_default: "Atribuie ca implicit",
			context_unset_default: "Anulați atribuirea implicită",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Seturi de emoticoane",
		channel_emotes: "Emoticoane canal",
		editors: "Editori",
		roles: "Roluri",
		no_channel_emotes: "{0} nu are niciun emoticon pe canalul lor de {1}",
		no_channels: "{0} nu are niciun canal conectat!",
		card: {
			view_full_profile: "Vizualizați profilul complet",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Raportează",
		emote_reason: {
			i_made_this: "Eu am creat acest emoticon, dar a fost încărcat de altcineva",
			duplicate: "Acest emoticon este un duplicat",
			pornographic: "Acest emoticon conține ilustrații pornografice sau excesiv de sexuale",
			violence_gore: "Acest emoticon afișează violență extremă sau macabră",
			i_appear_there: "Acest emoticon mă înfățișează și nu îmi place",
			offensive: "Consider acest emoticon ofensiv",
			other: "Altceva",
		},
		uncategorized_prompt: "În ce constă problema?",
		details: "Detalii (informații suplimentare și/sau dovezi pentru raportul dvs.)",
		success: "Raport trimis cu succes",
		notify: "Veți fi notificat prin inbox după ce raportul dvs. este procesat sau sunt solicitate informații suplimentare.",
		complete_step_one: "Continuă",
		abuse_notice: "Utilizarea abuzivă a funcției de raportare poate duce la revocarea accesului tău.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Mesaje",
		tabs: {
			all: "Toate Mesajele",
			unread: "Necitit",
			important: "Important",
		},
		unread_tag: "Necitit",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emoticon aprobat pentru listare",
				content: `
# Emoticonul dumneavoastră "{EMOTE_NAME}" a fost aprobat pentru listare \n
De acum va fi disponibil în Directorul Emoticon și va apărea pe @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emoticonul nu este aprobat pentru listare",
				content: `
# Emoticonul dvs. "{EMOTE_NAME}" a fost respins
Nu va fi disponibil prin directorul public de emoticoane sau vizibil pe @:common.appHost, 
dar va rămâne disponibil pentru utilizatorii care au linkul.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitație pentru revendicarea unui emoticon",
				content: `
## {OWNER_DISPLAY_NAME} vrea să deveniți proprietarul '{EMOTE_NAME}'

[Vizualizează emoticon] ({EMOTE_URL})

**[Acceptați cererea]({EMOTE_CLAIM_URL})** | [Refuzați cererea]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Ai fost banat",
				reason: {
					pornographic_content: "",
				},
				content: `
# Cont suspendat
Accesul dvs. la @:common.appName este acum limitat.<br/><br/>
### Motivul acestei acțiuni
{BAN_REASON}<br/><br/>
### Restricții aplicate<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Această decizie expiră **{BAN_EXPIRE_AT}**
_Dacă credeți că este o greșeală, vă rugăm să trimiteți un e-mail @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Nu mai poți interacționa cu aplicația",
					no_auth: "* Nu te mai poți conecta",
					no_ownership: "* Orice conținut ai creat nu va mai fi disponibil",
					memory_hole: "* Nu vei fi vizibil altor utilizatori",
					ip_blocked: "* IP-ul tău este blocat să acceseze toate serviciile @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Nu am putut găsi asta",
		doctor_wtf: "Ce naiba e asta?",
		pot_friend: "Sunt un vas, prietene",
	},
};
