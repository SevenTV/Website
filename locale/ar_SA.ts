export default {
	locale: "اللغة العربية",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "تعرف على المزيد",
		more: "المزيد",
		retry: "حاول مرة أخرى",
		downloads: "التنزيلات",
		features: "المميزات",
		comments: "التعليقات",
		search: "البحث",
		update: "تحديث",
		report: "بلاغ",
		activity: "أنشطة",
		loading: "جاري التحميل",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "المستخدم",
			emote_set: "مجموعة الإيموتات",
			emote: "الإيموت",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "منصة إيموتات للجميع",
		app_description: "إدارة المئات من الإيموتات لقناتك على تويتش أو يوتيوب بسهولة",
		why_app: "ما الذي يميز @:common.appName{'؟'}",
		download_browser: "الإضافة على المتصفح",
		download_mobile: "تطبيقات جوال",
		download_misc: "تطبيقات أخرى",
		features: {
			emote_sets: {
				name: "مجموعة الإيموتات",
				detail: "مجموعة إيموتات في مجموعات قابلة للتعديل والتي يمكن مشاركتها بشكل سريع مع مستخدمين آخرين أو إضافتها لقناتك.",
			},
			many_emote_slots: {
				name: "مئات من خانات الإيموتات",
				detail: "ابدأ بـ {0} خانة، وقد تصل بحد اقصى الى {1} وبدون اشتراك مدفوع.",
			},
			channel_emote_names: {
				name: "تسمية جديدة للإيموت لكل قناة",
				detail: "لم يعجبك الاسم الذي اختاره مالك الإيموت؟ لا بأس، يمكنك تغييره لقناتك فقط.",
			},
			real_time: {
				name: "فوري",
				detail: "تغيير الإيموتات في قناتك يحدث على الفور، لجميع المشاهدين. ليسوا ملزمين بتحديث الصفحة.",
			},
			emote_versions: {
				name: "إصدار الإيموت",
				detail: "قم بالتبديل بين السمات المختلفة أو قم بتحديث الإيموت إلى نسخة محسنة.",
			},
			next_gen: {
				name: "صيغ صور الجيل التالي مثل WEBP و AVIF",
				detail: "نحن نستخدم صيغ الصور الأحدث والأكثر تحسناً للحد من استخدام عرض الترددات.",
			},
			source_available: {
				name: "متاحة المصدر",
				detail: "قاعدة الأكواد البرمجية متاحة على موقع GitHub مع ترخيص متاح المصدر. يمكن لأي شخص الاطلاع والمساهمة.",
			},
		},
		socials: {
			discord: "انضم إلى @:common.appName في ديسكورد",
			discord_online_count: "{0} متصلين الآن",
			twitter: "تابعنا على تويتر",
			github: "المساهمة",
		},
	},
	// Nav Bar
	nav: {
		home: "الصفحة الرئيسية",
		about: "عن التطبيق",
		emotes: "الإيموتات",
		store: "الاشتراك",
		admin: "مشرف",
		sign_in: "تسجيل الدخول",
		wip_notice: {
			heading: "مرحبا بكم في موقع @:common.appName الجديد",
			text1: "هذه عينه مبكرة للطريقة التالية للتجربة @:common.appName{'.'}",
			text2: "اكتشف مالجديد وأعطنا ملاحظاتك! علمن بأن الموقع سيخضع لتغييرات سريعة وقد ينقطع بشكل متكرر.",
		},
	},
	activity: {
		emote_created: "تم إنشاء {T}",
		emote_renamed: "تم إعادة تسمية {T} من {O} إلى {N}",
		emote_listing_approved: "تمت الموافقة على {T} للإدراج العام",
		emote_listing_revoked: "تم إزالة {T} من القائمة العامة",
		emote_merged: "تم دمج {T} إلى {0}",
		emote_ownership_transferred: "تم نقل ملكية {T} إلى {U}",
		emote_restored: "تمت استعادة {T}",
		emote_updated: "تم تغيير الخصائص لـ {T}",
		emote_deleted: "تم حذف {T}",
		emote_version_created: "تم إنشاء الإصدار '{VER}' ل {T}",
		emote_version_renamed: "تمت إعادة تسمية الإصدار '{VER}' لـ {T} من {1} إلى {2}",
		emote_version_approved: "تمت الموافقة على الإصدار '{VER}' لـ {T} للإدراج العام",
		emote_version_restored: "تم استعادة الإصدار '{VER}' لـ {T}",
		emote_version_deleted: "تم حذف الإصدار '{VER}' لـ {T}",
		user_created: "تم إنشاء {T}",
		user_deleted: "تم حذف {T}",
		user_editor_added: "تم إضافة {U} كمحرر",
		user_editor_added_other: "تم إضافة {U1} كمعدل لـ {U2}",
		user_editor_removed: "تم الغاء امتيازات محرر {U}",
		user_editor_removed_other: "تم إلغاء امتيازات محرر {U1} ل {U2}",
		user_banned: "تم حظر {T}",
		user_unbanned: "تم إلغاء حظر {T}",
		user_updated: "تم تغيير الخصائص لـ {T}",
		user_sign_in: "قام {T} بتسجيل الدخول",
		user_sign_out: "قام {T} بتسجيل الخروج",
		user_forbidden: "{T} تم منعه من الوصول إلى {0}",
		emote_set_created: "تم إنشاء {T}",
		emote_set_emote_added: "أضاف الإيموت {AE} إلى {T}",
		emote_set_emote_removed: "أزال الإيموت {AE} من {T}",
		emote_set_emote_renamed: "أعيدت تسمية الإيموت {AE} من {O} إلى {N} في {T}",
		emote_set_updated: "تم تغيير الخصائص لـ {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "إضافة إيموت",
		author: "أُضيفت بواسطة",
		created_at: "صنعت",
		versions: "الإصدارات",
		preview_loading: "تحميل العينات... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "فشل تحميل العينات",
		processing: "معالجة الإيموت - قد يستغرق بعض الوقت.",
		use: "استخدام الإيموت",
		switch_version: "التبديل إلى هذا الإصدار",
		in_n_sets: "في {0} مجموعة | في {0} مجموعات",
		disable: "تعطيل الإيموت",
		update: "تحديث",
		report: "تبليغ عن الإيموت",
		makePrivate: "اجعله خاص",
		makeGlobal: "اجعله عام",
		comments: "التعليقات",
		channels: "القنوات",
		common_names: "أسماء أخرى للأيموت",
		usage_stats: "إحصائيات الأيموت",
		list: {
			searching: "جاري البحث",
			emote_count: "{0} إيموتات",
			no_emotes_listed: "لم يتم العثور على شيء",
			fetching_slowly: "عذراً، يبدو أن هذا يستغرق بعض الوقت",
		},
		upload: {
			emote_name: "اسم الإيموت",
			version_name: "اسم الإصدار",
			version_description: "وصف الإصدار",
			submit_emote: "إرسال الإيموت",
			create_emote_version: "إنشاء إيموت جديد",
			image_upload: "إرفاق الصورة",
			accepted_formats: "التنسيقات المقبولة",
			filetype: "ملف",
			animation: "صورة متحركة",
			transparency: "الشفافية",
			emote_details: "تفاصيل الإيموت",
			version_details: "تفاصيل الاصدار",
			attribution: "خصائص",
			original_creator: "المنشئ الأصلي",
			as_child: "أنت تقوم بإنشاء نسخة {IS_DIVERGED} من {0}. ",
			content_moderation: "إدارة المحتوى",
			half_transparency_tooltip:
				"لا يمكن أن تكون البكسل إلا شفافة تماماً أو غامضة تماماً (لا توجد شفافية متغيرة)",
		},
	},
	emote_set: {
		create: "جديد @:common.object.emote_set",
		select: "اختر @:common.object.emote_set",
		explain: {
			section: "ما هو @:common.object.emote_set{'s'}؟",
			hint: "مجموعات الايموت هي مجموعة من الايموتات التي يمكن ربطها بقناتك أو مشاركتها مع مستخدمين آخرين.",
		},
		no_space: "خانات ممتلئة",
		none_selected: "لم يتم تحديد مجموعة",
		editing: "تعديل {0}",
		owner: "مجموعة إيموتات {USER}",
		owned: "مجموعة الإيموتات الخاصة بك",
		label_renamed: "إعادة التسمية",
		label_conflict: "تعارض",
		label_default: "افتراضي",
		modal: {
			selected_channel_count: "لم يتم تحديد أي قناة | القناواة المختارة {0} | القناواة المختارة {0}",
			create_button: "إنشاء @:common.object.emote_set",
			rename_in_set: "إعادة التسمية الى {0}",
			context_rename: "تخصيص اسم الإيموت",
			context_set_default: "تعيين كإفتراضية",
			context_unset_default: "إلغاء التعيين كافتراضية",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "مجموعة الإيموتات",
		channel_emotes: "إيموتات القناة",
		joined_at: "Joined {0}",
		editors: "المعدلين",
		roles: "الأدوار",
		no_channel_emotes: "{0} ليس لديه أي ايموتات على قناته {1}",
		no_channels: "{0} ليس لديه أي قنوات متصلة!",
		card: {
			view_full_profile: "عرض كامل الملف",
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
		report: "قم بالإبلاغ",
		emote_reason: {
			i_made_this: "صنعتُ هذا الايموت ولكن تم تحميلها بواسطة شخص آخر",
			duplicate: "هذا الايموت مكرر",
			pornographic: "تحتوي هذا الايموت على صور إباحية أو إفراط في الجنس",
			violence_gore: "هذا الايموت يظهر العنف الشديد أو الغضب",
			i_appear_there: "هذا الايموت يصفني وأنا لا أحب ذلك",
			offensive: "أجد هذا الايموت جارح",
			other: "شئ آخر",
		},
		uncategorized_prompt: "ما المشكلة؟",
		details: "التفاصيل (معلومات إضافية / أو أدلة على بلاغك)",
		success: "تم إرسال البلاغ بنجاح",
		notify: "سيتم تنبيهك عن طريق صندوق الرسائل بعد التعامل مع بلاغك أو طلب المزيد من المعلومات.",
		complete_step_one: "استمر",
		abuse_notice: "إساءة استخدام مِيزة التقرير قد تؤدي إلى إلغاء هذه المِيزة من عندك.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "صندوق الرسائل",
		tabs: {
			all: "كل الرسائل",
			unread: "غير مقروءة",
			important: "هام!",
		},
		unread_tag: "غير مقروء",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "تم الموافقة على إدراج الايموت",
				content: `
# الايموت الخاص بك "{EMOTE_NAME}" تمت الموافقة على إدراجه \n
سيكون الآن متاحا على دليل الايموتات والبدء في الظهور على @:common. ppHhost{'.'}
`,
			},
			emote_not_listed: {
				subject: "لم يتم الموافقة على إدراج الايموت",
				content: `
# الايموت الخاصة بك "{EMOTE_NAME}" تم رفضه
لن تكون متاحة عبر دليل الايموتات العام أو مرئية على @:common. ppHost،
ولكن ستظل متاحة للمستخدمين عبر الرابط.
`,
			},
			emote_ownership_claim_request: {
				subject: "دعوة للمطالبة بحقوق الايموت",
				content: `
## {OWNER_DISPLAY_NAME} يريد منك ان تصبح مالك '{EMOTE_NAME}'

[عرض الايموت]({EMOTE_URL})

**[قبول الطلب]({EMOTE_CLAIM_URL})** | [رفض الطلب]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "لقد تم حظرك ",
				reason: {
					pornographic_content: "",
				},
				content: `
# الحساب محظور
صلاحياتك الى @:common.appName الان محدودة.<br/><br/>
### سبب هذا الاجراء
{BAN_REASON} <br/><br/>
### القيود المطبقة<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>هذا الاجراء ينتهي **{BAN_EXPIRE_AT}**.
_اذا كنت تعتقد ان هذا الاجراء خاطئ, فضلا تواصل معنا عبر هذا الايميل @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* لا يمكنك التفاعل مع التطبيق",
					no_auth: "* لا يمكنك تسجيل الدخول بعد الآن",
					no_ownership: "* لن يكون أي محتوى قمت بإنشائه متاحا بعد الآن",
					memory_hole: "* لن تكون مرئيًا للمستخدمين الآخرين",
					ip_blocked: "* عنوان IP الخاص بك محظور من الوصول إلى جميع خدمات @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "لم نعثر على شيء، مَهْلاً... ما الذي افعله هنا؟",
		doctor_wtf: "ما هذا بحق الجحيم؟",
		pot_friend: "أنا وعاء، يا صديقي",
	},
};
