export default {
	locale: "Español (Latino)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Más información",
		more: "Más",
		retry: "Reintentar",
		downloads: "Descargas",
		features: "Características",
		comments: "Comentarios",
		search: "Buscar",
		update: "Actualizar",
		report: "Reportar",
		activity: "Actividad",
		loading: "Cargando",
		save_changes: "Guardar Cambios",
		reset: "Restablecer",
		object: {
			user: "Usuario",
			emote_set: "Conjunto de Emotes",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "La Plataforma de Emotes para Todos",
		app_description: "Gestiona con facilidad cientos de emotes para tus canales de Twitch o YouTube",
		why_app: "¿Por qué @:common.appName{'?'}",
		download_browser: "Extensión de Navegador",
		download_mobile: "Aplicaciones Móviles",
		download_misc: "Otras Aplicaciones",
		features: {
			emote_sets: {
				name: "Conjuntos de Emotes",
				detail: "Agrupa emotes en conjuntos personalizables que pueden ser compartidos con otros usuarios o rápidamente cambiados a tu canal.",
			},
			many_emote_slots: {
				name: "Cientos de espacios para emotes",
				detail: "Empieza con {0} espacios, con un máximo posible de {1} y sin pagar.",
			},
			channel_emote_names: {
				name: "Nombres de emotes por canal",
				detail: "¿No te gusta el nombre que le dió su autor al emote? No hay problema, puedes cambiarlo solo para tu canal.",
			},
			real_time: {
				name: "En tiempo real",
				detail: "El cambio de emotes en tu canal ocurre al instante, para todos los espectadores, no es necesario hacer F5.",
			},
			emote_versions: {
				name: "Versiones de Emotes",
				detail: "Cambia entre variantes temáticas o actualiza un emote a una versión mejorada.",
			},
			next_gen: {
				name: "Formatos de imagen de última generación, como WEBP y AVIF",
				detail: "Utilizamos nuevos formatos de imagen más optimizados para reducir el uso del ancho de banda.",
			},
			source_available: {
				name: "Fuente disponible",
				detail: "Nuestro código base completo está disponible en GitHub, con una licencia de código abierto. Cualquiera puede ver y contribuir.",
			},
		},
		socials: {
			discord: "Únete a @:common.appName en Discord",
			discord_online_count: "{0} usuario(s) conectado(s) ahora",
			twitter: "Síguenos en Twitter",
			github: "Contribuir",
		},
	},
	// Nav Bar
	nav: {
		home: "Inicio",
		about: "Acerca de 7TV",
		emotes: "Emotes",
		store: "Suscríbete",
		admin: "Admin",
		sign_in: "Iniciar sesión",
		wip_notice: {
			heading: "Bienvenido al nuevo sitio web de @:common.appName",
			text1: "Este es un vistazo a la próxima forma de experimentar @:common.appName{'.'}",
			text2: "¡Explora las novedades y danos tu opinión! Ten en cuenta que se producirán cambios rápidos y que puede fallar con frecuencia.",
		},
	},
	activity: {
		emote_created: "Creó {T}",
		emote_renamed: "Renombró {T} de {O} a {N}",
		emote_listing_approved: "Aprobó {T} para la lista pública",
		emote_listing_revoked: "Removió {T} de la lista pública",
		emote_merged: "Fusionó {T} en {0}",
		emote_ownership_transferred: "Transfirió la propiedad de {T} a {U}",
		emote_restored: "Restauró {T}",
		emote_updated: "Cambió las propiedades de {T}",
		emote_deleted: "Eliminó {T}",
		emote_version_created: "Creó la versión '{VER}' para {T}",
		emote_version_renamed: "Renombró la versión '{VER}' para {T} de {1} a {2}",
		emote_version_approved: "Aprobó la versión '{VER}' de {T} para la lista pública",
		emote_version_restored: "Restauró la versión '{VER}' para {T}",
		emote_version_deleted: "Versión '{VER}' eliminada para {T}",
		user_created: "Creó {T}",
		user_deleted: "Eliminó {T}",
		user_editor_added: "Añadió a {U} como editor",
		user_editor_added_other: "Añadió a {U1} como editor de {U2}",
		user_editor_removed: "Retiró los privilegios de editor de {U}",
		user_editor_removed_other: "Retiró los privilegios de editor de {U1} a {U2}",
		user_banned: "Vetó a {T}",
		user_unbanned: "Removió el veto de {T}",
		user_updated: "Cambió las propiedades de {T}",
		user_sign_in: "{T} ha iniciado sesión",
		user_sign_out: "{T} ha cerrado sesión",
		user_forbidden: "Negó el acceso de {T} a {0}",
		emote_set_created: "Creó {T}",
		emote_set_emote_added: "Añadió el emote {AE} a {T}",
		emote_set_emote_removed: "Removió el emote {AE} de {T}",
		emote_set_emote_renamed: "Renombró el emote {AE} de {O} a {N} en {T}",
		emote_set_updated: "Cambió las propiedades de {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Añadir Emote",
		author: "Agregado por",
		created_at: "Creado el",
		versions: "Versiones",
		preview_loading: "Cargando vistas previas... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Falla al cargar vistas previas",
		processing: "Procesando Emote - esto puede tomar algo de tiempo.",
		use: "Usar Emote",
		switch_version: "Cambiar a esta versión",
		in_n_sets: "en {0} conjunto | en {0} conjuntos",
		disable: "Desactivar Emote",
		update: "Actualizar",
		report: "Reportar Emote",
		makePrivate: "Poner en privado",
		makeGlobal: "Make Global",
		comments: "Comentarios",
		channels: "Canales",
		common_names: "Otros nombres para este emote",
		usage_stats: "Estadísticas del Emote",
		list: {
			searching: "Buscando",
			emote_count: "{0} emotes",
			no_emotes_listed: "No se encontraron emotes",
			fetching_slowly: "Lo sentimos, esto está tardando más de lo esperado",
		},
		upload: {
			emote_name: "Nombre del Emote",
			version_name: "Nombre de la Versión",
			version_description: "Descripción de la Versión",
			submit_emote: "Subir Emote",
			create_emote_version: "Crear Versión del Emote",
			image_upload: "Subir Imagen",
			accepted_formats: "Formatos Aceptados",
			filetype: "Archivo",
			animation: "Animación",
			transparency: "Transparencia",
			emote_details: "Detalles del Emote",
			version_details: "Detalles de la Versión",
			attribution: "Atribución",
			original_creator: "Creador Original",
			as_child: "Estás creando una versión {IS_DIVERGED} de {0}. ",
			content_moderation: "Moderación de Contenido",
			half_transparency_tooltip:
				"Los píxeles solo pueden ser totalmente transparentes o totalmente opacos (sin transparencia variable)",
		},
	},
	emote_set: {
		create: "Nuevo @:common.object.emote_set",
		select: "Seleccionar @:common.object.emote_set",
		explain: {
			section: "¿Qué son @:common.object.emote_set{'s'}?",
			hint: "Los Conjuntos de Emotes son una colección de emoticonos que pueden vincularse a tus canales o compartidos con otros usuarios.",
		},
		no_space: "Espacios Llenos",
		none_selected: "Ningún Conjunto Seleccionado",
		editing: "Editando {0}",
		owner: "Conjunto de Emotes de {USER}",
		owned: "Conjunto de Emotes Propios",
		label_renamed: "Renombrado",
		label_conflict: "Conflicto",
		label_default: "Predeterminado",
		modal: {
			selected_channel_count: "ningún canal seleccionado | {0} canal seleccionado | {0} canales seleccionados",
			create_button: "Crear @:common.object.emote_set",
			rename_in_set: "Renombrar en {0}",
			context_rename: "Personalizar Nombre del Emote",
			context_set_default: "Asignar como Predeterminado",
			context_unset_default: "Desasignar como Predeterminado",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Conjuntos de Emotes",
		channel_emotes: "Emotes del Canal",
		joined_at: "Se unió el {0}",
		editors: "Editores",
		roles: "Roles",
		no_channel_emotes: "{0} no tiene ningún emote en su canal de {1}",
		no_channels: "¡{0} no tiene canales conectados!",
		card: {
			view_full_profile: "Ver Perfil Completo",
		},
		settings: {
			button: "Editar Perfil",
			section_profile: "Perfil",
			username: "Nombre de Usuario",
			display_name: "Nombre Público",
			profile_picture: "Foto de Perfil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Reportar",
		emote_reason: {
			i_made_this: "Yo creé este emote, pero lo subió otra persona",
			duplicate: "Este emote es un duplicado",
			pornographic: "Este emote contiene imágenes pornográficas o excesivamente sexualizadas",
			violence_gore: "Este emote muestra violencia extrema o gore",
			i_appear_there: "Este emote me representa y no me gusta",
			offensive: "Considero que este emote es ofensivo",
			other: "Otra razón",
		},
		uncategorized_prompt: "¿Cuál es el problema?",
		details: "Detalles (información adicional y/o evidencia para tu reporte)",
		success: "Reporte enviado satisfactoriamente",
		notify: "Serás notificado a través de un mensaje privado una vez que se gestione su reporte o se solicite información adicional.",
		complete_step_one: "Continuar",
		abuse_notice: "El abuso de la función de reportar puede dar lugar a la revocación de su acceso.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Bandeja de entrada",
		tabs: {
			all: "Todos los Mensajes",
			unread: "No leídos",
			important: "Importante",
		},
		unread_tag: "No leído",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote Aprobado para Publicarse",
				content: `
# Tu emote "{EMOTE_NAME}" fue aprobado para publicarse \n
Ahora estará disponible en el Directorio de Emotes y aparecerá en @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote No Aprobado para Publicarse",
				content: `
# Tu emote "{EMOTE_NAME}" fue rechazado
No estará disponible a través del Directorio público de emotes o visible en @:common.appHost,
pero seguirá disponible para los usuarios con el enlace.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitación para reclamar la propiedad de un emote",
				content: `
## {OWNER_DISPLAY_NAME} quiere que seas el propietario de '{EMOTE_NAME}'

[Ver Emote]({EMOTE_URL})

**[Aceptar Solicitud]({EMOTE_CLAIM_URL})** | [Rechazar Solicitud]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Tu cuenta ha sido bloqueada",
				reason: {
					pornographic_content: "",
				},
				content: `
# Cuenta bloqueada
Tu acceso a @:common.appName se ha limitado.<br/><br/>
### El motivo
{BAN_REASON} <br/><br/>
### Restricciones aplicadas<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Esta decisión expira el **{BAN_EXPIRE_AT}**.
_Si crees que esto ha sido un error, por favor envía un correo a @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Ya no puedes interactuar con la aplicación",
					no_auth: "* Ya no puedes iniciar sesión",
					no_ownership: "* Cualquier contenido que hayas creado ya no estará disponible",
					memory_hole: "* No serás visible para los demás usuarios",
					ip_blocked: "* Tu IP está bloqueada para acceder a todos los servicios de @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "No hemos podido encontrarlo",
		doctor_wtf: "¿Qué demonios es esto?",
		pot_friend: "Soy un pot, amigo",
	},
};
