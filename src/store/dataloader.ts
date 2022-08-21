import { GetEmotes } from "@/assets/gql/emotes/emote";
import { GetUsers } from "@/assets/gql/users/user";
import { Emote } from "@/structures/Emote";
import { User } from "@/structures/User";
import { ApolloQueryResult } from "@apollo/client";
import { useQuery } from "@vue/apollo-composable";
import { DocumentNode } from "graphql";
import { defineStore } from "pinia";

export interface State {
	users: Cycle<User>;
	emotes: Cycle<Emote>;
}

type Loadable = User | Emote;

interface Cycle<T extends Loadable> {
	keys: string[];
	items: T[];
	collectors: CollectorFunction<Record<string, Loadable[]>>[];
	finish: Promise<boolean> | null;
}

type CollectorFunction<D> = (r: ApolloQueryResult<D>) => void;

export const useDataLoaders = defineStore("dataloaders", {
	state: () =>
		({
			users: {
				keys: [],
				items: [],
				collectors: [],
				finish: null,
			},
			emotes: {
				keys: [],
				items: [],
				collectors: [],
				finish: null,
			},
		} as State),

	actions: {
		async _load<T extends Loadable>(
			c: Cycle<T>,
			doc: DocumentNode,
			keys: string[],
			collector: CollectorFunction<Record<string, T[]>>,
		) {
			c.keys.push(...keys);
			c.collectors.push(collector as CollectorFunction<Record<string, Loadable[]>>);

			const promise =
				c.finish ??
				new Promise<boolean>((resolve, reject) =>
					setTimeout(() => {
						const { onResult, onError } = useQuery(doc, { query: "", list: c.keys });

						onResult((res) => {
							c.collectors.forEach((collector) => collector(res));

							resolve(true);
						});

						onError((err) => reject(err));
					}, 1000),
				);

			c.finish = promise;
			promise.finally(() => {
				c.finish = null;
				c.keys = [];
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
					const userMap = new Map<string, Emote | null>(r.data.emotesByID.map((u) => [u.id, u]));

					for (let i = 0; i < keys.length; i++) {
						const oid = keys[i];

						if (!userMap.has(oid)) {
							continue;
						}

						result[i] = userMap.get(oid) as Emote;
					}

					resolve(result);
				};

				this._load(this.emotes, GetEmotes, keys, collector).catch((err) => reject(err));
			});
		},
	},
});
