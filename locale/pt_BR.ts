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
		downloads: "Downloads",
		features: "Recursos",
		comments: "Comentários",
		search: "Pesquisar",
		update: "Atualizar",
		report: "Reportar",
		activity: "Atividade",
		loading: "Carregando",
		save_changes: "Salvar Alterações",
		reset: "Resetar",
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
				name: "Mudanças em Tempo Real",
				detail: "As mudanças nos emotes do seu canal acontecem instantaneamente, para todos os espectadores. F5 não é necessário.",
			},
			emote_versions: {
				name: "Versões de Emotes",
				detail: "Troque entre variantes temáticas ou atualize um emote para uma versão melhorada.",
			},
			next_gen: {
				name: "Formatos de última geração como WEBP e AVIF",
				detail: "Nós usamos formatos de imagem mais recentes, mais otimizados para reduzir o uso de banda-larga.",
			},
			source_available: {
				name: "Código-fonte Disponível",
				detail: "Nosso código-base inteiro está disponível no GitHub com uma licença de código-fonte disponível. Qualquer um pode ver e contribuir.",
			},
		},
		socials: {
			discord: "Junte-se a @:common.appName no Discord",
			discord_online_count: "{0} online agora",
			twitter: "Siga-nos no Twitter",
			github: "Contribua",
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
		wip_notice: {
			heading: "Bem-vindo ao novo site da @:common.appName",
			text1: "Isso é uma prévia antecipada da próxima maneira de experimentar a @:common.appName{'.'}",
			text2: "Explore as novidades e nos dê sua opinião! Note que ele estará passando por rápidas mudanças e poderá quebrar com frequência.",
		},
	},
	activity: {
		emote_created: "{T} criado",
		emote_renamed: "{T} Renomeado de {O} para {N}",
		emote_listing_approved: "{T} aprovado para listagem pública",
		emote_listing_revoked: "{T} removido da listagem pública",
		emote_merged: "{T} combinado com {0}",
		emote_ownership_transferred: "Propriedade de {T} transferida para {U}",
		emote_restored: "{T} restaurado",
		emote_updated: "Propriedades de {T} alteradas",
		emote_deleted: "{T} excluído",
		emote_processed: "Executada uma nova tarefa de processamento para {T}",
		emote_version_created: "Versão '{VER}' criada para {T}",
		emote_version_renamed: "Versão '{VER}' de {T} renomeado de {1} para {2}",
		emote_version_approved: "Versão '{VER}' aprovada para {T} para listagem pública",
		emote_version_restored: "Versão '{VER}' restaurada para {T}",
		emote_version_deleted: "Versão '{VER}' excluida para {T}",
		user_created: "Criado {T}",
		user_deleted: "{T} excluído",
		user_editor_added: "{U} adicionado como editor",
		user_editor_added_other: "Adicionado {U1} como editor de {U2}",
		user_editor_removed: "Privilégios de editor de {U} revogados",
		user_editor_removed_other: "Privilégios revogados de {U1} como editor de {U2}",
		user_banned: "{T} banido",
		user_unbanned: "{T} desbanido",
		user_updated: "Propriedades de {T} alteradas",
		user_sign_in: "{T} entrou",
		user_sign_out: "{T} se desconectou",
		user_forbidden: "O acesso de {T} foi negado a {0}",
		emote_set_created: "{T} criado",
		emote_set_emote_added: "Emote {AE} foi adicionado a {T}",
		emote_set_emote_removed: "Emote {AE} foi removido de {T}",
		emote_set_emote_renamed: "Emote {AE} renomeado de {O} para {N} em {T}",
		emote_set_updated: "Propriedades de {T} alteradas",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Adicionar Emote",
		author: "Criador",
		created_at: "Criado",
		versions: "Versões",
		preview_loading: "Carregando pré-visualizações... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Falha ao carregar pre-visualizações",
		processing: "Processando Emote - isso pode levar algum tempo.",
		use: "Usar",
		switch_version: "Mude para essa versão",
		in_n_sets: "em {0} definir | em {0} conjuntos",
		disable: "Desativar Emote",
		update: "Atualizar",
		report: "Reportar Emote",
		makePrivate: "Tornar Privado",
		makeGlobal: "Tornar Global",
		comments: "Comentários",
		channels: "Canais",
		common_names: "Outros nomes para esse emote",
		usage_stats: "Estatísticas do emote",
		unlisted: {
			heading: "Atenção!",
			warning: "Esse emote não está listado publicamente.",
			warning_flagged: "Esse emote foi removido da listagem pelo seguinte motivo: {FLAG_LIST}",
			notice: "Isso pode ser adicionado ao seu canal, mas não podemos verificar se é seguro para ser exibido em sua livestream.",
			notice_flagged:
				"Isso pode ser adicionado ao seu canal, mas acreditamos que não é seguro para ser exibido em sua livestream.",
			show_button: "Mostrar Emote",
			flag_sexual_content: "Conteúdo sexual ou sexualmente sugestivo",
			flag_epilepsy: "Flashes rápidos / pode induzir convulsão",
			flag_edgy: "Ofensivo ou desagradável",
			flag_twitch_banned: "Não permitido na Twitch",
		},
		list: {
			searching: "Procurando",
			emote_count: "{0} emotes",
			no_emotes_listed: "Nenhum emote encontrado",
			fetching_slowly: "Desculpe, parece que isso está demorando um pouco",
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
			section: "Quais são @:common.object.emote_set{'s'}?",
			hint: "Conjuntos de Emotes são coleções que podem ser vinculadas a seus canais ou compartilhados com outros usuários.",
		},
		no_space: "Slots Cheios",
		none_selected: "Nenhum Conjunto Selecionado",
		editing: "Editando {0}",
		owner: "Conjunto de Emotes de {USER}",
		owned: "Conjunto de Emotes Possuídos",
		label_renamed: "Renomeado",
		label_conflict: "Conflito",
		label_default: "Padrão",
		modal: {
			selected_channel_count: "nenhum canal selecionado | {0} canais selecionados | {0} canais selecionados",
			create_button: "Novo @:common.object.emote_set",
			rename_in_set: "Renomear em {0}",
			context_rename: "Personalizar Nome do Emote",
			context_set_default: "Atribuir como Padrão",
			context_unset_default: "Desatribuir como Padrão",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Grupo de Emotes",
		channel_emotes: "Emotes do Canal",
		joined_at: "Ingressou em {0}",
		editors: "Editores",
		roles: "Cargos",
		connections: "Canais | Canais & Contas",
		new_connections: "Linkar contas...",
		no_channel_emotes: "{0} não tem nenhum emote em seu {1} canal",
		no_channels: "{0} não possui nenhum canal conectado!",
		card: {
			view_full_profile: "Ver Perfil Completo",
		},
		settings: {
			button: "Editar Perfil",
			section_profile: "Perfil",
			username: "Nome de Usuário",
			display_name: "Nome de Exibição",
			profile_picture: "Foto de Perfil",
		},
	},
	store: {},
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
				subject: "Reporte encerrado",
				content: `
Obrigado por nos notificar, seu reporte {'#'}{CASE_ID} foi tratado.
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
