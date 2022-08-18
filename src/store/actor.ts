import { ActiveEmote, EmoteSet } from "@structures/EmoteSet";
import { User } from "@structures/User";
import { defineStore } from "pinia";
import { LocalStorageKeys } from "@store/lskeys";
import { useModal } from "./modal";
import { ApolloError } from "@apollo/client/errors";
import { useQuery } from "@vue/apollo-composable";
import { GetCosmetics } from "@/assets/gql/cosmetics/cosmetics";
import { Permissions } from "@/structures/Role";
import { ImageFormat } from "@/structures/Common";
import { UAParser, UAParserInstance, IBrowser } from "ua-parser-js";
import ModalError from "@components/modal/ModalError.vue";

export interface State {
	user: User | null;
	activeEmotes: Map<string, ActiveEmote>;
	editableEmoteSets: Map<string, EmoteSet>;
	defaultEmoteSetID: string | null;
	agent: UAParserInstance;
	preferredFormat: ImageFormat;
}

export const useActorStore = defineStore("actor", {
	state: () =>
		({
			user: null,
			activeEmotes: new Map<string, ActiveEmote>(),
			editableEmoteSets: new Map<string, EmoteSet>(),
			defaultEmoteSetID: localStorage.getItem(LocalStorageKeys.DEFAULT_SET),
			agent: new UAParser(),
			preferredFormat: ImageFormat.WEBP,
		} as State),
	getters: {
		id(): string {
			return this.user?.id ?? "";
		},
		channelEmoteSets(): EmoteSet[] {
			if (!this.user) {
				return [];
			}

			const a = this.user.connections?.map((uc) => uc.emote_set_id).filter((s) => s) as string[];
			const result = [] as EmoteSet[];
			for (const es of this.editableEmoteSets.values()) {
				if (a.includes(es.id)) {
					result.push(es);
				}
			}
			return result;
		},
		defaultEmoteSet(): EmoteSet | null {
			if (!this.user) {
				return null;
			}

			return this.defaultEmoteSetID ? this.editableEmoteSets.get(this.defaultEmoteSetID) ?? null : null;
		},
		connections(): User.Connection[] {
			if (!this.user) {
				return [];
			}
			return this.user?.connections;
		},
		browser(): IBrowser {
			return this.agent.getBrowser();
		},
		avifSupported(): boolean {
			return this.browser.name === "Chrome" && parseInt(this.browser.version as string, 10) >= 100;
		},
	},
	actions: {
		setUser(user: User | Identity | null) {
			if (!(user as Identity)?._idty) {
				this.user = user as User;
			} else if (user && (user as Identity)._idty) {
				this.user = {
					id: user.id,
					display_name: user.display_name,
					tag_color: user.tag_color,
					avatar_url: user.avatar_url,
				} as User;
			}

			// Update persisted identity
			if (user) {
				localStorage.setItem(
					LocalStorageKeys.IDENTITY,
					JSON.stringify({
						id: user.id,
						display_name: user.display_name,
						tag_color: user.tag_color,
						avatar_url: user.avatar_url,
					} as Identity),
				);
			} else {
				localStorage.removeItem(LocalStorageKeys.IDENTITY);
			}
		},
		getIdentity(): Identity | null {
			const v = localStorage.getItem(LocalStorageKeys.IDENTITY);
			if (v) {
				return JSON.parse(v);
			}
			return null;
		},
		updateUser(u: User) {
			if (!this.user) {
				return;
			}

			if (u.username !== this.user.username) {
				this.user.username = u.username;
			}
			if (u.display_name !== this.user.display_name) {
				this.user.display_name = u.display_name;
			}
			if (u.email !== this.user.email) {
				this.user.email = u.email;
			}
			this.user.connections = u.connections;
			if (typeof u.tag_color === "number") {
				this.user.tag_color = u.tag_color;
			}
			if (Array.isArray(u.roles)) {
				this.user.roles = u.roles;
			}
			if (u.avatar_url !== this.user.avatar_url) {
				this.user.avatar_url = u.avatar_url;
			}
		},
		updateActiveEmotes() {
			this.activeEmotes.clear();
			if (this.defaultEmoteSet && Array.isArray(this.defaultEmoteSet.emotes)) {
				this.defaultEmoteSet.emotes.forEach((ae) => this.activeEmotes.set(ae.id, ae));
			}
		},
		setDefaultEmoteSetID(id: string) {
			this.activeEmotes.clear();
			if (id) {
				localStorage.setItem(LocalStorageKeys.DEFAULT_SET, id);
				this.defaultEmoteSetID = id;
				this.defaultEmoteSet?.emotes.forEach((ae) => this.activeEmotes.set(ae.id, ae));
			} else {
				localStorage.removeItem(LocalStorageKeys.DEFAULT_SET);
				this.defaultEmoteSetID = "";
			}
		},

		// Editable Emote Sets
		addEmoteSet(set: EmoteSet) {
			this.editableEmoteSets.set(set.id, set);
		},
		updateEmoteSet(d: EmoteSet) {
			const set = this.getEmoteSet(d.id);
			if (!set) {
				return;
			}
			if (Array.isArray(d.emotes)) {
				set.emotes = d.emotes;
			}
			this.editableEmoteSets.set(set.id, set);
			this.updateActiveEmotes();
		},
		removeEmoteSet(id: string) {
			this.editableEmoteSets.delete(id);
		},
		getEmoteSet(id: string): EmoteSet | null {
			return this.editableEmoteSets.get(id) ?? null;
		},
		getActiveEmoteInSet(setID: string, emoteID: string): ActiveEmote | null {
			return this.editableEmoteSets.get(setID)?.emotes?.filter((ae) => ae.id === emoteID)[0] ?? null;
		},
		getActiveEmoteInSetByName(setID: string, name: string): ActiveEmote | null {
			const set = this.getEmoteSet(setID);
			if (!set) {
				return null;
			}
			return set.emotes.find((ae) => ae.name === name) ?? null;
		},
		isEmoteSetFull(setID: string): boolean {
			const set = this.getEmoteSet(setID);
			if (!set || !set.emotes) {
				return false;
			}
			return set.emotes.length >= set?.capacity ?? 0;
		},
		mayEditUser(victim: User | null | undefined, asSelf?: boolean): boolean {
			if (!victim || !this.user) {
				return false; // missing victim or actor
			}
			if (asSelf && victim.id === this.user.id) {
				return true;
			}

			return User.ComparePrivilege(this.user, victim);
		},
		hasPermission(permission: bigint): boolean {
			return User.HasPermission(this.user, permission);
		},
		hasEditorPermission(u: User, permission: number): boolean {
			if (!this.user || !u) {
				return false;
			}
			if (this.id === u.id || this.hasPermission(Permissions.ManageUsers)) {
				return true;
			}

			const ed = u.editors.find((e) => this.user && e.id === this.user.id);
			if (!ed) {
				return false;
			}

			return (permission & ed.permissions) === permission;
		},

		async fetchCosmeticData(list: string[]): Promise<GetCosmetics | null> {
			if (!list.length) {
				return null;
			}

			const { onResult, onError } = useQuery<GetCosmetics>(GetCosmetics, { list });

			return new Promise<GetCosmetics | null>((resolve, reject) => {
				onResult((res) => resolve(res.data));
				onError((err) => reject(err));
			});
		},

		showErrorModal(error: ApolloError) {
			const modal = useModal();

			const errs = error.graphQLErrors;
			const er1 = errs[0];

			const msg = er1.message.split(":")[0].replace(String(er1.extensions?.code), "").slice(1);
			const detail = er1.message.split(":")[1];

			modal.open("ErrorModal", {
				component: ModalError,
				events: {},
				props: {
					error: msg,
					detail: detail,
					code: er1.extensions?.code,
					gql: errs,
				},
			});
		},
	},
});

export interface Identity {
	id: string;
	display_name: string;
	avatar_url: string;
	tag_color: number;
	_idty: boolean;
}
