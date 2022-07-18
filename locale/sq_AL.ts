export default {
	locale: "Shqip (Shqipëri)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Mëso më shumë",
		more: "Më shumë",
		retry: "Provo përsëri",
		downloads: "Shkarkimet",
		features: "Veçoritë",
		comments: "Komentet",
		search: "Kërko",
		update: "Përditëso",
		report: "Raporto",
		activity: "Aktivitetet",
		loading: "Duke u ngarkuar",
		object: {
			user: "Përdorues",
			emote_set: "Kompleti i emotëve",
			emote: "Emotë",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Platforma e emotëve për të gjithë",
		app_description: "Menaxho me qindra emotë për kanalin tuaj në Twitch ose YouTube me lehtësi",
		why_app: "Pse @:common.appName{'?'}",
		download_browser: "Ekstenzion i Shfletuesit",
		download_mobile: "Aplikacione për celularë",
		download_misc: "Aplikacionet e tjera",
		features: {
			emote_sets: {
				name: "Kompleti i Emotëve",
				detail: "Gruponi emotët në komplete të personalizueshme që mund të shpërndahen me përdorues të tjerë ose të ndërrohen me shpejtësi në kanalin tuaj.",
			},
			many_emote_slots: {
				name: "Qindra slote të emotëve",
				detail: "Filloni me {0} slote, me një maksimum të mundshëm prej {1} dhe pa pagesë.",
			},
			channel_emote_names: {
				name: "Emri i emotëve për kanal",
				detail: "Nuk ju pëlqen emri i dhënë i një emote nga autori? S'ka gjë, ju mund ta ndryshoni atë vetëm për kanalin tuaj.",
			},
			real_time: {
				name: "Kohë reale",
				detail: "Ndryshimi i emotëve në kanalin tuaj ndodh menjëherë, për të gjithë shikuesit. Nuk kërkohet F5.",
			},
			emote_versions: {
				name: "Verzioni i Emotës",
				detail: "Ndërroni mes varianteve tematike ose përditësoni një emotë në një version të përmirësuar.",
			},
			next_gen: {
				name: "Formatet e imazhit të gjeneratës së re si WEBP dhe AVIF",
				detail: "Ne përdorim formate imazhi më të reja, më optimizuara për të reduktuar përdorimin e bandwidth.",
			},
			source_available: {
				name: "Burimi-i-disponueshëm",
				detail: "E tërë baza jonë e kodit është e disponueshme në GitHub me një licencë burimi të disponueshme. Çdokush mund ta shikojë dhe të kontribuojë.",
			},
		},
		socials: {
			discord: "Bashkohuni @:common.appName në Discord",
			discord_online_count: "{0} në linjë tani",
			twitter: "Na ndiqni në Twitter",
			github: "Kontribo",
		},
	},
	// Nav Bar
	nav: {
		home: "Ballina",
		about: "Rreth Nesh",
		emotes: "Emotët",
		store: "Abonohu",
		admin: "Admin",
		sign_in: "Hyr në Llogari",
		wip_notice: {
			heading: "Mirësevini në uebfaqën e re @:common.appName",
			text1: "Ky është një shikim paraprak i eksperiencës së @:common.appName{'.'}",
			text2: "Eksploro çka është e re dhe na jepni disa komente! Kujdes pasi që mund të ketë ndryshime të vazhdueshme dhe prishje të shpeshta.",
		},
	},
	activity: {
		emote_created: "Krijoi {T}",
		emote_renamed: "{ICO} riemëroi {T} nga {O} në {N}",
		emote_listing_approved: "Aprovoi {T} për listim publik",
		emote_listing_revoked: "Largoi {T} nga listimi publik",
		emote_merged: "I bashkoj {T} në {0}",
		emote_ownership_transferred: "Transferoj pronësinë e {T} tek {U}",
		emote_restored: "Rikthej {T}",
		emote_updated: "Ndryshoj karakteristikat e {T}",
		emote_deleted: "{T} u fshi",
		emote_version_created: "U krijua verzioni '{VER}' për {T}",
		emote_version_renamed: "Verzioni '{VER}' për {T} u riemërua nga {1} në {2}",
		emote_version_approved: "Verzioni '{VER}' për {T} u aprovua për listim publik",
		emote_version_restored: "Verzioni '{VER}' për {T} u rikthye",
		emote_version_deleted: "Verzioni '{VER}' për {T} u fshi",
		user_created: "{T} u krijua",
		user_deleted: "{T} u fshi",
		user_editor_added: "{T} u shtua si editor",
		user_editor_added_other: "{U1} u shtua si editor i {U2}",
		user_editor_removed: "{U} u fshi si editor",
		user_editor_removed_other: "{U1} u fshi si editor i {U2}",
		user_banned: "{T} është bllokuar",
		user_unbanned: "{T} është çbllokuar",
		user_updated: "Karakteristikat e {T} janë ndryshuar",
		user_sign_in: "{T} është kyçur",
		user_sign_out: "{T} është çkyçur",
		user_forbidden: "{T} iu është bllokuar çasja në {0}",
		emote_set_created: "{T} u krijua",
		emote_set_emote_added: "Emota {AE} është shtuar tek {T}",
		emote_set_emote_removed: "Emota {AE} është fshir nga {T}",
		emote_set_emote_renamed: "Emota {AE} është riemëruar nga {O} në {N} për {T}",
		emote_set_updated: "Karakteristikat e {T} janë ndryshuar",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Shto Emotë",
		author: "Ngarkuar nga",
		created_at: "Krijuar",
		versions: "Verzionet",
		preview_loading: "Duke u ngarkuar pamjet... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Ngarkimi i pamjeve paraprake dështoi",
		processing: "Emote është duke u procesuar - kjo mund të marrë pak kohë.",
		use: "Përdor Emotë",
		switch_version: "Ndërro në këtë verzion",
		in_n_sets: "në {0} komplet | në {0} komplete",
		disable: "Çaktivizo Emotën",
		update: "Përditëso",
		report: "Raporto Emotën",
		makePrivate: "Bëje Private",
		makeGlobal: "Bëje Globale",
		comments: "Komentet",
		channels: "Kanalet",
		common_names: "Emrat tjerë për këtë emotë",
		usage_stats: "Statistikat e emotës",
		list: {
			searching: "Duke kërkuar",
			emote_count: "{0} emotë",
			no_emotes_listed: "Asnjë emotë nuk u gjet",
			fetching_slowly: "Na vjen keq, duket se kjo po merr pak kohë",
		},
		upload: {
			emote_name: "Emri i Emotës",
			version_name: "Emri i Verzionit",
			version_description: "Përshkrimi i Verzionit",
			submit_emote: "Paraqitni Emotën",
			create_emote_version: "Krijo Verzion të Emotës",
			image_upload: "Ngarkim i Imazhit",
			accepted_formats: "Formatet e pranueshme",
			filetype: "Fajll",
			animation: "Animacioni",
			transparency: "Transparenca",
			emote_details: "Detajet e emotës",
			version_details: "Detajet e Verzionit",
			attribution: "Atributet",
			original_creator: "Krijuesi Origjinal",
			as_child: "Ju jeni duke krijuar një {IS_DIVERGED} verzion të {0}. ",
			content_moderation: "Moderimi i Përmbajtjes",
			half_transparency_tooltip:
				"Pikselët mund të jenë vetëm plotësisht transparentë ose plotësisht të ngjyrosurë (pa transparencë të ndryshueshme)",
		},
	},
	emote_set: {
		create: "E re @:common.object.emote_set",
		select: "Selekto @:common.object.emote_set",
		explain: {
			section: "Çka janë @:common.object.emote_set{'s'}?",
			hint: "Kompletet e Emotëve janë një koleksion i emotëve që mund të lidhen me kanalet tuaja ose të shpërndahen me përdorues të tjerë.",
		},
		no_space: "Sloti i Mbushur",
		none_selected: "Asnjë set nuk është selektuar",
		editing: "Duke edituar {0}",
		owner: "Seti i Emotëve të {USER}",
		owned: "Setet e Emotëve të Poseduara",
		label_renamed: "Riemërtuar",
		label_conflict: "Konflikt",
		label_default: "E paracaktuar",
		modal: {
			selected_channel_count:
				"asnjë kanal nuk është selektuar | {0} kanal i selektuar | {0} kanale të selektuara",
			create_button: "Krijo @:common.object.emote_set",
			rename_in_set: "Riemërto në {0}",
			context_rename: "Ndërro emrin e Emotës",
			context_set_default: "Cakto si e paracaktuar",
			context_unset_default: "Largo si e paracaktuar",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Kompletet e Emotëve",
		channel_emotes: "Emotët e Kanaleve",
		editors: "Përpunuesit",
		roles: "Rolet",
		no_channel_emotes: "{0} nuk ka asnjë emotë në {1} kanal",
		no_channels: "{0} nuk ka asnjë kanal të lidhur!",
		card: {
			view_full_profile: "Shiko Profilin e Plotë",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Raporto",
		emote_reason: {
			i_made_this: "Unë e kam krijuar këtë emotë mirëpo është ngarkuar nga dikush tjetër",
			duplicate: "Kjo emotë është duplikate",
			pornographic: "Kjo emotë përmban imazhe pornografike ose tejet seksuale",
			violence_gore: "Kjo emotë shfaq dhunë ekstreme ose përgjakje",
			i_appear_there: "Kjo emotë më përshkruan mua dhe nuk më pëlqen",
			offensive: "Kjo emotë më duket ofenduese",
			other: "Diçka tjetër",
		},
		uncategorized_prompt: "Si është çështja?",
		details: "Detaje (informacione shtesë dhe/ose prova për raportin tuaj)",
		success: "Raporti është paraqitur me sukses",
		notify: "Ju do të njoftoheni përmes inboksit pasi raporti juaj të trajtohet ose nëse kërkohet informacion shtesë.",
		complete_step_one: "Vazhdo",
		abuse_notice: "Abuzimi i funksionit të raportimit mund të çojë në anulimin e aksesit tuaj.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Mesazhet",
		tabs: {
			all: "Të gjitha mesazhet",
			unread: "Të Palexuarat",
			important: "Të rëndësishmet",
		},
		unread_tag: "Të Palexuara",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emotë e aprovuar për listim",
				content: `
# Emoti juaj "{EMOTE_NAME}" u aprovua për listim \n
Tani do të jetë e disponueshme në Listen e Emotëve dhe do të fillojë të shfaqet në @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emotët që nuk janë aprovuar për Listim",
				content: `
# Emoti juaj "{EMOTE_NAME}" u refuzua
Nuk do të jetë i disponueshëm përmes Listës së Emotëve ose i dukshëm në @:common.appHost,
por do të mbetet i disponueshëm për përdoruesit me link.
`,
			},
			emote_ownership_claim_request: {
				subject: "Ftesë për pranimin e pronësisë së një emote",
				content: `
## {OWNER_DISPLAY_NAME} dëshiron që ju të bëheni pronar i "{EMOTE_NAME}"

[Shiko Emotën] ({EMOTE_URL})

**[Prano Kërkesën]({EMOTE_CLAIM_URL})** | [Refuzo kërkesën]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Ju jeni bllokuar",
				reason: {
					pornographic_content: "",
				},
				content: `
# Llogari e ndaluar
Qasja juaj në @:common.appName tani është e kufizuar.<br/><br/>
### Arsyeja e këtij veprimi
{BAN_REASON} <br/><br/>
### Kufizimet e aplikuara<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Ky vendim skadon me **{BAN_EXPIRE_AT}**.
_Nëse besoni se ky është një gabim, ju lutemi dërgoni email tek @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Ju nuk mund të ndërveproni më me aplikacionin",
					no_auth: "* Ju nuk mund të kyçeni më",
					no_ownership: "* Çfarëdo përmbajtje që ju keni krijuar nuk do të jetë më e disponueshme",
					memory_hole: "* Ju nuk do të jeni të dukshëm për përdoruesit tjerë",
					ip_blocked: "* IP juaj është bllokuar në të gjitha serviset @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Nuk mundëm ta gjenim",
		doctor_wtf: "Ç'dreqin është ky?",
		pot_friend: "Unë jam një tenxhere, mik",
	},
};
