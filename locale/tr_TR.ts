export default {
	locale: "Türkçe (Türkiye)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Daha Fazlasını Öğren",
		more: "Daha Fazlası",
		retry: "Yeniden Dene",
		downloads: "İndirilenler",
		features: "Özellikler",
		comments: "Yorumlar",
		search: "Ara",
		update: "Güncelle",
		report: "Bildir",
		activity: "Aktivite",
		loading: "Yükleniyor",
		object: {
			user: "Kullanıcı",
			emote_set: "Emote Grubu",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Herkes için Emote Platformu",
		app_description: "Twitch ve Youtube kanalların için yüzlerce emote'u kolaylıkla yönet",
		why_app: "Neden @:common.appName{'?'}",
		download_browser: "Tarayıcı Eklentisi",
		download_mobile: "Mobil Uygulamalar",
		download_misc: "Diğer Uygulamalar",
		features: {
			emote_sets: {
				name: "Emote Setleri",
				detail: "Emoteları, diğer kullanıcılarla paylaşılabilen ya da hızlıca kendi kanalınıza aktarabileceğiniz özelleştirilebilir setler halinde gruplayın.",
			},
			many_emote_slots: {
				name: "Yüzlerce emote slotu",
				detail: "Maksimum {1} olacak şekilde ve ödeme duvarı olmadan {0} slot ile başlayın.",
			},
			channel_emote_names: {
				name: "Kanaldan kanala özelleştirilebilir emote adları",
				detail: "Emote'u oluşturan kişinin Emote'a verdiği adı beğenmedin mi? Sıkıntı yok, kendi kanalında Emote'un adını özelleştirebilirsin.",
			},
			real_time: {
				name: "Gerçek zamanlı",
				detail: "Kanalındaki bütün kullanıcılar için emote anında değişir ve F5 gerekmez.",
			},
			emote_versions: {
				name: "Emote Versiyonları",
				detail: "Farklı tema varyantları arasında geçiş yapın veya bir emote'u iyileştirilmiş versiyonuna güncelleyin.",
			},
			next_gen: {
				name: "WEBP ve AVIF gibi yeni nesil görüntü formatları",
				detail: "Bant genişliğini düşürmek amacıyla yeni nesil ve daha optimize görüntü formatlarını kullanıyoruz.",
			},
			source_available: {
				name: "Açık kaynak",
				detail: "Bütün kod tabanımız, açık kaynak lisansıyla GitHub'da mevcuttur. Herkes görüntüleyebilir ve katkıda bulunabilir.",
			},
		},
		socials: {
			discord: "@:common.appName Discord sunucusuna katılın",
			discord_online_count: "{0} kişi çevrimiçi",
			twitter: "Bizi Twitter'da takip edin",
			github: "Katkıda bulun",
		},
	},
	// Nav Bar
	nav: {
		home: "Ana Sayfa",
		about: "Hakkında",
		emotes: "Emotelar",
		store: "Abone Ol",
		admin: "Admin",
		sign_in: "Giriş Yap",
		wip_notice: {
			heading: "Yenilenmiş 7tv'ye hoş geldin",
			text1: "Bu yeni 7tv'yi deneyimlemenin erken bir ön izlemesidir{'.'}",
			text2: "Yenilikleri keşfedin ve bize geri bildirimde bulunun! Not, site sık sık değişimlere uğrayabileceği için stabil bir deneyim yaşamanızı engelleyebilir.",
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
		add: "Emote Yükle",
		author: "Ekleyen",
		created_at: "Oluşturuldu",
		versions: "Versiyonlar",
		preview_loading: "Önizlemeler yükleniyor... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Önizlemeleri yüklemede hata oluştu",
		processing: "Emote işleniyor - bu biraz zaman alabilir.",
		use: "Emote'u Kullan",
		switch_version: "Bu versiyona geç",
		in_n_sets: "{0} sette | {0} sette",
		disable: "Emote'u Devre Dışı Bırak",
		update: "Güncelle",
		report: "Emote'u Bildir",
		makePrivate: "Gizli Yap",
		makeGlobal: "Make Global",
		comments: "Yorumlar",
		channels: "Kanallar",
		common_names: "Bu emote'un diğer adları",
		usage_stats: "Emote İstatistikleri",
		list: {
			searching: "Aranıyor",
			emote_count: "{0} Emote",
			no_emotes_listed: "Emote bulunamadı",
			fetching_slowly: "Üzgünüz, bu biraz zaman alacak",
		},
		upload: {
			emote_name: "Emote Adı",
			version_name: "Versiyon Adı",
			version_description: "Versiyon Tanımı",
			submit_emote: "Emote'u Gönder",
			create_emote_version: "Emote Versiyonu Oluşturun",
			image_upload: "Resim Yükle",
			accepted_formats: "Kabul Edilen Formatlar",
			filetype: "Dosya",
			animation: "Animasyon",
			transparency: "Şeffaflık",
			emote_details: "Emote Ayrıntıları",
			version_details: "Versiyon Detayları",
			attribution: "Atıf",
			original_creator: "Orijinal Yaratıcı",
			as_child: "{0} öğesinin {IS_DIVERGED} versiyonunu oluşturuyorsunuz. ",
			content_moderation: "İçerik Denetimi",
			half_transparency_tooltip:
				"Pikseller yalnızca tamamen şeffaf veya tamamen opak olabilir (değişken şeffaflık yoktur)",
		},
	},
	emote_set: {
		create: "Yeni @:common.object.emote_set",
		select: "Seç @:common.object.emote_set",
		explain: {
			section: "@:common.object.emote_set{'s'} nelerdir?",
			hint: "Emote Setleri, kanallarınıza bağlanabilen veya diğer kullanıcılarla paylaşılabilen emote koleksiyonudur.",
		},
		no_space: "Slotlar Dolu",
		none_selected: "Set Seçilmedi",
		editing: "{0} Düzenleniyor",
		owner: "{USER} Adlı Kullanıcının Emote Seti",
		owned: "Sahip Olunan Emote Seti",
		label_renamed: "Yeniden adlandırıldı",
		label_conflict: "Çakışma",
		label_default: "Varsayılan",
		modal: {
			selected_channel_count: "hiçbir kanal seçilmedi | {0} kanal seçildi | {0} kanal seçildi",
			create_button: "Oluştur @:common.object.emote_set",
			rename_in_set: "{0} olarak yeniden adlandır",
			context_rename: "Emote İsmini Özelleştir",
			context_set_default: "Varsayılan Olarak Ata",
			context_unset_default: "Varsayılan Olarak Atamayı Kaldır",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Setleri",
		channel_emotes: "Kanal Emoteları",
		editors: "Editörler",
		roles: "Roller",
		no_channel_emotes: "{0}, {1} kanalında herhangi bir emote yok",
		no_channels: "{0} adlı kişinin bağlı bir kanalı yok!",
		card: {
			view_full_profile: "Profil Detaylarını Gör",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Bildir",
		emote_reason: {
			i_made_this: "Bu emote'u ben yaptım fakat başka birisi tarafından yüklendi",
			duplicate: "Bu kopya bir emote",
			pornographic: "Bu emote pornografik veya cinsel görüntüler içeriyor",
			violence_gore: "Bu emote şiddet veya vahşet görüntüleri içeriyor",
			i_appear_there: "Bu emote beni tasvir ediyor ve hoşuma gitmedi",
			offensive: "Bu ifadeyi saldırgan buluyorum",
			other: "Başka bir şey",
		},
		uncategorized_prompt: "Sorun nedir?",
		details: "Detaylar (raporun için ekstra bilgi veya kanıt)",
		success: "Rapor başarıyla gönderildi",
		notify: "Raporun ile ilgili bir sonuç çıktığında veya daha fazla bilgi istendiğinde, gelen kutusu aracılığıyla bilgilendirileceksiniz.",
		complete_step_one: "Devam et",
		abuse_notice: "Bildirme özelliği istismar edildiği taktirde bu özelliğe erişiminiz kısıtlanabilir.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Gelen Kutusu",
		tabs: {
			all: "Tümm Mesajlar",
			unread: "Okunmamış",
			important: "Önemli",
		},
		unread_tag: "Okunmamış",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote, yayınlanmak için onaylandı",
				content: `
# "{EMOTE_NAME}" emote'unuz yayınlanmak için onaylandı \n
Artık Emote Listesi'nde mevcut olacak ve @:common.appHost{'.'} üzerinde görünmeye başlayacak
`,
			},
			emote_not_listed: {
				subject: "Emote Onaylanmadı",
				content: `
"{EMOTE_NAME}" emote'unuz reddedildi
Herkese açık Emote Listesi'nde veya @:common.appHost üzerinde görünmeyecektir ama link'e sahip kullanıcılar için kullanılabilir durumda kalacaktır.
`,
			},
			emote_ownership_claim_request: {
				subject: "Bir emote'un sahipliğini talep etme daveti",
				content: `
## {OWNER_DISPLAY_NAME} adlı kişi, '{EMOTE_NAME}' adlı emote'un sahibi olmanızı istiyor

[Emote'u Görüntüle]({EMOTE_URL})

**[Talebi Kabul Et]({EMOTE_CLAIM_URL})** | [Talebi Reddet]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Yasaklandınız",
				reason: {
					pornographic_content: "",
				},
				content: `
# Hesap Yasaklandı
@:common.appName erişiminiz artık kısıtlı.<br/><br/>
### Bu eylemin nedeni
{BAN_REASON} <br/><br/>
### Uygulanan Kısıtlamalar<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Bu karar **{BAN_EXPIRE_AT}**. sona erecek
_Bir hata olduğunu düşünüyorsan, @:common.supportEmail{'.'} adresine email gönder_
`,
				effect: {
					no_permissions: "* Artık uygulamaya erişemezsiniz",
					no_auth: "* Artık oturum açamazsınız",
					no_ownership: "* Yarattığınız içerikler artık kullanılamayacak",
					memory_hole: "* Diğer kullanıcılara karşı görülebilir olmayacaksınız",
					ip_blocked: "* IP adresinizin @:common.appName hizmetlerine erişimi engellendi",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Bir şey bulamadık",
		doctor_wtf: "Bu ne ulan?",
		pot_friend: "Ben bir tencere arkadaşım",
	},
};
