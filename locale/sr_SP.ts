export default {
	locale: "Српски (Србија)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Сазнајте више",
		more: "Више",
		retry: "Покушајте поново",
		downloads: "Преузимања",
		features: "Карактеристике",
		comments: "Коментари",
		search: "Претражите",
		update: "Ажурирајте",
		report: "Пријави",
		activity: "Активност",
		loading: "Loading",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "Корисник",
			emote_set: "Комплет емотикона",
			emote: "Емотикон",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Емотикон Платформа за све",
		app_description: "Лако управљајте стотине другачијих емотикона за своје Twitch или YouTube канале",
		why_app: "Зашто @:common.appName{'?'}",
		download_browser: "Додатак за претраживач",
		download_mobile: "Мобилне Апликације",
		download_misc: "Друге Апликације",
		features: {
			emote_sets: {
				name: "Комплет емотикона",
				detail: "Групирајте емотиконе у прилагодиве скупове које можете делити са другим корисницима или брзо пренети на свој канал.",
			},
			many_emote_slots: {
				name: "Стотине слотова за емотиконе",
				detail: "Почните са {0} слотова, са могућим максимумом {1} и без додатног плаћања.",
			},
			channel_emote_names: {
				name: "Уникатна имена за сваки канал",
				detail: "Не свиђа вам се наслов емотикона који је дао креатор? То је у реду, можете га променити само за свој канал.",
			},
			real_time: {
				name: "У тренутном времену",
				detail: "Промена емотикона на вашем каналу је тренутна за све гледаоце. F5 није потребан.",
			},
			emote_versions: {
				name: "Верзионисање емотикона",
				detail: "Измените тематске варијанте или ажурирајте емотикон на побољшану верзију.",
			},
			next_gen: {
				name: "Формати слика нове генерације као што су WEBM и AVIF",
				detail: "Користимо нове, оптимизоване формате слика да бисмо смањили коришћени проток.",
			},
			source_available: {
				name: "Извор-доступан",
				detail: "Цела база кодова доступна је на GitHub са лиценцом доступном са изворним кодом. Свако може прегледати и допринети.",
			},
		},
		socials: {
			discord: "Придружите се @:common.appName у Discord",
			discord_online_count: "{0} Тренутно активних корисника",
			twitter: "Запратите нас на Twitter",
			github: "Допринесите",
		},
	},
	// Nav Bar
	nav: {
		home: "Почетна",
		about: "О апликацији",
		emotes: "Емотикон",
		store: "Претплатите се",
		admin: "Администрација",
		sign_in: "Пријавите се",
		wip_notice: {
			heading: "Добродошли на нови @:common.appName вебсајт",
			text1: "Ово је рани преглед новог искуства @:common.appName{'.'}",
			text2: "Истражите нове ствари и реците нам како изгледа! Напомена да ће пролазити кроз константне промене и може често да се поквари.",
		},
	},
	activity: {
		emote_created: "Креирано {T}",
		emote_renamed: "Преименовано {T} из {O} у {N}",
		emote_listing_approved: "Одобрено {T} за јавну листу",
		emote_listing_revoked: "Уклоњено {T} са јавне листе",
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
		add: "Додајте емотикон",
		author: "Креирано од",
		created_at: "Креирано",
		versions: "Верзије",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Користите емотикон",
		switch_version: "Пребаците се на ову верзију",
		in_n_sets: "{0} у скупу | {0} у скуповима",
		disable: "Искључите емотикон",
		update: "Ажурирај",
		report: "Пријави емотикон",
		makePrivate: "Приватно постави",
		makeGlobal: "Make Global",
		comments: "Коментари",
		channels: "Канали",
		common_names: "Друга имена за овај емотикон",
		usage_stats: "Статистике Емотикона",
		list: {
			searching: "Претрага је у току",
			emote_count: "{0} емотикон/а",
			no_emotes_listed: "Нису пронађени емотикони",
			fetching_slowly: "Извините, изгледа као да ће требати неки време",
		},
		upload: {
			emote_name: "Име емотикона",
			version_name: "Име верзије",
			version_description: "Опис Верзије",
			submit_emote: "Постави емотикон",
			create_emote_version: "Креирај верзију емотикона",
			image_upload: "Отпреми слику",
			accepted_formats: "Прихваћени формати",
			filetype: "Фајл",
			animation: "Анимација",
			transparency: "Провидност",
			emote_details: "Детаљи емотикона",
			version_details: "Детаљи Верзије",
			attribution: "Атрибуција",
			original_creator: "Оригинални креатор",
			as_child: "Креирате {IS_DIVERGED} верзију {0}. ",
			content_moderation: "Модерација садржаја",
			half_transparency_tooltip: "Пиксели могу бити потпуно провидни или потпуно непровидни (нема између)",
		},
	},
	emote_set: {
		create: "Нови @:common.object.emote_set",
		select: "Изаберите @:common.object.emote_set",
		explain: {
			section: "Шта је @:common.object.emote_set{'s'}?",
			hint: "Комплети емотикона су скуп емотикона који се могу везати за ваш канал или делити са другим корисницима.",
		},
		no_space: "Пуни Слотови",
		none_selected: "Комплет Није Изабран",
		editing: "Уређивање {0}",
		owner: "{USER} Комплет Емотикона",
		owned: "Комплет Емотикона Које Поседујете",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "канал није изабран | {0} канал је изабран | {0} канали су изабрани",
			create_button: "Креирај @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Емотикон сетови",
		channel_emotes: "Емотикони канала",
		joined_at: "Joined {0}",
		editors: "Уредници",
		roles: "Улоге",
		no_channel_emotes: "{0} нема емотикона на {1} каналу",
		no_channels: "{0} нема канала!",
		card: {
			view_full_profile: "Прегледај Цео Профил",
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
		report: "Пријави",
		emote_reason: {
			i_made_this: "Креирао сам овај емотикон, али га је поставио неко други",
			duplicate: "Овај емотикон је дупликат",
			pornographic: "Овај емотикон садржи порнографске или претерано сексуалне слике",
			violence_gore: "Овај емотикон показује екстремни степен насиља или крви",
			i_appear_there: "Овај емотикон ме приказује и не свиђа ми се",
			offensive: "Сматрам да је овај емотикон увредљив",
			other: "Нешто друго",
		},
		uncategorized_prompt: "Y чему је проблем?",
		details: "Детаљи (додатне информације и / или докази за вашу пријаву)",
		success: "Пријава је успешно послата",
		notify: "Бићете обавештени путем поштанског сандучета чим се ваша пријава обради или ако затражимо додатне информације.",
		complete_step_one: "Настави",
		abuse_notice: "Злоупотреба функције пријављивања може поништити ваш приступ.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Примљено",
		tabs: {
			all: "Све поруке",
			unread: "Непрочитано",
			important: "Важно",
		},
		unread_tag: "Непрочитано",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Емотикон Одобрен за јавну листу",
				content: `
# Ваш емотикон {EMOTE_NAME} одобрен је за јавну листу \n
Сада ће бити доступан у Директоријуму Емотикона и почеће да се појављује на @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Емотикон Није Одобрен за Јавну Листу",
				content: `
# Ваш емотикон {EMOTE_NAME} је одбијен
Неће бити доступан путем јавног Директоријума Емотикона или видљив на @:commom.appHost,
али остаће доступан корисницима путем везе.
`,
			},
			emote_ownership_claim_request: {
				subject: "Позив за власништво над емотиконом",
				content: `
## {OWNER_DISPLAY_NAME} жели да преузмете власништво над '{ЕМОТЕ_NАМЕ}'

[Прикажи Емотикон] ({EMOTE_URL})

** [Прихвати захтев] ({EMOTE_CLAIM_URL})** | / [Одбиј захтев] ({EMOTE_DECLINE_URL})								`,
			},
			client_banned: {
				subject: "Забрањен ти је приступ",
				reason: {
					pornographic_content: "",
				},
				content: `
# Налог је блокиран
Ваш приступ @:common.appName је сада ограничен.<br/><br/>
### Разлог за ову акцију
{BAN_REASON}<br/><br/>
### Примењена ограничења<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>ова забрана истиче **{BAN_EXPIRE_AT}**.
_ Ако мислите да је ово грешка, контактирајте @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Забрањено ти је да користиш апликацију",
					no_auth: "* Забрањено ти је да се улогујеш",
					no_ownership: "* Било који материјал који сте креирали неће више бити доступан",
					memory_hole: "* Нећете бити видљиви другим корисницима",
					ip_blocked: "* Вашој IP-адреси је блокиран приступ свим услугама @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Нисмо успели да пронађемо то што тражите",
		doctor_wtf: "Шта је ово дођавола?",
		pot_friend: "Ја сам лонац, пријатељу",
	},
};
