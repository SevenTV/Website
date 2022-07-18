export default {
	locale: "עברית (ישראל)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "למד עוד",
		more: "עוד",
		retry: "נסה שוב",
		downloads: "הורדות",
		features: "תכונות",
		comments: "תגובות",
		search: "חיפוש",
		update: "עדכן",
		report: "דווח",
		activity: "פעילות",
		loading: "טוען",
		object: {
			user: "משתמש",
			emote_set: "סט של אימוטים",
			emote: "אימוט",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "פלטפורמת האימוטים בשביל כולם",
		app_description: "נהל מאות מהאימוטים בשביל ערוץ הטוויצ' או היוטיוב שלך בקלות",
		why_app: "למה @:common.appName{'?'}",
		download_browser: "הוסף לדפדפן",
		download_mobile: "אפליקציות לניידים",
		download_misc: "יישומים אחרים",
		features: {
			emote_sets: {
				name: "סטים של אימוטים",
				detail: "אסוף אימוטים לסטים שאפשר לערוך ולשתף עם משתמשים אחרים או להחליף אותם בקלות בערוץ שלך.",
			},
			many_emote_slots: {
				name: "מאות סטים של אימוטים",
				detail: "התחל עם {0} סלוטים, עם אפשרות למקסימום של {1} ללא תשלום.",
			},
			channel_emote_names: {
				name: "שמות שונים לאימוטים לפי ערוץ",
				detail: "לא אוהב את השם שניתן לאימוט? זה בסדר, תוכל לשנות את השם שלו בערוץ שלך.",
			},
			real_time: {
				name: "בזמן אמת",
				detail: "שינוי אימוטים בערוץ שלך קורה מיד, לכל הצופים. אין צורך ב-F5.",
			},
			emote_versions: {
				name: "ניהול גרסאות אימוט",
				detail: "החלף בין גרסאות אלטרנטיביות או עדכן אימוט לגרסה משופרת.",
			},
			next_gen: {
				name: "פורמטים של הדור הבא, כמו WEBP או AVIF",
				detail: "אנו משתמשים בפורמטי תמונות אופטימליים יותר כדי להוריד את צריכת רוחב הפס.",
			},
			source_available: {
				name: "מקור זמין",
				detail: "כל קוד הבסיס שלנו זמין ב-GitHub עם רישיון מקור זמין. כל מי שרוצה יכול לצפות ולעזור.",
			},
		},
		socials: {
			discord: "הצטרף ל- @:common.appName ב-Discord",
			discord_online_count: "{0} אונליין",
			twitter: "עקבו אחרינו ב-Twitter",
			github: "עזור לנו",
		},
	},
	// Nav Bar
	nav: {
		home: "בית",
		about: "אודות",
		emotes: "אימוטים",
		store: "הירשם כמנוי",
		admin: "מנהל",
		sign_in: "התחבר",
		wip_notice: {
			heading: "ברוכים הבאים לאתר @:common.appName החדש",
			text1: "זו הצגה מוקדמת של הדרך החדשה לחוות את @:common.appName{'.'}",
			text2: "בדקו מה חדש ותנו לנו פידבק! קחו בחשבון שהאתר עובר שינויים מהירים ועלול להישבר לעיתים תכופות.",
		},
	},
	activity: {
		emote_created: "יצר את {T}",
		emote_renamed: "{ICO} שינה את שם {T} מ- {O} ל- {N}",
		emote_listing_approved: "{T} אושר לרשימה פומבית",
		emote_listing_revoked: "{T} הוסר מהרשימה הפומבית",
		emote_merged: "מיזג {T} לתוך {0}",
		emote_ownership_transferred: "העביר בעלות של {T} ל- {U}",
		emote_restored: "שיחזר את {T}",
		emote_updated: "שינה את המאפיינים של {T}",
		emote_deleted: "מחק את {T}",
		emote_version_created: "יצר גרסה '{VER}' ל- {T}",
		emote_version_renamed: "שינה את שם הגרסה '{VER}' ל- {T}, מ- {1} ל- {2}",
		emote_version_approved: "אישר פרסום גרסה '{VER}' ל- {T}",
		emote_version_restored: "שיחזר גרסה '{VER}' ל- {T}",
		emote_version_deleted: "מחק גרסה '{VER}' ל- {T}",
		user_created: "יצר את {T}",
		user_deleted: "מחק את {T}",
		user_editor_added: "הוסיף את {T} כעורך",
		user_editor_added_other: "הוסיף את {U1} כעורך של {U2}",
		user_editor_removed: "הסיר את {U} כעורך",
		user_editor_removed_other: "הסיר את {U1} כעורך של {U2}",
		user_banned: "אסר את {T}",
		user_unbanned: "ביטל איסור {T}",
		user_updated: "שינה את המאפיינים של {T}",
		user_sign_in: "{T} התחבר",
		user_sign_out: "{T} התנתק",
		user_forbidden: "ל- {T} נמנעה הגישה ל- {0}",
		emote_set_created: "יצר את {T}",
		emote_set_emote_added: "הוסיף את האימוט {AE} ל- {T}",
		emote_set_emote_removed: "הסיר את האימוט {AE} מ- {T}",
		emote_set_emote_renamed: "שינה את שם האימוט {AE} מ- {O} ל- {N} בתוך {T}",
		emote_set_updated: "שינה את המאפיינים של {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "הוסף אימוט",
		author: "נוסף על ידי",
		created_at: "נוצר ב-",
		versions: "גרסאות",
		preview_loading: "טוען תצוגות מקדימות... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "נכשל בטעינת תצוגות מקדימות",
		processing: "מעבד אימוט - זה יכול לקחת קצת זמן.",
		use: "השתמש באימוט",
		switch_version: "החלף לגרסה זו",
		in_n_sets: "ב-{0} סטים | ב-{0} סטים",
		disable: "בטל שימוש באימוט",
		update: "עדכן",
		report: "דווח על אימוט",
		makePrivate: "הפוך לפרטי",
		makeGlobal: "הפוך לגלובלי",
		comments: "תגובות",
		channels: "ערוצים",
		common_names: "שמות אחרים לאימוט הזה",
		usage_stats: "סטטיסטיקה של אימוט זה",
		list: {
			searching: "מחפש",
			emote_count: "{0} אימוטים",
			no_emotes_listed: "אימוטים לא נמצאו",
			fetching_slowly: "מצטערים, נראה שזה לוקח זמן",
		},
		upload: {
			emote_name: "שם האימוט",
			version_name: "שם הגרסה",
			version_description: "תיאור הגרסה",
			submit_emote: "שלח אימוט",
			create_emote_version: "צור גרסה של האימוט",
			image_upload: "העלאת תמונה",
			accepted_formats: "פורמטים נתמכים",
			filetype: "קובץ",
			animation: "אנימציה",
			transparency: "שקיפות",
			emote_details: "פרטי האימוט",
			version_details: "פרטי גרסה",
			attribution: "מאפיינים",
			original_creator: "יוצר מקורי",
			as_child: "אתה יוצר גרסת {IS_DIVERGED} של {0}. ",
			content_moderation: "ניהול תוכן",
			half_transparency_tooltip: "פיקסלים יכולים להיות שקופים לגמרי או אטומים לגמרי (אין משתנה של שקיפות)",
		},
	},
	emote_set: {
		create: "@:common.object.emote_set חדש",
		select: "בחר @:common.object.emote_set",
		explain: {
			section: "מהם @:common.object.emote_set{'s'}?",
			hint: "סטים של אימוטים הם אוסף של אימוטים שיכולים להיקשר לערוץ שלך, או לשיתוף עם משתמשים אחרים.",
		},
		no_space: "כל הסלוטים תפוסים",
		none_selected: "לא נבחר סט",
		editing: "עורך {0}",
		owner: "סטים של אימוטים השייכים ל-{USER}",
		owned: "סטים של אימוטים השייכים לך",
		label_renamed: "ניתן שם חדש",
		label_conflict: "קונפליקט",
		label_default: "ברירת מחדל",
		modal: {
			selected_channel_count: "לא נבחר ערוץ | ערוץ נבחר {0} | ערוצים נבחרו {0}",
			create_button: "צור @:common.object.emote_set",
			rename_in_set: "שנה שם ב- {0}",
			context_rename: "התאם אישית את שם האימוט",
			context_set_default: "הגדר כברירת מחדל",
			context_unset_default: "בטל הגדרת ברירת מחדל",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "סטים של אימוטים",
		channel_emotes: "אימוטים של הערוץ",
		editors: "עורכים",
		roles: "קבוצת משתמשים",
		no_channel_emotes: "ל- {0} אין אף אימוטים בערוץ {1} שלהם",
		no_channels: "ל-{0} אין שום ערוצים מחוברים!",
		card: {
			view_full_profile: "לפרופיל המלא",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "דווח",
		emote_reason: {
			i_made_this: "אני יצרתי את האימוט הזה אבל הוא הועלה על ידי מישהו אחר",
			duplicate: "האימוט הזה הוא שיכפול של אימוט אחר",
			pornographic: "האימוט הזה מכיל תוכן פורנוגרפי או מיני מידי",
			violence_gore: "האימוט הזה מציג תוכן אלים או דם",
			i_appear_there: "האימוט הזה מציג אותי ואני לא אוהב את זה",
			offensive: "האימוט הזה פוגעני בעיניי",
			other: "אחר",
		},
		uncategorized_prompt: "מה הבעיה?",
		details: "פרטים (מידע נוסף ו\\או הוכחות לדיווח שלך)",
		success: "הדיווח נשלח בהצלחה",
		notify: "תקבל עדכון לתיבת ההודעות שלך כאשר הדיווח שלך יהיה בטיפול, או שיידרשו פרטים נוספים.",
		complete_step_one: "המשך",
		abuse_notice: "שימוש לרעה באפשרות הדיווח יכול להוביל לביטול הרשאתך לדווח בהמשך.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "תיבת דואר",
		tabs: {
			all: "כל ההודעות",
			unread: "לא נקראו",
			important: "חשוב",
		},
		unread_tag: "לא נקראו",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "אימוט אושר להצגה",
				content: `
# האימוט שלך "{EMOTE_NAME}" אושר להצגה \n
הוא יהיה מאושר להצגה בספריית האימוטים ויתחיל להופיע ב- @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "אימוט לא אושר להצגה",
				content: `
# האימוט שלך "{EMOTE_NAME}" נדחה
הוא לא יוצג בספריית האימוטים הפומבית או יופיע ב- @:common.appHost,
אבל ימשיך להיות זמין למשתמשים עם הקישור.
`,
			},
			emote_ownership_claim_request: {
				subject: "הזמנה לתביעת בעלות על האימוט",
				content: `
## {OWNER_DISPLAY_NAME} רוצה שתהיה הבעלים של '{EMOTE_NAME}'
[צפה באימוט]({EMOTE_URL})

**[אשר בקשה]({EMOTE_CLAIM_URL})** | [דחה בקשה]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "חשבונך נחסם",
				reason: {
					pornographic_content: "",
				},
				content: `
# חשבון נחסם
גישתך ל @:common.appName צומצמה.<br/><br/>
### סיבה לחסימה
{BAN_REASON} <br/><br/>
### הגבלות בתוקף<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>הגבלה זו תפוג ב- **{BAN_EXPIRE_AT}**.
_אם אתה מאמין שזו טעות, שלח אימייל ל-l @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* אתה לא יכול להשתמש יותר באפליקציה",
					no_auth: "* אתה לא יכול להתחבר יותר",
					no_ownership: "* כל התוכן שיצרת לא יהיה זמין יותר",
					memory_hole: "* לא תהיה גלוי יותר למשתמשים אחרים",
					ip_blocked: "* האייפי שלך חסום מגישה לכל @:common.appName השירותים",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "לא הצלחנו למצוא את זה",
		doctor_wtf: "מה זה לעזאזל?",
		pot_friend: "אני סיר, חבר",
	},
};
