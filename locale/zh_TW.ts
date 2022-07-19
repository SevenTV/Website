export default {
	locale: "繁體中文 (台灣/香港)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "了解更多",
		more: "更多",
		retry: "重試",
		downloads: "下載連結",
		features: "特點",
		comments: "留言",
		search: "搜索",
		update: "更新",
		report: "檢舉",
		activity: "活動",
		loading: "載入中",
		object: {
			user: "帳戶",
			emote_set: "貼圖包",
			emote: "貼圖",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "為大家打造的貼圖平台",
		app_description: "簡單方便地管理Twitch和YouTube的貼圖",
		why_app: "為何使用 @:common.appName{'?'}",
		download_browser: "瀏覽器擴充功能",
		download_mobile: "手機應用程式",
		download_misc: "其他應用程式",
		features: {
			emote_sets: {
				name: "貼圖包",
				detail: "把貼圖組合成貼圖包, 以便與其他用戶分享和個人頻道中更換.",
			},
			many_emote_slots: {
				name: "破百格的貼圖欄位!",
				detail: "由{0} 個欄位開始, 不用付費也可以得到{1} 個欄位",
			},
			channel_emote_names: {
				name: "自定貼圖名稱",
				detail: "不喜歡原作者的貼圖名稱? 沒關係, 你可以於自己的的頻道更改",
			},
			real_time: {
				name: "實時更新",
				detail: "任何貼圖更新會立即出現在你的頻道, 不論是實況主或觀眾都不用按F5重整網頁",
			},
			emote_versions: {
				name: "貼圖版本控制",
				detail: "可切換至期間限定, 或更新至已改良的版本",
			},
			next_gen: {
				name: "WEBP和AVIF等新時代圖像格式",
				detail: "我們用更先進, 優化的圖像格式, 以減少頻寬使用",
			},
			source_available: {
				name: "公開源碼",
				detail: "我們的代碼庫已在GitHub上公開開放, 任何人都可以查看和貢獻",
			},
		},
		socials: {
			discord: "在 Discord 加入 @:common.appName",
			discord_online_count: "{0} 線上中",
			twitter: "在 Twitter 上關注我們",
			github: "幫手出一分力",
		},
	},
	// Nav Bar
	nav: {
		home: "首頁",
		about: "關於我們",
		emotes: "貼圖",
		store: "訂閱",
		admin: "管理員",
		sign_in: "登入",
		wip_notice: {
			heading: "歡迎使用@:common.appName全新的網頁",
			text1: "這是@:common.appName{'.'}未來體驗的預覽。",
			text2: "您可以盡情探索新功能以及給我們一些意見回饋！請注意網頁將會不斷更新更改，和可能會出現問題。",
		},
	},
	activity: {
		emote_created: "已製作 {T}",
		emote_renamed: "已將 {T} 由 {O} 重新命名至 {N}",
		emote_listing_approved: "{T} 已被認可公開列出",
		emote_listing_revoked: "{T} 已從公開列表中刪去",
		emote_merged: "已將 {T} 合併入{0}",
		emote_ownership_transferred: "已將 {T} 的所有權轉移至 {U}",
		emote_restored: "已恢復 {T}",
		emote_updated: "已改變 {T} 的性質",
		emote_deleted: "已刪除 {T}",
		emote_version_created: "已增加 {T} 的 '{VER}' 版本",
		emote_version_renamed: "已把 {T} 的 '{VER}' 版本 由 {1} 重新命名至 {2}",
		emote_version_approved: "已認可 {T} 的 '{VER}' 版本作公開列出",
		emote_version_restored: "已恢復 {T} 的 '{VER}' 版本",
		emote_version_deleted: "已刪除 {T} 的 '{VER}' 版本",
		user_created: "已新加 {T}",
		user_deleted: "已移除 {T}",
		user_editor_added: "已新增編輯者 {U}",
		user_editor_added_other: "已新增 {U1} 為 {U2} 的編輯者",
		user_editor_removed: "已除去 {U} 的編輯者權限",
		user_editor_removed_other: "已除去 {U1} 為 {U2} 編輯的權限",
		user_banned: "已封鎖 {T}",
		user_unbanned: "已解除封鎖 {T}",
		user_updated: "已改變 {T} 的性質",
		user_sign_in: "{T} 已登入",
		user_sign_out: "{T} 已登出",
		user_forbidden: "已拒絕 {T} 使用 {0} 的權限",
		emote_set_created: "已新加 {T}",
		emote_set_emote_added: "已將 {AE} 加入至 {T}",
		emote_set_emote_removed: "已將 {AE} 從 {T} 移除",
		emote_set_emote_renamed: "已將 {T} 裏的 {AE} 由 {O} 重新命名至 {N}",
		emote_set_updated: "已改變 {T} 的性質",
	},
	// Text that is relevant to emotes
	emote: {
		add: "增加貼圖",
		author: "製作者為",
		created_at: "創建時間",
		versions: "版本",
		preview_loading: "預覽載入中... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "無法載入預覽",
		processing: "貼圖處理中，可能需要一些時間.",
		use: "使用貼圖",
		switch_version: "切換到此版本",
		in_n_sets: "{0} 個使用中 | {0} 個使用中",
		disable: "禁用",
		update: "更新",
		report: "檢舉",
		makePrivate: "設為私有",
		makeGlobal: "Make Global",
		comments: "留言",
		channels: "頻道",
		common_names: "其他名稱",
		usage_stats: "貼圖數據",
		list: {
			searching: "搜尋中",
			emote_count: "{0} 個貼圖",
			no_emotes_listed: "找不到貼圖",
			fetching_slowly: "抱歉, 請稍等",
		},
		upload: {
			emote_name: "貼圖名稱",
			version_name: "版本名稱",
			version_description: "版本資訊",
			submit_emote: "上載貼圖",
			create_emote_version: "新增貼圖版本",
			image_upload: "上傳圖像",
			accepted_formats: "可用格式",
			filetype: "檔案",
			animation: "動畫化",
			transparency: "可透明",
			emote_details: "貼圖詳情",
			version_details: "版本詳情",
			attribution: "屬性",
			original_creator: "原創者",
			as_child: "你正在製作 {0} 的 {IS_DIVERGED} 版本 ",
			content_moderation: "內容管理",
			half_transparency_tooltip: "像素只可以全透明或不透明 (不能半透明)",
		},
	},
	emote_set: {
		create: "新 @:common.object.emote_set",
		select: "選擇 @:common.object.emote_set",
		explain: {
			section: "甚麼是 @:common.object.emote_set{'s'}?",
			hint: "貼圖包是用來整合貼圖. 可以綁定到自己的頻道或分享給其他人",
		},
		no_space: "沒有格子",
		none_selected: "未選擇貼圖包",
		editing: "正在編輯 {0}",
		owner: "{USER} 的貼圖包",
		owned: "已擁有貼圖包",
		label_renamed: "已重新命名",
		label_conflict: "有衝突",
		label_default: "預設",
		modal: {
			selected_channel_count: "未選擇頻道 | 已選擇 {0} 個頻道 | 已選擇 {0} 個頻道",
			create_button: "新增 @:common.object.emote_set",
			rename_in_set: "於 {0} 重新命名",
			context_rename: "自定義貼圖名稱",
			context_set_default: "設為預設",
			context_unset_default: "取消設為預設",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "貼圖包",
		channel_emotes: "頻道貼圖",
		editors: "編輯者",
		roles: "身份",
		no_channel_emotes: "{0} 在他們的 {1} 頻道中並沒有任何貼圖",
		no_channels: "{0} 並沒有任何已連動的頻道",
		card: {
			view_full_profile: "查看完整個人資料",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "舉報",
		emote_reason: {
			i_made_this: "被其他人上載了我所製作的貼圖",
			duplicate: "此貼圖已存在",
			pornographic: "此貼圖涉及露骨/色情成分",
			violence_gore: "此貼圖涉及暴力成分",
			i_appear_there: "此貼圖描述了我, 但我不喜歡",
			offensive: "此貼圖令我反感",
			other: "其他",
		},
		uncategorized_prompt: "甚麼問題?",
		details: "詳細內容 (提供額外資訊和證據)",
		success: "舉報已成功提交",
		notify: "當我們完成處理舉報, 或需要更多相關資訊時, 就會於您的郵箱發出通知.",
		complete_step_one: "繼續",
		abuse_notice: "濫用檢舉可能會導致您的訪問權限被撤銷。",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "通知",
		tabs: {
			all: "所有訊息",
			unread: "未讀",
			important: "重要",
		},
		unread_tag: "未讀",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "貼圖已被認可",
				content: `
# 你的貼圖 "{EMOTE_NAME}" 已被認可並公開列出 \n
它將可在貼圖錄中選取, 和在 @:common.appHost{'.'} 中顯示
`,
			},
			emote_not_listed: {
				subject: "貼圖不被認可",
				content: `
# 你的貼圖 "{EMOTE_NAME}" 已被否決 \n
它將不能在貼圖錄中選取, 或在 @:common.appHost 中顯示, 但有連結的用戶還可以以連結選取
`,
			},
			emote_ownership_claim_request: {
				subject: "轉移所有權的邀請",
				content: `
## {OWNER_DISPLAY_NAME} 想轉移 '{EMOTE_NAME}' 的所有權給你
[查看貼圖]({EMOTE_URL})
**[接受邀請]({EMOTE_CLAIM_URL})** | [拒絕邀請]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "你已被封鎖",
				reason: {
					pornographic_content: "",
				},
				content: `
# 帳戶已被封鎖
你使用 @:common.appName 的權限已被限制.<br/><br/>
### 原因為
{BAN_REASON} <br/><br/>
### 已啟用限制有<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>該判決於 **{BAN_EXPIRE_AT}** 到期.
_如果你堅持否認這判決，請發郵件到 @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* 你將不能使用該應用程式",
					no_auth: "* 你將不能登入",
					no_ownership: "* 你製作的任何內容將不再可用",
					memory_hole: "* 你不能被其他用戶看到",
					ip_blocked: "* 你的IP位址將不能使用 @:common.appName services",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "找不到",
		doctor_wtf: "這是什麼鬼?",
		pot_friend: "壺是你的朋友.",
	},
};
