export default {
	locale: "한국어 (대한민국)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "자세히 알아보기",
		more: "더 보기",
		retry: "재시도",
		back: "Back",
		download: "Download | Downloads",
		features: "기능",
		comments: "댓글",
		search: "검색",
		update: "변경하기",
		report: "Report",
		delete: "삭제",
		cancel: "Cancel",
		submit: "등록",
		activity: "활동소식",
		loading: "불러오는 중...",
		save_changes: "변경사항 저장",
		reset: "초기화",
		object: {
			user: "사용자",
			emote_set: "Emote Set",
			emote: "이모티콘",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "모든 유저를 위한 이모티콘 플랫폼",
		app_description: "간단하게 수백가지의 트위치와 유튜브 이모티콘을 관리하세요",
		why_app: "왜 @:common.appName{'?'}",
		download_browser: "브라우저 확장 프로그램",
		download_mobile: "모바일 앱",
		download_misc: "기타 앱",
		features: {
			emote_sets: {
				name: "이모티콘 세트",
				detail: "다른 사용자와 공유하거나 채널에서 빠르게 교체할 수 있는 사용자 정의 가능한 세트로 이모티콘을 그룹화하세요.",
			},
			many_emote_slots: {
				name: "수백 개의 이모티콘 슬롯",
				detail: "유로 서비스가 없는 {0} 슬롯으로 시작해서 최대 {1} 슬롯까지 가능합니다.",
			},
			channel_emote_names: {
				name: "채널당 이모티콘 이름",
				detail: "게시자가 설정한 이모티콘의 이름이 불편하신가요? 걱정마세요. 내 채널에서 쓸 이름을 원하는대로 바꿀수있습니다.",
			},
			real_time: {
				name: "Real-Time",
				detail: "F5 버튼을 쓰지않고도 이모티콘을 바꾸는 즉시 모든 시청자와 채널에 변화가 일어납니다.",
			},
			emote_versions: {
				name: "이모티콘 버전 관리",
				detail: "이모티콘을 테마별로 교체하거나 개선된 버전으로 업데이트하세요.",
			},
			userbase: {
				name: "Large Community",
				detail: "@:common.appName 은(는) {0} 명 이상의 일일 사용자를 가지고 있으며 {1} 개 이상의 공용 이모티콘 라이브러리를 가지고 있습니다.",
			},
			next_gen: {
				name: "WEBP와 AVIF 같은 차세대 이미지 형식",
				detail: "7TV는 대역폭 사용량을 줄이기 위해, 최적화된 이미지 형식을 사용합니다.",
			},
			source_available: {
				name: "공개 소스",
				detail: "저희의 전체 코드는 GitHub에서 제한 조건을 갖는 소스 공개 라이선스로 공개되어있습니다. 누구나 볼 수 있고, 기여할수있습니다.",
			},
		},
		socials: {
			discord: "디스코드에 참가하기 @:common.appName",
			discord_online_count: "현재 온라인 {0}",
			twitter: "트위터 팔로우하기",
			github: "기여하기",
		},
		legal: {
			terms: "Terms of Service",
			privacy: "Privacy Policy",
			unaffiliated: "@:common.appName is not affiliated with Twitch Interactive",
		},
	},
	// Nav Bar
	nav: {
		home: "홈",
		about: "소개",
		emotes: "이모티콘",
		store: "정기구독",
		admin: "관리자",
		sign_in: "로그인",
		user_search: "프로필 검색하기",
		wip_notice: {
			heading: "새로운 @:common.appName 웹사이트에 오신 것을 환영합니다",
			text1: "This is an early preview of the next way to experience @:common.appName{'.'}",
			text2: "Explore what's new and give us some feedback! Note it will be undergoing rapid changes and may break frequently.",
		},
	},
	activity: {
		emote_created: "{T} 생성됨",
		emote_renamed: "{T} 의 이름을 {O} 에서 {N} (으)로 변경했습니다.",
		emote_listing_approved: "공개 목록에 {T} 이 승인되었습니다.",
		emote_listing_revoked: "{T} (은)는 공개 목록에서 제거되었습니다.",
		emote_merged: "{0} 에 {T} (이)가 병합됨",
		emote_ownership_transferred: "{T} 의 소유권을 {U} 에게 이전했습니다.",
		emote_restored: "{T} 복원됨",
		emote_updated: "{T} 의 속성 변경됨",
		emote_deleted: "{T} 삭제됨",
		emote_tags_updated: "Set tags for {T}: {N}",
		emote_processed: "{T} 에 대한 새로운 처리 작업을 실행했습니다.",
		emote_version_created: "{T} 용 버전 '{VER}' 생성됨",
		emote_version_renamed: "{T} 용 버전 '{VER}' (이)가 {1} 에서 {2} (으)로 변경됨",
		emote_version_approved: "{T} 용 버전 '{VER}' 공개 목록에 승인됨",
		emote_version_restored: "{T} 용 버전 '{VER}' 복구됨",
		emote_version_deleted: "{T} 용 버전 '{VER}' 삭제됨",
		emote_flag_added: "{T} 에 {FLAG} 플래그를 추가했습니다.",
		emote_flag_removed: "Removed flag {FLAG} from {T}",
		user_created: "{T} 생성됨",
		user_deleted: "{T} 삭제됨",
		user_editor_added: "{U} 을(를) 편집자로 추가했습니다.",
		user_editor_added_other: "{U2} 의 편집자로 {U1} 을(를) 추가했습니다.",
		user_editor_updated: "{U} 에 대한 수정 권한을 업데이트했습니다",
		user_editor_updated_other: "{U2} 의 편집자 {U1} 에 대한 수정 권한을 업데이트했습니다",
		user_editor_removed: "{U} 의 편집자 권한을 취소했습니다.",
		user_editor_removed_other: "{U2} 에 대한 {U1} 의 편집자 권한을 취소했습니다.",
		user_banned: "{T} 차단됨",
		user_unbanned: "{T} 차단 해제됨",
		user_updated: "{T} 의 속성 변경됨",
		user_sign_in: "{T} 이(가) 로그인했습니다",
		user_sign_out: "{T} 이(가) 로그아웃했습니다",
		user_forbidden: "{0} 에 대한 {T} 접근이 거부되었습니다.",
		emote_set_created: "{T} 생성됨",
		emote_set_emote_added: "{T} 에 이모티콘 {AE} 을(를) 추가했습니다.",
		emote_set_emote_removed: "{T} 에 이모티콘 {AE} 을(를) 제거했습니다.",
		emote_set_emote_renamed: "{T} 에서 이모티콘 {AE} 의 이름을 {O} 에서 {N} 으로 변경했습니다.",
		emote_set_updated: "{T} 의 속성이 변경되었습니다",
	},
	// Text that is relevant to emotes
	emote: {
		add: "이모티콘 추가하기",
		author: "추가한 사용자",
		created_at: "생성된 날짜",
		versions: "버전",
		preview_loading: "미리보기를 불러오는 중... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "미리보기를 불러오는데 실패했습니다",
		processing: "이모티콘 처리중 - 시간이 좀 걸릴 수 있습니다.",
		processing_failed: "처리 실패: {0}",
		use: "이모티콘 사용하기",
		use_menu: "Add this emote to...",
		switch_version: "선택된 버전으로 전환",
		in_n_sets: "in {0} set | in {0} sets",
		disable: "이모티콘 비활성화",
		properties: "속성",
		new_version: "New Version",
		report: "이모티콘 신고",
		Privacy: "Privacy",
		comments: "Comments",
		channels: "채널",
		common_names: "이 이모티콘이 가질 또 다른 이름",
		usage_stats: "이모티콘 통계",
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
			heading: "유의사항!",
			warning: "이 이모티콘은 공개 목록에 표시되지 않습니다.",
			warning_flagged: "이 이모티콘은 다음과 같은 {FLAG_LIST} 이유로 목록에서 제외되었습니다. ",
			notice: "채널에 추가할 수 있지만 실시간 방송에 표시하는 것이 안전한지 확인할 수 없습니다.",
			notice_flagged: "채널에 추가할 수 있지만 실시간 방송에 표시하는 것은 안전하지 않다고 생각합니다.",
			show_button: "이모티콘 표시",
			flag_sexual_content: "Sexual or sexually suggestive content",
			flag_epilepsy: "빠른 깜박임 / 발작 유도",
			flag_edgy: "초조하거나 불쾌한",
			flag_twitch_banned: "Disallowed on Twitch",
		},
		list: {
			searching: "검색 중...",
			emote_count: "{0} 개의 이모티콘",
			no_emotes_listed: "이모티콘 검색 결과 찾을 수 없음",
			fetching_slowly: "죄송합니다. 시간이 조금 걸리고 있습니다.",
			category: {
				name: "카테고리",
				top: "최고 인기",
				trending: "유행하는",
				featured: "추천",
				global: "Global",
				new: "새로운",
			},
			filters: {
				case_sensitive: "대소문자 구분됨",
				exact_match: "정확하게 일치",
				ignore_tags: "태그 무시",
			},
		},
		upload: {
			emote_name: "이모티콘 이름",
			version_name: "버전 이름",
			version_description: "버전 설명",
			submit_emote: "이모티콘 제출하기",
			create_emote_version: "새로운 이모티콘 버전 만들기",
			image_upload: "이미지 업로드",
			accepted_formats: "승인된 형식",
			filetype: "파일",
			animation: "애니메이션",
			transparency: "투명도",
			emote_details: "이모티콘 상세정보",
			version_details: "버전 정보",
			attribution: "속성",
			original_creator: "원작자",
			as_child: "당신은 {0} 버전의 {IS_DIVERGED} 을(를) 생성 하고 있습니다. ",
			content_moderation: "콘텐츠 적합성",
			half_transparency_tooltip: "픽셀은 오직 완전히 투명하거나 완전히 불투명해야 합니다. (가변 투명도 불가)",
		},
	},
	emote_set: {
		create: "새로운 @:common.object.emote_set",
		select: "@:common.object.emote_set 선택됨",
		explain: {
			section: "이모티콘 세트란 무엇인가요?",
			hint: "Emote Sets are a collection of emotes which can be bound to your channels or shared with other users.",
		},
		no_space: "슬롯이 꽉 찼습니다.",
		none_selected: "선택된 세트 없음",
		editing: "Editing {0}",
		owner: "{USER} 의 이모티콘 세트",
		owned: "소유한 이모티콘 세트",
		label_renamed: "변경된 이름",
		label_conflict: "충돌 발생",
		label_default: "기본값",
		label_actor: "Enabled by {0}",
		// "enabled by <display_name of actor>"
		context_emote_add: "{SET_NAME} 에 추가",
		context_emote_remove: "{SET_NAME} 에서 삭제",
		modal: {
			selected_channel_count:
				"채널이 선택 되지 않았습니다. | {0} 채널이 선택되었습니다. | {0} 채널이 선택되었습니다.",
			create_button: "@:common.object.emote_set 생성하기",
			rename_in_set: "{0} (으)로 이름 바꾸기",
			context_rename: "이모티콘 이름 지정하기",
			context_set_default: "기본값으로 지정하기",
			context_unset_default: "기본값 해제하기",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Sets",
		channel_emotes: "채널 이모티콘",
		joined_at: "Joined {0}",
		editors: "편집자",
		roles: "역할",
		connections: "Channels | Channels & Accounts",
		new_connections: "Link accounts...",
		add_editor: "편집자 추가",
		editor_modal_heading: "{0} 의 편집자 수정",
		editor_modal_user_search: "누구를 편집자로 추가하시겠습니까?",
		editor_modal_user_update: "편집자",
		no_channel_emotes: "{0} 은(는) {1} 채널에 이모티콘을 추가하지 않았습니다.",
		no_channels: "{0} 의 연결된 채널이 없습니다!",
		card: {
			view_full_profile: "View Full Profile",
		},
		settings: {
			button: "프로필 수정",
			section_profile: "프로필",
			username: "사용자명",
			display_name: "표시명",
			profile_picture: "프로필 사진",
			section_badges: "Badges",
			section_paints: "Paints",
			no_badges: "You do not own any badges",
			no_paints: "You do not own any paints",
			sign_out: "로그아웃",
			cosmetics_updated: "Cosmetics Updated",
			cosmetics_updated_message: "It may take between 10 to 30 minutes for your changes to appear in chat.",
		},
		editor_permissions: {
			modify_emotes: "채널 이모티콘 수정",
			use_private_emotes: "비공개 이모티콘 사용",
			manage_profile: "프로필 관리",
			manage_owned_emotes: "사용중인 이모티콘 관리",
			manage_emote_sets: "이모티콘 세트 관리",
			manage_billing: "Manage Billing",
			manage_editors: "편집자 관리",
			view_messages: "메시지 보기",
		},
	},
	store: {
		subscribe_cta: "@:common.appName 구독자가 되십시오!",
		subscribed: "구독해주셔서 감사합니다!",
		button_self: "구독하기",
		button_gift: "구독 선물",
		billing_information_heading: "청구 정보",
		payment_information_heading: "결제 정보",
		payment_gift_heading: "이 선물을 받을 사람을 고르세요",
		payment_methods: "결제 수단",
		payment_methods_hint: "지불방법 선택",
		payment_method_paypal: "PayPal",
		payment_method_stripe: "신용카드",
		payment_popup_cta: "새 창에서 거래를 완료하세요",
		pay_button: "{0} 을(를) 통해 지불",
		product_type_subscription: "구독",
		purchase_success: {
			heading: "구매 성공",
			text1: "결제가 접수되었으며 구독이 활성화되었습니다.",
			text2: "지원해 주셔서 감사합니다! 질문이 있는 경우 이 페이지에 제공된 방법을 통해 문의하십시오.",
		},
		sub: {
			incentive: "당신이 얻을것...",
			creator_tier: "제작자를 위한 추가 기능",
			creator_tier_desc: "크리에이터 등급으로 업그레이드하고 채널을 더욱 멋지게 꾸며보세요.",
			feature_t1_badge: "구독자 배지",
			feature_t1_paints: "이름 태그 채색",
			feature_t1_animated_profile_picture: "애니메이션된 프로필 사진",
			feature_t1_zero_width: "Zero Width Emotes",
			feature_t1_global_raffle: "글로벌 이모티콘 추첨권",
			feature_t1_personal_emotes: "개인 이모티콘",
			feature_t2_animated_profile_banner: "Animated Profile Banner",
			feature_t2_animated_offline_screen: "Animated Offline Screen",
			feature_t2_extended_sub_emotes: "Extended Sub Emotes",
			current_plan: "Your Plan",
			cancel: "Do Not Renew",
			update_payment: "Update Payment Method",
			reactivate: "구독 재활성화",
			cancel_prompt: "구독을 취소하시겠습니까?",
			state_heading: "당신의 구독",
			state_badge_progress: "배지 진행 상황",
			state_paints: "채색",
			state_anniversary:
				"귀하의 구독 기념일은 오늘입니다 | 다음 기념일은 {0} 일 후입니다 | 다음 구독 기념일은 {0} 일 후입니다.",
			state_age: "오늘 구독했습니다 | {0} 일 동안 구독했습니다. | {0} 일 동안 구독했습니다.",
			state_ending:
				"귀하의 구독은 오늘 종료됩니다 | 귀하의 구독은 {0} 일 후에 종료됩니다 | 구독이 {0} 일 후에 종료됩니다.",
			state_collection_heading: "수집품",
			state_paints_heading: "Unlocked Paints ({0})",
			state_raffle: "글로벌 이모티콘 추첨",
			state_leaderboards: "최고 선물 제공자",
			raffle: {
				starts_at: "{0} 일",
				starts_at_hint: "다음 이모티콘 추첨은 {0} 에 시작됩니다.",
			},
		},
	},
	// Text that is relating to the reporting system
	reporting: {
		report: "Report",
		emote_reason: {
			i_made_this: "이 이모티콘은 제가 만들었지만 다른 사용자가 업로드했습니다.",
			duplicate: "이 이모티콘은 중복되었습니다.",
			pornographic: "이 이모티콘은 사용하기 부적절하거나 지나치게 성적인 이미지를 포함하고 있습니다.",
			violence_gore: "이 이모티콘은 지나친 폭력성과 잔인한 요소를 보여줍니다.",
			i_appear_there: "이 이모티콘은 나 자신을 묘사하고 있으며 저는 이것이 싫습니다.",
			offensive: "이 이모티콘은 불쾌합니다.",
			other: "그 외 다른 것",
		},
		uncategorized_prompt: "무엇이 문제인가요?",
		details: "상세한 설명 (신고를 위한 증거/추가정보)",
		success: "신고가 성공적으로 제출되었습니다",
		notify: "당신의 신고가 처리되거나 추가 정보가 요청되면 받은 수신함을 통해 알림을 받게 됩니다.",
		complete_step_one: "다음",
		abuse_notice: "신고하기 기능을 남용 및 악용할 경우 귀하의 접근이 차단될 수 있습니다.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "수신함",
		tabs: {
			all: "전체 메시지",
			unread: "읽지 않음",
			important: "중요",
		},
		unread_tag: "Unread",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "이모티콘 승인 확인됨",
				content: `
# 당신의 이모티콘 "{EMOTE_NAME}"이 승인되었습니다. \n 이모티콘 디렉토리에서 사용 가능하고 @:common.appHost{'.'} 에 곧 보이게 될 것입니다.
`,
			},
			emote_not_listed: {
				subject: "이모티콘 승인 거부됨",
				content: `
# 귀하의 이모티콘 "{EMOTE_NAME}" 이 승인 거부되었습니다.
공개 이모티콘 디렉토리에서 사용이 불가능하고 @:common.appHost 에서 보이지 않을것입니다. 그러나 링크를 가지고있는 유저는 여전히 사용 가능 합니다.
`,
			},
			emote_ownership_claim_request: {
				subject: "Invitation to claim ownership of an emote",
				content: `
## {OWNER_DISPLAY_NAME} 님이 당신이 '{EMOTE_NAME}' 의 소유자가 되기를 원합니다

[이모티콘 보기]({EMOTE_URL})

**[요청 승인]({EMOTE_CLAIM_URL})** | [요청 거부]({EMOTE_DECLINE_URL})								`,
			},
			client_banned: {
				subject: "귀하는 차단되었습니다.",
				reason: {
					pornographic_content: "",
				},
				content: `
# 계정 금지됨
귀하의 @:common.appName 에 대한 접근이 이제 제한됩니다.<br/><br/>
### 이 조치의 이유
{BAN_REASON} <br/><br/>
### 적용되는 제한 사항<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>이 결정은 **{BAN_EXPIRE_AT}** 에 만료됩니다.
_이것이 실수라고 믿는다면, @:common.supportEmail{'.'}에 이메일을 보내주세요_
`,
				effect: {
					no_permissions: "* 귀하는 더 이상 권한이 없습니다.",
					no_auth: "* 귀하는 더 이상 로그인할 수 없습니다.",
					no_ownership: "* 귀하가 생성한 콘텐츠를 더 이상 사용할 수 없습니다.",
					memory_hole: "* 다른 사용자가 더 이상 귀하를 볼 수 없습니다.",
					ip_blocked: "* 귀하의 IP가 모든 @:common.appName services에 접근하지 못하도록 차단 되었습니다.",
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
		troll_despair: "찾을 수 없었습니다.",
		doctor_wtf: "뭐야 이건?",
		pot_friend: "I'm a pot, friend",
	},
};
