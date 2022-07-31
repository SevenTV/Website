export default {
	locale: "ภาษาไทย",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "เรียนรู้เพิ่มเติม",
		more: "เพิ่มเติม",
		retry: "ลองอีกครั้ง",
		downloads: "ดาวน์โหลด",
		features: "ฟีเจอร์",
		comments: "คอมเม้นต์",
		search: "ค้นหา",
		update: "อัปเดต",
		report: "รายงาน",
		activity: "กิจกรรม",
		loading: "กำลังโหลด",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "ผู้ใช้งาน",
			emote_set: "เซตอีโมต",
			emote: "อีโมต",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "สโลแกน",
		app_description: "จัดการอีโมตต่างๆสำหรับช่อง Twitch และ Youtube ของคุณอย่างง่ายดาย",
		why_app: "ทำไมถึงต้องเป็น @:common.appName{'?'}",
		download_browser: "ส่วนขยายของเบราว์เซอร์",
		download_mobile: "แอปมือถือ",
		download_misc: "แอปอื่นๆ",
		features: {
			emote_sets: {
				name: "เซตอีโมต",
				detail: "รวบรวมอีโมตเป็นเซตที่สามารถปรับแต่งได้และแชร์ให้กับผู้ใช้งานรายอื่น หรือ เปลี่ยนไปมายังช่องของคุณอย่างรวดเร็ว",
			},
			many_emote_slots: {
				name: "สล็อตช่องว่างสำหรับอีโมตนับร้อย",
				detail: "เริ่มจาก {0} ช่อง และได้มากสุดถึง {1} ช่อง โดยไม่ต้องจ่ายเงินเพื่อสมัครสมาชิก",
			},
			channel_emote_names: {
				name: "ชื่ออีโมตของแต่ละช่อง",
				detail: "ไม่ชอบชื่ออีโมตที่ผู้สร้างตั้งไว้ให้? ไม่เป็นไร เพราะคุณสามารถเปลี่ยนชื่อมันสำหรับช่องของคุณได้โดยเฉพาะ",
			},
			real_time: {
				name: "เรียลไทม์",
				detail: "การเปลี่ยนอีโมตในช่องของคุณจะเกิดขึ้นทันที สำหรับผู้ชมทุกคน ไม่ต้องกด F5",
			},
			emote_versions: {
				name: "การสร้างเวอร์ชันอื่นของอีโมต",
				detail: "เปลี่ยนธีมต่างๆของอีโมตหรืออัปเดตอีโมตให้กลายเป็นเวอร์ชันที่ได้รับการพัฒนาแล้ว",
			},
			next_gen: {
				name: "รูปแบบไฟล์ภาพที่ล้ำสมัยอย่าง WEBP และ AVIF",
				detail: "เราใช้รูปแบบไฟล์ภาพที่เหมาะสมและใหม่กว่า เพื่อลดการใช้แบนด์วิดท์",
			},
			source_available: {
				name: "ซอฟต์แวร์ source-available",
				detail: "Codebase ทั้งหมดของเรามีอยู่ใน GitHub พร้อมกับสัญญาอนุญาตซอฟต์แวร์ source-available ทุกคนสามารถดูและมีส่วนร่วมในการสนับสนุนได้",
			},
		},
		socials: {
			discord: "เข้าร่วม @:common.appName on Discord",
			discord_online_count: "{0} ออนไลน์อยู่ในขณะนี้",
			twitter: "กดติดตามเราบน Twitter",
			github: "ร่วมสนับสนุน",
		},
	},
	// Nav Bar
	nav: {
		home: "หน้าหลัก",
		about: "เกี่ยวกับ",
		emotes: "อีโมต",
		store: "สมัครสมาชิก",
		admin: "แอดมิน",
		sign_in: "เข้าสู่ระบบ",
		wip_notice: {
			heading: "ขอต้อนรับเข้าสู่เว็บไซต์ @:common.appName อันใหม่",
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
		add: "เพิ่มอีโมต",
		author: "เพิ่มโดย",
		created_at: "สร้างเมื่อ",
		versions: "เวอร์ชั่น",
		preview_loading: "กำลังโหลดตัวอย่าง... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "ไม่สามารถโหลดตัวอย่าง",
		processing: "กำลังประมวลผลอีโมต - นี่อาจจะใช้เวลาสักครู่",
		use: "ใช้อีโมต",
		switch_version: "เปลี่ยนเป็นเวอร์ชันนี้",
		in_n_sets: "ใน {0} เซต | ใน {0} เซต",
		disable: "ปิดการใช้งานอีโมต",
		update: "อัปเดต",
		report: "รายงานอีโมต",
		makePrivate: "ตั้งเป็นส่วนตัว",
		makeGlobal: "Make Global",
		comments: "คอมเม้นต์",
		channels: "ช่อง",
		common_names: "ชื่ออื่นๆสำหรับอีโมตนี้",
		usage_stats: "สถิติอีโมต",
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
			searching: "กำลังค้นหา",
			emote_count: "{0} อีโมต",
			no_emotes_listed: "ไม่พบอีโมต",
			fetching_slowly: "ขออภัย ดูเหมือนนี่น่าจะใช้เวลาสักพัก",
		},
		upload: {
			emote_name: "ชื่ออีโมต",
			version_name: "ชื่อเวอร์ชัน",
			version_description: "คำอธิบายเวอร์ชัน",
			submit_emote: "เสนออีโมต",
			create_emote_version: "สร้างเวอร์ชันอื่นของอีโมต",
			image_upload: "อัพโหลดรูป",
			accepted_formats: "รูปแบบที่ได้รับการยอมรับ",
			filetype: "ไฟล์",
			animation: "ภาพเคลื่อนไหว",
			transparency: "ความโปร่งใส",
			emote_details: "รายละเอียดอีโมต",
			version_details: "รายละเอียดเวอร์ชัน",
			attribution: "เครดิต",
			original_creator: "ผู้สร้างต้นฉบับ",
			as_child: "คุณกำลังสร้างเวอร์ชัน {IS_DIVERGED} ของ {0} ",
			content_moderation: "การกลั่นกรองเนื้อหา",
			half_transparency_tooltip:
				"พิกเซลนั้นสามารถถูกมองเห็นได้แบบทะลุผ่านได้ หรือ ไม่ได้ เท่านั้น (ไม่สามารถเปลี่ยนแปลงค่าความโปร่งแสงได้)",
		},
	},
	emote_set: {
		create: "ใหม่ @:common.object.emote_set",
		select: "เลือก @:common.object.emote_set",
		explain: {
			section: "@:common.object.emote_set{'s'} คืออะไร?",
			hint: "เซตอีโมตคือคอลเลกชันของอีโมตซึ่งสามารถผูกไว้กับช่องของคุณหรือแชร์กับผู้ใช้งานรายอื่นๆ",
		},
		no_space: "ช่องเต็มแล้ว",
		none_selected: "ไม่มีเซตใดถูกเลือก",
		editing: "การแก้ไข {0}",
		owner: "เซตอีโมตของ {USER}",
		owned: "เซตอีโมตที่เป็นเจ้าของ",
		label_renamed: "ถูกเปลี่ยนชื่อ",
		label_conflict: "ความขัดแย้ง",
		label_default: "ค่าเริ่มต้น",
		modal: {
			selected_channel_count: "ไม่มีช่องใดถูกเลือก | เลือก {0} ช่อง | เลือก {0} ช่อง",
			create_button: "สร้าง @:common.object.emote_set",
			rename_in_set: "เปลี่ยนชื่อใน {0}",
			context_rename: "ปรับแต่งชื่ออีโมต",
			context_set_default: "กำหนดให้เป็นค่าเริ่มต้น",
			context_unset_default: "ยกเลิกการกำหนดให้เป็นค่าเริ่มต้น",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "เซตอีโมต",
		channel_emotes: "อีโมตช่อง",
		joined_at: "Joined {0}",
		editors: "บรรณาธิการ",
		roles: "ยศ",
		connections: "Channels | Channels & Accounts",
		new_connections: "Link accounts...",
		no_channel_emotes: "{0} ไม่มีอีโมตในช่อง {1} ของพวกเขา",
		no_channels: "{0} ไม่ได้เชื่อมต่อช่องใดไว้!",
		card: {
			view_full_profile: "ดูโปรไฟล์แบบเต็ม",
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
		report: "รายงาน",
		emote_reason: {
			i_made_this: "ฉันเป็นคนสร้างอีโมตนี้ แต่มันถูกอัปโหลดโดยคนอื่น",
			duplicate: "อีโมตนี้ซ้ำ",
			pornographic: "อีโมตนี้มีรูปลามกอนาจารหรือมีการทำให้ภาพโป๊เปลือยมากไป",
			violence_gore: "อีโมตนี้แสดงถึงความรุนแรงอย่างมาก หรือ เลือด",
			i_appear_there: "อีโมตนี้แสดงให้เห็นถึงตัวฉันและฉันไม่ชอบมัน",
			offensive: "ฉันคิดว่าอีโมตนี้เป็นที่น่าขุ่นเคือง",
			other: "อื่นๆ",
		},
		uncategorized_prompt: "เกิดอะไรขึ้น?",
		details: "รายละเอียด (ข้อมูลเพิ่มเติม และ/หรือ หลักฐานสำหรับการรายงานของคุณ)",
		success: "ส่งการรายงานเรียบร้อย",
		notify: "คุณจะได้รับการแจ้งเตือนผ่านทางอินบ็อกซ์เมื่อทางเราได้จัดการกับมันแล้ว หรือ ต้องการข้อมูลเพิ่มเติม",
		complete_step_one: "ดำเนินการต่อ",
		abuse_notice: "การใช้ฟีเจอร์รายงานในทางที่ผิดอาจส่งผลให้ความสามารถในการใช้งานฟีเจอร์นี้ของคุณถูกเพิกถอน",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "อินบ็อกซ์",
		tabs: {
			all: "ข้อความทั้งหมด",
			unread: "ยังไม่ได้อ่าน",
			important: "สำคัญ",
		},
		unread_tag: "ยังไม่ได้อ่าน",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "อีโมตได้รับการอนุมัติสำหรับการลงรายการ",
				content: `
# อีโมตของคุณ "{EMOTE_NAME}" ได้รับการอนุมัติสำหรับการลงรายการ \n 
มันจะสามารถใช้งานได้ในรายการอีโมตและเริ่มปรากฏบน @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "อีโมตไม่ได้รับการอนุมัติสำหรับการลงรายการ",
				content: `
# อีโมตของคุณ "{EMOTE_NAME}" ถูกปฏิเสธ
มันจะไม่สามารถใช้งานได้ผ่านทางรายการอีโมตสาธารณะ หรือ ถูกมองเห็นได้บน @:common.appHost,
แต่จะยังคงสามารถใช้งานได้สำหรับผู้ใช้งานที่มีลิงก์
`,
			},
			emote_ownership_claim_request: {
				subject: "คำเชิญรับสิทธิความเป็นเจ้าของของอีโมต",
				content: `
## {OWNER_DISPLAY_NAME} ต้องการให้คุณเป็นเจ้าของของ {EMOTE_NAME} 
[ดูอีโมต]({EMOTE_URL})
**[ยอมรับคำขอ]({EMOTE_CLAIM_URL})** | [ปฏิเสธคำขอ]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "คุณถูกแบน",
				reason: {
					pornographic_content: "",
				},
				content: `
# แอคเค้าท์ของคุณถูกแบน
คุณถูกจำกัดการเข้าถึง @:common.appName <br/><br/>
### เหตุผล
{BAN_REASON} <br/><br/>
### Restrictions Applied<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>This decision expires **{BAN_EXPIRE_AT}**.
_If you believe this is a mistake, please email @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "คุณไม่สามารถโต้ตอบกับแอปได้อีกต่อไป",
					no_auth: "คุณไม่สามารถลงชื่อเข้าใช้ได้อีกต่อไป",
					no_ownership: "เนื้อหาใดๆก็ตามที่คุณได้สร้างขึ้นจะไม่สามารถใช้งานได้อีกต่อไป",
					memory_hole: "คุณจะไม่สามารถถูกมองเห็นได้จากผู้ใช้งานรายอื่น",
					ip_blocked: "IP ของคุณถูกบล็อกจากการเข้าถึงบริการของ @:common.appName ทั้งหมด",
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
		troll_despair: "เราหามันไม่เจอ",
		doctor_wtf: "อะไรเนี่ย?",
		pot_friend: "ฉันเป็นไหน่ะเพื่อน",
	},
};
