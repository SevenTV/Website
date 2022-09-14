export default {
	locale: "اللغة العربية",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "معرفة المزيد",
		more: "المزيد",
		retry: "اعادة المحاولة",
		back: "العودة",
		download: "التنزيل | التنزيلات",
		features: "المميزات",
		comments: "التعليقات",
		search: "البحث",
		update: "تحديث",
		report: "إبلاغ",
		delete: "حذف",
		cancel: "إلغاء",
		submit: "تقديم",
		activity: "النشاط",
		loading: "جاري التحميل",
		save_changes: "حفظ التغييرات",
		reset: "إعادة تعيين",
		object: {
			user: "المستخدم",
			emote_set: "مجموعة الاموجي",
			emote: "الاموجي",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "مصنة الاموجي للجميع",
		app_description: "بسهولة YouTube او قنوات Twitch ادارة مئات الاموجيات لـ",
		why_app: "{'?'} @:common.appName لماذا",
		download_browser: "إضافة المصتفح",
		download_mobile: "تطبيقات الجوال",
		download_misc: "تطبيقات أخرى",
		features: {
			emote_sets: {
				name: "مجموعات الاموجيات",
				detail: ".مجموعة اموجيات مخصصة يمكنك مشاركتها مع المستخدمين او تبديلها لقناتك",
			},
			many_emote_slots: {
				name: "مئات الخانات للاموجي",
				detail: ".إبدأ بـ {0} خانة الى {1} بحد أقصى وبدون دفع إجباري",
			},
			channel_emote_names: {
				name: "اسماء للايموجي بحسب القناة",
				detail: ".لا يعجبك الإسم من قبل المالك؟ لا مشكلة، بإمكانك تغيره لقناتك فقط",
			},
			real_time: {
				name: "أول-بأول",
				detail: "F5 تغيير الاموجيات في قناتك تحدث بشكل فوري، لجميع المشاهدين. بدون الحاجة لـ",
			},
			emote_versions: {
				name: "اصدارات الاموجي",
				detail: ".بدل بين مظاهر أخرى او حدث الاموجي لنسخة محسنة",
			},
			userbase: {
				name: "مجمتع أضخم",
				detail: "@:common.appName serves {0}+ daily unique users and has a library of over {1} public emotes",
			},
			next_gen: {
				name: "AVIF و WEBP الجيل-القادم لصيغات الصورة مثل",
				detail: ".نسخدم أحدث، وأكثر الصيغ المحسنة لتقليل استهلاك البيانات",
			},
			source_available: {
				name: "المصدر-متاح",
				detail: ".أي أحد يمكنه الإطلاع والمساهمة .source-available مع رخصة GitHub برمجتنا كاملة متاحة بشكل عام على",
			},
		},
		socials: {
			discord: "@:common.appName الخاص بـ Discord الدخول الى",
			discord_online_count: "متصل الان {0}",
			twitter: "تابعنا على تويتر",
			github: "المساهمة",
		},
		legal: {
			terms: "شروط الخدمة",
			privacy: "سياسة الخصوصية",
			unaffiliated: "Twitch Interactive لا ينتمي الى @:common.appName",
		},
	},
	// Nav Bar
	nav: {
		home: "الرئيسية",
		about: "حول",
		emotes: "الاموجيات",
		store: "الإشتراك",
		admin: "المشرف",
		sign_in: "تسجيل الدخول",
		user_search: "البحث عن الملفات الشخصية",
		wip_notice: {
			heading: "الجديد @:common.appName أهلا بك في موقع",
			text1: "بطريقة جديدة @:common.appName{'.'} هذه نظرة مبدئية لتجربة",
			text2: ".إكتشف الجديد واخبرنا برأيك! ملاحظة ستكون هناك تغييرات كثيرة ومن المحتمل ان تواجه بعض الأعطال",
		},
	},
	activity: {
		emote_created: "{T} تم انشاء",
		emote_renamed: "{N} الى {O} من {T} تم إعادة تسمية",
		emote_listing_approved: "بالقائمة العامة {T} تم الموافقة لعرض",
		emote_listing_revoked: "من العرض بالقائمة العامة {T} تم إزالة",
		emote_merged: "{0} مع {T} تم دمج",
		emote_ownership_transferred: "{U} الى {T} تم نقل ملكية",
		emote_restored: "{T} تم استعادة",
		emote_updated: "{T} تم تغيير خصائص",
		emote_deleted: "{T} تم حذف",
		emote_tags_updated: "{N} :{T} تم تعيين العلامات لـ",
		emote_processed: "{T} تم تنفيذ عملية معالجة جديدة لـ",
		emote_version_created: "{T} لـ '{VER}' تم إنشاء النسخة",
		emote_version_renamed: "{2} من {1} الى {T} لـ '{VER}' تم إعادة تسمية النسخة",
		emote_version_approved: "في القائمة العامة {T} لـ '{VER}' تم قبول النسخة",
		emote_version_restored: "{T} لـ '{VER}' تم إستعادة النسخة",
		emote_version_deleted: "{T} لـ '{VER}' تم حذف النسخة",
		emote_flag_added: "{T} الى {FLAG} تم إضافة علم",
		emote_flag_removed: "{T} من {FLAG} تم إزالة علم",
		user_created: "{T} تم انشاء",
		user_deleted: "{T} تم حذف",
		user_editor_added: "كمحرر {U} تم إضافة",
		user_editor_added_other: "{U2} كمحرر لـ {U1} تم إضافة",
		user_editor_updated: "{U} تم تحديث صلاحيات المحرر لـ",
		user_editor_updated_other: "{U2} كمحرر لـ ،{U1} تم تحديث صلاحيات المحرر",
		user_editor_removed: "{U} تم سحب صلاحيات المحرر من",
		user_editor_removed_other: "{U2} الى {U1} تم سحب صلاحيات المحرر من ",
		user_banned: "{T} تم حظر",
		user_unbanned: "{T} تم فك حظر",
		user_updated: "{T} تم تغيير خصائص",
		user_sign_in: "سجل دخوله {T}",
		user_sign_out: "سجل خروجه {T}",
		user_forbidden: "{0} الى {T} تم رفض وصول",
		emote_set_created: "{T} تم انشاء",
		emote_set_emote_added: "{T} الى {AE} تم إضافة الاموجي",
		emote_set_emote_removed: "{T} من {AE} تم إزالة الاموجي",
		emote_set_emote_renamed: "{T} في {N} الى {O} من {AE} تم إعادة تسمية الاموجي",
		emote_set_updated: "{T} تم تغيير خصائص",
	},
	// Text that is relevant to emotes
	emote: {
		add: "إضافة اموجي",
		author: "تم الاضافة بواسطة",
		created_at: "تم انشائه",
		versions: "الاصدارات",
		preview_loading: "{'('}{0}{'/'}{1}{')'} ...جاري تحميل المعاينات",
		preview_failed: "فشل في تحميل المعاينات",
		processing: ".جاري معالجة الاموجي - قد يستغرق بعض الوقت",
		processing_failed: "{0} :فشل معالجة",
		use: "إستخدام الاموجي",
		use_menu: "...إضافة هذا الاموجي الى",
		switch_version: "التبديل الى هذا الإصدار",
		in_n_sets: "في {0} مجموعة | في {0} مجموعات",
		disable: "تعطيل الاموجي",
		properties: "الخصائص",
		new_version: "النسخة الجديدة",
		report: "إبلاغ عن الاموجي",
		Privacy: "الخصوصية",
		comments: "التعليقات",
		channels: "القنوات",
		common_names: "أسماء اخرى لهذا الاموجي",
		usage_stats: "إحصائيات الاموجي",
		no_longer_available: "هذا الاموجي لم يعد موجود",
		tags: "العلامات",
		add_tag: "إضافة علامة",
		trending_rank: "#{0} محتوى رائج",
		avif_no_support:
			".الرجاء التحديث الى أحدث إصدار او تجربة متصفح أخر AVIF عذرا، لا يدعم صيغة",
		delete_prompt: {
			heading: "{0} حذف",
			heading_versions: "{1} حذف نسخة '{0}' من",
			notice: "{0}{'?'} هل أنت متأكد من حذف الاموجي",
			notice_versions: "{1}{'?'} هل أنت متأكد من حذف النسخة '{0}' من",
			reason: "سبب الحذف",
		},
		properties_prompt: {
			heading: "{0} تعديل",
		},
		unlisted: {
			heading: "!انتبه",
			warning: ".هذا الاموجي ليس معروض بشكل عام",
			warning_flagged: "{FLAG_LIST} :هذا الاموجي غير مدرج للأسباب التالية",
			notice: ".يمكن إضافته لقناتك، لكن لا يمكننا التأكد إذا من الآمن إظهاره في البث المباشر",
			notice_flagged: ".يمكن إضافته لقناتك، لكن نعتقد انه غير آمن لاظهاره في البث المباشر",
			show_button: "إظهار الاموجي",
			flag_sexual_content: "جنسي او إيحائات جنسية",
			flag_epilepsy: "نوبات انعكاسية / اضواء متكررة سريعة",
			flag_edgy: "كريه أو منفعل",
			flag_twitch_banned: "Twitch غير مسموح في",
		},
		list: {
			searching: "جاري البحث",
			emote_count: "{0} اموجيات",
			no_emotes_listed: "لم يتم إيجاد أي اموجيات",
			fetching_slowly: "عذراً، يبدو انه يستغرق بعض الوقت",
			category: {
				name: "فئة",
				top: "أعلى",
				trending: "رائج",
				featured: "مُبرز",
				global: "عالمي",
				new: "جديد",
			},
			filters: {
				case_sensitive: "حساسية الحروف",
				exact_match: "تطابق بالتمام",
				ignore_tags: "تجاهل العلامات",
			},
		},
		upload: {
			emote_name: "إسم الاموجي",
			version_name: "إسم النسخة",
			version_description: "وصف النسخة",
			submit_emote: "تقديم اموجي",
			create_emote_version: "إنشاء نسخة اموجي",
			image_upload: "رفع صورة",
			accepted_formats: "الصيغ المقبولة",
			filetype: "ملف",
			animation: "التحريك",
			transparency: "الشفافية",
			emote_details: "تفاصيل الاموجي",
			version_details: "تفاصيل النسخة",
			attribution: "منسوب",
			original_creator: "المنشئ الأصلي",
			as_child: ".{0} من نسخة {IS_DIVERGED} أنت تنشئ ",
			content_moderation: "ادارة المحتوى",
			half_transparency_tooltip:
				"البكسلات يمكن أن تكون شفافة بشكل كامل أو مبهمة (لا متغيير شفاف)",
		},
	},
	emote_set: {
		create: "جديد @:common.object.emote_set",
		select: "@:common.object.emote_set إختيار",
		explain: {
			section: "ما هي مجموعة الاموجيات؟",
			hint: ".مجموعة الاموجي عبارة عن مجموعة اموجيات مقيدة بقناتك او متشاركة مع مستخدمين اخرين",
		},
		no_space: "الخانات ممتلئة",
		none_selected: "لم يتم إختيار مجموعة",
		editing: "{0} جاري تعديل",
		owner: "{USER} مجموعة الاموجيات لـ",
		owned: "مجموعة الاموجيات المملوكة",
		label_renamed: "إعادة تسمية",
		label_conflict: "تضارب",
		label_default: "إفتراضي",
		label_actor: "{0} تم تفعيل بواسطة",
		// "enabled by <display_name of actor>"
		context_emote_add: "{SET_NAME} إضافة الى",
		context_emote_remove: "{SET_NAME} تمت الازالة من",
		modal: {
			selected_channel_count: "{0} لم يتم إختيار قناة | تم إختيار قناة {0} | القنوات المختارة",
			create_button: "@:common.object.emote_set إنشاء",
			rename_in_set: "{0} إعادة التسمية في",
			context_rename: "خصص إسم الاموجي",
			context_set_default: "تعيين كإفتراضي",
			context_unset_default: "عدم تعيين كإفتراضي",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "مجموعة الاموجيات",
		channel_emotes: "اموجيات القناة",
		joined_at: "{0} إنضم",
		editors: "المحريين",
		roles: "الأدوار",
		connections: "القنوات | القنوات و الحسابات",
		new_connections: "...ربط حسابات",
		add_editor: "إضافة محرر",
		editor_modal_heading: "تعديل {0} المحريين",
		editor_modal_user_search: "من تريد إضافة كـ محرر؟",
		editor_modal_user_update: "محرر",
		no_channel_emotes: "لا يملك {0} أي اموجي في قناته {1}",
		no_channels: "لا يملك أي قنوات متصلة {0}",
		card: {
			view_full_profile: "مشاهدة الملف الشخصي بالكامل",
		},
		settings: {
			button: "تعديل الملف الشخصي",
			section_profile: "الملف الشخصي",
			username: "اسم المستخدم",
			display_name: "اسم العرض",
			profile_picture: "صورة الملف الشخصي",
			section_badges: "الشارات",
			section_paints: "الصبغات",
			no_badges: "لا تملك أي شارات",
			no_paints: "لا تملك أي صبغات",
			sign_out: "تسجيل خروج",
			cosmetics_updated: "تحديث المظاهر",
			cosmetics_updated_message: ".قد يستغرق 10 الى 30 دقيقة لظهور التغييرات في الشات",
		},
		editor_permissions: {
			modify_emotes: "تعديل اموجيات القناة",
			use_private_emotes: "استخدام اموجيات خاصة",
			manage_profile: "إدارة الملف الشخصي",
			manage_owned_emotes: "إدارة الاموجيات المملوكة",
			manage_emote_sets: "إدارة مجموعة الاموجيات",
			manage_billing: "إدارة الفواتير",
			manage_editors: "إدارة المحريين",
			view_messages: "مشاهدة الرسائل",
		},
	},
	store: {
		subscribe_cta: "! @:common.appName أصبح مشترك",
		subscribed: "شكرا لإشتراكك",
		button_self: "إشترك",
		button_gift: "إهداء إشتراك",
		billing_information_heading: "معلومات الفواتير",
		payment_information_heading: "معلومات الدفع",
		payment_gift_heading: "إختيار مستلم لهذه الهدية",
		payment_methods: "طرق الدفع",
		payment_methods_hint: "إختر طريقة دفع",
		payment_method_paypal: "PayPal",
		payment_method_stripe: "بطاقة الائتمان",
		payment_popup_cta: "إكمال العملية في نافذة جديدة",
		pay_button: "{0} دفع عبر",
		product_type_subscription: "إشتراك",
		purchase_success: {
			heading: "تم الشراء بنجاح",
			text1: ".لقد إستلمنا القيمة المدفوعة وتم تفعيل اشتراكك",
			text2: ".شكرا لدعمك! إذا هناك أي أسئلة، الرجاء التواصل معنا عبر الطرق المزودة في هذه الصفحة",
		},
		sub: {
			incentive: "...ستحصل على",
			creator_tier: "إضافات للصناع",
			creator_tier_desc: "وأحصل على مزايا اضافية لقناتك Creator طور الى طبقة",
			feature_t1_badge: "شارة الإشتراك",
			feature_t1_paints: "صبغات للإسم",
			feature_t1_animated_profile_picture: "صورة عرض متحركة للملف الشخصي",
			feature_t1_zero_width: "اموجيات عرضها صفر",
			feature_t1_global_raffle: "سحب تذاكر الاموجي العالمي",
			feature_t1_personal_emotes: "اموجيات شخصية",
			feature_t2_animated_profile_banner: "صورة لافتة متحركة",
			feature_t2_animated_offline_screen: "صورة غير متصل متحركة",
			feature_t2_extended_sub_emotes: "اموتات اشتراك ممد",
			current_plan: "خطتك",
			cancel: "عدم تجديد",
			update_payment: "حدث طريقة الدفع",
			reactivate: "إعادة تفعيل الاشتراك",
			cancel_prompt: "هل أنت متأكد من إلغاء الإشتراك",
			state_heading: "اشتراكك",
			state_badge_progress: "تقدم الشارة",
			state_paints: "الصبغات",
			state_anniversary:
				"ذكرى إشتراكك اليوم | ذكرى إشتراكك القادمة خلال {0} يوم | ذكرى إشتراكك القادمة خلال {0} أيام",
			state_age:
				"اشتركت اليوم | مشترك منذ {0} يوم | مشترك منذ {0} أيام",
			state_ending: "ينتهي إشتراكك اليوم | ينتهي إشتراكك خلال {0} يوم | ينتهي إشتراكك خلال {0} أيام",
			state_collection_heading: "المجموعة",
			state_paints_heading: "الصبغات المفتوحة ({0})",
			state_raffle: "سحب الاموجي العالمي",
			state_leaderboards: "أعلى المُهدين",
			raffle: {
				starts_at: "{0} أيام",
				starts_at_hint: "يبدأ السحب القادم في {0}",
			},
		},
	},
	// Text that is relating to the reporting system
	reporting: {
		report: "إبلاغ",
		emote_reason: {
			i_made_this: "صنعت هذا الاموجي لكن تم رفعه بواسطة شخص أخر",
			duplicate: "الاموجي مكرر",
			pornographic: "هذا الاموجي يحتوي على صور جنسية بشكل مفرط",
			violence_gore: "هذا الاموجي يعرض عنف شديد",
			i_appear_there: "هذا الاموجي يصورني ولا يعجبني ذلك",
			offensive: "أجد هذا الاموجي مسيء",
			other: "هناك شيء أخر",
		},
		uncategorized_prompt: "لماذا يهم؟",
		details: "التفاصيل (معلومات إضافية و/أو دليل لبلاغك)",
		success: "تم إرسال البلاغ بنجاح",
		notify: "سيتم إشعارك بصندوق الوارد عند مراجعة البلاغ او عند طلب معلومات إضافية",
		complete_step_one: "متابعة",
		abuse_notice: "إساءة استخدام ميزة الإبلاغ قد يعرضك لسحب وصولك لهذه الخاصية",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "الوارد",
		tabs: {
			all: "جميع الرسائل",
			unread: "غير مقروء",
			important: "هام",
		},
		unread_tag: "غير مقروء",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "تم قبول الاموجي للعرض",
				content: `
\n الخاص بك تم قبوله للعرض "{EMOTE_NAME}" الاموجي #
@:common.appHost{'.'} سيكون متاح في قاموس الاموجي ويبدأ بالظهور في
`,
			},
			emote_not_listed: {
				subject: "لم يتم قبول الاموجي للعرض",
				content: `
# ولكن سيبقى متاح للمستخدمين بإستخدام الرابط @:common.appHost الخاص بك تم رفضه ولن يكون متاح عبر قاموس الاموجي العام او ظاهراً على "{EMOTE_NAME}" الاموجي#
`,
			},
			emote_ownership_claim_request: {
				subject: "دعوة للحصول على ملكية اموجي",
				content: `
## '{EMOTE_NAME}' يريد من جعلك مالكاً لـ {OWNER_DISPLAY_NAME}

[رؤية الاموجي]({EMOTE_URL})

**[قبول الطلب]({EMOTE_CLAIM_URL})** | [رفض الطلب]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "تم حظرك",
				reason: {
					pornographic_content: "",
				},
				content: `
# الحساب محظور
الان محدود @:common.appName وصولك الى<br/><br/>
### سبب هذا الإجراء
{BAN_REASON} <br/><br/>
### القيود المطبقة<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>.**{BAN_EXPIRE_AT}** ينتهي هذا القرار في
_@:common.supportEmail{'.'} إذا تعتقد هذا أن هذا خطأ، الرجاء التواصل عبر الايميل_
`,
				effect: {
					no_permissions: "* لا تستطيع التفاعل مع التطبيق",
					no_auth: "لا تستطيع تسجيل الدخول *",
					no_ownership: "لن يتوفر اي محتوى تم انشائه *",
					memory_hole: "لن تكون ظاهر للمستخدمين الأخرين *",
					ip_blocked: "@:common.appName عنوان أي بي الخاص بك محظور من الوصول الى خدمات *",
				},
			},
			report_closed: {
				subject: "تم إغلاق البلاغ",
				content: `
				{'#'}{CASE_ID} شكرا لإبلاغنا. تم التعامل مع البلاغ الخاص بك
				`,
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "لم نستطيع العثور",
		doctor_wtf: "ما هذا؟",
		pot_friend: "انا قِدر، يا صاحبي",
	},
};
