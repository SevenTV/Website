export default {
	locale: "Беларускі (Беларусь)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Вучыць больш",
		more: "Больш",
		retry: "Паспрабуйце яшчэ раз",
		downloads: "Спампаваць",
		features: "Рэкамендаваныя",
		comments: "Каментар",
		search: "Пошук",
		update: "Абнавіць",
		report: "Справаздача",
		activity: "Дзейнасць",
		loading: "Загрузка",
		save_changes: "Захаваць змены",
		reset: "Скінуць",
		object: {
			user: "карыстальнік",
			emote_set: "Набор эмоцый",
			emote: "Эмоцыя",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Аддаленая платформа для ўсіх",
		app_description: "З лёгкасцю Кіруйце сотнямі эмоцый для вашых каналаў Twitch або YouTube",
		why_app: "Чаму @:common.AppName{'?'}",
		download_browser: "Пашырэнне для браўзэра",
		download_mobile: "Мабільныя прыкладання",
		download_misc: "Іншыя прыкладання",
		features: {
			emote_sets: {
				name: "Наборы эмоцый",
				detail: "Групуйце эмоцыі ў Наладжвальныя наборы, якімі можна падзяліцца з іншымі карыстальнікамі або хутка перанесці на свой канал.",
			},
			many_emote_slots: {
				name: "Сотні слотаў для эмоцый",
				detail: "Пачніце з {0} слотаў, з магчымым максімумам {1} і без платнага доступу.",
			},
			channel_emote_names: {
				name: "Імёны аддаленых прылад для кожнага канала",
				detail: "Вам не падабаецца назва, дадзенае эмоцыі яе аўтарам? Гэта нармальна, вы можаце змяніць яго толькі для свайго канала.",
			},
			real_time: {
				name: "У рэжыме рэальнага часу",
				detail: "Змена эмоцый на вашым канале адбываецца імгненна для ўсіх гледачоў. F5 не патрабуецца.",
			},
			emote_versions: {
				name: "Выдаленае кіраванне версіямі",
				detail: "Пераключайцеся паміж тэматычнымі варыянтамі або абновіце эмоцыю да палепшанай версіі.",
			},
			next_gen: {
				name: "Фарматы малюнкаў новага пакалення, такія як WEBP і AVID",
				detail: "Мы выкарыстоўваем новыя, больш аптымізаваныя фарматы малюнкаў, каб скараціць выкарыстанне паласы прапускання.",
			},
			source_available: {
				name: "Крыніца-даступны",
				detail: "Уся наша кодавая база даступная на GitHub з ліцэнзіяй, даступнай з зыходным кодам. Любы жадаючы можа прагледзець і ўнесці свой уклад.",
			},
		},
		socials: {
			discord: "Далучайцеся @: агульнае імя прыкладання ў Discord",
			discord_online_count: "{0} цяпер у сеткі",
			twitter: "Сачыце за намі ў Twitter",
			github: "Спрыяць",
		},
	},
	// Nav Bar
	nav: {
		home: "Дадому",
		about: "Пра",
		emotes: "Эмоцыя",
		store: "Падпісваць",
		admin: "Адміністратар",
		sign_in: "Увайсьцi",
		wip_notice: {
			heading: "Сардэчна запрашаем на новы вэб-сайт @:common.appName",
			text1: "Гэта папярэдні прагляд наступнага спосабу выкарыстання @:common.AppName{'.'}",
			text2: "Даведайцеся, што новага і дайце нам водгук! Звярніце ўвагу, што ён будзе хутка змяняцца і можа часта ламацца.",
		},
	},
	activity: {
		emote_created: "Створаны {T}",
		emote_renamed: "Перайменаваны {T} з {O} у {N}",
		emote_listing_approved: "Зацверджаны {T} для публічнага размяшчэння",
		emote_listing_revoked: "Выдалены {T} з публічнага спісу",
		emote_merged: "Аб'яднаны {T} у {0}",
		emote_ownership_transferred: "Перададзена права ўласнасці на {T} у {U}",
		emote_restored: "Адноўлена {T}",
		emote_updated: "Зменены ўласцівасці для {T}",
		emote_deleted: "Выдаленае {T}",
		emote_processed: "Executed a new processing job for {T}",
		emote_version_created: "Створана версія '{VER}' для {T}",
		emote_version_renamed: "Перайменавана Версія '{VER} ' для {T} з {1} на {2}",
		emote_version_approved: "Зацверджаная Версія '{VER} ' для {T} для публічнага лістынга",
		emote_version_restored: "Адноўленая Версія '{VER} ' для {T}",
		emote_version_deleted: "Выдаленая Версія '{VER} ' для {T}",
		user_created: "Створаны {T}",
		user_deleted: "Выдаленае {T}",
		user_editor_added: "Дададзены {U} у якасці рэдактара",
		user_editor_added_other: "Дададзены {U1} у якасці рэдактара {U2}",
		user_editor_removed: "Адкліканы прывілеі рэдактара {U}",
		user_editor_removed_other: "Адкліканы прывілеі рэдактара {U1} для {U2}",
		user_banned: "Забанены {T}",
		user_unbanned: "Разбанены {T}",
		user_updated: "Змененыя ўласцівасці для {T}",
		user_sign_in: "{T} увайшоў у сістэму",
		user_sign_out: "{T} выйшаў з сістэмы",
		user_forbidden: "{T} было адмоўлена ў доступе да {0}",
		emote_set_created: "Створаны {T}",
		emote_set_emote_added: "Дададзеная семя {AE} у {T}",
		emote_set_emote_removed: "Выдаліў эмоцыю {AE} з {T}",
		emote_set_emote_renamed: "Пераназваў эмоцыю {AE} з {O} ў {N} ў {T}",
		emote_set_updated: "Змененыя ўласцівасці для {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Дадаць Эмоцыю",
		author: "Дададзена",
		created_at: "Створаны",
		versions: "Версія",
		preview_loading: "Загрузка папярэдніх праглядаў... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Не ўдалося загрузіць папярэдні прагляд",
		processing: "Апрацоўка эмоцый - гэта можа заняць некаторы час.",
		use: "Выкарыстоўвайце Эмоцыю",
		switch_version: "Пераключыцеся на гэтую версію",
		in_n_sets: "у наборы {0} | у наборах {0}",
		disable: "Адключыць Эмоцыі",
		update: "Абнавіць",
		report: "Паведаміць аб Эмоцыях",
		makePrivate: "Зрабіць Прыватным",
		makeGlobal: "Make Global",
		comments: "Каментар",
		channels: "Каналы",
		common_names: "Іншыя назвы для гэтай эмоцыі",
		usage_stats: "Статыстыка эмоцый",
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
			searching: "Пошукавы",
			emote_count: "{0} эмоцыі",
			no_emotes_listed: "Ніякіх эмоцый не знойдзена",
			fetching_slowly: "Выбачайце, падобна, гэта зойме некаторы час",
		},
		upload: {
			emote_name: "Імя эмоцыі",
			version_name: "Назва версіі",
			version_description: "Апісанне версіі",
			submit_emote: "Адправіць эмоцыю",
			create_emote_version: "Стварыць версію эмоцый",
			image_upload: "Загрузка малюнкаў",
			accepted_formats: "Прынятыя фарматы",
			filetype: "Файл",
			animation: "Анімацыя",
			transparency: "Празрыстасьць",
			emote_details: "Дэталі Эмоцый",
			version_details: "Звесткі аб версіі",
			attribution: "Вызначэнне",
			original_creator: "Першапачатковы Стваральнік",
			as_child: "Вы ствараеце {IS_DIVERGED} версію {0}. ",
			content_moderation: "Мадэрацыя кантэнту",
			half_transparency_tooltip:
				"Пікселі могуць быць толькі цалкам празрыстымі або цалкам непразрыстымі (без зменнай празрыстасці)",
		},
	},
	emote_set: {
		create: "Новы @:common.object.emote_set",
		select: "Абярыце @:common.object.emote_set",
		explain: {
			section: "Што такое @:common.object.emote_set{'s'}?",
			hint: "Наборы эмоцый-гэта набор эмоцый, якія можна прывязаць да вашых каналах або падзяліцца імі з іншымі карыстальнікамі.",
		},
		no_space: "Слоты Запоўненыя",
		none_selected: "Набор Не Абраны",
		editing: "Рэдагаванне {0}",
		owner: "Набор эмоцый {USER}",
		owned: "Які належыць набор эмоцый",
		label_renamed: "Перайменаваны",
		label_conflict: "Канфлікт",
		label_default: "Па змаўчанні",
		modal: {
			selected_channel_count: "канал не абраны | {0} канал абраны | {0} каналы выбраны",
			create_button: "Стварыць @:common.object.emote_set",
			rename_in_set: "Перайменаваць у {0}",
			context_rename: "Налада Імя эмоцыі",
			context_set_default: "Прызначыць Па Змаўчанні",
			context_unset_default: "Скасаваць прызначэнне па змаўчанні",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Наборы эмоцый",
		channel_emotes: "Канал эмодзі 7TV",
		joined_at: "Далучыўся {0}",
		editors: "Рэдактары",
		roles: "Ролі",
		connections: "Channels | Channels & Accounts",
		new_connections: "Link accounts...",
		no_channel_emotes: "{0} не мае ніякіх эмоцый на сваім канале {1}",
		no_channels: "{0} не мае падлучаных каналаў!",
		card: {
			view_full_profile: "Прагледзець Поўны Профіль",
		},
		settings: {
			button: "Рэдагаваць Профіль",
			section_profile: "Профіль",
			username: "Імя карыстальніка",
			display_name: "Адлюстраванае імя",
			profile_picture: "Фота профілю",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Справаздача",
		emote_reason: {
			i_made_this: "Я зрабіў гэтую эмоцыю, але яна была загружаная кімсьці іншым",
			duplicate: "Гэтая эмоцыя з'яўляецца дублікатам",
			pornographic: "Гэтая эмоцыя ўтрымлівае парнаграфічныя або празмерна сэксуальныя выявы",
			violence_gore: "Гэтая эмоцыя дэманструе крайнюю ступень гвалту або запечанай крыві",
			i_appear_there: "Гэтая эмоцыя адлюстроўвае мяне, і мне гэта не падабаецца",
			offensive: "Я знаходжу гэтую эмоцыю абразлівай",
			other: "Іншы варыянт",
		},
		uncategorized_prompt: "У чым справа?",
		details: "Падрабязнасці (дадатковая інфармацыя і / або доказы для вашага справаздачы)",
		success: "Справаздача адпраўлены паспяхова",
		notify: "Вы атрымаеце апавяшчэнне праз паштовую скрыню, як толькі ваш справаздачу будзе апрацаваны або будзе запытана дадатковая інфармацыя.",
		complete_step_one: "Працягнуць",
		abuse_notice: "Злоўжыванне функцыяй справаздачы можа прывесці да анулявання вашага доступу.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Уваходныя",
		tabs: {
			all: "Усе паведамленні",
			unread: "Непрачытанае",
			important: "Важна",
		},
		unread_tag: "Непрачытанае",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Эмот ухвалены для ўключэння ў спіс",
				content: `
# Ваша эмоцыя "{EMOTE_NAME}" была адобрана для ўключэння ў спіс \n
Цяпер ён будзе даступны ў каталогу Emote і пачне з'яўляцца на @:common.AppHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Эмоцыя не адобрана для ўключэння ў спіс",
				content: `
# Ваша эмоцыя "{EMOTE_NAME}" была адхіленая
Ён не будзе даступны праз агульнадаступны каталог Emote або бачны на @:common.AppHost,
але застанецца даступным для карыстальнікаў па спасылцы.
`,
			},
			emote_ownership_claim_request: {
				subject: "Запрашэнне заявіць аб праве ўласнасці на эмоцыю",
				content: `
## {OWNER_DISPLAY_NAME} хоча, каб вы сталі ўладальнікам ' {EMOTE_NAME}'

[Прагляд эмоцый] ({EMOTE_URL})

**[Прыняць запыт] ({EMOTE_CLAIM_URL})** | [адхіліць запыт] ({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Цябе забанілі",
				reason: {
					pornographic_content: "",
				},
				content: `
# Уліковы запіс заблакаваная
Ваш доступ да @:common.AppName цяпер абмежаваны.<br/><br/>
### Прычына гэтага дзеяння
{Прычына забароны} <br / ><br/>
### Ужывальныя абмежаванні<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

< br/>тэрмін дзеяння гэтага рашэння мінае **{BAN_EXPIRE_AT}**.
__ Калі вы лічыце, што гэта памылка, калі ласка, напішыце @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Вы больш не можаце ўзаемадзейнічаць з дадаткам",
					no_auth: "* Вы больш не можаце ўваходзіць у сістэму",
					no_ownership: "* Любы створаны вамі кантэнт больш не будзе даступны",
					memory_hole: "* Вы не будзеце бачныя іншым карыстальнікам",
					ip_blocked: "* Ваш IP-адрас заблакаваны для доступу да ўсіх службам @:common.AppName",
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
		troll_despair: "Мы не змаглі яго знайсці",
		doctor_wtf: "Што гэта за трасца?",
		pot_friend: "Я траўка, сябар",
	},
};
