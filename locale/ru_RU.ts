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
		back: "Back",
		download: "Download | Downloads",
		features: "Особенности",
		comments: "Комментарии",
		search: "Поиск",
		update: "Обновить",
		report: "Жалоба",
		delete: "Delete",
		cancel: "Cancel",
		submit: "Submit",
		activity: "Activity",
		loading: "Loading",
		save_changes: "Save Changes",
		reset: "Reset",
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
				name: "Real-Time",
				detail: "Изменение смайлов на вашем канале происходит мгновенно для всех зрителей. Обновлять страницу не нужно.",
			},
			emote_versions: {
				name: "Версии смайлов",
				detail: "Переключайтесь между разными тематическими вариантами смайлов или обновляйте их до улучшенных версий.",
			},
			userbase: {
				name: "Large Community",
				detail: "@:common.appName serves {0}+ daily unique users and has a library of over {1} public emotes",
			},
			next_gen: {
				name: "Форматы изображений нового поколения — WEBP и AVIF",
				detail: "Мы используем новые, более оптимизированные форматы изображений для уменьшения использования пропускной способности.",
			},
			source_available: {
				name: "Source-Available",
				detail: "Весь наш код доступен на GitHub с исходной лицензией. Любой может просмотреть его и внести свой вклад.",
			},
		},
		socials: {
			discord: "Присоединяйтесь к @:common.appName в Discord",
			discord_online_count: "{0} сейчас в сети",
			twitter: "Читайте нас в Twitter",
			github: "Внести свой вклад",
		},
		legal: {
			terms: "Terms of Service",
			privacy: "Privacy Policy",
			unaffiliated: "@:common.appName is not affiliated with Twitch Interactive",
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
		add: "Добавить смайл",
		author: "Автор",
		created_at: "Создано",
		versions: "Версии",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		processing_failed: "Processing failed: {0}",
		use: "Использовать смайл",
		use_menu: "Add this emote to...",
		switch_version: "Использовать эту версию",
		in_n_sets: "в {0} наборе | в {0} наборах",
		disable: "Убрать смайл",
		properties: "Properties",
		new_version: "New Version",
		report: "Пожаловаться на смайл",
		Privacy: "Privacy",
		comments: "Comments",
		channels: "Каналы",
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
			searching: "Поиск",
			emote_count: "Количество смайлов: {0}",
			no_emotes_listed: "Смайлы не найдены",
			fetching_slowly: "Извините, это может занять некоторое время",
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
			section: "What are Emote Sets?",
			hint: "Наборы смайлов — это коллекции смайлов, которые можно добавить на ваш канал или поделиться ими с другими пользователями.",
		},
		no_space: "Слоты заполнены",
		none_selected: "Набор не выбран",
		editing: "Редактирование {0}",
		owner: "Набор смайлов {USER}",
		owned: "Принадлежащий набор смайлов",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		label_actor: "Enabled by {0}",
		// "enabled by <display_name of actor>"
		context_emote_add: "Add to {SET_NAME}",
		context_emote_remove: "Remove from {SET_NAME}",
		modal: {
			selected_channel_count: "нет выбранных каналов | выбран {0} канал | выбрано {0} каналов",
			create_button: "Создать @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Sets",
		channel_emotes: "Смайлы канала",
		joined_at: "Joined {0}",
		editors: "Редакторы",
		roles: "Роли",
		connections: "Channels | Channels & Accounts",
		new_connections: "Link accounts...",
		add_editor: "Add Editor",
		editor_modal_heading: "Modify {0}'s Editors",
		editor_modal_user_search: "Who would you like to add as an editor?",
		editor_modal_user_update: "Editor",
		no_channel_emotes: "У {0} нет смайлов на канале {1}",
		no_channels: "У {0} нет подключённых каналов!",
		card: {
			view_full_profile: "Открыть профиль",
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
		troll_despair: "Мы не смогли найти это",
		doctor_wtf: "Это чё за херь?",
		pot_friend: "Я — горшочек, друг",
	},
};
