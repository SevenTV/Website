import { GetCosmetics } from "@/apollo/query/cosmetics.query";
import { GetEmotes } from "@/apollo/query/emote.query";
import { GetUsers } from "@/apollo/query/user.query";
import type { Cosmetic } from "@/structures/Cosmetic";
import { Emote } from "@/structures/Emote";
import { User } from "@/structures/User";
import { ApolloQueryResult } from "@apollo/client";
import { useQuery } from "@vue/apollo-composable";
import { DocumentNode } from "graphql";
import { defineStore } from "pinia";

export interface State {
	users: Cycle<User>;
	emotes: Cycle<Emote>;
	cosmetics: Cycle<Cosmetic>;
}

type Loadable = User | Emote | Cosmetic;

interface Cycle<T extends Loadable> {
	keys: Set<string>;
	items: T[];
	collectors: CollectorFunction<Record<string, Loadable[]>>[];
	finish: Promise<boolean> | null;
	cache?: Record<string, T>;
}

type CollectorFunction<D> = (r: ApolloQueryResult<D>) => void;

const COLLECTION_TIME = 300;

export const useDataLoaders = defineStore("dataloaders", {
	state: () =>
		({
			users: {
				keys: new Set(),
				items: [],
				collectors: [],
				finish: null,
			},
			emotes: {
				keys: new Set(),
				items: [],
				collectors: [],
				finish: null,
			},
			cosmetics: {
				keys: new Set(),
				items: [],
				collectors: [],
				finish: null,
				cache: {},
			},
		} as State),

	actions: {
		async _load<T extends Loadable>(
			c: Cycle<T>,
			doc: DocumentNode,
			keys: string[],
			collector: CollectorFunction<Record<string, T[]>>,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			resTransform?: (r: any) => any,
		) {
			keys.forEach((k) => c.keys.add(k));
			c.collectors.push(collector as CollectorFunction<Record<string, Loadable[]>>);

			const promise =
				c.finish ??
				new Promise<boolean>((resolve, reject) =>
					setTimeout(() => {
						const { onResult, onError } = useQuery(doc, { query: "", list: Array.from(c.keys.values()) });

						onResult((res) => {
							if (typeof resTransform === "function") {
								res.data = resTransform(res);
							}

							c.collectors.forEach((collector) => collector(res));

							resolve(true);
						});

						onError((err) => reject(err));
					}, COLLECTION_TIME),
				);

			c.finish = promise;
			promise.finally(() => {
				c.finish = null;
				c.keys.clear();
				c.items = [];
				c.collectors = [];
			});

			return promise;
		},

		/**
		 * Asynchronously loads users, and stacks multiple IDs to return all results in a single request
		 *
		 * @param keys user ids to load
		 * @returns
		 */
		async loadUsers(keys: string[]): Promise<User[]> {
			return new Promise((resolve, reject) => {
				const collector: CollectorFunction<Record<"usersByID", User[]>> = (r) => {
					const result = new Array(keys.length) as User[];
					const userMap = new Map<string, User | null>(r.data.usersByID.map((u) => [u.id, u]));

					for (let i = 0; i < keys.length; i++) {
						const oid = keys[i];

						if (!userMap.has(oid)) {
							continue;
						}

						result[i] = userMap.get(oid) as User;
					}

					resolve(result);
				};

				this._load(this.users, GetUsers, keys, collector).catch((err) => reject(err));
			});
		},

		/**
		 * Asynchronously loads emotes, and stacks multiple IDs to return all results in a single request
		 *
		 * @param keys emote ids to load
		 * @returns
		 */
		async loadEmotes(keys: string[]): Promise<Emote[]> {
			return new Promise((resolve, reject) => {
				const collector: CollectorFunction<Record<"emotesByID", Emote[]>> = (r) => {
					const result = new Array(keys.length) as Emote[];
					const emoteMap = new Map<string, Emote | null>(r.data.emotesByID.map((u) => [u.id, u]));

					for (let i = 0; i < keys.length; i++) {
						const oid = keys[i];

						if (!emoteMap.has(oid)) {
							continue;
						}

						result[i] = emoteMap.get(oid) as Emote;
					}

					resolve(result);
				};

				this._load(this.emotes, GetEmotes, keys, collector).catch((err) => reject(err));
			});
		},

		async loadCosmetics(...keys: string[]): Promise<Cosmetic[]> {
			return new Promise((resolve, reject) => {
				const cache = this.cosmetics.cache!;

				const cachedResult = [] as Cosmetic[];
				for (let i = 0; i < keys.length; i++) {
					const it = cache[keys[i]];
					if (!it) continue;

					keys.splice(i, 1);
					cachedResult.push(it);
				}

				const collector: CollectorFunction<Record<"cosmetics", Cosmetic[]>> = (r) => {
					const result = new Array(keys.length) as Cosmetic[];
					const cosmeticMap = new Map<string, Cosmetic | null>(
						[...r.data.cosmetics, ...cachedResult].map((u) => [u.id, u]),
					);

					for (let i = 0; i < keys.length; i++) {
						const oid = keys[i];

						if (!cosmeticMap.has(oid)) {
							continue;
						}

						const it = cosmeticMap.get(oid) as Cosmetic;

						cache[it.id] = it;
						result[i] = it;
					}

					resolve(result);
				};

				if (!keys.length) {
					resolve(cachedResult);

					return;
				}

				this._load(this.cosmetics, GetCosmetics, keys, collector, (res: ApolloQueryResult<GetCosmetics>) => {
					return { cosmetics: [...res.data.cosmetics.badges, ...res.data.cosmetics.paints] };
				}).catch((err) => reject(err));
			});
		},
	},
});
