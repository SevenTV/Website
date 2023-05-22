import { useQuery } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { LocalStorageKeys } from "@store/lskeys";
import { GetCosmetics } from "@/apollo/query/cosmetics.query";
import { ApolloError } from "@apollo/client/errors";
import { ImageFormat } from "@/structures/Common";
import { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import { Permissions, Role } from "@/structures/Role";
import { User } from "@/structures/User";
import ModalError from "@/components/modal/ModalError.vue";
import { useModal } from "./modal";
import { IBrowser, UAParser, UAParserInstance } from "ua-parser-js";

export interface State {
	user: User | null;
	activeEmotes: Map<string, ActiveEmote>;
	editableEmoteSets: Record<string, EmoteSet>;
	defaultEmoteSetID: string;
	agent: UAParserInstance;
	preferredFormat: ImageFormat;
}

export const useActor = defineStore("actor", {
	state: () =>
		({
			user: null,
			activeEmotes: new Map<string, ActiveEmote>(),
			editableEmoteSets: {},
			defaultEmoteSetID: localStorage.getItem(LocalStorageKeys.DEFAULT_SET) ?? "",
			agent: new UAParser(),
			preferredFormat: ImageFormat.WEBP,
		} as State),
	getters: {
		id(): string {
			return this.user?.id ?? "";
		},
		highestRole(): Role | null {
			if (!this.user) return null;

			const roles = User.GetRoles(this.user);
			return roles.reduce((prev, curr) => (prev.position > curr.position ? prev : curr), roles[0]);
		},
		defaultEmoteSet(): EmoteSet | null {
			if (!this.user) {
				return null;
			}

			return this.editableEmoteSets[this.defaultEmoteSetID] ?? null;
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
			const version = parseInt(this.browser.version as string, 10);
			switch (this.browser.name) {
				case "Chrome":
					return version >= 100;
				case "Firefox":
					return version >= 113;
				default:
					return false;
			}
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
					style: user.style,
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
						style: user.style,
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
			this.user.connections = u.connections;
			if (typeof u.style.color === "number") {
				this.user.style.color = u.style.color;
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
			this.editableEmoteSets[set.id] = set;
		},
		updateEmoteSet(d: EmoteSet) {
			const set = this.getEmoteSet(d.id);
			if (!set) {
				return;
			}
			if (Array.isArray(d.emotes)) {
				set.emotes = d.emotes;
			}
			this.editableEmoteSets[set.id] = set;
			this.updateActiveEmotes();
		},
		removeEmoteSet(id: string) {
			delete this.editableEmoteSets[id];
		},
		getEmoteSet(id: string): EmoteSet | null {
			return this.editableEmoteSets[id] ?? null;
		},
		getActiveEmoteInSet(setID: string, emoteID: string): ActiveEmote | null {
			return this.editableEmoteSets[setID]?.emotes?.filter((ae) => ae.id === emoteID)[0] ?? null;
		},
		getActiveEmoteInSetByName(setID: string, name: string): ActiveEmote | null {
			const set = this.getEmoteSet(setID);
			if (!set || !set.emotes?.length) {
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
		mayEditRole(role: Role): boolean {
			if (!this.user || !this.highestRole) {
				return false;
			}
			return this.highestRole.position > role.position;
		},
		mayEditEmoteSet(set: EmoteSet): boolean {
			if (!this.user || !set) {
				return false;
			}

			if (set.owner && set.owner.id === this.user.id) {
				return true;
			}

			if (set.owner && this.hasEditorPermission(set.owner, User.EditorPermission.ManageEmoteSets)) {
				return true;
			}

			return false;
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

			const ed = this.user.editor_of?.find((e) => e.id === u.id);
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

		showErrorModal(error: ApolloError, ignoreCodes?: number[]) {
			const modal = useModal();

			const errs = error.graphQLErrors;
			const er1 = errs[0];

			const code = er1.extensions?.code as number;
			if (ignoreCodes?.includes(code)) {
				return;
			}

			const msg = er1.message.split(":")[0].replace(String(code), "").slice(1);
			const detail = er1.message.split(/:(.*)/)[1];

			modal.open("ErrorModal", {
				component: ModalError,
				events: {},
				props: {
					error: msg,
					detail: detail,
					code: code,
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
	style: User.Style;
	_idty: boolean;
}
