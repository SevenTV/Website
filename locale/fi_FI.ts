export default {
	locale: "Suomi (Suomi)",
	// Common / Repeated words and phrases
	common: {
		appName: "7TV",
		appHost: "7tv.app",
		supportEmail: "kathy{'@'}7tv.app",
		learnMore: "Lue lisää",
		more: "Enemmän",
		retry: "Yritä uudelleen",
		downloads: "Lataukset",
		features: "Ominaisuudet",
		comments: "Kommentit",
		search: "Haku",
		update: "Päivitä",
		report: "Ilmianna",
		activity: "Aktiivisuus",
		loading: "Ladataan...",
		save_changes: "Save Changes",
		reset: "Reset",
		object: {
			user: "Käyttäjä",
			emote_set: "Emote Sarja",
			emote: "Emote",
		},
	},
	// Text that appears on the home page
	home: {
		slogan: "Emote-alusta kaikille",
		app_description: "Hallitse satoja emoteja Twitch- tai YouTube-kanavillesi helposti",
		why_app: "Miksi @:common.appName{'?'}",
		download_browser: "Selainlaajennus",
		download_mobile: "Mobiilisovellukset",
		download_misc: "Muut sovellukset",
		features: {
			emote_sets: {
				name: "Emote Sarjat",
				detail: "Ryhmitä emoteja muokattavissa sarjoissa, joita voi jakaa muiden käyttäjien kanssa tai nopeasti vaihtaa omalle kanavallesi.",
			},
			many_emote_slots: {
				name: "Satoja emote-paikkoja",
				detail: "Aloita {0} paikalla, ja maksimissaan {1}, ilman maksumuuria.",
			},
			channel_emote_names: {
				name: "Kanavakohtaiset emote nimet",
				detail: "Etkö pidä tekijän antamasta nimestä emotelle? Ei hätää, voit muuttaa sen vain sinun kanavallesi.",
			},
			real_time: {
				name: "Reaaliaikainen",
				detail: "Kanavasi emotejen vaihtaminen tapahtuu välittömästi, kaikille katsojille. Ei tarvetta painaa F5.",
			},
			emote_versions: {
				name: "Emote versiointi",
				detail: "Vaihda teemaversioiden välillä tai päivitä emote parannettuun versioon.",
			},
			next_gen: {
				name: "Seuraavan sukupolven formaatti, kuten WEBP ja AVIF",
				detail: "Käytämme uudempia, paremmin optimoituja kuvaformaatteja vähentääksemme kaistanleveyden käyttöä.",
			},
			source_available: {
				name: "Lähde - saatavilla",
				detail: "Koko koodikantamme on saatavilla GitHubissa lähdekoodilla saatavalla lisenssillä. Kuka tahansa voi katsella ja osallistua.",
			},
		},
		socials: {
			discord: "Liity @:common.appName Discord",
			discord_online_count: "{0} verkossa nyt",
			twitter: "Seuraa meitä Twitterissä",
			github: "Osallistu",
		},
	},
	// Nav Bar
	nav: {
		home: "Etusivu",
		about: "Tietoa",
		emotes: "Emotet",
		store: "Tilaa",
		admin: "Ylläpito",
		sign_in: "Kirjaudu sisään",
		wip_notice: {
			heading: "Tervetuloa uudelle @:common.appName -sivustolle",
			text1: "Tämä on varhainen esikatselu seuraavasta tavasta kokea @:common.appName{'.'}",
			text2: "Tutki uusia asioita ja anna meille palautetta! Huomaa, että se tulee läpikäymään reippaita muutoksia ja voi hajota usein.",
		},
	},
	activity: {
		emote_created: "Luotiin {T}",
		emote_renamed: "Uudelleennimettiin {T} nimestä {O} nimeen {N}",
		emote_listing_approved: "{T} hyväksyttiin julkiselle listalle",
		emote_listing_revoked: "{T} poistettiin julkistelta listalle",
		emote_merged: "{T} yhdistettiin kohteeseen {0}",
		emote_ownership_transferred: "Kohteen {T} omistusoikeudet siirrettiin käyttäjälle {U}",
		emote_restored: "Palautettiin {T}",
		emote_updated: "Muutettiin ominaisuuksia kohteelle {T}",
		emote_deleted: "Poistettiin {T}",
		emote_version_created: "Luotiin versio '{VER}' kohteelle {T}",
		emote_version_renamed: "Uudelleennimettiin versio '{VER}' kohteelle {T} nimestä {1} nimeen {2}",
		emote_version_approved: "Hyväksyttiin versio '{VER}' kohteelle {T} julkiselle listalle",
		emote_version_restored: "Palautettiin versio '{VER}' kohteelle {T}",
		emote_version_deleted: "Poistettiin versio '{VER}' kohteelle {T}",
		user_created: "Luotiin {T}",
		user_deleted: "Poistettiin {T}",
		user_editor_added: "{U} lisättiin muokkaajaksi",
		user_editor_added_other: "{U1} lisättiin käyttäjän {U2} muokkaajaksi",
		user_editor_removed: "Käyttäjän {U} muokkausoikeudet poistettiin",
		user_editor_removed_other: "Käyttäjän {U1} muokkausoikeudet kohteeseen {U2} poistettiin",
		user_banned: "Kielletty {T}",
		user_unbanned: "Kohteen {T} esto poistettiin",
		user_updated: "Muutettiin ominaisuuksia kohteelle {T}",
		user_sign_in: "{T} on kirjautunut sisään",
		user_sign_out: "{T} on kirjautunut ulos",
		user_forbidden: "{T} estettiin pääsemästä kohteeseen {0}",
		emote_set_created: "Luotiin {T}",
		emote_set_emote_added: "Lisättiin emote {AE} kohteeseen {T}",
		emote_set_emote_removed: "Poistettiin emote {AE} kohteesta {T}",
		emote_set_emote_renamed: "Uudelleennimettiin emote {AE} nimestä {O}, nimeen {N}, kohteessa {T}",
		emote_set_updated: "Muutettiin ominaisuuksia kohteelle {T}",
	},
	// Text that is relevant to emotes
	emote: {
		add: "Lisää Emote",
		author: "Lisääjä on",
		created_at: "Luotu",
		versions: "Versiot",
		preview_loading: "Ladataan esikatseluja... {'('}{0}{'/'}{1}{')'}",
		preview_failed: "Esikatselujen lataaminen epäonnistui",
		processing: "Emotea käsitellään – tämä voi kestää jonkin aikaa.",
		use: "Käytä Emotea",
		switch_version: "Vaihda tähän versioon",
		in_n_sets: "{0} sarjassa | {0} sarjassa",
		disable: "Poista Emote Käytöstä",
		update: "Päivitä",
		report: "Ilmianna Emote",
		makePrivate: "Aseta yksityiseksi",
		makeGlobal: "Make Global",
		comments: "Kommentit",
		channels: "Kanavat",
		common_names: "Muita nimiä tälle emotelle",
		usage_stats: "Emote Tilastot",
		list: {
			searching: "Etsitään",
			emote_count: "{0} emotea",
			no_emotes_listed: "Ei löytyneitä emoteja",
			fetching_slowly: "Pahoittelut, tämä näyttää vievän jonkin aikaa",
		},
		upload: {
			emote_name: "Emoten Nimi",
			version_name: "Version Nimi",
			version_description: "Version Kuvaus",
			submit_emote: "Lähetä Emote",
			create_emote_version: "Luo emote versio",
			image_upload: "Kuvan Lataus",
			accepted_formats: "Hyväksytyt muodot",
			filetype: "Tiedosto",
			animation: "Animaatio",
			transparency: "Läpinäkyvyys",
			emote_details: "Lisätietoa emotesta",
			version_details: "Version tiedot",
			attribution: "Kunnioitukset",
			original_creator: "Alkuperäinen luoja",
			as_child: "Olet luomassa {IS_DIVERGED} versiota kohteesta {0}. ",
			content_moderation: "Sisällön Moderointi",
			half_transparency_tooltip:
				"Pikselit voivat olla vain täysin läpinäkyviä tai täysin läpinäkymättömiä (ei vaihtelevaa läpinäkyvyyttä)",
		},
	},
	emote_set: {
		create: "Uusi @:common.object.emote_set",
		select: "Valitse @:common.object.emote_set",
		explain: {
			section: "Mitä ovat @:common.object.emote_set{'s'}?",
			hint: "Emote Sarjat ovat kokoelma emoteja, jotka voidaan sitoa kanaviisi tai jakaa muiden käyttäjien kanssa.",
		},
		no_space: "Ei vapaita paikkoja",
		none_selected: "Ei valittua",
		editing: "Muokkaus {0}",
		owner: "{USER} Emote Sarja",
		owned: "Omistettu Emote Sarja",
		label_renamed: "Renamed",
		label_conflict: "Konflikti",
		label_default: "Oletusarvo",
		modal: {
			selected_channel_count: "ei kanavaa valittuna | {0} kanava valittuna | {0} kanavaa valittuna",
			create_button: "Luo @:common.object.emote_set",
			rename_in_set: "Uudelleennimetty kohteessa {0}",
			context_rename: "Muokkaa Emoten Nimeä",
			context_set_default: "Määritä Oletukseksi",
			context_unset_default: "Poista määritys oletusarvoksi",
		},
	},
	// Text that is relevant to users
	user: {
		emote_sets: "Emote Sarjat",
		channel_emotes: "Kanava Emotet",
		joined_at: "Joined {0}",
		editors: "Muokkaajat",
		roles: "Roolit",
		no_channel_emotes: "Käyttäjällä {0} ei ole emoteja heidän {1} -kanavallaan",
		no_channels: "Käyttäjällä {0} ei ole yhdistettyjä kanavia!",
		card: {
			view_full_profile: "Näytä koko profiili",
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
		report: "Ilmianna",
		emote_reason: {
			i_made_this: "Tein tämän emoten mutta sen oli ladannut joku muu",
			duplicate: "Tämä emote on kaksoiskappale",
			pornographic: "Tämä emote sisältää pornografista tai liian seksuaalisista sisältöä",
			violence_gore: "Tämä emote sisältää verisyyttä tai kovaa väkivaltaa",
			i_appear_there: "Tämä emote kuvaa minua enkä pidä siitä",
			offensive: "Löydän tämän emoten loukkaavana",
			other: "Jokin muu",
		},
		uncategorized_prompt: "Mikä hätänä?",
		details: "Yksityiskohdat (lisätietoja ja/tai todisteita raporttia varten)",
		success: "Raportti lähetetty onnistuneesti",
		notify: "Sinulle ilmoitetaan postilaatikon kautta, kun raporttisi on käsitelty tai lisätietoja pyydetään.",
		complete_step_one: "Jatka",
		abuse_notice: "Ilmianto-ominaisuuden väärinkäyttö voi johtaa käyttöoikeutesi perumiseen.",
	},
	// Text that is relevant to the inbox
	inbox: {
		inbox: "Postilaatikko",
		tabs: {
			all: "Kaikki Viestit",
			unread: "Lukemattomat",
			important: "Tärkeät",
		},
		unread_tag: "Lukematon",
		// System inbox messages
		generic: {
			emote_listed: {
				subject: "Emote hyväksytty listaamiselle",
				content: `
# Sinun emote "{EMOTE_NAME}" hyväksyttiin listalle \n
Se on nyt saatavilla Emote Hakemistolla ja alkaa näkyä @:common.appHost{'.'}
`,
			},
			emote_not_listed: {
				subject: "Emote ei hyväksytty listaamiselle",
				content: `
# Sinun emote "{EMOTE_NAME}" hylättiin
Se ei ole saatavilla julkisella Emote Hakemistolla tai näkyvissä @:common.appHost,
mutta pysyy saatavilla käyttäjille, joilla on linkki.
`,
			},
			emote_ownership_claim_request: {
				subject: "Kutsu emoten omistajuuden vastaanottamiseen",
				content: `
## {OWNER_DISPLAY_NAME} haluaa sinun tulevan kohteen {EMOTE_NAME} omistajaksi

[Näytä Emote]({EMOTE_URL})

**[Hyväksy pyyntö]({EMOTE_CLAIM_URL})** | [Hylkää pyyntö]({EMOTE_DECLINE_URL})`,
			},
			client_banned: {
				subject: "Olet saanut porttikiellon",
				reason: {
					pornographic_content: "",
				},
				content: `
# Tili estetty
Käyttöoikeutesi osoitteeseen @:common.appName on nyt rajoitettu.<br/><br/>
### Syy tähän toimenpiteeseen
{BAN_REASON} <br/><br/>
### Rajoitukset voimassa<br/>
{EFFECT_NO_PERMISSIONS}
{EFFECT_NO_AUTH}
{EFFECT_NO_OWNERSHIP}
{EFFECT_MEMORY_HOLE}

<br/>Tämä päätös umpeutuu **{BAN_EXPIRE_AT}**.
_Jos uskot tämän olleen virhe, ota yhteyttä sähköpostiin @:common.supportEmail{'.'}_
`,
				effect: {
					no_permissions: "* Ette voi jatkaa sovelluksen käyttöä",
					no_auth: "* Ette voi enää kirjautua sisään",
					no_ownership: "* Mikään luomanne sisältö ei ole enää saatavilla",
					memory_hole: "* Ette ole näkyvä toisille käyttäjille",
					ip_blocked: "* IP-osoitteesi on estetty käyttämästä kaikkia @:common.appName palveluita",
				},
			},
		},
	},
	// 404 Messages
	notFound: {
		troll_despair: "Emme löytäneet sitä",
		doctor_wtf: "Mitä ihmettä tämä on?",
		pot_friend: "Minä olen pata, ystävä",
	},
};
