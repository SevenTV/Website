export default {
	locale: "Català (Catalunya)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Per saber-ne més",
		more: "Més",
		retry: "Torna a provar",
		downloads: "Descàrregues",
		features: "Funcionalitats",
		comments: "Comentaris",
		search: "Cerca",
		update: "Actualitzar",
		report: "Reportar",
		activity: "Activitat",
		loading: "Carregant",
		save_changes: "Guarda els canvis",
		reset: "Reinicia",
		object: {
			user: "Usuari",
			emote_set: "Conjunt d'emoticones",
			emote: "Emoticona",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "La plataforma d'emoticones per tothom",
		app_description: "Gestiona centenars d'emoticones pels teus canals de Twitch o YouTube amb comoditat",
		why_app: "Per què @:common.appName{'?'}",
		download_browser: "Extensió del navegador",
		download_mobile: "Apps mòbils",
		download_misc: "Altres aplicacions",
		features: {
			emote_sets: {
				name: "Conjunts d'emoticones",
				detail: "Agrupa emoticones en conjunts personalitzables que es poden compartir amb altres usuaris o traspassar-los ràpidament al teu canal.",
			},
			many_emote_slots: {
				name: "Centenars d'espais per emoticones",
				detail: "Comença amb {0} ranures, amb un màxim possible de {1} gratuïtament.",
			},
			channel_emote_names: {
				name: "Nom d'emoticones per canal",
				detail: "No t'agrada el nom de l'emoticona donat pel seu autor? No et preocupis, pots canviar-lo només pel teu canal.",
			},
			real_time: {
				name: "En temps real",
				detail: "El canvi d'emoticones al teu canal es fa instantàniament, per a tots els espectadors. No cal fer F5.",
			},
			emote_versions: {
				name: "Versions de l'emoticona",
				detail: "Intercanvia entre variants temàtiques o actualitza una emoticona a una versió millorada.",
			},
			next_gen: {
				name: "Formats d'imatge de nova generació com WEBP i AVIF",
				detail: "Utilitzem formats d'imatge més moderns i optimitzats per reduir l'ús de l'amplada de banda.",
			},
			source_available: {
				name: "Codi font disponible",
				detail: "Tota la nostra base de codis font està disponible a GitHub amb una llicència de codi font disponible. Qualsevol persona pot veure-la i col·laborar.",
			},
		},
		socials: {
			discord: "Uneix-te a @:common.appName a Discord",
			discord_online_count: "{0} en línia ara",
			twitter: "Segueix-nos a Twitter",
			github: "Contribueix",
		},
	},
	// Nav Bar
	nav: {
		home: "Inici",
		about: "Més informació",
		emotes: "Emoticones",
		store: "Subscriu-te",
		admin: "Administrador",
		sign_in: "Inicia sessió",
		wip_notice: {
			heading: "Benvinguts a la nova pàgina web de @:common.appName",
			text1: "Aquesta és una vista prèvia de la nova forma d'experimentar @:common.appName{'.'}",
			text2: "Exploreu les novetats i feu-nos arribar un comentari! Tingueu en compte que això està sotmès sota canvis ràpids i es pot espatllar amb freqüència.",
		},
	},
	activity: {
		emote_created: "{T} creat",
		emote_renamed: "{T} reanomenat de {O} a {N}",
		emote_listing_approved: "S'ha aprovat {T} pel llistat públic",
		emote_listing_revoked: "S'ha eliminat {T} del llistat públic",
		emote_merged: "S'ha fusionat {T} a {0}",
		emote_ownership_transferred: "S'ha transferit la propietat de {T} a {U}",
		emote_restored: "{T} restaurat",
		emote_updated: "S'han canviat les propietats de {T}",
		emote_deleted: "S'ha suprimit {T}",
		emote_processed: "S'ha executat una tasca de processament nova per a {T}",
		emote_version_created: "S'ha creat la versió '{VER}' per a {T}",
		emote_version_renamed: "S'ha canviat el nom de la versió '{VER}' per a {T} de {1} a {2}",
		emote_version_approved: "Versió aprovada '{VER}' per a {T} pel llistat públic",
		emote_version_restored: "S'ha restaurat la versió '{VER}' per a {T}",
		emote_version_deleted: "S'ha suprimit la versió '{VER}' per a {T}",
		user_created: "{T} creat",
		user_deleted: "{T} eliminat",
		user_editor_added: "Heu afegit {U} com a editor",
		user_editor_added_other: "S'ha afegit {U1} com a editor de {U2}",
		user_editor_removed: "Heu tret els privilegis d'editor a {U}",
		user_editor_removed_other: "S'ha tret els privilegis d'editor a {U1} de {U2}",
		user_banned: "{T} ha sigut prohibit",
		user_unbanned: "Ja no s'ha prohibit {T}",
		user_updated: "S'han canviat les propietats de {T}",
		user_sign_in: "{T} ha iniciat la sessió",
		user_sign_out: "{T} ha tancat la sessió",
		user_forbidden: "A {T} se li ha denegat l'accés a {0}",
		emote_set_created: "{T} s'ha creat",
		emote_set_emote_added: "S'ha afegit l'emoticona {AE} a {T}",
		emote_set_emote_removed: "S'ha eliminat l'emoticona {AE} de {T}",
		emote_set_emote_renamed: "S'ha canviat el nom de l'emoticona {AE} de {O} a {N} a {T}",
		emote_set_updated: "S'han canviat les propietats de {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Afegeix emoticona",
		author: "Afegit per",
		created_at: "Creat",
		versions: "Versions",
		preview_loading: "S'estan carregant les previsualitzacions... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "No s'han pogut carregar les previsualitzacions",
		processing: "Processament de l'emoticona - això pot trigar una mica.",
		use: "Utilitza l'emoticona",
		switch_version: "Intercanviar-ho per aquesta versió",
		in_n_sets: "en {0} conjunt | en {0} conjunts",
		disable: "Desactiva l'emoticona",
		update: "Actualitzar",
		report: "Reporta l'emoticona",
		makePrivate: "Privatitza-ho",
		makeGlobal: "Make Global",
		comments: "Comentaris",
		channels: "Canals",
		common_names: "Altres àlies d'aquesta emoticona",
		usage_stats: "Estadístiques de l'emoticona",
		unlisted: {
			heading: "Atenció!",
			warning: "Aquesta emoticona no està llistada a la llista pública.",
			warning_flagged: "Aquesta emoticona s'ha tret de la llista pública pels motius següents: {FLAG_LIST}",
			notice: "Es pot afegir al teu canal, però no podem verificar si és segur per mostrar-ho en un directe.",
			notice_flagged: "Es pot afegir al teu canal, però creiem que no és segur mostrar-lo en un directe.",
			show_button: "Mostra l'emoticona",
			flag_sexual_content: "Contingut sexual o suggerent",
			flag_epilepsy: "Parpelleig ràpid, pot induir convulsions",
			flag_edgy: "Atrevit o de mal gust",
			flag_twitch_banned: "No permès a Twitch",
		},
		list: {
			searching: "Cercant",
			emote_count: "{0} emotes",
			no_emotes_listed: "No s'han trobat emotes",
			fetching_slowly: "Ho sentim, està trigant més de l'estimat",
		},
		upload: {
			emote_name: "Nom de l'emoticona",
			version_name: "Nom de la versió",
			version_description: "Descripció de la versió",
			submit_emote: "Puja una emoticona",
			create_emote_version: "Crea una versió de l'emoticona",
			image_upload: "Puja una imatge",
			accepted_formats: "Formats acceptats",
			filetype: "Arxiu",
			animation: "Animació",
			transparency: "Transparència",
			emote_details: "Detalls de l'emoticona",
			version_details: "Detalls de la versió",
			attribution: "Atribució",
			original_creator: "Creador original",
			as_child: "Estàs creant una versió {IS_DIVERGED} de {0}. ",
			content_moderation: "Moderació del contingut",
			half_transparency_tooltip:
				"Els píxels només poden ser totalment transparents o opacs (sense transparència variable)",
		},
	},
	emote_set: {
		create: "Nou @:common.object.emote_set",
		select: "Selecciona @:common.object.emote_set",
		explain: {
			section: "Què són @:common.object.emote_set{'s'}?",
			hint: "Els conjunts d'emoticones són col·leccions que poden ser vinculats al teu canal o compartits amb altres usuaris.",
		},
		no_space: "No tens més espai!",
		none_selected: "No s'ha seleccionat cap conjunt",
		editing: "Editant {0}",
		owner: "Conjunt d'emoticones de {USER}",
		owned: "Conjunt d'emoticones en propietat",
		label_renamed: "Reanomenat",
		label_conflict: "Conflictiu",
		label_default: "Per defecte",
		modal: {
			selected_channel_count: "canal no seleccionat | {0} canal seleccionat | {0} canals seleccionats",
			create_button: "Crea @:common.object.emote_set",
			rename_in_set: "Canvia el nom a {0}",
			context_rename: "Personalitza el nom de l'emoticona",
			context_set_default: "Assigna com a predeterminat",
			context_unset_default: "Desassigna com a predeterminat",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Conjunt d'emoticones",
		channel_emotes: "Emoticones del canal",
		joined_at: "S'ha unit a {0}",
		editors: "Editors",
		roles: "Rols",
		connections: "Canals | Canals & Compte",
		new_connections: "Enllaça comptes...",
		no_channel_emotes: "{0} no té emotes al seu canal {1}",
		no_channels: "{0} no està connectat a cap canal!",
		card: {
			view_full_profile: "Veure perfil complet",
		},
		settings: {
			button: "Edita el perfil",
			section_profile: "Perfil",
			username: "Usuari",
			display_name: "Mostra el nom",
			profile_picture: "Foto de perfil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Reporta",
		emote_reason: {
			i_made_this: "Vaig crear aquesta emoticona, però va ser pujat per una altra persona",
			duplicate: "Aquesta emoticona és un duplicat",
			pornographic: "Aquesta emoticona conté pornografia o contingut massa sexual",
			violence_gore: "Aquesta emoticona mostra violència extrema o contingut 'gore'",
			i_appear_there: "Aquesta emoticona m'identifica i no m'agrada",
			offensive: "Trobo aquesta emoticona ofensiva",
			other: "Un altre motiu",
		},
		uncategorized_prompt: "Quin és el problema?",
		details: "Detalls (informació addicional i/o proves per al vostre informe)",
		success: "L'informe s'ha enviat correctament",
		notify: "Se us notificarà a través de la safata d'entrada un cop s'hagi tractat l'informe o quan se sol·liciti més informació.",
		complete_step_one: "Segueix",
		abuse_notice: "L'ús abusiu de la funció de reportar pot comportar la revocació del vostre accés.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Safata d'entrada",
		tabs: {
			all: "Tots els missatges",
			unread: "Sense llegir",
			important: "Important",
		},
		unread_tag: "Sense llegir",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emoticona aprovada per ser publicada",
				content: `
# La teva emoticona "{EMOTE_NAME}" ha sigut aprovada per ser publicat \n
A partir d'ara, estarà disponible en el directori d'emoticones, i apareixerà en @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emoticona no aprovada per ser publicada",
				content: `
# La teva emoticona "{EMOTE_NAME}" ha sigut rebutjada.
No estarà disponible a través del directori públic d'emoticones ni visible en @:common.appHost,
però continuarà disponible pels usuaris amb l'enllaç.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitació per reclamar la propietat d'una emoticona",
				content: `
## {OWNER_DISPLAY_NAME} vol que siguis el/la propietari/ària de '{EMOTE_NAME}'

[Veure emoticona]({EMOTE_URL})

**[Accepta la proposta]({EMOTE_CLAIM_URL})** | [Denega la proposta]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Compte suspès",
				reason: {
					pornographic_content: "",
				},
				content: `
# Compte suspès
El teu accés a @:common.appName ha sigut limitat.<br/><br/>
### Els motius per aquesta acció
{BAN_REASON} <br/><br/>
### Restriccions aplicades<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}


<br/>Aquesta decisió expira el **{BAN_EXPIRE_AT}**.
_Si creus que això ha sigut un error, si us plau envia un correu a @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Ja no pots interactuar amb l'aplicació",
					no_auth: "* Ja no pots iniciar sessió",
					no_ownership: "* Qualsevol contingut que hagis creat ja no estarà disponible",
					memory_hole: "* No seràs visible pels altres usuaris",
					ip_blocked:
						"* La teva adreça IP està bloquejada i no podrà accedir a cap dels serveis de @:common.appName",
				},
			},
			report_closed: {
				subject: "Informe tancat",
				content: `
Gràcies per notificar-nos, el vostre informe {'#'}{CASE_ID} s'ha gestionat.`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "No hem pogut trobar-ho",
		doctor_wtf: "Què dimonis és això?",
		pot_friend: "Sóc un pot, amic",
	},
};
