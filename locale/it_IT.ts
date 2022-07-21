export default {
	locale: "Italiano (Italia)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Scopri di più",
		more: "Altro",
		retry: "Riprova",
		downloads: "Scarica",
		features: "Caratteristiche",
		comments: "Commenti",
		search: "Cerca",
		update: "Aggiorna",
		report: "Segnala",
		activity: "Attività",
		loading: "Caricamento",
		save_changes: "Salva le modifiche",
		reset: "Reimposta",
		object: {
			user: "Utente",
			emote_set: "Set Emote",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "La Piattaforma Emote per tutti",
		app_description: "Gestisci centinaia di emote per i tuoi canali Twitch o YouTube con facilità",
		why_app: "Perché @:common.appName{'?'}",
		download_browser: "Estensione Browser",
		download_mobile: "App Mobile",
		download_misc: "Altre app",
		features: {
			emote_sets: {
				name: "Set Emote",
				detail: "Raggruppa le emote in set personalizzabili che possono essere condivise con altri utenti o rapidamente scambiate sul tuo canale.",
			},
			many_emote_slots: {
				name: "Centinaia di slot emote",
				detail: "Inizia con {0} slot, con un massimo possibile di {1} e nessun paywall.",
			},
			channel_emote_names: {
				name: "Nomi emote specifici per canale",
				detail: "Non ti piace il nome dato a un emote dal suo autore? Non c'è problema, puoi cambiarlo solo per il tuo canale.",
			},
			real_time: {
				name: "In tempo reale",
				detail: "Cambiare le emote nel tuo canale avviene istantaneamente, per tutti gli spettatori. Non è richiesto fare F5.",
			},
			emote_versions: {
				name: "Versionamento Emote",
				detail: "Scambia tra varianti a tema o aggiorna una emote a una versione migliorata.",
			},
			next_gen: {
				name: "Formati immagine di nuova generazione come WEBP e AVIF",
				detail: "Utilizziamo nuovi formati di immagine più ottimizzati per ridurre l'utilizzo della larghezza di banda.",
			},
			source_available: {
				name: "Sorgente a disposizione",
				detail: 'Il nostro intero codice è disponibile su GitHub con una licenza "sorgente disponibile". Chiunque può visualizzarlo e contribuire.',
			},
		},
		socials: {
			discord: "Unisciti a @:common.appName su Discord",
			discord_online_count: "{0} online adesso",
			twitter: "Seguici su Twitter",
			github: "Contribuisci",
		},
	},
	// Nav Bar
	nav: {
		home: "Home",
		about: "Info",
		emotes: "Emotes",
		store: "Abbonati",
		admin: "Amministratore",
		sign_in: "Accedi",
		wip_notice: {
			heading: "Benvenuto nel nuovo sito di @:common.appName",
			text1: "Questa è un'anteprima anticipata del nuovo modo di sperimentare @:common.appName{'.'}",
			text2: "Esplora le novità e dacci un feedback! Nota che il sito subirà rapidi cambiamenti e potrebbe frequentemente non funzionare.",
		},
	},
	activity: {
		emote_created: "{T} Creata",
		emote_renamed: "Rinominata {T} da {O} a {N}",
		emote_listing_approved: "Approvata {T} per la lista pubblica",
		emote_listing_revoked: "Rimossa {T} dalla lista pubblica",
		emote_merged: "Unita {T} a {0}",
		emote_ownership_transferred: "Trasferita proprietà di {T} a {U}",
		emote_restored: "{T} Ripristinata",
		emote_updated: "Modificate le proprietà di {T}",
		emote_deleted: "{T} Eliminata",
		emote_version_created: "Creata la versione '{VER}' di {T}",
		emote_version_renamed: "Rinominata la versione '{VER}' di {T} da {1} a {2}",
		emote_version_approved: "Approvata la versione {VER} di {T} per la pubblicazione",
		emote_version_restored: "Ripristinata la versione '{VER}' di {T}",
		emote_version_deleted: "Eliminata la versione '{VER}' di {T}",
		user_created: "{T} Creato",
		user_deleted: "{T} Eliminato",
		user_editor_added: "Aggiunto {U} come editor",
		user_editor_added_other: "Aggiunto {U1} come editor di {U2}",
		user_editor_removed: "Privilegi editor di {U} revocati",
		user_editor_removed_other: "Privilegi editor di {U1} revocati da {U2}",
		user_banned: "{T} Bannato",
		user_unbanned: "Rimosso il ban {T}",
		user_updated: "Modificate le proprietà di {T}",
		user_sign_in: "{T} ha effettuato l'accesso",
		user_sign_out: "{T} si è disconnesso",
		user_forbidden: "A {T} è stato negato l'accesso a {0}",
		emote_set_created: "{T} Creato",
		emote_set_emote_added: "Aggiunta l'emote {AE} a {T}",
		emote_set_emote_removed: "Rimossa l'emote {AE} da {T}",
		emote_set_emote_renamed: "Rinominata l'emote {AE} da {O} a {N} in {T}",
		emote_set_updated: "Modificate le proprietà di {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Aggiungi Emote",
		author: "Aggiunta da",
		created_at: "Creata il",
		versions: "Versioni",
		preview_loading: "Caricamento anteprime... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Caricamento anteprime non riuscito",
		processing: "Elaborazione dell'Emote - potrebbe volerci un po' di tempo.",
		use: "Usa Emote",
		switch_version: "Passa a questa versione",
		in_n_sets: "in {0} set | in {0} set",
		disable: "Disattiva Emote",
		update: "Aggiorna",
		report: "Segnala Emote",
		makePrivate: "Rendi Privata",
		makeGlobal: "Make Global",
		comments: "Commenti",
		channels: "Canali",
		common_names: "Altri nomi per questa emote",
		usage_stats: "Statistiche Emote",
		list: {
			searching: "Ricerca in corso",
			emote_count: "{0} emote",
			no_emotes_listed: "Nessuna emote trovata",
			fetching_slowly: "Siamo spiacenti, sembra che ci stia impiegando più del previsto",
		},
		upload: {
			emote_name: "Nome Emote",
			version_name: "Nome Versione",
			version_description: "Descrizione Della Versione",
			submit_emote: "Invia Emote",
			create_emote_version: "Crea una nuova versione",
			image_upload: "Carica Immagine",
			accepted_formats: "Formati Accettati",
			filetype: "File",
			animation: "Animazione",
			transparency: "Trasparenza",
			emote_details: "Dettagli Emote",
			version_details: "Dettagli Versione",
			attribution: "Attribuzione",
			original_creator: "Creatore Originale",
			as_child: "Stai creando una versione {IS_DIVERGED} di {0}. ",
			content_moderation: "Moderazione Del Contenuto",
			half_transparency_tooltip:
				"I pixel possono essere solo completamente trasparenti o completamente opachi (nessuna trasparenza variabile)",
		},
	},
	emote_set: {
		create: "Nuovo @:common.object.emote_set",
		select: "Seleziona @:common.object.emote_set",
		explain: {
			section: "Cosa sono i @:common.object.emote_set{'s'}?",
			hint: "I Set Emote sono una raccolta di emote che possono essere collegate ai tuoi canali o condivise con altri utenti.",
		},
		no_space: "Slot Pieni",
		none_selected: "Nessun Set Selezionato",
		editing: "Modifica {0}",
		owner: "Set Emote di {USER}",
		owned: "Set Emote Posseduto",
		label_renamed: "Rinominata",
		label_conflict: "Conflitto",
		label_default: "Predefinita",
		modal: {
			selected_channel_count: "nessun canale selezionato | {0} canale selezionato | {0} canali selezionati",
			create_button: "Crea @:common.object.emote_set",
			rename_in_set: "Rinomina in {0}",
			context_rename: "Personalizza Nome Emote",
			context_set_default: "Assegna come predefinito",
			context_unset_default: "Rimuovi Come Predefinito",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Set Emote",
		channel_emotes: "Emote Del Canale",
		joined_at: "Iscritto il {0}",
		editors: "Editori",
		roles: "Ruoli",
		no_channel_emotes: "{0} non ha nessuna emote nel suo canale {1}",
		no_channels: "{0} non ha nessun canale collegato!",
		card: {
			view_full_profile: "Visualizza profilo completo",
		},
		settings: {
			button: "Modifica il profilo",
			section_profile: "Profilo",
			username: "Nome utente",
			display_name: "Nome visualizzato",
			profile_picture: "Immagine del profilo",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Segnala",
		emote_reason: {
			i_made_this: "Ho creato questa emote ma è stata caricata da qualcun altro",
			duplicate: "Questa emote è un duplicato",
			pornographic: "Questo emote contiene immagini pornografiche o eccessivamente sessualizzate",
			violence_gore: "Questa emote mostra estrema violenza o gore",
			i_appear_there: "Questa emote mi raffigura e non mi piace",
			offensive: "Trovo questa emote offensivo",
			other: "Altro",
		},
		uncategorized_prompt: "Qual è il problema?",
		details: "Dettagli (informazioni aggiuntive e/o prove per la tua segnalazione)",
		success: "Segnalazione inviata con successo",
		notify: "Sarai avvisato tramite la posta in arrivo una volta che il tuo rapporto verrà gestito o ulteriori informazioni saranno richieste.",
		complete_step_one: "Continua",
		abuse_notice: "L'abuso della funzione di segnalazione potrebbe portare alla revoca dell'accesso.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Posta in arrivo",
		tabs: {
			all: "Tutti i messaggi",
			unread: "Da leggere",
			important: "Importante",
		},
		unread_tag: "Non letto",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote Approvata per la Pubblicazione",
				content: `
# La tua emote "{EMOTE_NAME}" è stata approvata per la pubblicazione \n
Diventerà ora disponibile nell' Elenco delle Emote e inizierà a comparire su @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote Non Approvata per la Pubblicazione",
				content: `
# La tua emote "{EMOTE_NAME}" è stata rifiutata
Non sarà disponibile tramite l'Elenco pubblico delle Emote o visibile su @:common. ppHost,
ma rimarrà disponibile per gli utenti che possiedono il link.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invito a rivendicare la proprietà di un emote",
				content: `
## {OWNER_DISPLAY_NAME} vuole che tu diventi il proprietario di '{EMOTE_NAME}'

[Vedi Emote]({EMOTE_URL})

**[Accetta Richiesta]({EMOTE_CLAIM_URL})** | [Rifiuta Richiesta]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Sei stato bannato",
				reason: {
					pornographic_content: "",
				},
				content: `
# Account Bannato
Il tuo accesso a @:common.appName è ora limitato.<br/><br/>
### La ragione per questo provvedimento
{BAN_REASON} <br/><br/>
### Restrizioni Applicate<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Questa decisione scadrà nel **{BAN_EXPIRE_AT}**.
_Se pensi che questo sia un errore, per favore manda una mail email a @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Non è più possibile interagire con l'applicazione",
					no_auth: "* Non è più possibile accedere",
					no_ownership: "* Qualsiasi contenuto che hai creato non sarà più disponibile",
					memory_hole: "* Non sarai visibile agli altri utenti",
					ip_blocked: "* Il tuo IP è bloccato dall'accesso a tutti i servizi @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Non siamo riusciti a trovarlo",
		doctor_wtf: "Cosa diavolo è questo?",
		pot_friend: "Sono una pentola, amico",
	},
};
