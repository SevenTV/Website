export default {
	locale: "فارسی",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "برنامه 7tv",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "بیشتر بدانید",
		more: "بیشتر",
		retry: "دوباره امتحان کنید\n",
		downloads: "دانلودها",
		features: "امکانات",
		comments: "نظرات",
		search: "جستجو کردن",
		update: "به‌روزرسانی",
		report: "گزارش",
		activity: "فعالیت",
		loading: "بارگذاری",
		save_changes: "ذخیرهٔ تغییرات",
		reset: "بازنشانی",
		object: {
			user: "کاربر",
			emote_set: "گروه ایموت ها",
			emote: "ایموت",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "پلتفرم ایموت برای همه",
		app_description: "صدها ایموت را برای کانال های تویچ یا یوتیوب خود به راحتی مدیریت کنید",
		why_app: "چرا @:common.appName{'?'}",
		download_browser: "اکستنشن مرورگر",
		download_mobile: "اپ‌های موبایل",
		download_misc: "سایر برنامه‌ها",
		features: {
			emote_sets: {
				name: "ست کردن ایموت ها",
				detail: "ایموت ها را می توانید در گروه های قابل تنظیم گروه‌بندی کنید که میشود آن‌ها را با سایر کاربران به اشتراک گذاشت یا به سرعت در کانال خود عوض کرد.",
			},
			many_emote_slots: {
				name: "صدها ظرفیت ایموت",
				detail: "با ظرفیت های {0} و با حداکثر ممکن {1} بدون پرداخت مبلغی شروع کنید.",
			},
			channel_emote_names: {
				name: "نام ایموت های هر کانال",
				detail: "آیا نامی را که نویسنده آن به ایموت داده است دوست ندارید؟ مشکلی نیست، شما می توانید آن را فقط برای کانال خود تغییر دهید.",
			},
			real_time: {
				name: "به موقع",
				detail: "تغییر ایموت ها در کانال شما فوراً برای همه بینندگان اتفاق می افتد. نیازی به F5 نیست.",
			},
			emote_versions: {
				name: "نسخه سازی ایموت",
				detail: "بین انواع تم ها را میتوانید عوض کنید یا یک ایموت را به نسخه بهبودیافته به‌روزرسانی کنید.",
			},
			next_gen: {
				name: "فرمت های تصویر نسل بعدی مانند WEBP و AVIF",
				detail: "ما از فرمت‌های تصویر جدیدتر و بهینه‌تر برای کاهش استفاده از پهنای باند استفاده می‌کنیم.",
			},
			source_available: {
				name: "منبع - در دسترس",
				detail: "پایگاه کد ما در GitHub با مجوز منبع در دسترس است. هر کسی می تواند مشاهده کند و مشارکت کند.",
			},
		},
		socials: {
			discord: "به سرور 7tv در دیسکورد بپیوندید",
			discord_online_count: "{0} اکنون آنلاین است",
			twitter: "ما را در توییتر دنبال کنید",
			github: "مشارکت",
		},
	},
	// Nav Bar
	nav: {
		home: "خانه",
		about: "درباره ما",
		emotes: "ایموت",
		store: "اشتراک",
		admin: "مدیر",
		sign_in: "ورود",
		wip_notice: {
			heading: "به وب سایت جدید @:common.appName خوش آمدید",
			text1: "این یک پیش نمایش اولیه از روش بعدی برای تجربه است @:common.appName{'.'}",
			text2: "چیز های جدید را کشف کنید و به ما بازخوردتان را نشان بدهید! توجه داشته باشید که دستخوش تغییرات سریع خواهد شد و ممکن است مکررا بشکند.",
		},
	},
	activity: {
		emote_created: "ساخته شد {T}",
		emote_renamed: "نام {T} را از {O} به {N} تغییر داد",
		emote_listing_approved: "{T} برای فهرست عمومی تأیید شد",
		emote_listing_revoked: "{T} از فهرست عمومی حذف شد",
		emote_merged: "{T} در {0} ترکیب شد",
		emote_ownership_transferred: "مالکیت {T} به {U} منتقل شد",
		emote_restored: "{T} بازیابی شد",
		emote_updated: "ویژگی‌های {T} تغییر کرد",
		emote_deleted: "{T} حذف شد",
		emote_processed: "Executed a new processing job for {T}",
		emote_version_created: 'نسخه "{VER}" برای {T} ساخته شد',
		emote_version_renamed: 'تغییر نام نسخه "{VER}" برای {T} از {1} به {2}',
		emote_version_approved: "نسخه تأیید شده «{VER}» برای {T} برای فهرست عمومی",
		emote_version_restored: 'نسخه بازیابی شده "{VER}" برای {T}',
		emote_version_deleted: 'نسخه حذف شده "{VER}" برای {T}',
		user_created: "{T} ساخته شد",
		user_deleted: "{T} حذف شد",
		user_editor_added: "{U} را به عنوان یک ویرایشگر اضافه کرد",
		user_editor_added_other: "{U1} به عنوان ادیتور {U2} اضافه شد",
		user_editor_removed: "امتیازات ویرایشگر {U} لغو شد",
		user_editor_removed_other: "امتیاز ویرایشگر {U1} به {U2} لغو شد",
		user_banned: "{T} بن شد",
		user_unbanned: "{T} آنبن شد",
		user_updated: "ویژگی‌های {T} تغییر کرد",
		user_sign_in: "{T} وارد سیستم شد",
		user_sign_out: "{T} از سیستم خارج شد",
		user_forbidden: "دسترسی {T} به {0} ممنوع شد",
		emote_set_created: "{T} ساخته شد",
		emote_set_emote_added: "ایموت {AE} را به {T} اضافه کرد",
		emote_set_emote_removed: "ایموت {AE} را از {T} حذف کرد",
		emote_set_emote_renamed: "تغییر نام ایموت {AE} از {O} به {N} در {T}",
		emote_set_updated: "ویژگی‌های {T} تغییر کرد",
	},
	// Text that is relevant to emotes
	emote: {
		add: "اضافه کردن ایموت",
		author: "اضافه شده توسط",
		created_at: "ساخنه شده",
		versions: "نسخه ها",
		preview_loading: "در حال بارگیری پیش نمایش ها... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "پیش نمایش با موفقیت بارگزاری نشد",
		processing: "پردازش ایموت - ممکن است مدتی طول بکشد.",
		use: "استفاده کردن از ایموت",
		switch_version: "برگرداندن به این نسخه",
		in_n_sets: "در {0} تنظیم | در {0} گروه ها",
		disable: "غیر فعال کردن ایموت",
		update: "به‌روزرسانی",
		report: "گزارش ایموت",
		makePrivate: "خصوصی کردن",
		makeGlobal: "Make Global",
		comments: "نظرات",
		channels: "کانال‌ها",
		common_names: "نام های دیگر این ایموت",
		usage_stats: "آمار ایموت",
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
			searching: "جستجو",
			emote_count: "{0} ایموت ها",
			no_emotes_listed: "ایموتی پیدا نشد",
			fetching_slowly: "با عرض پوزش، به نظر می رسد این مدتی طول می کشد",
		},
		upload: {
			emote_name: "اسم ایموت",
			version_name: "نام نسخه",
			version_description: "توضیحات نسخه",
			submit_emote: "ثبت ایموت",
			create_emote_version: "ایجاد نسخه ایموت",
			image_upload: "بارگذاری تصویر",
			accepted_formats: "فرمت های پذیرفته شده",
			filetype: "فایل",
			animation: "انیمیشن",
			transparency: "شفافیت",
			emote_details: "جزئیات ایموت",
			version_details: "جزئیات نسخه",
			attribution: "خصوصیات",
			original_creator: "سازنده اصلی",
			as_child: "شما در حال ایجاد یک نسخه {IS_DIVERGED} از {0} هستید. ",
			content_moderation: "تعدیل محتوا",
			half_transparency_tooltip: "پیکسل‌ها فقط می‌توانند کاملاً شفاف یا کاملاً مات باشند (بدون شفافیت متغیر)",
		},
	},
	emote_set: {
		create: "جدید @:common.object.emote_set",
		select: "انتخاب @:common.object.emote_set",
		explain: {
			section: "چه هستند @:common.object.emote_set{'s'}?",
			hint: "Emote Sets مجموعه ای از ایموت ها هستند که می توانند به کانال های شما متصل شوند یا با سایر کاربران به اشتراک گذاشته شوند.",
		},
		no_space: "ظرفیت ها کامل",
		none_selected: "هیچ مجموعه ای انتخاب نشده است",
		editing: "ویرایش {0}",
		owner: "{USER}'s مجموعه ایموت",
		owned: "مجموعه ایموت متعلق به",
		label_renamed: "تغییر نام",
		label_conflict: "ناسازگاری",
		label_default: "پیش‌فرض",
		modal: {
			selected_channel_count: "هیچ کانالی انتخاب نشده است | {0} کانال انتخاب شد | {0} کانال ها انتخاب شدند",
			create_button: "ساخت @:common.object.emote_set",
			rename_in_set: "{0} تغییر نام به",
			context_rename: "شخصی سازی نام ایموت",
			context_set_default: "به عنوان پیش فرض اختصاص دهید",
			context_unset_default: "لغو اختصاص به عنوان پیش فرض",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "ست کردن ایموت ها",
		channel_emotes: "ایموت های کانال",
		joined_at: "پیوست {0}",
		editors: "ادیتور ها",
		roles: "نقش ها",
		connections: "کانال ها | کانال‌ها و حساب‌ها",
		new_connections: "پیوند حساب‌ها...",
		no_channel_emotes: "{0} هیچ ایموتی در کانال {1} خود ندارد",
		no_channels: "{0} هیچ کانالی متصل ندارد!",
		card: {
			view_full_profile: "مشاهده پروفایل کامل",
		},
		settings: {
			button: "ویرایش پروفایل",
			section_profile: "پروفایل",
			username: "نام کاربری",
			display_name: "نام نمایشی",
			profile_picture: "عکس پروفایل",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "گزارش",
		emote_reason: {
			i_made_this: "من این ایموت را ساختم اما توسط شخص دیگری آپلود شد",
			duplicate: "این ایموت تکراری است",
			pornographic: "این ایموت حاوی تصاویر مستهجن یا بیش از حد جنسی است",
			violence_gore: "این ایموت خشونت یا عصبانیت شدید را نشان می دهد",
			i_appear_there: "این ایموت من را به تصویر می کشد و من آن را دوست ندارم",
			offensive: "من این ایموت را توهین آمیز می دانم",
			other: "یک مورد دیگر",
		},
		uncategorized_prompt: "موضوع چیه?",
		details: "جزئیات (اطلاعات و/یا شواهد اضافی برای گزارش شما)",
		success: "گزارش با موفقیت ارسال شد",
		notify: "پس از رسیدگی به گزارش شما یا درخواست اطلاعات بیشتر، از طریق صندوق ورودی به شما اطلاع داده خواهد شد.",
		complete_step_one: "ادامه",
		abuse_notice: "سوء استفاده از ویژگی گزارش ممکن است منجر به مسدود شدن دسترسی شما شود.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "صندوق دریافت‌",
		tabs: {
			all: "همه پیام ها",
			unread: "خوانده نشده",
			important: "مهم",
		},
		unread_tag: "خوانده نشده",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "ایموت برای فهرست تایید شد",
				content: `# شکلک شما "{EMOTE_NAME}" برای فهرست کردن تأیید شد \n
اکنون در فهرست Emote در دسترس خواهد بود و در @:common.appHost{'} ظاهر می شود.`,
			},
			emote_not_listed: {
				subject: "ایموت برای فهرست تایید نشد",
				content: `# ایموت شما "{EMOTE_NAME}" رد شد
از طریق فهرست عمومی ایموت در دسترس نخواهد بود یا در @:common.appHost قابل مشاهده نخواهد بود،
اما برای کاربران با پیوند در دسترس باقی خواهد ماند.`,
			},
			emote_ownership_claim_request: {
				subject: "دعوت به ادعای مالکیت یک ایموت",
				content: `## {OWNER_DISPLAY_NAME} از شما می‌خواهد مالک «{EMOTE_NAME}» شوید

[مشاهده ایموت]({EMOTE_URL})

**[پذیرش درخواست]({EMOTE_CLAIM_URL})** | [رد درخواست]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "حساب شما مسدود شده است",
				reason: {
					pornographic_content: "",
				},
				content: `# حساب مسدود شده
اکنون دسترسی شما به @:common.appName محدود شده است.<br/><br/>
### دلیل این اقدام
{BAN_REASON} <br/><br/>
### محدودیت اعمال شد<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>این تصمیم منقضی می‌شود **{BAN_EXPIRE_AT}**.
_اگر فکر می کنید این یک اشتباه است، لطفا به ایمیل @:common.supportEmail{'.'}_ ایمیل بزنید.`,
				effect: {
					no_permissions: "* ممکن است دیگر با برنامه تعامل نداشته باشید",
					no_auth: "* دیگر نمی توانید وارد شوید",
					no_ownership: "* هر محتوایی که ایجاد کردید دیگر در دسترس نخواهد بود",
					memory_hole: "* برای سایر کاربران قابل مشاهده نخواهید بود",
					ip_blocked: "* دسترسی IP شما به همه سرویس‌های @:common.appName مسدود شده است",
				},
			},
			report_closed: {
				subject: "گزارش بسته شد",
				content: `
از اینکه به ما اطلاع دادید متشکریم، به گزارش شما {'#'}{CASE_ID} رسیدگی شده است.								`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "ما نتوانستیم آن را پیدا کنیم",
		doctor_wtf: "این دیگه چیه ؟",
		pot_friend: "من یک پات فرند هستم",
	},
};
