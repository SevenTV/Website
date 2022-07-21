export default {
	locale: "ქართული (საქართველო)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "გაიგეთ მეტი",
		more: "მეტი",
		retry: "ხელახლა ცდა",
		downloads: "ჩამოტვირთვა",
		features: "თვისებები",
		comments: "კომენტარები",
		search: "ძებნა",
		update: "განახლება",
		report: "დარეპორტება",
		activity: "აქტივობა",
		loading: "იტვირთება",
		save_changes: "ცვლილებების შენახვა",
		reset: "გადატვირთვა",
		object: {
			user: "მომხმარებელი",
			emote_set: "ემოუთების სეტი",
			emote: "ემოუთი",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "ემოუთების პლატფორმა ყველასათვის",
		app_description: "მარტივად მართეთ ასობით ემოუთ თქვენს ტვიჩის ან იუთუბის არხებზე",
		why_app: "რატომ @:common.appName{'?'}",
		download_browser: "ბრაუზერის გაფართოება",
		download_mobile: "მობილური აპლიკაციები",
		download_misc: "სხვა აპლიკაციები",
		features: {
			emote_sets: {
				name: "ემოუთების სეტები",
				detail: "დააჯგუფეთ ემოუთები კონფიგურირებად კომპლექტებში, რომლებიც შეიძლება გააზიაროთ სხვა მომხმარებლებთან ან სწრაფად შეიცვალოს თქვენს არხზე.",
			},
			many_emote_slots: {
				name: "ასობით ემოუთების სლოტი",
				detail: "დაიწყეთ {0} სლოტებით, შესაძლო მაქსიმუმ {1}-ით და გადახდის გარეშე.",
			},
			channel_emote_names: {
				name: "თითო არხის ემოუთების სახელები",
				detail: "არ მოგწონთ ავტორის მიერ ემოუთისათვის მიცემული სახელი? არა უშავს, თქვენ შეგიძლიათ შეცვალოთ იგი მხოლოდ თქვენი არხისთვის.",
			},
			real_time: {
				name: "რეალურ დროში",
				detail: "თქვენს არხზე ემოუთების შეცვლა ხდება მაშინვე, ყველა მნახველისთვის. F5 არ არის საჭირო.",
			},
			emote_versions: {
				name: "ემოუთების ვერსია",
				detail: "შეცვალეთ თემატურ ვარიანტებს შორის ან განაახლეთ ემოუთი გაუმჯობესებულ ვერსიაზე.",
			},
			next_gen: {
				name: "შემდეგი თაობის გამოსახულების ფორმატები, როგორც WEBP და AVIF",
				detail: "ჩვენ ვიყენებთ უფრო ახალ და აფტომიზირებულ სურათის ფორმატებს გამტარუნარიანობის გამოყენების შესამცირებლად.",
			},
			source_available: {
				name: "წყარო-ხელმისაწვდომი",
				detail: "მთელი ჩვენი კოდის ბაზა ხელმისაწვდომია GitHub-ზე წყარო-ხელმისაწვდომი ლიცენზიით. ნებისმიერს შეუძლია ნახოს და წვლილი შეიტანოს.",
			},
		},
		socials: {
			discord: "შეუერთდით @:common.appName'ს დისკორდზე",
			discord_online_count: "{0} ონლაინშია ახლა",
			twitter: "წაიკითხეთ ჩვენი ტვიტერი",
			github: "კონტრიბუცია",
		},
	},
	// Nav Bar
	nav: {
		home: "მთავარი",
		about: "შესახებ",
		emotes: "ემოუთები",
		store: "გამოწერა",
		admin: "ადმინისტრატორი",
		sign_in: "ავტორიზაცია",
		wip_notice: {
			heading: "მოგესალმებით ახალ @:common.appName ვებსაიტზე",
			text1: "ეს არის ახალი გამოცდილების ადრეული ანონსი @:common.appName{'.'}",
			text2: "მოიარე აქაურობა, გაეცანი სიახლეებსა და ჩვენც გაგვიზიარე შთაბეჭდილებები. ისიც გახსოვდეს, რომ გვერდი სწრაფად იცვლება და, შეიძლება, ზოგჯერ, და ხშირადაც, გაიჭედოს.",
		},
	},
	activity: {
		emote_created: "შექმნა {T}",
		emote_renamed: "გადაარქცა {T}-ს {O}-დან {N}-ში",
		emote_listing_approved: "დაამტკიცა {T} საჯარო სიისთვის",
		emote_listing_revoked: "წაშალა {T} საჯარო სიიდან",
		emote_merged: "{T} გაერთიანდა {0}-ში",
		emote_ownership_transferred: "{T}-ის მფლობელობა გადაეცა {U}-ს",
		emote_restored: "აღდგენილი {T}",
		emote_updated: "შეცვლილი თვისებები {T}-ისთვის",
		emote_deleted: "წაშლილი {T}",
		emote_version_created: "{T}-ისათვის შექმინილი ვერსია '{VER}'",
		emote_version_renamed: "გადარქმნილი ვერსია '{VER}' {T}-ისთვის {1}-დან {2}-მდე",
		emote_version_approved: "დამტკიცებული '{VER}'-ის ვერსია {T} საჯარო ჩამონათვლისათვის",
		emote_version_restored: "'{VER}'-ის აღდგენილი ვერსია {T}-ისათვის",
		emote_version_deleted: "'{VER}'-ის წაშლილი ვერსია {T}-ისათვის",
		user_created: "შექმნილი {T}",
		user_deleted: "წაშლილი {T}",
		user_editor_added: "დაამატა {U} როგორც ედიტორი",
		user_editor_added_other: "{U1} დამატებულია როგორც {U2}-ს ედიტორი",
		user_editor_removed: "გააუქმა {U}-ის ედიტორის პრივილეგიები",
		user_editor_removed_other: "გაუუქმდა {U1}-ის ედიტორის პრივილეგიები {U2}-ს",
		user_banned: "ბანი დაადო {T}",
		user_unbanned: "{T}-ს ბანი მოახსნა",
		user_updated: "შეცვლილი თვისებები {T}-ისთვის",
		user_sign_in: "{T} შევიდა",
		user_sign_out: "{T} გავიდა სისტემიდან",
		user_forbidden: "{T}-ს აეკრძალა წვდომა {0}-ზე",
		emote_set_created: "შექმნილი {T}",
		emote_set_emote_added: "დაამატა {AE} ემოუთი {T}-სთან",
		emote_set_emote_removed: "შაწალა {AE} ემოუთი {T}-ისგან",
		emote_set_emote_renamed: "გადაარქვა ემოუთ {AE}-ს {O}-დან {N}-ში {T}-ზე",
		emote_set_updated: "შეცვალა თვისებები {T}-ისთვის",
	},
	// Text that is relevant to emotes
	emote: {
		add: "ემოუთის დამატება",
		author: "დამატებულია მიერ",
		created_at: "შექმნა",
		versions: "ვერსიები",
		preview_loading: "გადახედვები იტვირთება... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "გადახედვის ჩატვირთვა ვერ მოხერხდა",
		processing: "ემოუთისის დამუშავება - ამას შეიძლება გარკვეული დრო დასჭირდეს.",
		use: "გამოიყენეთ ემოუთი",
		switch_version: "გადადით ამ ვერსიაზე",
		in_n_sets: "{0} სეტში | {0} სეტებში",
		disable: "გააუქმეთ ემოუთი",
		update: "განახლება",
		report: "დაარეპორტეთ ემოუთი",
		makePrivate: "დააპრივატეთ",
		makeGlobal: "Make Global",
		comments: "კომენტარები",
		channels: "არხები",
		common_names: "ამ ემოუთის სხვა სახელები",
		usage_stats: "ემოუთის სტატისტიკა",
		list: {
			searching: "ძიება",
			emote_count: "{0} ემოუთი",
			no_emotes_listed: "არც ერთი ემოუთი არე მოიძია",
			fetching_slowly: "გვაპატიეთ, როგორც ჩანს, ამას გარკვეული დრო სჭირდება",
		},
		upload: {
			emote_name: "ემოუთის სახელი",
			version_name: "ვერსიის სახელი",
			version_description: "ვერსიის აღწერა",
			submit_emote: "ემოუთის გაგზავნა",
			create_emote_version: "ემოუთის ვერსიის შექმნა",
			image_upload: "სურათის ატვირთვა",
			accepted_formats: "მხარდაჭერილი ფორმატები",
			filetype: "ფაილი",
			animation: "ანიმაცია",
			transparency: "გამჭირვალობა",
			emote_details: "ემოუთის დეტალები",
			version_details: "ვერსიის დეტალები",
			attribution: "ატრიბუცია",
			original_creator: "ორიგინალუღი შემქმნელი",
			as_child: "თქვენ ქმნით {0}-ის {IS_DIVERGED} ვერსიას. ",
			content_moderation: "კონტენტის მოდერაცია",
			half_transparency_tooltip:
				"პიქსელები შეიძლება იყოს მხოლოდ მთლიანად გამჭვირვალე ან სრულიად გაუმჭვირვალე (ცვლადი გამჭვირვალობის გარეშე)",
		},
	},
	emote_set: {
		create: "ახალი @:common.object.emote_set",
		select: "აირჩიეთ @:common.object.emote_set",
		explain: {
			section: "რა არის @:common.object.emote_set{'s'}?",
			hint: "ემოუთის სეტები არის ემოციების კოლექცია, რომელიც შეიძლება იყოს მიბმული თქვენს არხებზე ან გაუზიაროთ სხვა მომხმარებლებს.",
		},
		no_space: "სლოტები სავსეა",
		none_selected: "სეტი არაა არჩეული",
		editing: "რედაქტირება {0}",
		owner: "{USER}'ის ემოუთების სეტი",
		owned: "თქვენი ემოუთის სეტი",
		label_renamed: "გადაარქვა",
		label_conflict: "კონფლიქტშია",
		label_default: "სტანდარტული",
		modal: {
			selected_channel_count: "არხი არ არის არჩეული | არჩეულია {0} არხი | არჩეულია {0} არხი",
			create_button: "ახალი @:common.object.emote_set",
			rename_in_set: "გადარქმევა {0}-ში",
			context_rename: "ემოუთის სახელის მორგება",
			context_set_default: "მინიჭება როგორც სტანდარტული",
			context_unset_default: "სტანდარტულად მინიჭების გაუქმება",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "ემოუთების სეტები",
		channel_emotes: "არხის ემოუთები",
		joined_at: "შეუერთდა {0}",
		editors: "რედაქტორები",
		roles: "როლები",
		no_channel_emotes: "{0}-ს არ აქვს რაიმე ემოცია თავის {1} არხზე",
		no_channels: "{0}-ს არ აქვს დაკავშირებული არხები!",
		card: {
			view_full_profile: "სრული პროფილის ნახვა",
		},
		settings: {
			button: "პროფილის რედაქტირება",
			section_profile: "პროფილი",
			username: "მომხმარებელი",
			display_name: "ნაჩვენი სახელი",
			profile_picture: "პფოფილის ავატარი",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "დაარეპორტეთ",
		emote_reason: {
			i_made_this: "ეს ემოუთი გავაკეთე მაგრამ სხვა მომხმარებელმა ატვირთა",
			duplicate: "ეს ემოუთი არის დუბლიკატი",
			pornographic: "ეს ემოუთი შეიცავს პორნოგრაფიულ ან ზედმეტად სექსუალურ გამოსახულებებს",
			violence_gore: "ეს ემოუთი გამოხატავს ექსტრემალურ ძალადობას ან ზიზღს",
			i_appear_there: "ეს ემოუთი მასახავს და არ მომწონს",
			offensive: "ჩემთვის ეს ემოუთი შეურაცხმყოფელია",
			other: "სხვა რაღაცა",
		},
		uncategorized_prompt: "რა მოხდა?",
		details: "დეტალები (დამატებითი ინფორმაცია და/ან თქვენი რეპორტის მტკიცებულება)",
		success: "რეპორტი გაგზავნილია წარმატებით",
		notify: "თქვენ მიიღებთ შეტყობინებას ინბოქსის მეშვეობით თქვენი რეპორტის დამუშავების ან დამატებითი ინფორმაციის მოთხოვნის შემდეგ.",
		complete_step_one: "გაგრძელება",
		abuse_notice: "რეპორტების ფუნქციის არასწორედ გამოყენებამ შეიძლება გამოიწვიოს თქვენი ექაუნტის გაუქმება.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "შემოსული",
		tabs: {
			all: "ყველა შეტყობინება",
			unread: "წაუკითხავი",
			important: "მნიშვნელოვანი",
		},
		unread_tag: "წაუკითხავი",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "ემოუთი დამტკიცებულია ჩამონათვალისთვის",
				content: `
# თქვენი ემოუთი "{EMOTE_NAME}“ დამტკიცდა სიაში \n
ახლა ის ხელმისაწვდომი იქნება ემოუთების მიმართულებაში და გამოჩნდება @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "ემოუთი არაა დამტკიცებული ჩამონათვალისთვის",
				content: `
# თქვენი ემოუთი "{EMOTE_NAME}“ უარყოფილია
ის არ იქნება ხელმისაწვდომი ყველა ემოუთის მიმართულებაში ან ხილული @:common.appHost,
მაგრამ ხელმისაწვდომი დარჩება მომხმარებლებისთვის ბმულით.
`,
			},
			emote_ownership_claim_request: {
				subject: "მოწვევა ემოუთის მფლობელობის მოთხოვნით",
				content: `
## {OWNER_DISPLAY_NAME}-ს სურს, რომ გახდეთ „{EMOTE_NAME}“-ის მფლობელი

[ემოციის ნახვა]({EMOTE_URL})

**[მოთხოვნის მიღება]({EMOTE_CLAIM_URL})** | [მოთხოვნის უარყოფა]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "თქვენ ბანი დაგედოთ",
				reason: {
					pornographic_content: "",
				},
				content: `
# ექაუნტი დაბლოკილია
თქვენი წვდომა @:common.appName-ზე ახლა შეზღუდულია.<br/><br/>
### ამ მოქმედების მიზეზი
{BAN_REASON} <br/><br/>
### გამოყენებულია შეზღუდვები<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>ამ გადაწყვეტილებას ვადა ეწურება **{BAN_EXPIRE_AT}**.
_ თუ ფიქრობთ, რომ ეს შეცდომაა, გთხოვთ, ელფოსტით მისამართზე: @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* შესაძლოა აღარ იმოქმედოთ აპლიკაციასთან",
					no_auth: "* თქვენ შესვლას ვეღარ შეძლებთ",
					no_ownership: "* თქვენ მიერ შექმნილი ნებისმიერი კონტენტი აღარ იქნება ხელმისაწვდომი",
					memory_hole: "* სხვა მომხმარებლები თქვენ ვეღარ დაგინახავენ",
					ip_blocked: "* თქვენი IP დაბლოკილია ყველა @:common.appName სერვისზე წვდომისგან",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "ჩვენ ის ვერ ვიპოვეთ",
		doctor_wtf: "ეს რა ჯანდაბაა?",
		pot_friend: "ქოთანი ვარ, მეგობარო",
	},
};
