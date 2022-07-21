export default {
	locale: "Português (Portugal)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Saiba Mais",
		more: "Mais",
		retry: "Tentar novamente",
		downloads: "Transferências",
		features: "Características",
		comments: "Comentários",
		search: "Pesquisa",
		update: "Atualizar",
		report: "Reportar",
		activity: "Atividade",
		loading: "A carregar",
		save_changes: "Salvar Alterações",
		reset: "Reniciar",
		object: {
			user: "Utilizador",
			emote_set: "Grupo de Emotes",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "A plataforma de emotes para todos",
		app_description: "Gerencie centenas de emotes para os teus canais da Twitch ou YouTube com facilidade",
		why_app: "Porque @:common.appName{'?'}",
		download_browser: "Extensão de browser",
		download_mobile: "Apliacações móveis",
		download_misc: "Outras aplicações",
		features: {
			emote_sets: {
				name: "Grupo de Emotes",
				detail: "Agrupa emotes em conjuntos personalizáveis ​​que podem ser compartilhados com outros usuários ou trocados rapidamente no teu canal.",
			},
			many_emote_slots: {
				name: "Centenas de Slots de Emotes",
				detail: "Comece com {0} slots, com um máximo possível de {1} e sem paywall.",
			},
			channel_emote_names: {
				name: "Nomes de emote por canal",
				detail: "Não gostas do nome dado a um emote pelo seu autor? Tudo bem, tu podes alterá-lo apenas para o teu canal.",
			},
			real_time: {
				name: "Tempo real",
				detail: "A alteração de emotes no teu canal acontece instantaneamente para todos os espectadores. Não é necessário F5.",
			},
			emote_versions: {
				name: "Versão de Emotes",
				detail: "Alterne entre variantes temáticas ou atualize um emote para uma versão melhorada.",
			},
			next_gen: {
				name: "Formatos de imagem de última geração como WEBP e AVIF",
				detail: "Usamos formatos de imagem mais recentes e otimizados para reduzir o uso da largura de banda.",
			},
			source_available: {
				name: "Fonte-disponível",
				detail: "Toda a nossa base de código está disponível no GitHub com uma licença disponível no código-fonte. Qualquer pessoa pode ver e contribuir.",
			},
		},
		socials: {
			discord: "Junte-se a @:common.appName no Discord",
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
			heading: "Bem-vindo ao novo @:common.appName website",
			text1: "Isto é uma vizualação prévia da próxima forma de experimentar @:common.appName{'.'}",
			text2: "Explore o que há de novo e dê-nos a sua opinião! Note que irá existir mudanças rápidas e poderá quebrar frequentemente.",
		},
	},
	activity: {
		emote_created: "Criado em {T}",
		emote_renamed: "{T} renomeado de {O} para {N}",
		emote_listing_approved: "{T} aprovado para listagem pública",
		emote_listing_revoked: "{T} removido de listagem pública",
		emote_merged: "Mesclado {T} em {0}",
		emote_ownership_transferred: "Propriedade transferida de {T} para {U}",
		emote_restored: "{T} restaurado",
		emote_updated: "Propriedades alteradas para {T}",
		emote_deleted: "{T} excluído",
		emote_version_created: "Versão criada '{VER}' para {T}",
		emote_version_renamed: "Versão '{VER}' {T} renomeado de {1} para {2}",
		emote_version_approved: "Versão aprovade '{VER}' para {T} para listagem pública",
		emote_version_restored: "Versão restaurada '{VER}' para {T}",
		emote_version_deleted: "Versão apagada '{VER}' para {T}",
		user_created: "{T} criado em",
		user_deleted: "{T} apagado",
		user_editor_added: "{U} adicionado como editor",
		user_editor_added_other: "{U1} adicionada como editor de {U2}",
		user_editor_removed: "Privilégios de editor de {U} revogados",
		user_editor_removed_other: "Privilégios de editor de {U1} revogados para {U2}",
		user_banned: "{T} banido",
		user_unbanned: "{T} desbanido",
		user_updated: "Propriedades alteradas para {T}",
		user_sign_in: "{T} fez login",
		user_sign_out: "{T} desconectou-se",
		user_forbidden: "O acesso de {T} foi negado a {0}",
		emote_set_created: "{T} criado em",
		emote_set_emote_added: "Emote {AE} foi adicionado a {T}",
		emote_set_emote_removed: "Emote {AE} foi removido de {T}",
		emote_set_emote_renamed: "Emote {AE} foi renomeado de {O} para {N} em {T}",
		emote_set_updated: "Propriedades alteradas para {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Adicionar Emote",
		author: "Adicionado por",
		created_at: "Criado",
		versions: "Versões",
		preview_loading: "A carregar pré-visualizações... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Falha ao carregar as pré-visualizações",
		processing: "A processar emote - isto pode levar algum tempo.",
		use: "Usar Emote",
		switch_version: "Mudar para esta versão",
		in_n_sets: "em {0} defenir | em {0} define",
		disable: "Desativar Emote",
		update: "Atualizar",
		report: "Reportar Emote",
		makePrivate: "Tornar privado",
		makeGlobal: "Tornar Global",
		comments: "Comentários",
		channels: "Canais",
		common_names: "Outros nomes para este emote",
		usage_stats: "Estatísticas do Emote",
		list: {
			searching: "A procurar",
			emote_count: "{0} emotes",
			no_emotes_listed: "Nenhum emote encontrado",
			fetching_slowly: "Desculpe, parece que isto está demorando um pouco",
		},
		upload: {
			emote_name: "Nome do Emote",
			version_name: "Nome da Versão",
			version_description: "Descrição da versão",
			submit_emote: "Submeter Emote",
			create_emote_version: "Criar versão do emote",
			image_upload: "Upload de imagem",
			accepted_formats: "Formatos aceites",
			filetype: "Ficheiro",
			animation: "Animação",
			transparency: "Transparência",
			emote_details: "Detalhes do emote",
			version_details: "Detalhes da Versão",
			attribution: "Atribuição",
			original_creator: "Criador Original",
			as_child: "Você está a criar uma versão {IS_DIVERGED} de {0}. ",
			content_moderation: "Moderação de conteúdo",
			half_transparency_tooltip:
				"Os pixels só podem ser totalmente transparentes ou totalmente opacos (sem transparência variável)",
		},
	},
	emote_set: {
		create: "Novo @:common.object.emote_set",
		select: "Selecione @:common.object.emote_set",
		explain: {
			section: "Quais são @:common.object.emote_set{'s'}?",
			hint: "Conjunto de Emotes são uma coleção de emotes que podem ser vinculados ao seu canail ou compartilhados com outros utilizadores.",
		},
		no_space: "Slots Cheias",
		none_selected: "Nenhum conjunto selecionado",
		editing: "Editando {0}",
		owner: "{USER}'s Conjunto de emotes",
		owned: "Conjunto de Emotes Possuídos",
		label_renamed: "Renomeado",
		label_conflict: "Conflito",
		label_default: "Padrão",
		modal: {
			selected_channel_count: "nenhum canal selecionado | {0} canal selecionado | {0} canais selecionados",
			create_button: "Crie @:common.object.emote_set",
			rename_in_set: "Renomear em {0}",
			context_rename: "Personaliza o nome do emote",
			context_set_default: "Atribuir como padrão",
			context_unset_default: "Desatribuir como padrão",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Grupo de Emotes",
		channel_emotes: "Emotes do canal",
		joined_at: "Ingressou em {0}",
		editors: "Editores",
		roles: "Funções",
		no_channel_emotes: "{0} não tem nenhum emote no seu {1} canal",
		no_channels: "{0} não tem nenhum canal conectado!",
		card: {
			view_full_profile: "Ver perfil completo",
		},
		settings: {
			button: "Editar Perfil",
			section_profile: "Perfil",
			username: "Nome de utilizador",
			display_name: "Nome em exibição",
			profile_picture: "Fotografia de perfil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Reportar",
		emote_reason: {
			i_made_this: "Eu fiz este emote, mas ele foi carregado por outra pessoa",
			duplicate: "Este emote está duplicado",
			pornographic: "Este emote contém imagens pornográficas ou excessivamente sexualizadas",
			violence_gore: "Este emote exibe violência extrema ou sangue",
			i_appear_there: "Este emote retrata-me e eu não gosto disso",
			offensive: "Eu acho esse emote ofensivo",
			other: "Outro",
		},
		uncategorized_prompt: "Qual é o problema?",
		details: "Detalhes (informações e/ou evidências adicionais para o seu relatório)",
		success: "Relatório enviado com sucesso",
		notify: "Serás notificado através da caixa de entrada assim que a tua denúncia for processada ou mais informações forem solicitadas.",
		complete_step_one: "Continuar",
		abuse_notice: "O abuso do recurso de denúncia pode levar à revogação do seu acesso.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Caixa de Entrada",
		tabs: {
			all: "Todas as mensagens",
			unread: "Por Ler",
			important: "Importante",
		},
		unread_tag: "Por Ler",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote aprovado para listagem",
				content: `
# O teu emote "{EMOTE_NAME}" foi aprovado para listagem \n
Ele agora estará disponível no Diretório de Emotes e começará a aparecer em @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote não aprovado para listagem",
				content: `
# O teu emote "{EMOTE_NAME}" foi rejeitado
Ele não estará disponível através do Diretório de Emotes público ou visível em @:common.appHost,
mas permanecerá disponível para usuários com o link.
`,
			},
			emote_ownership_claim_request: {
				subject: "Convite para reivindicar a propriedade de um emote",
				content: `
## {OWNER_DISPLAY_NAME} quer que tu te tornes o proprietário de '{EMOTE_NAME}'

[Ver emote]({EMOTE_URL})

**[Aceitar solicitação]({EMOTE_CLAIM_URL})** | [Recusar solicitação]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Tu foste banido",
				reason: {
					pornographic_content: "",
				},
				content: `
# Conta banida
Seu acesso a @:common.appName agora é limitado.<br/><br/>
### Razão para esta ação
{BAN_REASON} <br/><br/>
### Restrições aplicadas<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Esta decisão expira **{BAN_EXPIRE_AT}**.
_Se acreditas que isso é um erro, envie um e-mail para @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "Tu não consegues mais interagir com a aplicação",
					no_auth: "Tu não pode mais fazer log in",
					no_ownership: "Qualquer conteúdo criado por ti não estará mais dísponivel",
					memory_hole: "Tu não estarás visivel para outros utilizadores",
					ip_blocked: "O teu ip está bloqueado de aceder todos os serviços @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Não conseguimos encontar isto",
		doctor_wtf: "Que inferno é este?",
		pot_friend: "Sou um amigo pote",
	},
};
