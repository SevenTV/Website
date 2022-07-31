export default {
	locale: "Қазақ тілі (Қазақстан)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Тағы оқу",
		more: "Тағы",
		retry: "Қайталау",
		downloads: "Жүктеулер",
		features: "Ерекшеліктер",
		comments: "Талқылау",
		search: "Табу",
		update: "Жаңарту",
		report: "Шағымдану",
		activity: "Қызметі",
		loading: "Loading",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "Қолданушы",
			emote_set: "Эмоция жиынтығы",
			emote: "Эмоциялар",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Барлығына арналған Emote платформасы",
		app_description: "Twitch немесе YouTube арқыла жүздеген Эмоцияларды оңай басқарыңыз",
		why_app: "Неге @:common.appName{'?'}",
		download_browser: "Браузер кеңейтімі",
		download_mobile: "Мобильді қосымшалар",
		download_misc: "Басқа қосымшалар",
		features: {
			emote_sets: {
				name: "Эмоция жиынтықтары",
				detail: "Эмоцияны басқа пайдаланушылармен бөлісуге немесе арнаңызға тез жіберуге болатын теңшелетін жиынтықтарға топтастырыңыз.",
			},
			many_emote_slots: {
				name: "Эмоцияларға арналған жүздеген слоттар",
				detail: "{0} ұяшықтардан бастаңыз, мүмкін максимум {1} және ақылы қол жетімді емес.",
			},
			channel_emote_names: {
				name: "Әр арна үшін қашықтағы құрылғылардың атаулары",
				detail: "Сізге оның авторы берген эмоцияның атауы ұнамайды ма? Бұл өте жақсы, сіз оны тек арнаңыз үшін өзгерте аласыз.",
			},
			real_time: {
				name: "Нақты уақыт",
				detail: "Арнаңыздағы эмоциялардың өзгеруі барлық көрермендер үшін бірден пайда болады. F5 қажет емес.",
			},
			emote_versions: {
				name: "Эмоциялармен басқару",
				detail: "Тақырыптық опциялар арасында ауысыңыз немесе эмоцияны жетілдірілген нұсқаға жаңартыңыз.",
			},
			next_gen: {
				name: "WEBP және AVIF сияқты жаңа буын кескін пішімдері",
				detail: "Өткізу қабілеттілігін азайту үшін біз жаңа, оңтайландырылған кескін форматтарын қолданамыз.",
			},
			source_available: {
				name: "Дереккөз-қол жетімді",
				detail: "Біздің барлық кодтық базамыз GitHub-та бастапқы коды бар лицензиясы бар қол жетімді. Кез келген адам қарап, өз үлесін қоса алады.",
			},
		},
		socials: {
			discord: "Discord-та @:common.appName қосылыңыз",
			discord_online_count: "{0} қазір желіде",
			twitter: "Бізді Twitter-де қадағалаңыз",
			github: "Ықпал",
		},
	},
	// Nav Bar
	nav: {
		home: "Үй",
		about: "Туралы",
		emotes: "Эмоциялар",
		store: "Жазылу",
		admin: "Әкім",
		sign_in: "Ішіне кіру",
		wip_notice: {
			heading: "Қош келдіңіз жаңа @:common.appName веб-сайтына",
			text1: "Бұл тәжірибенің келесі әдісін ертерек алдын-ала қарау @:common.appName{'.'}",
			text2: "Жаңа нәрсені зерттеп, бізге бірнеше пікір беріңіз! Назар аударыңыз, ол тез өзгереді және жиі бұзылуы мүмкін.",
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
		emote_processed: "Executed a new processing job for {T}",
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
		add: "Эмоцияны Қосыңыз",
		author: "Қосқан",
		created_at: "Құрылған",
		versions: "Версиялар",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "Эмоцияны қолдану",
		switch_version: "Басқа версияға көшу",
		in_n_sets: "{0} жиынында | {0} жиындарында",
		disable: "Эмоцияны өшіру",
		update: "Жаңарту",
		report: "Эмоцияға Шағымдану",
		makePrivate: "Жеке ету",
		makeGlobal: "Make Global",
		comments: "Талқылау",
		channels: "Арналар",
		common_names: "Бұл эмоцияға арналған басқа атаулар",
		usage_stats: "Эмоциялар статистикасы",
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
			searching: "Іздеу",
			emote_count: "{0} Эмоциялар",
			no_emotes_listed: "Ешқандай Эмоция табылған жоқ",
			fetching_slowly: "Кешіріңіз, бұл біраз уақытты алады",
		},
		upload: {
			emote_name: "Эмоцияның аты",
			version_name: "Версияның аты ",
			version_description: "Версияның сипаттамасы",
			submit_emote: "Эмоцияны жіберу",
			create_emote_version: "Жаңа эмоция жасау",
			image_upload: "Суретті жүктеу",
			accepted_formats: "Қабылданған форматтар",
			filetype: "Файл",
			animation: "Анимация",
			transparency: "Ашықтық",
			emote_details: "Эмоцияның мәліметтері",
			version_details: "Версияның мәліметтері",
			attribution: "Анықтамасы",
			original_creator: "Бастапқы Жасаушы",
			as_child: "Сіз {IS_DIVERGED} нұсқасын {0} жасайсыз.",
			content_moderation: "Контенті модерациялау",
			half_transparency_tooltip:
				"Пикселдер тек мөлдір немесе толығымен мөлдір болуы мүмкін (мөлдірлік айнымалысы жоқ)",
		},
	},
	emote_set: {
		create: "Жаңа @:common.object.emote_set",
		select: "Таңдаңыз @:common.object.emote_set",
		explain: {
			section: "Бұл не @:common.object.emote_set{'s'}?",
			hint: "Эмоциялар жиынтығы-бұл сіздің арналарыңызға байланған немесе оларды басқа пайдаланушылармен бөлісуге болатын эмоциялар жиынтығы.",
		},
		no_space: "Слоттар толып тұр",
		none_selected: "Жинағы таңдалмады",
		editing: "Өзгерту {0}",
		owner: "Эмоциялар жиынтығы {USER}",
		owned: "Тиесілі эмоциялар жиынтығы",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "Арна таңдалған жоқ / {0} Арна таңдалды / {0} Арналар таңдалды",
			create_button: "Жасау @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Эмоция жиынтықтары",
		channel_emotes: "Арнаның эмоциялары",
		joined_at: "Joined {0}",
		editors: "Өңдеушілер",
		roles: "Рөлдер",
		connections: "Channels | Channels & Accounts",
		new_connections: "Link accounts...",
		no_channel_emotes: "{0} өз арнасында ешқандай эмоция жоқ {1}",
		no_channels: "{0} қосылған арналар жоқ!",
		card: {
			view_full_profile: "Толық Профильді Көру",
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
		report: "Шағымдану",
		emote_reason: {
			i_made_this: "Бұл Эмоцияны Мен жасадым, бірақ оны басқа біреу жүктеді",
			duplicate: "Бұл эмоция қайталанатын",
			pornographic: "Бұл эмоцияда порнографиялық немесе шамадан тыс жыныстық бейнелер бар",
			violence_gore: "Бұл эмоция зорлық-зомбылықтың немесе қанның экстремалды дәрежесін көрсетеді",
			i_appear_there: "Бұл эмоция мені бейнелейді және маған ұнамайды",
			offensive: "Мен осы эмоцияны қорлайтын деп санаймын",
			other: "Тағы да бір нәрсе",
		},
		uncategorized_prompt: "Не болды?",
		details: "Толығырақ (қосымша ақпарат және/немесе сіздің есебіңіздің дәлелі)",
		success: "Шағым сәтті жіберілді",
		notify: "Шағым өңделгеннен кейін немесе қосымша ақпарат сұралғаннан кейін сіз пошта жәшігі арқылы хабарлама аласыз.",
		complete_step_one: "Жалғастыру",
		abuse_notice: "Шағымдану функциясын теріс пайдалану сіздің қол жетімділігіңіздің жойылуына әкелуі мүмкін.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Келген хабарламалар",
		tabs: {
			all: "Барлық хабарламалар",
			unread: "Оқылмады",
			important: "Маңызды",
		},
		unread_tag: "Оқылмады",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Эмоция қабылданды",
				content: `# Сіздің "{IMY_EMOTION}" эмоциясы тізімге \N енгізу үшін мақұлданды
Енді ол Emote каталогында қол жетімді болады және @:common-да пайда бола бастайды.AppHost{'.'}`,
			},
			emote_not_listed: {
				subject: "Эмоция қабылданбады",
				content: `
# Сіздің эмоцияңыз "{EMOTE_NAME}" қабылданбады
Ол қоғамдық Emote каталогы арқылы қол жетімді болмайды немесе @:common.appHost, бірақ сілтеме арқылы пайдаланушылар үшін қол жетімді болады.`,
			},
			emote_ownership_claim_request: {
				subject: "Эмоцияға иелену құқығын талап ету",
				content: `## {OWNER_DISPLAY_NAME} '{EMOTE_NAME}'иесі болғыңыз келеді

[Эмоцияны қарау] ({EMOTE_URL})

**[Сұранысты қабылдау] ({EMOTE_CLAIM_URL}) * * | [сұрауды қабылдамау] ({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Сізді банға жіберді",
				reason: {
					pornographic_content: "",
				},
				content: `# Есептік жазба бұғатталған
@:common.appName қазір шектеулі.<br/><br/>
### Бұл әрекеттің себебі
{BAN_REASON} <br/><br/>
### Қолданылған шектеулер<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Бұл шешімнің жарамдылық мерзімі **{BAN_EXPIRE_AT}**.
_Егер сіз бұл қате деп ойласаңыз, біздің email @:common.supportEmail{'.'}_`,
				effect: {
					no_permissions: "* Сіз енді қосымшамен өзара әрекеттесе алмайсыз",
					no_auth: "* Сіз енді кіре алмайсыз",
					no_ownership: "* Сіз жасаған кез-келген контент енді қол жетімді болмайды",
					memory_hole: "* Сіз басқа қолданушыларға көрінбейтін боласыз",
					ip_blocked: "* Сіздің IP мекенжайыңыз барлық @:common қызметтеріне кіру үшін бұғатталған.AppName",
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
		troll_despair: "Біз оны таба алмадық",
		doctor_wtf: "Бұл не бәле?",
		pot_friend: "Мен құмырамын, досым",
	},
};
