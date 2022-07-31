export default {
	locale: "Português (Portugal)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Saber mais",
		more: "Mais",
		retry: "Tentar novamente",
		downloads: "Transferências",
		features: "Características",
		comments: "Comentários",
		search: "Pesquisa",
		update: "Atualizar",
		report: "Denunciar",
		activity: "Atividade",
		loading: "A carregar",
		save_changes: "Guardar alterações",
		reset: "Reiniciar",
		object: {
			user: "Utilizador",
			emote_set: "Conjunto de emotes",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "A plataforma de emotes para todos",
		app_description: "Gere facilmente centenas de emotes para os teus canais da Twitch ou YouTube",
		why_app: "Porque @:common.appName{'?'}",
		download_browser: "Extensão de navegador",
		download_mobile: "Aplicações móveis",
		download_misc: "Outras aplicações",
		features: {
			emote_sets: {
				name: "Conjunto de emotes",
				detail: "Agrupa emotes em conjuntos personalizáveis ​​que podem ser partilhados com outros utilizadores ou trocados rapidamente no teu canal.",
			},
			many_emote_slots: {
				name: "Centenas de espaços para emotes",
				detail: "Começa com {0} espaços, com um máximo possível de {1} e sem quaisquer pagamentos.",
			},
			channel_emote_names: {
				name: "Nomes de emote por canal",
				detail: "Não gostas do nome dado a um emote pelo seu autor? Tudo bem, podes alterá-lo apenas para o teu canal.",
			},
			real_time: {
				name: "Tempo real",
				detail: "A alteração de emotes no teu canal acontece instantaneamente para todos os espetadores. Não é necessário recarregar a página.",
			},
			emote_versions: {
				name: "Versão de Emotes",
				detail: "Alterna entre variantes temáticas ou atualiza um emote para uma versão melhorada.",
			},
			next_gen: {
				name: "Formatos de imagem de última geração como WEBP e AVIF",
				detail: "Usamos formatos de imagem mais recentes e otimizados para reduzir o uso da largura de banda.",
			},
			source_available: {
				name: "Código-fonte disponível",
				detail: "A nossa base de código inteira está disponível no GitHub com uma licença de código-fonte disponível. Qualquer pessoa pode ver e contribuir.",
			},
		},
		socials: {
			discord: "Junta-te a @:common.appName no Discord",
			discord_online_count: "{0} online agora",
			twitter: "Segue-nos no Twitter",
			github: "Contribui",
		},
	},
	// Nav Bar
	nav: {
		home: "Início",
		about: "Sobre",
		emotes: "Emotes",
		store: "Subscrever",
		admin: "Administrador",
		sign_in: "Iniciar sessão",
		wip_notice: {
			heading: "Bem-vindo ao novo site do @:common.appName",
			text1: "Isto é uma pré-visualização antecipada da próxima forma de utilizar o @:common.appName{'.'}",
			text2: "Explora o que há de novo e dá-nos a tua opinião! Tem em atenção que existirão mudanças rápidas e poderão ocorrer falhas frequentemente.",
		},
	},
	activity: {
		emote_created: "Criou {T}",
		emote_renamed: "{T} renomeado de {O} para {N}",
		emote_listing_approved: "{T} aprovado para o catálogo público",
		emote_listing_revoked: "{T} removido do catálogo público",
		emote_merged: "Mesclado {T} em {0}",
		emote_ownership_transferred: "Propriedade transferida de {T} para {U}",
		emote_restored: "{T} restaurado",
		emote_updated: "Propriedades alteradas para {T}",
		emote_deleted: "{T} excluído",
		emote_processed: "Executou uma nova tarefa de processamento para {T}",
		emote_version_created: "Versão criada '{VER}' para {T}",
		emote_version_renamed: "Versão '{VER}' {T} renomeada de {1} para {2}",
		emote_version_approved: "Versão aprovada '{VER}' do {T} para o catálogo público",
		emote_version_restored: "Versão restaurada '{VER}' para {T}",
		emote_version_deleted: "Versão apagada '{VER}' para {T}",
		user_created: "Criou {T}",
		user_deleted: "Apagou {T}",
		user_editor_added: "{U} adicionado como editor",
		user_editor_added_other: "{U1} adicionado como editor de {U2}",
		user_editor_removed: "Privilégios de editor de {U} revogados",
		user_editor_removed_other: "Privilégios de editor de {U1} revogados para {U2}",
		user_banned: "{T} banido",
		user_unbanned: "{T} desbanido",
		user_updated: "Propriedades alteradas para {T}",
		user_sign_in: "{T} iniciou sessão",
		user_sign_out: "{T} encerrou sessão",
		user_forbidden: "O acesso de {T} foi negado a {0}",
		emote_set_created: "Criado {T}",
		emote_set_emote_added: "Emote {AE} foi adicionado a {T}",
		emote_set_emote_removed: "Emote {AE} foi removido de {T}",
		emote_set_emote_renamed: "Emote {AE} foi renomeado de {O} para {N} em {T}",
		emote_set_updated: "Propriedades alteradas para {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Adicionar emote",
		author: "Adicionado por",
		created_at: "Criado",
		versions: "Versões",
		preview_loading: "A carregar pré-visualizações... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Falha ao carregar as pré-visualizações",
		processing: "A processar emote - isto pode levar algum tempo.",
		use: "Usar emote",
		switch_version: "Mudar para esta versão",
		in_n_sets: "no conjunto {0} | em {0} conjuntos",
		disable: "Desativar emote",
		update: "Atualizar",
		report: "Denunciar emote",
		makePrivate: "Tornar privado",
		makeGlobal: "Tornar Global",
		comments: "Comentários",
		channels: "Canais",
		common_names: "Outros nomes para este emote",
		usage_stats: "Estatísticas do Emote",
		unlisted: {
			heading: "Atenção!",
			warning: "Este emote não está no catálogo público.",
			warning_flagged: "Este emote foi tirado da página pública pela seguinte razão: {FLAG_LIST}",
			notice: "Ele pode ser adicionado ao teu canal, mas não conseguimos verificar se é seguro para ser exibido em uma transmissão ao vivo.",
			notice_flagged:
				"Ele pode ser adicionado ao teu canal. No entanto, acreditamos que não é seguro exibir em uma transmissão ao vivo.",
			show_button: "Mostrar emote",
			flag_sexual_content: "Conteúdo sexual ou sexualmente sugestivo",
			flag_epilepsy: "Flashes rápidos / pode induzir convulsão",
			flag_edgy: "Ofensivo ou desagradável",
			flag_twitch_banned: "Não permitido na Twitch",
		},
		list: {
			searching: "A procurar",
			emote_count: "{0} emotes",
			no_emotes_listed: "Nenhum emote encontrado",
			fetching_slowly: "Desculpa, parece que isto está a demorar um pouco",
		},
		upload: {
			emote_name: "Nome do emote",
			version_name: "Nome da versão",
			version_description: "Descrição da versão",
			submit_emote: "Submeter emote",
			create_emote_version: "Criar versão do emote",
			image_upload: "Carregar imagem",
			accepted_formats: "Formatos aceites",
			filetype: "Ficheiro",
			animation: "Animação",
			transparency: "Transparência",
			emote_details: "Detalhes do emote",
			version_details: "Detalhes da versão",
			attribution: "Atribuição",
			original_creator: "Criador original",
			as_child: "Estás a criar uma versão {IS_DIVERGED} de {0}. ",
			content_moderation: "Moderação do conteúdo",
			half_transparency_tooltip:
				"Os pixeis só podem ser totalmente transparentes ou totalmente opacos (sem transparência variável)",
		},
	},
	emote_set: {
		create: "Novo @:common.object.emote_set",
		select: "Selecionar @:common.object.emote_set",
		explain: {
			section: "O que são @:common.object.emote_set{'s'}?",
			hint: "Conjuntos de emotes são uma coleção de emotes que podem ser vinculados ao teu canal ou partilhados com outros utilizadores.",
		},
		no_space: "Espaços cheios",
		none_selected: "Nenhum conjunto selecionado",
		editing: "A editar {0}",
		owner: "Conjunto de emotes de {USER}",
		owned: "Conjunto de emotes possuído",
		label_renamed: "Renomeado",
		label_conflict: "Conflito",
		label_default: "Padrão",
		modal: {
			selected_channel_count: "nenhum canal selecionado | canal {0} selecionado | {0} canais selecionados",
			create_button: "Criar @:common.object.emote_set",
			rename_in_set: "Renomear em {0}",
			context_rename: "Personaliza o nome do emote",
			context_set_default: "Atribuir como padrão",
			context_unset_default: "Remover a atribuição de padrão",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Conjuntos de emotes",
		channel_emotes: "Emotes do canal",
		joined_at: "Entrou a {0}",
		editors: "Editores",
		roles: "Cargos",
		connections: "Canais | Canais e Contas",
		new_connections: "Vincular contas...",
		no_channel_emotes: "{0} não tem quaisquer emotes no seu canal {1}",
		no_channels: "{0} não tem nenhum canal vinculado!",
		card: {
			view_full_profile: "Ver perfil completo",
		},
		settings: {
			button: "Editar perfil",
			section_profile: "Perfil",
			username: "Nome de utilizador",
			display_name: "Nome de exibição",
			profile_picture: "Foto de perfil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Denunciar",
		emote_reason: {
			i_made_this: "Eu fiz este emote, mas ele foi carregado por outra pessoa",
			duplicate: "Este emote está duplicado",
			pornographic: "Este emote contém imagens pornográficas ou excessivamente sexualizadas",
			violence_gore: 'Este emote exibe violência extrema ou "gore"',
			i_appear_there: "Este emote retrata-me e eu não gosto disso",
			offensive: "Eu considero este emote ofensivo",
			other: "Outro",
		},
		uncategorized_prompt: "Qual é o problema?",
		details: "Detalhes (informações e/ou evidências adicionais para a tua denúncia)",
		success: "Denúncia enviada com sucesso",
		notify: "Assim que a tua denúncia for averiguada ou mais informação for socilitada, serás notificado através da caixa de entrada.",
		complete_step_one: "Continuar",
		abuse_notice: "O abuso do recurso de denúncia pode levar à revogação do seu acesso.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Caixa de entrada",
		tabs: {
			all: "Todas as mensagens",
			unread: "Não lidas",
			important: "Importante",
		},
		unread_tag: "Não lida",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote aprovado para o catálogo público",
				content: `
# O teu emote "{EMOTE_NAME}" foi aprovado para o catálogo público \n
Já está disponível no catálogo de emotes e começará a aparecer em @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote não aprovado para o catálogo público",
				content: `
# O teu emote "{EMOTE_NAME}" foi rejeitado
Não estará disponível no catálogo de emotes público ou visível em @:common.appHost,
mas permanecerá disponível para utilizadores com o link.
`,
			},
			emote_ownership_claim_request: {
				subject: "Convite para reivindicar a posse de um emote",
				content: `
## {OWNER_DISPLAY_NAME} quer que te tornes o proprietário de '{EMOTE_NAME}'

[Ver emote]({EMOTE_URL})

**[Aceitar solicitação]({EMOTE_CLAIM_URL})** | [Recusar solicitação]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Foste banido",
				reason: {
					pornographic_content: "",
				},
				content: `
# Conta banida
O teu acesso a @:common.appName foi limitado.<br/><br/>
### Razão para esta ação
{BAN_REASON} <br/><br/>
### Restrições aplicadas<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Esta decisão expira a **{BAN_EXPIRE_AT}**.
_Se acreditas que isto foi um engano, envia um e-mail para @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Já não podes interagir com a aplicação",
					no_auth: "* Já não podes iniciar sessão",
					no_ownership: "* Qualquer conteúdo criado por ti deixará de estar dísponivel",
					memory_hole: "* Tu não estarás visivel para outros utilizadores",
					ip_blocked: "* O teu IP está bloqueado de aceder todos os serviços do @:common.appName",
				},
			},
			report_closed: {
				subject: "Denúncia encerrada",
				content: `
Obrigado por nos notificar, a tua denúncia {'#'}{CASE_ID} foi averiguada.				`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Não conseguimos encontrá-lo",
		doctor_wtf: "Que raios é isto?",
		pot_friend: "Sou um pote, amigo",
	},
};
