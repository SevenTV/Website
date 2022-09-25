import { IconDefinition, IconPack, IconPrefix, library } from "@fortawesome/fontawesome-svg-core";

import {
	faChrome as fabChrome,
	faFirefox as fabFirefox,
	faEdge as fabEdge,
	faOpera as fabOpera,
	faTwitter as fabTwitter,
	faGithub as fabGithub,
	faTwitch as fabTwitch,
	faYoutube as fabYoutube,
	faDiscord as fabDiscord,
	faCcPaypal as fabPaypal,
} from "@fortawesome/free-brands-svg-icons";

type FreeType = keyof typeof import("@fortawesome/free-solid-svg-icons");
const freeIcons = {
	faCircleCheck: null,
	faObjectUngroup: null,
	faMoon: null,
	faEnvelope: null,
	faCircle: null,
	faBars: null,
	faPlus: null,
	faMinus: null,
	faStar: null,
	faSlash: null,
	faLock: null,
	faPen: null,
	faFlag: null,
	faCheck: null,
	faChevronRight: null,
	faChevronLeft: null,
	faGavel: null,
	faCopy: null,
	faExclamationTriangle: null,
	faExclamation: null,
	faExternalLinkAlt: null,
	faCalendarAlt: null,
	faPalette: null,
	faCube: null,
	faGear: null,
	faUsersCog: null,
	faEllipsisH: null,
	faEllipsisV: null,
	faColumns: null,
	faTrash: null,
	faTimes: null,
	faSearch: null,
	faReply: null,
	faArrowLeft: null,
	faObjectGroup: null,
	faLayerGroup: null,
	faEye: null,
	faEyeSlash: null,
	faTag: null,
	faLanguage: null,
	faChevronDown: null,
	faUser: null,
	faUserPlus: null,
	faUserMinus: null,
	faSave: null,
	faDownload: null,
	faRotateRight: null,
	faFire: null,
	faHashtag: null,
	faBrush: null,
	faTicket: null,
	faSmile: null,
	faCreditCard: null,
	faClock: null,
	faTrophy: null,
	faGift: null,
	faUserPen: null,
	faListCheck: null,
	faCodeBranch: null,
	faWrench: null,
	faUnlock: null,
	faUndo: null,
	faFilter: null,
	faSquare: null,
} as Record<FreeType, IconDefinition | IconPack | IconPrefix | null | undefined>;

type ProType = keyof typeof import("@fortawesome/sharp-solid-svg-icons");
const proIcons = {
	faCakeSlice: null,
	faSquareQuestion: null,
	faTimer: null,
	faPenField: null,
	faPumpkin: null,
	faSunBright: null,
	faHexagonPlus: null,
	faChevronsDown: null,
	faChevronsRight: null,
	faSeal: null,
} as Record<ProType, IconDefinition | IconPack | IconPrefix | null | undefined>;

export const loadIcons = async () => {
	const isPro = import.meta.env.VITE_APP_FA_PRO === "true";

	const pack = [] as IconDefinition[];
	if (isPro) {
		await import("@fortawesome/sharp-solid-svg-icons").then((icons) => {
			Object.keys({ ...proIcons, ...freeIcons }).forEach((key) => {
				pack.push(icons[key] as IconDefinition);
			});
		});
	} else {
		await import("@fortawesome/free-solid-svg-icons").then((icons) => {
			Object.keys(freeIcons).forEach((key) => {
				pack.push(icons[key] as IconDefinition);
			});
		});
	}

	const fab = [
		fabChrome,
		fabFirefox,
		fabEdge,
		fabOpera,
		fabTwitter,
		fabGithub,
		fabTwitch,
		fabYoutube,
		fabDiscord,
		fabPaypal,
	];

	library.add(...pack, ...fab);
};
