export default {
	locale: "Português (Brasil)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Saiba Mais",
		more: "Mais",
		retry: "Tente Novamente",
		back: "Back",
		download: "Download | Downloads",
		features: "Recursos",
		comments: "Comentários",
		search: "Pesquisar",
		update: "Atualizar",
		report: "Reportar",
		delete: "Delete",
		cancel: "Cancel",
		submit: "Submit",
		activity: "Activity",
		loading: "Loading",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "Usuário",
			emote_set: "Conjunto de Emotes",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "A Plataforma de Emotes para Todos",
		app_description: "Escolha centenas de emotes para seu canal da Twitch ou YouTube com facilidade",
		why_app: "Por que escolher o @:common.appName{'?'}",
		download_browser: "Extensão para Navegador",
		download_mobile: "Aplicativo para o Celular",
		download_misc: "Outros Aplicativos",
		features: {
			emote_sets: {
				name: "Conjunto de Emotes",
				detail: "Agrupe emotes em conjuntos customizáveis que podem ser compartilhados com outros usuários ou rápidamente trocados em seu canal.",
			},
			many_emote_slots: {
				name: "Centenas de slots de emotes",
				detail: "Comece com {0} slots, com o máximo possível de {1} e sem necessitar de pagamento.",
			},
			channel_emote_names: {
				name: "Nomeação única de emotes para o seu canal",
				detail: "Não gostou de um nome dado a um emote pelo autor? Sem problemas, você pode alterá-lo apenas para o seu canal.",
			},
			real_time: {
				name: "Real-Time",
				detail: "As mudanças nos emotes do seu canal acontecem instantaneamente, para todos os espectadores. F5 não é necessário.",
			},
			emote_versions: {
				name: "Versões de Emotes",
				detail: "Troque entre variantes temáticas ou atualize um emote para uma versão melhorada.",
			},
			userbase: {
				name: "Large Community",
				detail: "@:common.appName serves {0}+ daily unique users and has a library of over {1} public emotes",
			},
			next_gen: {
				name: "Formatos de última geração como WEBP e AVIF",
				detail: "Nós usamos formatos de imagem mais recentes, mais otimizados para reduzir o uso de banda-larga.",
			},
			source_available: {
				name: "Source-Available",
				detail: "Nosso código-base inteiro está disponível no GitHub com uma licença de código-fonte disponível. Qualquer um pode ver e contribuir.",
			},
		},
		socials: {
			discord: "Junte-se a @:common.appName no Discord",
			discord_online_count: "{0} online agora",
			twitter: "Siga-nos no Twitter",
			github: "Contribua",
		},
		legal: {
			terms: "Terms of Service",
			privacy: "Privacy Policy",
			unaffiliated: "@:common.appName is not affiliated with Twitch Interactive",
		},
	},
	// Nav Bar
	nav: {
		home: "Início",
		about: "Sobre",
		emotes: "Emotes",
		store: "Inscreva-se",
		admin: "Administrador",
		sign_in: "Registre-se",
		user_search: "Search Profiles",
		wip_notice: {
			heading: "Welcome to the new @:common.appName website",
			text1: "This is an early preview of the next way to experience @:common.appName{'.'}",
			text2: "Explore what's new and give us some feedback! Note it will be undergoing rapid changes and may break frequently.",
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
		emote_tags_updated: "Set tags for {T}: {N}",
		emote_processed: "Executed a new processing job for {T}",
		emote_version_created: "Created version '{VER}' for {T}",
		emote_version_renamed: "Renamed version '{VER}' for {T} from {1} to {2}",
		emote_version_approved: "Approved version '{VER}' for {T} for public listing",
		emote_version_restored: "Restored version '{VER}' for {T}",
		emote_version_deleted: "Deleted version '{VER}' for {T}",
		emote_flag_added: "Added flag {FLAG} to {T}",
		emote_flag_removed: "Removed flag {FLAG} from {T}",
		user_created: "Created {T}",
		user_deleted: "Deleted {T}",
		user_editor_added: "Added {U} as an editor",
		user_editor_added_other: "Added {U1} as an editor of {U2}",
		user_editor_updated: "Updated editor privileges for {U}",
		user_editor_updated_other: "Updated editor privileges for {U1}, an editor of {U2}",
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
		add: "Adicionar Emote",
		author: "Criador",
		created_at: "Criado",
		versions: "Versões",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		processing_failed: "Processing failed: {0}",
		use: "Usar",
		use_menu: "Add this emote to...",
		switch_version: "Mude para essa versão",
		in_n_sets: "em {0} definir | em {0} conjuntos",
		disable: "Desativar Emote",
		properties: "Properties",
		new_version: "New Version",
		report: "Reportar Emote",
		Privacy: "Privacy",
		comments: "Comentários",
		channels: "Canais",
		common_names: "Other names for this emote",
		usage_stats: "Emote Statistics",
		no_longer_available: "This emote is no longer available",
		tags: "Tags",
		add_tag: "Add Tag",
		trending_rank: "#{0} on Trending",
		avif_no_support:
			"Sorry, {BROWSER} does not support the AVIF format. Try updating to a newer version or try with a different browser.",
		delete_prompt: {
			heading: "Delete {0}",
			heading_versions: "Delete version '{0}' of {1}",
			notice: "Are you sure you want to delete the emote {0}{'?'}",
			notice_versions: "Are you sure you want to delete the version '{0}' from {1}{'?'}",
			reason: "Reason for deletion",
		},
		properties_prompt: {
			heading: "Edit {0}",
		},
		unlisted: {
			heading: "Heads up!",
			warning: "This emote is not publicly listed.",
			warning_flagged: "This emote has been unlisted for the following reasons: {FLAG_LIST}",
			notice: "It can be added to your channel, but we cannot verify if it is safe to show on a livestream.",
			notice_flagged: "It can be added to your channel, however we believe it is unsafe to show on a livestream.",
			show_button: "Show Emote",
			flag_sexual_content: "Sexual or sexually suggestive content",
			flag_epilepsy: "Rapid flashing / seizure-inducing",
			flag_edgy: "Edgy or distasteful",
			flag_twitch_banned: "Disallowed on Twitch",
		},
		list: {
			searching: "Procurando",
			emote_count: "{0} emotes",
			no_emotes_listed: "Nenhum emote encontrado",
			fetching_slowly: "Desculpe, parece que isso está demorando um pouco",
			category: {
				name: "Category",
				top: "Top",
				trending: "Trending",
				featured: "Featured",
				global: "Global",
				new: "New",
			},
			filters: {
				case_sensitive: "Case Sensitive",
				exact_match: "Exact Match",
				ignore_tags: "Ignore Tags",
			},
		},
		upload: {
			emote_name: "Nome do Emote",
			version_name: "Nome da Versão",
			version_description: "Descrição da Versão",
			submit_emote: "Enviar Emote",
			create_emote_version: "Criar Versão do Emote",
			image_upload: "Upload de Imagem",
			accepted_formats: "Formatos Aceitos",
			filetype: "Arquivo",
			animation: "Animação",
			transparency: "Transparência",
			emote_details: "Detalhes do Emote",
			version_details: "Detalhes da Versão",
			attribution: "Atribuição",
			original_creator: "Criador Original",
			as_child: "Você está criando uma {IS_DIVERGED} versão do emote {0}. ",
			content_moderation: "Moderação de Conteúdo",
			half_transparency_tooltip:
				"Os pixels só podem ser totalmente transparentes ou totalmente opacos (sem transparência da variável)",
		},
	},
	emote_set: {
		create: "Novo @:common.object.emote_set",
		select: "Selecione @:common.object.emote_set",
		explain: {
			section: "What are Emote Sets?",
			hint: "Conjuntos de Emotes são coleções que podem ser vinculadas a seus canais ou compartilhados com outros usuários.",
		},
		no_space: "Slots Cheios",
		none_selected: "Nenhum Conjunto Selecionado",
		editing: "Editando {0}",
		owner: "Conjunto de Emotes de {USER}",
		owned: "Conjunto de Emotes Possuídos",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		label_actor: "Enabled by {0}",
		// "enabled by <display_name of actor>"
		context_emote_add: "Add to {SET_NAME}",
		context_emote_remove: "Remove from {SET_NAME}",
		modal: {
			selected_channel_count: "nenhum canal selecionado | {0} canais selecionados | {0} canais selecionados",
			create_button: "Novo @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Grupo de Emotes",
		channel_emotes: "Emotes do Canal",
		joined_at: "Joined {0}",
		editors: "Editores",
		roles: "Cargos",
		connections: "Channels | Channels & Accounts",
		new_connections: "Link accounts...",
		add_editor: "Add Editor",
		editor_modal_heading: "Modify {0}'s Editors",
		editor_modal_user_search: "Who would you like to add as an editor?",
		editor_modal_user_update: "Editor",
		no_channel_emotes: "{0} não tem nenhum emote em seu {1} canal",
		no_channels: "{0} não possui nenhum canal conectado!",
		card: {
			view_full_profile: "Ver Perfil Completo",
		},
		settings: {
			button: "Edit Profile",
			section_profile: "Profile",
			username: "Username",
			display_name: "Display Name",
			profile_picture: "Profile Picture",
			section_badges: "Badges",
			section_paints: "Paints",
			no_badges: "You do not own any badges",
			no_paints: "You do not own any paints",
			sign_out: "Sign Out",
			cosmetics_updated: "Cosmetics Updated",
			cosmetics_updated_message: "It may take between 10 to 30 minutes for your changes to appear in chat.",
		},
		editor_permissions: {
			modify_emotes: "Modify Channel Emotes",
			use_private_emotes: "Use Private Emotes",
			manage_profile: "Manage Profile",
			manage_owned_emotes: "Manage Owned Emotes",
			manage_emote_sets: "Manage Emote Sets",
			manage_billing: "Manage Billing",
			manage_editors: "Manage Editors",
			view_messages: "View Messages",
		},
	},
	store: {
		subscribe_cta: "Become a @:common.appName Subscriber!",
		subscribed: "Thank you for subscribing",
		button_self: "Subscribe",
		button_gift: "Gift a sub",
		billing_information_heading: "Billing Information",
		payment_information_heading: "Payment Information",
		payment_gift_heading: "Select the recipient for this gift",
		payment_methods: "Payment Methods",
		payment_methods_hint: "Choose a payment method",
		payment_method_paypal: "PayPal",
		payment_method_stripe: "Credit Card",
		payment_popup_cta: "Complete the transaction in the new window",
		pay_button: "Pay via {0}",
		product_type_subscription: "Subscription",
		purchase_success: {
			heading: "Purchase Successful",
			text1: "We've received your payment and your subscription has been activated.",
			text2: "Thank you for your support! If you have any questions, please contact us via the methods provided on this page.",
		},
		sub: {
			incentive: "You'll get...",
			creator_tier: "Extras for creators",
			creator_tier_desc: "Upgrade to the Creator tier and get extra coolness for your channel",
			feature_t1_badge: "Subscriber Badge",
			feature_t1_paints: "Nametag Paints",
			feature_t1_animated_profile_picture: "Animated Profile Picture",
			feature_t1_zero_width: "Zero Width Emotes",
			feature_t1_global_raffle: "Global Emote Raffle Ticket",
			feature_t1_personal_emotes: "Personal Emotes",
			feature_t2_animated_profile_banner: "Animated Profile Banner",
			feature_t2_animated_offline_screen: "Animated Offline Screen",
			feature_t2_extended_sub_emotes: "Extended Sub Emotes",
			current_plan: "Your Plan",
			cancel: "Do Not Renew",
			update_payment: "Update Payment Method",
			reactivate: "Reactivate Subscription",
			cancel_prompt: "Are you sure you want to cancel your subscription?",
			state_heading: "Your Subscription",
			state_badge_progress: "Badge Progress",
			state_paints: "Paints",
			state_anniversary:
				"Your Sub anniversary is today | Your next anniversary is in {0} day | Your next Sub anniversary is in {0} days",
			state_age:
				"You subscribed today | You've been subscribed for {0} day | You've been subscribed for {0} days",
			state_ending: "Your sub ends today | Your sub ends in {0} day | Your sub ends in {0} days",
			state_collection_heading: "Collection",
			state_paints_heading: "Unlocked Paints ({0})",
			state_raffle: "Global Emote Raffle",
			state_leaderboards: "Top Gifters",
			raffle: {
				starts_at: "{0} days",
				starts_at_hint: "The next sub raffle begins on {0}",
			},
		},
	},
	// Text that is relating to the reporting system
	reporting: {
		report: "Reportar",
		emote_reason: {
			i_made_this: "Eu sou o criador desse emote, mas ele foi enviado por outra pessoa",
			duplicate: "Esse emote está duplicado",
			pornographic: "Este emote contém imagens pornográficas ou excessivamente sexualizadas",
			violence_gore: "Esse emote contém violência extrema ou gore",
			i_appear_there: "Esse emote me retrata e eu não gosto disso",
			offensive: "Eu acho esse emote ofensivo",
			other: "Outro motivo",
		},
		uncategorized_prompt: "Qual o problema?",
		details: "Detalhes (informações adicionais e/ou provas para o seu reporte)",
		success: "Reporte enviado com sucesso",
		notify: "Você será notificado na caixa de entrada assim que o problema for resolvido ou outras informações forem solicitadas.",
		complete_step_one: "Continuar",
		abuse_notice: "O abuso da função de reporte pode fazer com que seu acesso seja revogado.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Caixa de Entrada",
		tabs: {
			all: "Todas as Mensagens",
			unread: "Não lida(s)",
			important: "Importante",
		},
		unread_tag: "Não lida(s)",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote Aprovado para Listagem",
				content: `
# Seu emote "{EMOTE_NAME}" foi aprovado para listagem \n
Agora ele estará disponível no Diretório de Emotes e começará a aparecer no @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote não Aprovado para Listagem",
				content: `
# Seu emote "{EMOTE_NAME}" foi rejeitado
Ele não estará disponível via o Diretório de Emotes público e não será visível no @:common.appHost, mas continuará disponível para usuários com o link.
`,
			},
			emote_ownership_claim_request: {
				subject: "Pedido para reivindicar a posse de um emote",
				content: `
## {OWNER_DISPLAY_NAME} quer que você vire o dono do emote '{EMOTE_NAME}'

[Veja o Emote]({EMOTE_URL})

**[Aceite o Pedido]({EMOTE_CLAIM_URL})** | [Recuse o Pedido]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Você foi banido(a)",
				reason: {
					pornographic_content: "",
				},
				content: `
# Conta Banida
Seu acesso no @:common.appName agora está limitado.<br/><br/>
### Razão para esta punição
{BAN_REASON} <br/><br/>
### Restrições Aplicadas<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Essa decisão expira em **{BAN_EXPIRE_AT}**.
_Se você acredita que houve um erro em nossa decisão, envie um email para @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Você não pode mais interagir com o aplicativo",
					no_auth: "* Você não pode mais fazer login",
					no_ownership: "* Todo o conteúdo que você criou não estará mais disponível",
					memory_hole: "* Você não ficará visível para outros usuários",
					ip_blocked: "* Seu IP está bloqueado de acessar todos os @:common.appName serviços",
				},
			},
			report_closed: {
				subject: "Report closed",
				content: `
Thank you for notifying us, your report {'#'}{CASE_ID} has been handled.
				`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Não conseguimos encontrar",
		doctor_wtf: "Mas que diabos é isso?",
		pot_friend: "Algo deu errado",
	},
};
