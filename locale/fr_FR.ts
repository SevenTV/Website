export default {
	locale: "Français (France)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "En savoir plus",
		more: "Plus",
		retry: "Réessayer",
		downloads: "Téléchargements",
		features: "Fonctionnalités",
		comments: "Commentaires",
		search: "Recherche",
		update: "Mettre à jour",
		report: "Signaler",
		activity: "Activité",
		loading: "Loading",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "Utilisateur",
			emote_set: "Set d'emotes",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "La plateforme d’emotes pour tous",
		app_description: "Gérez des centaines d'emotes pour vos chaînes Twitch ou YouTube sans aucun effort",
		why_app: "Pourquoi @:common.appName{'?'}",
		download_browser: "Extensions web",
		download_mobile: "Applis mobiles",
		download_misc: "Autres applis",
		features: {
			emote_sets: {
				name: "Collections d'emotes",
				detail: "Grouper les emotes dans des collections personnalisables qui peuvent être partagés avec d'autres utilisateurs ou rapidement échangés sur votre chaîne.",
			},
			many_emote_slots: {
				name: "Des centaines d'emplacements d'emotes",
				detail: "Utilisez entre {0} et {1} slots, gratuitement.",
			},
			channel_emote_names: {
				name: "Nom des emotes modifiable par chaîne",
				detail: "Vous n'aimez pas le nom donné à une emote par son auteur ? Pas de problème, vous pouvez changer le nom de n'importe quelle emote juste pour votre chaîne.",
			},
			real_time: {
				name: "En direct",
				detail: "Mise à jour instantanée pour tous les spectateurs quand une emote est ajouté ou enlevé de votre chaine.",
			},
			emote_versions: {
				name: "Versions de l'emote",
				detail: "Échanger entre les thèmes ou mettre à jour une emote vers une version améliorée.",
			},
			next_gen: {
				name: "Formats d'image de nouvelle génération tels que WEBP et AVIF",
				detail: "Nous utilisons des formats d'image plus récents et plus optimisés pour réduire l'utilisation de la bande passante.",
			},
			source_available: {
				name: "Source disponible",
				detail: "Toute notre base de code est disponible sur GitHub avec une licence disponible sur le source. N'importe qui peut voir et contribuer.",
			},
		},
		socials: {
			discord: "Rejoignez @:common.appName sur Discord",
			discord_online_count: "{0} en ligne en ce moment",
			twitter: "Suivez-nous sur Twitter",
			github: "Contribuer",
		},
	},
	// Nav Bar
	nav: {
		home: "Accueil",
		about: "Info",
		emotes: "Emotes",
		store: "S'abonner",
		admin: "Admin",
		sign_in: "Se connecter",
		wip_notice: {
			heading: "Bienvenue sur le nouveau site internet @:common.appName",
			text1: "Ceci est un aperçu anticipé de la prochaine façon de découvrir @:common.appName{'.'}",
			text2: "Explorez ce qui est nouveau et donnez-nous des retours ! Notez qu'il va subir des changements rapides et peut se briser fréquemment.",
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
		add: "Ajouter l'emote",
		author: "Ajouté par",
		created_at: "Crée le",
		versions: "Versions",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Utiliser l'emote",
		switch_version: "Passer à cette version",
		in_n_sets: "dans {0} collection | dans {0} collections",
		disable: "Désactiver l'emote",
		update: "Mettre à jour",
		report: "Signaler l'emote",
		makePrivate: "Rendre privé",
		makeGlobal: "Rendre global",
		comments: "Commentaires",
		channels: "Chaînes",
		common_names: "Autres noms pour cette emote",
		usage_stats: "Statistiques de l'emote",
		list: {
			searching: "Recherche en cours",
			emote_count: "{0} emotes",
			no_emotes_listed: "Aucune emote trouvée",
			fetching_slowly: "Désolé, il semble que cela prenne un certain temps",
		},
		upload: {
			emote_name: "Nom de l'emote",
			version_name: "Nom de la version",
			version_description: "Description de la version",
			submit_emote: "Envoyer l'emote",
			create_emote_version: "Créer une version de l'emote",
			image_upload: "Téléchargement de l'image",
			accepted_formats: "Formats acceptés",
			filetype: "Fichier",
			animation: "Animation",
			transparency: "Transparence",
			emote_details: "Détails de l'emote",
			version_details: "Détails de la version",
			attribution: "Attribution",
			original_creator: "Créateur original",
			as_child: "Vous êtes en train de créer une version {IS_DIVERGED} de {0}. ",
			content_moderation: "Modération du contenu",
			half_transparency_tooltip:
				"Les pixels ne peuvent être que totalement transparents ou totalement opaques (aucune transparence variable)",
		},
	},
	emote_set: {
		create: "Nouvelle @:common.object.emote_set",
		select: "Sélectionner @:common.object.emote_set",
		explain: {
			section: "Que sont les @:common.object.emote_set{'s'}?",
			hint: "Les collections d'emotes sont un ensemble d'emotes qui peuvent être utilisé sur votre chaîne ou partagées avec d'autres utilisateurs.",
		},
		no_space: "Emplacements pleins",
		none_selected: "Aucune collection sélectionnée",
		editing: "Modifier {0}",
		owner: "Collection de {USER}",
		owned: "Collection d'emotes possédées",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "pas de chaîne sélectionnée | {0} chaîne sélectionnée | {0} chaîne sélectionnées",
			create_button: "Créer une @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Collections d'emotes",
		channel_emotes: "Emotes de la chaîne",
		joined_at: "Joined {0}",
		editors: "Éditeurs",
		roles: "Rôles",
		no_channel_emotes: "{0} n'a pas d'emote sur sa chaîne {1}",
		no_channels: "{0} n'a aucune chaîne connectée !",
		card: {
			view_full_profile: "Voir le profil complet",
		},
		settings: {
			button: "Edit Profile",
			section_profile: "Profile",
			username: "Username",
			display_name: "Display Name",
			profile_picture: "Profile Picture",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Signaler",
		emote_reason: {
			i_made_this: "J'ai créé cette emote mais elle a été publiée par quelqu'un d'autre",
			duplicate: "Cette emote est un dupliqué",
			pornographic: "Cette emote contient des images pornographiques ou trop sexuelles",
			violence_gore: "Cette emote affiche une violence extrême et/ou gore",
			i_appear_there: "Cette emote me représente et je ne l'aime pas",
			offensive: "Je trouve cette emote offensante",
			other: "Autre",
		},
		uncategorized_prompt: "Quel est le problème ?",
		details: "Détails (informations supplémentaires et/ou preuves pour votre signalement)",
		success: "Votre demande a bien été prise en compte",
		notify: "Vous serez notifié par la boîte de réception une fois que votre signalement sera traité ou que des informations supplémentaires seront demandées.",
		complete_step_one: "Continuer",
		abuse_notice: "L'abus de la fonction de signalement peut entraîner la révocation de votre accès.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Boîte de réception",
		tabs: {
			all: "Tous les messages",
			unread: "Non lus",
			important: "Important",
		},
		unread_tag: "Non lus",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote approuvée pour tout public",
				content: `
# Votre emote "{EMOTE_NAME}" a été approuvée pour tout public \n
Elle sera maintenant disponible sur le Répertoire des Emotes et commencera à apparaître sur @:common. ppHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote non approuvée pour tout public",
				content: `
# Votre emote "{EMOTE_NAME}" a été rejetée.
Elle ne sera pas disponible via le répertoire public des emotes ou visible sur @:common.appHost,
mais restera disponible pour les utilisateurs avec le lien.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitation à réclamer la propriété d'une emote",
				content: `
## {OWNER_DISPLAY_NAME} veut que vous deveniez le propriétaire de '{EMOTE_NAME}'

[Voir Emote]({EMOTE_URL})

**[Accept Request]({EMOTE_CLAIM_URL})** | [Decline Request]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Vous avez été banni",
				reason: {
					pornographic_content: "",
				},
				content: `
# Compte banni
Votre accès à @:common.appName est maintenant limité.<br/><br/>
### Raison de cette action
{BAN_REASON} <br/><br/>
### Restrictions appliquées<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Cette décision expire **{BAN_EXPIRE_AT}**.
_Si vous pensez qu'il s'agit d'une erreur, veuillez envoyer un email à @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Vous ne pouvez plus interagir avec l'application",
					no_auth: "* Vous ne pouvez plus vous connecter",
					no_ownership: "* Tout contenu que vous avez créé ne sera plus disponible",
					memory_hole: "* Vous ne serez plus visible par les autres utilisateurs",
					ip_blocked: "* Votre adresse IP est bloquée pour accéder à tous les services @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Nous n'avons pas pu trouver la page",
		doctor_wtf: "C'est quoi ce truc ?",
		pot_friend: "Je suis un pot, mon ami",
	},
};
