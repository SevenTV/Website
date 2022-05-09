import type { Language } from "../type";

export const ru_RU: Language = {
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Подробнее",
		more: "Больше",
		retry: "Попробовать снова",
		downloads: "Загрузки",
		features: "Особенности",
		comments: "Комментарии",
		search: "Поиск",
		report: "", // TODO
		update: "", // TODO
		object: {
			user: "Пользователь",
			emote_set: "Набор смайлов",
			emote: "Смайл",
		},
	},
	// Text that appears on the home page
	home: {
		download_browser: "", // TODO
		download_misc: "", // TODO
		download_mobile: "", // TODO
		slogan: "Платформа смайлов для всех",
		app_description: "Легко управляйте сотнями смайлов для ваших каналов на Twitch или YouTube",
		why_app: "Почему @:common.appName{'?'}",
		features: {
			emote_sets: {
				name: "Наборы смайлов",
				detail: "Группами смайлов в настраиваемых наборах можно поделиться с другими пользователями или быстро переключить на вашем канале.",
			},
			many_emote_slots: {
				name: "Сотни слотов для смайлов",
				detail: "", // TODO
			},
			channel_emote_names: {
				name: "Уникальные названия смайлов для каждого канала",
				detail: "Не нравится данное автором название смайла? Это нормально, ведь вы можете изменить его только для вашего канала.",
			},
			real_time: {
				name: "В режиме реального времени",
				detail: "Изменение смайлов на вашем канале происходит мгновенно для всех зрителей. Обновлять страницу не нужно.",
			},
			emote_versions: {
				name: "Версии смайлов",
				detail: "Переключайтесь между разными тематическими вариантами или обновляйте смайлы до улучшенных версий.",
			},
			next_gen: {
				name: "Форматы изображений нового поколения, такие как WEBP и AVIF",
				detail: "Мы используем новые, более оптимизированные форматы изображений для уменьшения использования пропускной способности.",
			},
			source_available: {
				name: "Открытый исходный код",
				detail: "Весь наш код доступен на GitHub с исходной лицензией. Любой может просмотреть его и внести свой вклад.",
			},
		},
		socials: {
			discord: "Присоединяйтесь к @:common.appName в Discord",
			discord_online_count: "{0} сейчас в сети",
			twitter: "Следите за нами в Твиттере",
			github: "Внести свой вклад",
		},
	},
	// Navigation
	nav: {
		home: "Главная",
		about: "О сервисе",
		emotes: "Смайлы",
		store: "Подписка",
		admin: "Администратор",
		sign_in: "Войти",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Добавить смайл",
		author: "Добавлено",
		created_at: "Создано",
		versions: "Версии",
		use: "Использовать смайл",
		switch_version: "Переключиться на эту версию",
		in_n_sets: "в {0} наборе | в {0} наборах",
		disable: "Убрать смайл",
		update: "Обновить смайл",
		report: "Пожаловаться на смайл",
		makePrivate: "Сделать приватным",
		makeGlobal: "Сделать глобальным",
		comments: "Комментарии",
		channels: "Каналы",
		list: {
			searching: "Поиск",
			emote_count: "{0} смайлов",
			no_emotes_listed: "Смайлов не найдено",
			fetching_slowly: "Извините, это может занять некоторое время",
		},
		upload: {
			emote_name: "Название смайла",
			version_name: "Название версии",
			version_description: "Описание версии",
			submit_emote: "Отправить смайл",
			create_emote_version: "Создать версию смайла",
			image_upload: "Загрузка изображения",
			accepted_formats: "Допустимые форматы",
			filetype: "Файл",
			animation: "Анимация",
			transparency: "Прозрачность",
			emote_details: "Детали смайла",
			version_details: "Описание версии",
			attribution: "Атрибуты",
			original_creator: "Оригинальный создатель",
			as_child: "Вы создаёте {IS_DIVERGED}-версию смайла {0}. ",
			content_moderation: "Модерация контента",
			half_transparency_tooltip:
				"Пиксели могут быть полностью прозрачными или полностью непрозрачными (частичная прозрачность запрещена)",
		},
	},
	emote_set: {
		create: "Новый @:common.object.emote_set",
		select: "Выбрать @:common.object.emote_set",
		explain: {
			section: "Что такое @:common.object.emote_set{'s'}?",
			hint: "Наборы смайлов - это коллекции смайлов, которые могут быть связаны с вашими каналами или доступны другим пользователям.",
		},
		no_space: "Слоты заполнены",
		modal: {
			selected_channel_count: "нет выбранных каналов | выбран {0} канал | выбрано {0} каналов",
			create_button: "Создать @:common.object.emote_set",
		},
		editing: "", // TODO
		none_selected: "", // TODO
		owned: "", // TODO
		owner: "", // TODO
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Наборы смайлов",
		channel_emotes: "Смайлы канала",
		editors: "Редакторы",
		no_channel_emotes: "У {0} нет смайлов на канале {1}",
		no_channels: "У {0} нет подключённых каналов!",
		card: {
			view_full_profile: "", // TODO
		},
		roles: "", // TODO
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Жалоба",
		details: "", // TODO
		notify: "", // TODO
		success: "", // TODO
		uncategorized_prompt: "", // TODO
		emote_reason: {
			i_made_this: "Я создатель этого смайла, но он был загружен кем-то другим",
			duplicate: "Это дубликат смайла",
			pornographic: "Этот смайл содержит порнографический или слишком откровенный контент",
			violence_gore: "Этот смайл содержит чрезмерное насилие или жестокость",
			i_appear_there: "На смайле изображён я и мне это не нравится",
			offensive: "Я считаю этот смайл оскорбительным",
			other: "Что-то другое",
		},
		complete_step_one: "Продолжить",
		abuse_notice: "Злоупотребление жалобами может привести к лишению вас доступа к ним.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Входящие",
		tabs: {
			all: "Все сообщения",
			unread: "Непрочитанные",
			important: "Важные",
		},
		unread_tag: "Непрочитанные",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Смайл одобрен для публикации",
				content: `
  # Ваш смайл «{EMOTE_NAME}» был одобрен для публикации \n
  Теперь он доступен в публичном КАТАЛОГЕ СМАЙЛОВ и будет отображаться на @:common.appHost{'.'}
  `,
			},
			emote_not_listed: {
				subject: "Смайл не одобрен для публикации",
				content: `
  # Ваш смайл «{EMOTE_NAME}» был отклонён
  Он не будет доступен в публичном КАТАЛОГЕ СМАЙЛОВ или отображаться на @:common.appHost,
  но он останется доступным для пользователей по ссылке.
  `,
			},
			emote_ownership_claim_request: {
				subject: "Приглашение стать владельцем смайла",
				content: `
  ## {OWNER_DISPLAY_NAME} хочет, чтобы вы стали владельцем смайла '{EMOTE_NAME}'

  [Посмотреть смайл]({EMOTE_URL})

  **[Принять запрос]({EMOTE_CLAIM_URL})** | [Отклонить запрос]({EMOTE_DECLINE_URL})
				  `,
			},
			client_banned: {
				subject: "Вас забанили",
				reason: {
					pornographic_content: "",
				},
				content: `
  # Аккаунт забанен
  Ваш доступ к @:common.appName ограничен.<br/><br/>
  ### Причина:
  {BAN_REASON} <br/><br/>
  ### Применены ограничения<br/>
  {EFFECT_NO_PERMISSIONS}
  {EFFECT_NO_AUTH}
  {EFFECT_NO_OWNERSHIP}
  {EFFECT_MEMORY_HOLE}

  <br/>Срок данного решения истекает **{BAN_EXPIRE_AT}**.
  _Если вы считаете, что это ошибка, пожалуйста, напишите нам на почту @:common.supportEmail{'.'}_
  `,
				effect: {
					no_permissions: "* Вы больше не можете взаимодействовать с сервисом",
					no_auth: "* Вы больше не можете войти",
					no_ownership: "* Любой созданный вами контент будет недоступен",
					memory_hole: "* Вы не будете видны другим пользователям",
					ip_blocked: "* Ваш IP-адрес заблокирован на всех сервисах @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Мы не смогли найти это",
		doctor_wtf: "Это чё за херь?",
		pot_friend: "Я - горшочек, друг",
	},
};
