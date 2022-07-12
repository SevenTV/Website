export default {
	locale: "Русский (Россия)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Узнать больше",
		more: "Больше",
		retry: "Повторить попытку",
		downloads: "Загрузки",
		features: "Особенности",
		comments: "Комментарии",
		search: "Поиск",
		update: "Обновить",
		report: "Жалоба",
		activity: "Activity",
		object: {
			user: "Пользователь",
			emote_set: "Наборы смайлов",
			emote: "Смайл",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Платформа смайлов, доступная каждому",
		app_description: "Легко управляйте сотнями смайлов для ваших каналов Twitch или YouTube",
		why_app: "Почему @:common.appName{'?'}",
		download_browser: "Расширение для браузера",
		download_mobile: "Мобильные приложения",
		download_misc: "Другие приложения",
		features: {
			emote_sets: {
				name: "Наборы смайлов",
				detail: "Переключайтесь между настраиваемыми наборами смайлов на вашем канале и делитесь ими с другими пользователями.",
			},
			many_emote_slots: {
				name: "Сотни слотов для смайлов",
				detail: "Начните с {0}-ю слотами с возможностью увеличения их количества до {1} бесплатно.",
			},
			channel_emote_names: {
				name: "Уникальные названия смайлов для каждого канала",
				detail: "Не нравится данное автором название смайла? Ничего страшного, вы можете переименовать его индивидуально для своего канала.",
			},
			real_time: {
				name: "Мгновенное обновление",
				detail: "Изменение смайлов на вашем канале происходит мгновенно для всех зрителей. Обновлять страницу не нужно.",
			},
			emote_versions: {
				name: "Версии смайлов",
				detail: "Переключайтесь между разными тематическими вариантами смайлов или обновляйте их до улучшенных версий.",
			},
			next_gen: {
				name: "Форматы изображений нового поколения — WEBP и AVIF",
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
			twitter: "Читайте нас в Twitter",
			github: "Внести свой вклад",
		},
	},
	// Nav Bar
	nav: {
		home: "Главная",
		about: "О сервисе",
		emotes: "Смайлы",
		store: "Подписка",
		admin: "Модерация",
		sign_in: "Войти",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Добавить смайл",
		author: "Автор",
		created_at: "Создано",
		versions: "Версии",
		use: "Использовать смайл",
		switch_version: "Использовать эту версию",
		in_n_sets: "в {0} наборе | в {0} наборах",
		disable: "Убрать смайл",
		update: "Update",
		report: "Пожаловаться на смайл",
		makePrivate: "Сделать приватным",
		makeGlobal: "Сделать глобальным",
		comments: "Comments",
		channels: "Каналы",
		common_names: "Other names for this emote",
		usage_stats: "Emote Statistics",
		list: {
			searching: "Поиск",
			emote_count: "Количество смайлов: {0}",
			no_emotes_listed: "Смайлы не найдены",
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
			emote_details: "Информация о смайле",
			version_details: "Описание версии",
			attribution: "Атрибуты",
			original_creator: "Автор оригинала",
			as_child: "Вы создаёте {IS_DIVERGED}-версию смайла {0}. ",
			content_moderation: "Модерация контента",
			half_transparency_tooltip:
				"Пиксели могут быть полностью прозрачными или полностью непрозрачными (частичная прозрачность не поддерживается)",
		},
	},
	emote_set: {
		create: "Новый @:common.object.emote_set",
		select: "Выбрать @:common.object.emote_set",
		explain: {
			section: "Что такое @:common.object.emote_set{'s'}?",
			hint: "Наборы смайлов — это коллекции смайлов, которые можно добавить на ваш канал или поделиться ими с другими пользователями.",
		},
		no_space: "Слоты заполнены",
		none_selected: "Набор не выбран",
		editing: "Редактирование {0}",
		owner: "Набор смайлов {USER}",
		owned: "Принадлежащий набор смайлов",
		modal: {
			selected_channel_count: "нет выбранных каналов | выбран {0} канал | выбрано {0} каналов",
			create_button: "Создать @:common.object.emote_set",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Sets",
		channel_emotes: "Смайлы канала",
		editors: "Редакторы",
		roles: "Роли",
		no_channel_emotes: "У {0} нет смайлов на канале {1}",
		no_channels: "У {0} нет подключённых каналов!",
		card: {
			view_full_profile: "Открыть профиль",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Report",
		emote_reason: {
			i_made_this: "Я создатель этого смайла, но он был загружен кем-то другим",
			duplicate: "Это копия существующего смайла",
			pornographic: "Этот смайл содержит порнографический или излишне откровенный контент",
			violence_gore: "Этот смайл содержит чрезмерное насилие или жестокость",
			i_appear_there: "На смайле изображён я, и мне это не нравится",
			offensive: "Я считаю этот смайл оскорбительным",
			other: "Что-то другое",
		},
		uncategorized_prompt: "Что случилось?",
		details: "Подробности (дополнительная информация и/или доказательства для вашей жалобы)",
		success: "Жалоба успешно отправлена",
		notify: "Вы будете уведомлены через сообщения, когда ваша жалоба будет обработана или потребуется дополнительная информация.",
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
		unread_tag: "Unread",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Смайл одобрен для публикации",
				content: `
# Ваш смайл "{EMOTE_NAME}" был одобрен для публикации \n
Теперь он доступен в публичном Каталоге Смайлов и будет отображаться на @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Смайлу отказано в публикации",
				content: `
# Ваш смайл "{EMOTE_NAME}" был отклонен
Он не будет доступен в публичном Каталоге Смайлов или отображаться на @:common.appHost, 
но останется доступным для пользователей по ссылке.
`,
			},
			emote_ownership_claim_request: {
				subject: "Предложение стать владельцем смайла",
				content: `
## {OWNER_DISPLAY_NAME} хочет, чтобы вы стали владельцем смайла '{EMOTE_NAME}'

[Посмотреть смайл]({EMOTE_URL})

**[Принять запрос]({EMOTE_CLAIM_URL})** | [Отклонить запрос]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Вы заблокированы",
				reason: {
					pornographic_content: "",
				},
				content: `
# Аккаунт заблокирован
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
		pot_friend: "Я — горшочек, друг",
	},
};
