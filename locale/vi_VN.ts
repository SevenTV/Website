export default {
	locale: "Tiếng Việt (Việt Nam)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Tìm Hiểu Thêm",
		more: "Xem thêm",
		retry: "Thử lại",
		downloads: "Tải về",
		features: "Tính năng",
		comments: "Bình luận",
		search: "Tìm kiếm",
		update: "Cập nhật",
		report: "Báo cáo",
		activity: "Hoạt động",
		loading: "Đang tải",
		object: {
			user: "Người dùng",
			emote_set: "Nhóm Emote",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Nền tảng Emote cho Mọi người",
		app_description: "Quản lý hàng trăm emote cho kênh Twitch hoặc Youtube của bạn một cách dễ dàng",
		why_app: "Tại sao chọn @:common.appName{'?'}",
		download_browser: "Tiện ích mở rộng cho Trình duyệt",
		download_mobile: "Ứng dụng Di động",
		download_misc: "Ứng dụng khác",
		features: {
			emote_sets: {
				name: "Nhóm emote",
				detail: "Nhóm các emote tùy chỉnh có thể được chia sẻ với người dùng khác hoặc nhanh chóng hoán đổi cho kênh của bạn.",
			},
			many_emote_slots: {
				name: "Hàng trăm slot emote",
				detail: "Bắt đầu với {0} slot, có thể lên đến tối đa {1} và không tốn phí.",
			},
			channel_emote_names: {
				name: "Tên emote khác biệt dành cho mỗi kênh",
				detail: "Không thích tên emote chính chủ? Không sao cả, bạn có thể đổi nó thành tên bạn thích cho kênh của bạn.",
			},
			real_time: {
				name: "Thời gian thực",
				detail: "Thay đổi emote cho kênh của bạn diễn ra tức thì, cho mọi người xem. Không cần nhấn F5.",
			},
			emote_versions: {
				name: "Tạo phiên bản cho Emote",
				detail: "Thay đổi emote theo mùa hoặc nâng cấp lên phiên bản xịn hơn.",
			},
			next_gen: {
				name: "Định dạng hình ảnh thế hệ mới như WEBP và AVIF",
				detail: "Chúng tôi sử dụng định dạng hình ảnh mới mẻ và tối ưu hơn nhằm mục đích giảm tải băng thông.",
			},
			source_available: {
				name: "Mã nguồn có sẵn",
				detail: "Toàn bộ cơ sở mã của chúng tôi có trên GitHub cùng với nguồn gốc rõ ràng. Ai cũng có thể đóng góp.",
			},
		},
		socials: {
			discord: "Tham gia @:common.appName trên Discord",
			discord_online_count: "{0} người đang trực tuyến",
			twitter: "Theo dõi chúng tôi trên Twitter",
			github: "Đóng góp",
		},
	},
	// Nav Bar
	nav: {
		home: "Trang chủ",
		about: "Thông tin tổng quan",
		emotes: "Emotes",
		store: "Theo dõi",
		admin: "Quản trị viên",
		sign_in: "Đăng nhập",
		wip_notice: {
			heading: "Chào mừng đến với website @:common.appName mới",
			text1: "Đây là bản xem trước các bước tiếp theo để trải nghiệm @:common.appName{'.'}",
			text2: "Khám phá các tính năng mới và cho chúng tôi ý kiến! Lưu ý rằng nó sẽ bị thay đổi liên tục và có thể bị hỏng thường xuyên.",
		},
	},
	activity: {
		emote_created: "Đã tạo {T}",
		emote_renamed: "{ICO} Đã đổi tên {T} từ {O} thành {N}",
		emote_listing_approved: "Đã duyệt {T} để hiển thị công khai",
		emote_listing_revoked: "Đã xóa {T} khỏi danh sách công khai",
		emote_merged: "Đã gộp {T} vào {0}",
		emote_ownership_transferred: "Đã chuyển quyền sở hữu của {T} đến {U}",
		emote_restored: "Đã khôi phục {T}",
		emote_updated: "Đã thay đổi thuộc tính cho {T}",
		emote_deleted: "Đã xóa {T}",
		emote_version_created: "Đã tạo phiên bản '{VER}' cho {T}",
		emote_version_renamed: "Đã đổi tên phiên bản '{VER}' cho {T} từ {1} thành {2}",
		emote_version_approved: "Đã duyệt phiên bản '{VER}' cho {T} để hiển thị công khai",
		emote_version_restored: "Đã khôi phục phiên bản '{VER}' cho {T}",
		emote_version_deleted: "Đã xóa phiên bản '{VER}' cho {T}",
		user_created: "Đã tạo {T}",
		user_deleted: "Đã xóa {T}",
		user_editor_added: "Đã thêm {T} làm người chỉnh sửa",
		user_editor_added_other: "Đã thêm {U1} làm người chỉnh sửa cho {U2}",
		user_editor_removed: "Đã xóa {U} khỏi vai trò chỉnh sửa",
		user_editor_removed_other: "Đã xóa {U1} khỏi vai trò chỉnh sửa cho {U2}",
		user_banned: "Đã cấm {T}",
		user_unbanned: "Đã bỏ cấm {T}",
		user_updated: "Đã thay đổi thuộc tính cho {T}",
		user_sign_in: "{T} đã đăng nhập vào",
		user_sign_out: "{T} đã đăng xuất",
		user_forbidden: "{T} đã bị từ chối vào {0}",
		emote_set_created: "Đã tạo {T}",
		emote_set_emote_added: "Đã thêm emote {AE} cho {T}",
		emote_set_emote_removed: "Đã xóa emote {AE} khỏi {T}",
		emote_set_emote_renamed: "Đã đổi tên emote {AE} từ {O} thành {N} trong {T}",
		emote_set_updated: "Đã thay đổi thuộc tính cho {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Thêm Emote",
		author: "Được thêm bởi",
		created_at: "Ngày tạo",
		versions: "Các phiên bản",
		preview_loading: "Đang tải bản xem trước... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Không thể tải bản xem trước",
		processing: "Đang xử lí Emote - có thể sẽ mất một lúc.",
		use: "Sử dụng Emote",
		switch_version: "Đổi thành phiên bản này",
		in_n_sets: "trong {0} nhóm | trong {0} nhóm",
		disable: "Tắt emote",
		update: "Cập nhật",
		report: "Báo cáo Emote",
		makePrivate: "Chuyển thành Riêng tư",
		makeGlobal: "Make Global",
		comments: "Bình luận",
		channels: "Số kênh",
		common_names: "Các tên khác cho emote này",
		usage_stats: "Thống kê Emote",
		list: {
			searching: "Đang tìm kiếm",
			emote_count: "{0} emotes",
			no_emotes_listed: "Không tìm thấy emote",
			fetching_slowly: "Xin bỏ qua, tiến trình sẽ mất một lúc",
		},
		upload: {
			emote_name: "Tên Emote",
			version_name: "Tên Phiên bản",
			version_description: "Mô tả Phiên bản",
			submit_emote: "Gửi Emote",
			create_emote_version: "Tạo phiên bản cho emote",
			image_upload: "Tải ảnh lên",
			accepted_formats: "Các định dạng được chấp nhận",
			filetype: "Tệp tin",
			animation: "Ảnh động",
			transparency: "Độ trong suốt",
			emote_details: "Chi tiết Emote",
			version_details: "Chi tiết phiên bản",
			attribution: "Người góp công",
			original_creator: "Người sáng tạo gốc",
			as_child: "Bạn đang tạo một phiên bản {IS_DIVERGED} của {0}. ",
			content_moderation: "Kiểm duyệt nội dung",
			half_transparency_tooltip:
				"Các điểm ảnh chỉ có thể hoàn toàn trong hoặc hoàn toàn đục (độ xuyên thấu không biến đổi được)",
		},
	},
	emote_set: {
		create: "Tạo @:common.object.emote_set",
		select: "Chọn @:common.object.emote_set",
		explain: {
			section: "@:common.object.emote_set{'s'} là gì?",
			hint: "Nhóm Emote là một bộ sưu tập các emote mà có thể được liên kết vào các kênh của bạn hoặc được chia sẻ với các người dùng khác.",
		},
		no_space: "Hết chỗ",
		none_selected: "Chưa chọn nhóm",
		editing: "Đang chỉnh sửa {0}",
		owner: "Nhóm emote của {USER}",
		owned: "Nhóm emote được sở hữu",
		label_renamed: "Đã đổi tên",
		label_conflict: "Xung đột",
		label_default: "Mặc định",
		modal: {
			selected_channel_count: "không có kênh được chọn | {0} kênh được chọn | {0} kênh được chọn",
			create_button: "Tạo @:common.object.emote_set",
			rename_in_set: "Đổi tên ở {0}",
			context_rename: "Tùy chỉnh tên Emote",
			context_set_default: "Đặt làm Mặc định",
			context_unset_default: "Hủy làm Mặc định",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Nhóm emote",
		channel_emotes: "Emote của kênh",
		editors: "Người chỉnh sửa",
		roles: "Chức vụ",
		no_channel_emotes: "{0} không có emote nào trên kênh {1} của họ",
		no_channels: "{0} không có kênh nào được kết nối!",
		card: {
			view_full_profile: "Xem toàn bộ hồ sơ",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Báo cáo",
		emote_reason: {
			i_made_this: "Tôi đã tạo emote này nhưng nó lại được đăng lên bởi người khác",
			duplicate: "Emote này là một bản sao",
			pornographic: "Emote này chứa hình ảnh đồi trụy hoặc quá khêu gợi",
			violence_gore: "Emote này hiển thị nội dung bạo lực hoặc máu me",
			i_appear_there: "Emote này miêu tả tôi và tôi không thích nó",
			offensive: "Tôi cảm thấy emote này gây xúc phạm",
			other: "Khác",
		},
		uncategorized_prompt: "Vấn đề gì?",
		details: "Chi tiết (thông tin thêm và/hoặc bằng chứng cho báo cáo của bạn)",
		success: "Báo cáo được gửi thành công",
		notify: "Thông báo sẽ được gửi đến hộp thư ngay khi báo cáo của bạn được xử lý hoặc cần bổ sung thông tin.",
		complete_step_one: "Tiếp tục",
		abuse_notice: "Lạm dụng chức năng báo cáo có thể dẫn đến việc mất quyền truy cập.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Hộp thư",
		tabs: {
			all: "Tất cả tin nhắn",
			unread: "Chưa đọc",
			important: "Quan trọng",
		},
		unread_tag: "Chưa đọc",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote được duyệt để lên danh sách",
				content: `
# Emote "{EMOTE_NAME}" của bạn đã được duyệt \n
Bây giờ nó sẽ có sẵn ở mục Emote và bắt đầu xuất hiện trên @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote không được duyệt để lên danh sách",
				content: `
# Emote "{EMOTE_NAME}" của bạn đã bị từ chối
Nó sẽ không được công khai ở mục Emote hoặc hiển thị trên @:common.appHost,
nhưng vẫn sẽ có sẵn cho các người dùng có địa chỉ liên kết.
`,
			},
			emote_ownership_claim_request: {
				subject: "Lời mời nhận quyền sở hữu emote",
				content: `
## {OWNER_DISPLAY_NAME} muốn bạn trở thành chủ sở hữu của '{EMOTE_NAME}'

[Xem Emote]({EMOTE_URL})

**[Chấp nhận yêu cầu]({EMOTE_CLAIM_URL})** | [Từ chối yêu cầu]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Bạn bị cấm cửa",
				reason: {
					pornographic_content: "",
				},
				content: `
# Tài khoản đã bị cấm
Quyền truy cập của bạn vào @:common.appName hiện đang bị hạn chế.<br/><br/>
### Lý do cho hành động này
{BAN_REASON} <br/><br/>
### Các hạn chế đã được áp dụng<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Quyết định này hết hạn vào **{BAN_EXPIRE_AT}**.
_Nếu bạn nghỉ đây là một sự nhầm lẫn, vui lòng gửi email đến @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Bạn không còn được tương tác với app nữa",
					no_auth: "* Bạn không còn được đăng nhập nữa",
					no_ownership: "* Bất cứ nội dung nào do bạn tạo sẽ không còn nữa",
					memory_hole: "* Bạn sẽ không được hiển thị với các người dùng khác",
					ip_blocked: "* IP của bạn đã bị chặn truy cập vào tất cả dịch vụ của @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Không tìm thấy",
		doctor_wtf: "Clgt?",
		pot_friend: "Bạn ôi, tui là cái nồi",
	},
};
