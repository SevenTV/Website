export default {
	locale: "Українська (Україна)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Дізнатись більше",
		more: "Більше",
		retry: "Повторити",
		downloads: "Завантаження",
		features: "Функції",
		comments: "Коментарі",
		search: "Пошук",
		update: "Оновити",
		report: "Поскаржитись",
		activity: "Активність",
		loading: "Завантаження",
		save_changes: "Зберегти зміни",
		reset: "Скинути",
		object: {
			user: "Користувач",
			emote_set: "Набір емоцій",
			emote: "Застосувати емоцію",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Платформа емоцій для кожного",
		app_description: "Легко керуйте сотнями емоцій для ваших каналів Twitch або YouTube",
		why_app: "Чому @:common.appName{'?'}",
		download_browser: "Розширення браузера",
		download_mobile: "Мобільний додаток",
		download_misc: "Інші додатки",
		features: {
			emote_sets: {
				name: "Набори емоцій",
				detail: "Групуйте емоції в налаштовувальні набори, якими ви можете поділитися з іншими користувачами або швидко додати на свій канал.",
			},
			many_emote_slots: {
				name: "Сотні слотів для емоцій",
				detail: "Почніть з {0} слотів та максимально можливою кількістю в {1} без плати.",
			},
			channel_emote_names: {
				name: "Ви можете обрати унікальну назву емоції для вашого каналу",
				detail: "Не подобається ім'я емоуту яке було встановлено автором? Нічого, ви можете змінити його персонально для свого каналу.",
			},
			real_time: {
				name: "У реальному часі",
				detail: "Зміна емоцій на вашому каналі відбувається миттєво для всіх глядачів. F5 не потрібен.",
			},
			emote_versions: {
				name: "Версії емоцій",
				detail: "Змінюйте емоцію на тематичні варіанти або оновіть її на покращену версію.",
			},
			next_gen: {
				name: "Формати зображень нового покоління, такі як WEBP та AVIF",
				detail: "Ми використовуємо найновіші та більш оптимізовані формати зображень задля зменшення використання пропускної здатності.",
			},
			source_available: {
				name: "Доступний вихідний код",
				detail: "Наша кодова база доступна на GitHub, де є джерельна ліцензія. Будь-хто може переглядати та робити свій внесок.",
			},
		},
		socials: {
			discord: "Приєднуйтесь до @:common.appName в Discord",
			discord_online_count: "{0} зараз у мережі",
			twitter: "Слідкуйте за нами в Twitter",
			github: "Зробити свій внесок",
		},
	},
	// Nav Bar
	nav: {
		home: "Головна",
		about: "Про нас",
		emotes: "Емоції",
		store: "Підписка",
		admin: "Адмін",
		sign_in: "Увійти",
		wip_notice: {
			heading: "Ласкаво просимо на новий сайт @:common.appName",
			text1: "Це попередній перегляд наступного досвіду @:common.appName{'.'}",
			text2: "Дізнайтесь про нове і дайте нам відгук! Зверніть увагу, що сайт буде швидко змінюватись та може часто ламатися.",
		},
	},
	activity: {
		emote_created: "Створено {T}",
		emote_renamed: "Емоція {T} перейменована з {O} на {N}",
		emote_listing_approved: "Затверджено {T} для публічного каталогу",
		emote_listing_revoked: "Видалено {T} із публічного списку",
		emote_merged: "{T} Об'єднано в {0}",
		emote_ownership_transferred: "Передані права власності емоції {T} до {U}",
		emote_restored: "Відновлено {T}",
		emote_updated: "Змінені властивості для {T}",
		emote_deleted: "{T} Був видалений",
		emote_processed: "Виконано нове завдання обробки для {T}",
		emote_version_created: "Створена версія '{VER}' для {T}",
		emote_version_renamed: "Перейменовано версію '{VER}' для {T} з {1} на {2}",
		emote_version_approved: "Затверджена '{VER}' версія емоції {T} до публічного списку",
		emote_version_restored: "Відновлена версія '{VER}' емоції {T}",
		emote_version_deleted: "Видалена '{VER}' версія для {T}",
		user_created: "Користувач {T} був створено",
		user_deleted: "Користувач {T} був видалений",
		user_editor_added: "{U} Був доданий як редактор",
		user_editor_added_other: "Доданий {U1} як редактор {U2}",
		user_editor_removed: "Користувачу {U} відкликали права редактора",
		user_editor_removed_other: "Користувачу {U1} відкликали права редактора {U2}",
		user_banned: "{T} Був забанений",
		user_unbanned: "{T} Був разбанений",
		user_updated: "Змінені властивості для {T}",
		user_sign_in: "{T} Увійшов",
		user_sign_out: "{T} Вийшов",
		user_forbidden: "{T} Був відмовлений у доступі до {0}",
		emote_set_created: "Створено {T}",
		emote_set_emote_added: "{AE} Емоція додана до {T}",
		emote_set_emote_removed: "{AE} Емоція видалена с {T}",
		emote_set_emote_renamed: "Перейменовано емоцію {AE} з {O} на {N} в {T}",
		emote_set_updated: "Змінені властивості для {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Додати емоцію",
		author: "Додано користувачем",
		created_at: "Створено",
		versions: "Версії",
		preview_loading: "Завантаження переглядів... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Не вдалося завантажити перегляди",
		processing: "Обробка Емоції - це може зайняти деякий час.",
		use: "Використовувати емоцію",
		switch_version: "Змінити на цю версію",
		in_n_sets: "у {0} наборі | у {0} наборах",
		disable: "Відключити емоцію",
		update: "Оновити",
		report: "Поскаржитись на емоцію",
		makePrivate: "Зробити приватним",
		makeGlobal: "Make Global",
		comments: "Коментарі",
		channels: "Канали",
		common_names: "Інші назви цього смайла",
		usage_stats: "Статистика смайлів",
		unlisted: {
			heading: "Обережно!",
			warning: "Ця емоція не є загальнодоступною.",
			warning_flagged: "Ця емоція була вилучена з каталогу, тому що вона: {FLAG_LIST}",
			notice: "Ви можете додати цю емоцію до свого каналу, але ми не можемо перевірити чи вона безпечна для показу під час прямого ефіру.",
			notice_flagged:
				"Ви можете додати цю емоцію до свого каналу, але ми вважаємо, що вона небезпечна для показу під час прямого ефіру.",
			show_button: "Розкрити емоцію",
			flag_sexual_content: "Містить сексуальну тему, або сексуальний контент",
			flag_epilepsy: "Містить швидке моргання / може викликати епілепсію",
			flag_edgy: "Містить провокаційні та/або образливі теми",
			flag_twitch_banned: "Заборонена для Twitch",
		},
		list: {
			searching: "Шукаємо",
			emote_count: "{0} емоцій",
			no_emotes_listed: "Емоцій не знайдено",
			fetching_slowly: "Вибачте, схоже що це займе деякий час",
		},
		upload: {
			emote_name: "Ім'я емоції",
			version_name: "Ім'я версії",
			version_description: "Опис версії",
			submit_emote: "Створити емоцію",
			create_emote_version: "Створити версію емоції",
			image_upload: "Завантажити зображення",
			accepted_formats: "Прийняті формати",
			filetype: "Файл",
			animation: "Анімація",
			transparency: "Прозорість",
			emote_details: "Опис емоції",
			version_details: "Опис версії",
			attribution: "Посилання на автора",
			original_creator: "Автор оригіналу",
			as_child: "Ви створюєте {IS_DIVERGED} версію {0}. ",
			content_moderation: "Модерація контенту",
			half_transparency_tooltip:
				"Пікселі можуть бути лише повністю прозорими або повністю непрозорими (немає змінної прозорості)",
		},
	},
	emote_set: {
		create: "Новий @:common.object.emote_set",
		select: "Оберіть @:common.object.emote_set",
		explain: {
			section: "Що за @:common.object.emote_set{'s'}?",
			hint: "Набори емоцій - це колекції емоцій, які можуть бути прив'язані до ваших каналів або поширеними з іншими користувачами.",
		},
		no_space: "Слоти заповнено",
		none_selected: "Жодного обрано",
		editing: "Редагування {0}",
		owner: "Набір емоцій користувача {USER}",
		owned: "Набір емоцій власника",
		label_renamed: "Перейменований",
		label_conflict: "Конфлікт",
		label_default: "За замовчуванням",
		modal: {
			selected_channel_count: "немає обраного каналу | {0} канал обрано | {0} каналів обрано",
			create_button: "Створити @:common.object.emote_set",
			rename_in_set: "Перейменувати в {0}",
			context_rename: "Змінити назву емоції",
			context_set_default: "Призначити за замовчуванням",
			context_unset_default: "Скасувати призначення за замовчуванням",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Набори емоцій",
		channel_emotes: "Емоції каналу",
		joined_at: "Приєднався {0}",
		editors: "Редактори",
		roles: "Ролі",
		connections: "Канали | Канали та облікові записи",
		new_connections: "Прив’язати облікові записи...",
		no_channel_emotes: "{0} не має жодної емоції на своєму {1} каналі",
		no_channels: "{0} не має жодного підключеного каналу!",
		card: {
			view_full_profile: "Переглянути профіль повністю",
		},
		settings: {
			button: "Редагувати профіль",
			section_profile: "Профіль",
			username: "Ім'я користувача",
			display_name: "Ім'я для показу",
			profile_picture: "Зображення профілю",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Поскаржитись",
		emote_reason: {
			i_made_this: "Я зробив цю емоцію, але вона була викладена кимось іншим",
			duplicate: "Ця емоція - дублікат",
			pornographic: "Ця емоція має порнографічний або надмірно сексуалізований вміст",
			violence_gore: "Ця емоція демонструє надзвичайну жорстокість або кров",
			i_appear_there: "Мене зображено на цій емоції, та мені це не до вподоби",
			offensive: "Ця емоція є образливою для мене",
			other: "Щось інше",
		},
		uncategorized_prompt: "В чому справа?",
		details: "Подробиці (додаткові дані та/або докази до вашого звіту)",
		success: "Скаргу відправлено успішно",
		notify: "Ви будете повідомлені через поштову скриньку після того, як вашу скаргу буде оброблено або буде потрібна додаткова інформація.",
		complete_step_one: "Далі",
		abuse_notice: "Зловживання функцією скарги може привести до того, що ваш дозвіл до неї буде відхилено.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Вхідні",
		tabs: {
			all: "Усі повідомлення",
			unread: "Непрочитані",
			important: "Важливе",
		},
		unread_tag: "Непрочитані",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Емоція затверджена для списку",
				content: `
# Ваша емоція "{EMOTE_NAME}" була схвалена для списку \n 
Тепер вона буде доступна в Каталозі емоцій і почне з'являтися на @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Емоція не була затверджена для публікації",
				content: `
# Ваша емоція "{EMOTE_NAME}" була відхилена
Вона не буде доступна в публічному каталозі емоцій або видимою на @:common.appHost,
але вона буде доступна для всіх користувачів які мають посилання.
`,
			},
			emote_ownership_claim_request: {
				subject: "Запрошення на отримання власності емоцією",
				content: `
## {OWNER_DISPLAY_NAME} хоче, щоб ви стали власником '{EMOTE_NAME}'

[Переглянути емоцію]({EMOTE_URL})

**[Прийняти запит]({EMOTE_CLAIM_URL})** | [Скасувати запит]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Вас було забанено",
				reason: {
					pornographic_content: "",
				},
				content: `
# Обліковий запис заблокований
Ваш доступ до @:common.appName відтепер обмежений.<br/><br/>
### Причина
{BAN_REASON} <br/><br/>
### Застосовуваними обмеженнями є<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Це рішення спливає **{BAN_EXPIRE_AT}**.
_Якщо ви вважаєте, що це помилка, надішліть текст до @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Ви більше не маєте доступу до додатку",
					no_auth: "* Ви більше не зможете увійти",
					no_ownership: "* Будь-який створений вами вміст більше не буде доступним",
					memory_hole: "* Ви не будете видимі для інших користувачів",
					ip_blocked: "* Вашому IP заблоковано доступ до всіх @:common.appName служб",
				},
			},
			report_closed: {
				subject: "Скаргу закрито",
				content: `
Дякуємо за ваше повідомлення, ваша скарга {'#'}{CASE_ID} була оброблена.
				`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Ми не змогли це знайти",
		doctor_wtf: "А це що в біса таке?",
		pot_friend: "Я горщик, друг",
	},
};
