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
		loading: "Loading",
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
		add: "Afegeix emoticona",
		author: "Afegit per",
		created_at: "Creat",
		versions: "Versions",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
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
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "canal no seleccionat | {0} canal seleccionat | {0} canals seleccionats",
			create_button: "Crea @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Conjunt d'emoticones",
		channel_emotes: "Emoticones del canal",
		editors: "Editors",
		roles: "Rols",
		no_channel_emotes: "{0} no té emotes al seu canal {1}",
		no_channels: "{0} no està connectat a cap canal!",
		card: {
			view_full_profile: "Veure perfil complet",
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
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "No hem pogut trobar-ho",
		doctor_wtf: "Què dimonis és això?",
		pot_friend: "Sóc un pot, amic",
	},
};
