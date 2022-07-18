export default {
	locale: "Polski (Polska)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Dowiedz się więcej",
		more: "Więcej",
		retry: "Ponów",
		downloads: "Pobrane",
		features: "Funkcje",
		comments: "Komentarze",
		search: "Szukaj",
		update: "Zaktualizuj",
		report: "Zgłoś",
		activity: "Aktywność",
		loading: "Ładowanie",
		object: {
			user: "Użytkownik",
			emote_set: "Zestaw emotek",
			emote: "Emotka",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Platforma z emotkami dla każdego",
		app_description: "Z łatwością zarządzaj emotkami dla kanałów Twitch lub YouTube",
		why_app: "Dlaczego @:common.appName{'?'}",
		download_browser: "Rozszerzenie do przeglądarki",
		download_mobile: "Aplikacje mobilne",
		download_misc: "Inne aplikacje",
		features: {
			emote_sets: {
				name: "Zestaw Emotek",
				detail: "Grupuj emotki w konfigurowalnych zestawach, które możesz udostępniać innym użytkownikom lub szybko zamieniać na swój kanał.",
			},
			many_emote_slots: {
				name: "Setki miejsc na emotki",
				detail: "Zacznij od {0} slotów, z możliwą maksymalną ilością {1} bez płacenia.",
			},
			channel_emote_names: {
				name: "Nazwy emotek dla kanału",
				detail: "Nie podoba ci się nazwa emotki nadana przez twórcę? Możesz ją zmienić tylko dla swojego kanału.",
			},
			real_time: {
				name: "W czasie rzeczywistym",
				detail: "Zmiana emotek na twoim kanale odbywa się natychmiast, dla wszystkich użytkowników. F5 nie jest wymagane.",
			},
			emote_versions: {
				name: "Wersjonowanie Emotki",
				detail: "Zamień między wariantami tematycznymi lub zaktualizuj emotę do ulepszonej wersji.",
			},
			next_gen: {
				name: "Formaty obrazów następnej generacji, takie jak WEBP i AVIF",
				detail: "Używamy nowszych, bardziej zoptymalizowanych formatów obrazów, aby zmniejszyć zużycie pasma.",
			},
			source_available: {
				name: "Kod źródłowy dostępny",
				detail: "Cała nasza baza kodu jest dostępna na GitHub z licencją source-available. Każdy może przeglądać i wnosić wkład.",
			},
		},
		socials: {
			discord: "Dołącz do @:common.appName na Discordzie",
			discord_online_count: "{0} Aktualnie aktywnych",
			twitter: "Zaobserwuj nas na Twitterze",
			github: "Współtwórz",
		},
	},
	// Nav Bar
	nav: {
		home: "Strona główna",
		about: "O Aplikacji",
		emotes: "Emotki",
		store: "Subskrybuj",
		admin: "Administrator",
		sign_in: "Zaloguj się",
		wip_notice: {
			heading: "Witamy na nowej stronie @:common.appName",
			text1: "To jest wczesny podgląd nowego sposobu na doświadczenie @:common.appName{'.'}",
			text2: "Przeglądaj to, co nowe i przekaz nam swoją opinię! Zauważ, że strona nie jest dokończona. Niektóre funkcje, mogą często nie działać. Strona będzie często przechodziła przez zmiany.",
		},
	},
	activity: {
		emote_created: "Utworzono {T}",
		emote_renamed: "Użytkownik {ICO} zmienił nazwę {T} z {O} na {N}",
		emote_listing_approved: "Zatwierdzono {T} do publicznej listy emotek",
		emote_listing_revoked: "Usunięto {T} z publicznej listy emotek",
		emote_merged: "Scalono {T} z {0}",
		emote_ownership_transferred: "Przeniesiono prawa własności {T} do {U}",
		emote_restored: "Przywrócono {T}",
		emote_updated: "Zmieniono właściwości dla {T}",
		emote_deleted: "Usunięto {T}",
		emote_version_created: "Utworzono wersję '{VER}' dla {T}",
		emote_version_renamed: "Zmieniono nazwę wersji '{VER}' dla {T} z {1} na {2}",
		emote_version_approved: "Zatwierdzono wersję '{VER}' dla {T} do publicznej listy emotek",
		emote_version_restored: "Przywrócono wersję '{VER}' dla {T}",
		emote_version_deleted: "Usunięto wersję '{VER}' dla {T}",
		user_created: "Utworzono {T}",
		user_deleted: "Usunięto {T}",
		user_editor_added: "Dodano {T} jako edytora kanału",
		user_editor_added_other: "Dodano {U1} jako edytora kanału {U2}",
		user_editor_removed: "Usunięto {U} jako edytora kanału",
		user_editor_removed_other: "Usunięto {U1} jako edytora kanału {U2}",
		user_banned: "Zbanowano {T}",
		user_unbanned: "Odbanowano {T}",
		user_updated: "Zmieniono właściwości dla {T}",
		user_sign_in: "Użytkownik {T} zalogował się",
		user_sign_out: "Użytkownik {T} wylogował się",
		user_forbidden: "{T} został pozbawiony dostępu do {0}",
		emote_set_created: "Stworzono {T}",
		emote_set_emote_added: "Dodano emotkę {AE} do {T}",
		emote_set_emote_removed: "Usunięto emotkę {AE} z {T}",
		emote_set_emote_renamed: "Zmieniono nazwę emotki {AE} z {O} na {N} w {T}",
		emote_set_updated: "Zmieniono właściwości dla {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Dodaj emotkę",
		author: "Dodane przez",
		created_at: "Stworzone",
		versions: "Wersje",
		preview_loading: "Ładowanie podglądu... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Nie udało się wczytać podglądu",
		processing: "Przetwarzanie emotki - to może zająć trochę czasu.",
		use: "Użyj emotki",
		switch_version: "Zmień na tę wersję",
		in_n_sets: "w {0} zestawie | w {0} zestawach",
		disable: "Wyłącz emotkę",
		update: "Aktualizacja",
		report: "Zgłoś emotkę",
		makePrivate: "Ustaw jako prywatne",
		makeGlobal: "Ustaw jako globalny",
		comments: "Komentarze",
		channels: "Kanały",
		common_names: "Inne nazwy dla tej emotki",
		usage_stats: "Statystyki tej emotki",
		list: {
			searching: "Wyszukiwanie",
			emote_count: "{0} emotki",
			no_emotes_listed: "Nie znaleziono żadnych emotek",
			fetching_slowly: "Przykro nam. Wygląda na to, że trwa to chwilę",
		},
		upload: {
			emote_name: "Nazwa emotki",
			version_name: "Nazwa wersji",
			version_description: "Opis wersji",
			submit_emote: "Prześlij emotkę",
			create_emote_version: "Utwórz nową wersję emotki",
			image_upload: "Przesyłanie obrazu",
			accepted_formats: "Dozwolone formaty",
			filetype: "Plik",
			animation: "Animacja",
			transparency: "Przezroczystość",
			emote_details: "Szczegóły Emotki",
			version_details: "Szczegóły Wersji",
			attribution: "Źródło",
			original_creator: "Oryginalny Twórca",
			as_child: "Tworzysz {IS_DIVERGED} wersję {0}. ",
			content_moderation: "Moderacja treści",
			half_transparency_tooltip:
				"Piksele mogą być wyłącznie w pełni przezroczyste lub w pełni nieprzezroczyste (bez zmiennej przezroczystości)",
		},
	},
	emote_set: {
		create: "Nowy @:common.object.emote_set",
		select: "Wybierz @:common.object.emote_set",
		explain: {
			section: "Czym są @:common.object.emote_set{'s'}?",
			hint: "Zestawy emotek to zbiór emotek, które mogą być powiązane z twoimi kanałami lub współdzielone z innymi użytkownikami.",
		},
		no_space: "Brak wolnych slotów",
		none_selected: "Nie wybrano żadnego zestawu emotek",
		editing: "Edytowane {0}",
		owner: "Zestaw emotek {USER}",
		owned: "Własny zestaw emotek",
		label_renamed: "Zmieniono nazwę",
		label_conflict: "Błąd",
		label_default: "Domyślny",
		modal: {
			selected_channel_count: "nie wybrano żadnego kanału | {0} wybrany kanał | {0} wybrane kanały",
			create_button: "Stwórz @:common.object.emote_set",
			rename_in_set: "Zmień nazwę w {0}",
			context_rename: "Dostosuj Nazwę Emotki",
			context_set_default: "Przypisz jako domyślne",
			context_unset_default: "Usuń Przypisanie Jako Domyślne",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Zestawy Emotek",
		channel_emotes: "Emotki kanału",
		editors: "Edytorzy",
		roles: "Role",
		no_channel_emotes: "{0} nie posiada żadnych emotek na swoim kanale {1}",
		no_channels: "{0} nie ma żadnych połączonych kanałów!",
		card: {
			view_full_profile: "Zobacz pełny profil",
		},
	},
	store: {},
	// Text that is relating to the reporting system
	reporting: {
		report: "Zgłoś",
		emote_reason: {
			i_made_this: "Emotka została stworzona przeze mnie, ale została przesłana przez kogoś innego",
			duplicate: "Emotka jest duplikatem innej emotki",
			pornographic: "Emotka przedstawia treści pornograficzne, lub nadmiernie seksualne",
			violence_gore: "Emotka przedstawia ekstremalną przemoc lub przelew krwi",
			i_appear_there: "Emotka przedstawia moją osobę i mi się to nie podoba",
			offensive: "Uważam, że ta emotka jest obraźliwa",
			other: "Coś innego",
		},
		uncategorized_prompt: "O co chodzi?",
		details: "Szczegóły (dodatkowe informacje i/lub dowody dotyczące zgłoszenia)",
		success: "Pomyślnie przesłano zgłoszenie",
		notify: "Zostaniesz powiadomiony przez skrzynkę odbiorczą po obsłudze zgłoszenia lub po żądaniu dalszych informacji.",
		complete_step_one: "Kontynuuj",
		abuse_notice: 'Nadużywanie funkcji "zgłoś" może prowadzić do cofnięcia dostępu.',
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Skrzynka Odbiorcza",
		tabs: {
			all: "Wszystkie Wiadomości",
			unread: "Nieprzeczytane",
			important: "Ważne",
		},
		unread_tag: "Nieprzeczytane",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emotka Zatwierdzona do Listy",
				content: `
# Twoja emotka "{EMOTE_NAME}" została zatwierdzona do listy \n
Będzie ona teraz dostępna w katalogu Emotki oraz zacznie pojawiać się na @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emotka niezatwierdzona do listy",
				content: `
# Twoja emotka "{EMOTE_NAME}" została odrzucona.
Nie będzie dostępna publicznie poprzez wyszukiwarkę @:common.appHost,
lecz pozostanie dostępna dla użytkowników z linkiem.
`,
			},
			emote_ownership_claim_request: {
				subject: "Prośba do przyznania własności do emotki",
				content: `
## {OWNER_DISPLAY_NAME} chce, abyś został właścicielem '{EMOTE_NAME}'

[Zobacz emotkę]({EMOTE_URL})

**[Zaakceptuj prośbę]({EMOTE_CLAIM_URL})** | [Odrzuć prośbę]({EMOTE_DECLINE_URL})
				`,
			},
			client_banned: {
				subject: "Zostałeś zbanowany",
				reason: {
					pornographic_content: "",
				},
				content: `
# Konto Zbanowane
twój dostęp do @:common.appName został ograniczony. <br/><br/>
{BAN_REASON} <br/><br/>
### Ograniczenia Nałożone <br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Czas trwania ograniczenia **{BAN_EXPIRE_AT}**.
_Jeżeli uważasz, że to pomyłka, prosimy o przesłanie wiadomości na @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Nie możesz już dłużej używać tej aplikacji",
					no_auth: "* Nie możesz się już zalogować",
					no_ownership: "* Żadne utworzone przez Ciebie treści nie będą już dostępne",
					memory_hole: "* Nie będziesz widoczny dla innych użytkowników",
					ip_blocked: "* Twój adres IP został zablokowany z korzystania ze wszystkich usług @:common.appName",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Nie mogliśmy nic znaleźć",
		doctor_wtf: "Co to do cholery jest?",
		pot_friend: "Jestem garnkiem, przyjacielu",
	},
};
