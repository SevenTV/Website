export default {
	locale: "हिन्दी भाषा",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "और अधिक जानें",
		more: "अधिक",
		retry: "पुनः प्रयास करें",
		downloads: "डाउनलोड्स",
		features: "विशेषताएँ",
		comments: "टिप्पणियाँ",
		search: "खोजें",
		update: "अपडेट करें",
		report: "रिपोर्ट",
		activity: "गतिविधि",
		loading: "Loading",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "उपयोगकर्ता",
			emote_set: "ईमोट समूह",
			emote: "ईमोट",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "ईमोट प्लैटफ़ॉर्म सभी के लिए",
		app_description: "सैकड़ों ईमोट का प्रबंधन करें आपके ट्विच या यूट्यूब चैनलों के लिए आसानी से",
		why_app: "क्यों @:common.appname{'?'}",
		download_browser: "ब्राउज़र एक्सटेंशन",
		download_mobile: "मोबाइल एप्लिकेशन",
		download_misc: "कोई और ऐप",
		features: {
			emote_sets: {
				name: "ईमोट समूह",
				detail: "इमोट ग्रुप फंड के अनुकूलन योग्य सेट जिन्हें अन्य उपयोगकर्ताओं के साथ साझा किया जा सकता है या आपके चैनल पर जल्दी से स्वैप किया जा सकता है।",
			},
			many_emote_slots: {
				name: "सैकड़ों इमोट स्लॉट",
				detail: "{0} स्लॉट से प्रारंभ करें, संभव अधिकतम {1} और बिना पेवॉल के।",
			},
			channel_emote_names: {
				name: "प्रति-चैनल इमोट नाम",
				detail: "किसी इमोट का उसके लेखक द्वारा दिया गया नाम पसंद नहीं है? यह ठीक है, आप इसे केवल अपने चैनल के लिए बदल सकते हैं।",
			},
			real_time: {
				name: "रीयल-टाइम",
				detail: "आपके चैनल में इमोट को बदलना सभी दर्शकों के लिए तुरंत होता है। F5 के आवश्यक नहीं है।",
			},
			emote_versions: {
				name: "इमोट वर्ज़निंग",
				detail: "वेरिएंट थीम के बीच स्वैप करें या किसी भी इमोट में सुधार करें।",
			},
			next_gen: {
				name: "अगली पीढ़ी के इमेज प्रारूप जैसे WEBP और AVIF",
				detail: "हम बैंडविड्थ उपयोग को कम करने के लिए नए, अधिक अनुकूलित छवि प्रारूपों का उपयोग करते हैं।",
			},
			source_available: {
				name: "स्रोत-अनुपलब्ध",
				detail: "हमारा पूरा कोडबेस GitHub पर एक स्रोत-उपलब्ध लाइसेंस के साथ उपलब्ध है। कोई भी देख सकता है और योगदान दे सकता है।",
			},
		},
		socials: {
			discord: "शामिल हो @:common.appName Discord पर",
			discord_online_count: "{0} अब ऑनलाइन",
			twitter: "Twitter पर हमें फॉलो करें |",
			github: "योगदान करें",
		},
	},
	// Nav Bar
	nav: {
		home: "मुखपृष्ठ",
		about: "अधिक जानकारी",
		emotes: "इमोट्स",
		store: "सदस्य बनें",
		admin: "व्यवस्थापक",
		sign_in: "साइन इन करें",
		wip_notice: {
			heading: "Welcome to the new @:common.appName website",
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
		add: "नया इमोट डालें",
		author: "द्वारा जोड़ा",
		created_at: "निर्मित",
		versions: "संस्करणों",
		preview_loading: "Loading previews... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Failed to load previews",
		processing: "Processing Emote - this may take some time.",
		use: "उपयोग इमोट",
		switch_version: "इस संस्करण पर स्विच करें",
		in_n_sets: "समूह {0} में | समूह {0} में",
		disable: "इमोट अक्षम करें",
		update: "अपडेट करें",
		report: "रिपोर्ट इमोट",
		makePrivate: "निजी बनाना",
		makeGlobal: "Make Global",
		comments: "टिप्पणियाँ",
		channels: "चैनल्स",
		common_names: "इस इमोट के अन्य सामान्य नाम",
		usage_stats: "इमोट आंकड़े",
		list: {
			searching: "खोजना",
			emote_count: "{0} इमोट्स",
			no_emotes_listed: "इस नाम से कोई इमोट मौजूद नहीं है",
			fetching_slowly: "क्षमा करें, इसमें कुछ समय लग रहा है",
		},
		upload: {
			emote_name: "इमोट का नाम",
			version_name: "संस्करण का नाम",
			version_description: "संस्करण विवरण",
			submit_emote: "इमोट जमा करें",
			create_emote_version: "इमोट संस्करण बनाएं",
			image_upload: "चित्र अपलोड करें",
			accepted_formats: "स्वीकृत प्रारूप",
			filetype: "फ़ाइल",
			animation: "एनीमेशन",
			transparency: "पारदर्शिता",
			emote_details: "इमोट का विवरण",
			version_details: "संस्करण विवरण",
			attribution: "श्रेय",
			original_creator: "मूल निर्माता",
			as_child: "आप बना रहे हैं एक {IS_DIVERGED} संस्करण {0} का। ",
			content_moderation: "विषय संयम",
			half_transparency_tooltip:
				"पिक्सेल केवल पूरी तरह से पारदर्शी या पूरी तरह से अपारदर्शी हो सकते हैं (कोई परिवर्तनशील पारदर्शिता नहीं)",
		},
	},
	emote_set: {
		create: "नया @:common.object.emote_set",
		select: "चयन करें @:common.object.emote_set",
		explain: {
			section: "क्या हैं @:common.object.emote_set{'s'}?",
			hint: "इमोट सेट्स इमोट्स का एक संग्रह है जो आपके चैनलों के लिए बाध्य हो सकता है या अन्य उपयोगकर्ताओं के साथ साझा किया जा सकता है",
		},
		no_space: "खांचा समाप्त",
		none_selected: "कोई समूह नहीं चुना गया",
		editing: "संपादन {0}",
		owner: "{USER} का इमोट समूह",
		owned: "स्वामित्व इमोट समूह",
		label_renamed: "Renamed",
		label_conflict: "Conflict",
		label_default: "Default",
		modal: {
			selected_channel_count: "कोई चैनल नहीं चुना गया | {0} चैनल चुना गया | {0} चैनलों चुना गया",
			create_button: "बनाएँ @:common.object.emote_set",
			rename_in_set: "Rename in {0}",
			context_rename: "Customize Emote Name",
			context_set_default: "Assign As Default",
			context_unset_default: "Unassign As Default",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "इमोट समूह",
		channel_emotes: "चैनल इमोट्स",
		joined_at: "Joined {0}",
		editors: "संपादक",
		roles: "भूमिकाएं",
		no_channel_emotes: "{0} का उनके {1} चैनल पर कोई इमोट नहीं है",
		no_channels: "{0} से कोई चैनल संबंधित नहीं है!",
		card: {
			view_full_profile: "पूरा प्रोफाइल देखें",
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
		report: "रिपोर्ट",
		emote_reason: {
			i_made_this: "यह इमोट मैंने बनाया है लेकिन इसे किसी और ने अपलोड किया है",
			duplicate: "यह इमोट डुप्लीकेट है",
			pornographic: "इस इमोट में अश्लील या अत्यधिक कामुक चित्र शामिल हैं",
			violence_gore: "यह इमोटे अत्यधिक हिंसा या रक्तपात प्रस्तुत करता है",
			i_appear_there: "यह इमोट मुझे दर्शाता है और मुझे यह पसंद नहीं है",
			offensive: "मुझे यह इमोट आपत्तिजनक लगता है",
			other: "कुछ और",
		},
		uncategorized_prompt: "मामला क्या है",
		details: "विवरण (आपकी रिपोर्ट के लिए अतिरिक्त जानकारी और/या साक्ष्य)",
		success: "रिपोर्ट सफलतापूर्वक सबमिट हो गई",
		notify: "आपकी रिपोर्ट के संसाधित होने या अधिक जानकारी का अनुरोध किए जाने के बाद आपको इनबॉक्स के माध्यम से सूचित किया जाएगा",
		complete_step_one: "जारी रखें",
		abuse_notice: "रिपोर्ट सुविधा के दुरुपयोग से आपकी इस सुविधा के प्रति पहुंच निरस्त की जा सकती है",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "इनबॉक्स",
		tabs: {
			all: "सभी मैसेज",
			unread: "अपठित",
			important: "जरूरी",
		},
		unread_tag: "अपठित",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "इमोट लिस्टिंग के लिए स्वीकृत",
				content: `
# आपका इमोट "{EMOTE_NAME}" लिस्टिंग के लिए अनुमोदित किया गया था \n
यह अब पर उपलब्ध होगा इमोट निर्देशिका और पर दिखना शुरू हो जाएगा @:common.appHost पर {'.'}
`,
			},
			emote_not_listed: {
				subject: "इमोट लिस्टिंग के लिए स्वीकृत नहीं",
				content: `
# आपका इमोट "{EMOTE_NAME}" खारिज कर दिया गया था
यह इमोट्स डायरेक्टरी पर उपलब्ध नहीं होगा या पर दिखाई देगा @:common.appHost,
लेकिन लिंक वाले उपयोगकर्ताओं के लिए उपलब्ध रहेगा।
`,
			},
			emote_ownership_claim_request: {
				subject: "इमोट के स्वामित्व का दावा करने का निमंत्रण",
				content: `
## {OWNER_DISPLAY_NAME} आपको मालिक बनाना चाहता है '{EMOTE_NAME}' का

[इमोट देखें]({EMOTE_URL})

**[अनुरोध स्वीकार करें]({EMOTE_CLAIM_URL})** | [अनुरोध अस्वीकार करें]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "आप पर प्रतिबंध लगा दिया गया है",
				reason: {
					pornographic_content: "",
				},
				content: `
# उपयोग पर प्रतिबंध लगा दिया
आपकी पहुंच @:common.appName पर अब सीमित है।<br/><br/>
### इस कार्रवाई का कारण
{BAN_REASON}<br/><br/>
### प्रतिबंध लागू<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>यह निर्णय समाप्त हो रहा है **{BAN_EXPIRE_AT}** पर।
_ अगर आपको लगता है कि यह एक गलती है, तो कृपया email करें{'.'}_
`,
				effect: {
					no_permissions: "* अब आप इस ऐप का उपयोग नहीं कर सकते",
					no_auth: "* आप अब साइन इन नहीं कर सकते",
					no_ownership: "* आपके द्वारा बनाई गई कोई भी सामग्री अब उपलब्ध नहीं होगी",
					memory_hole: "* आप अन्य उपयोगकर्ताओं के लिए दृश्यमान नहीं होंगे",
					ip_blocked: "* आपके IP को @:common.appName सेवाएं एक्सेस करने से रोक दिया गया है",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "हम इसे नहीं ढूंढ सके",
		doctor_wtf: "क्या बकवास है?",
		pot_friend: "मैं एक मटका हूँ, दोस्त",
	},
};
