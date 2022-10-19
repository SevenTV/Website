import { useActor } from "@/store/actor";
import { useQuery } from "@vue/apollo-composable";
import { storeToRefs } from "pinia";
import { Ref, watch } from "vue";
import { GetEmoteSet, GetEmoteSetMin } from "./assets/gql/emote-set/emote-set";
import { GetCurrentUser } from "./assets/gql/users/self";
import { GetUser } from "./assets/gql/users/user";
import { useObjectSubscription } from "./composable/object-sub";
import { ObjectKind } from "./structures/Common";
import { EmoteSet } from "./structures/EmoteSet";
import { User } from "./structures/User";

export function setupActor(authToken: Ref<string | null>) {
	const actor = useActor();
	const { user } = storeToRefs(actor);
	const { watchObject } = useObjectSubscription();

	function fetch() {
		// Set up initial identity (pre-fetch)
		const identity = actor.getIdentity();
		if (identity) {
			actor.setUser({ ...identity, _idty: true });
		}

		// Query user data from API
		const { onResult, onError } = useQuery<GetUser>(GetCurrentUser);
		onResult((res) => {
			if (!res.data) return;

			const usr = res.data.user;
			if (!usr) {
				actor.setUser(null);
				return;
			}

			actor.setUser(usr);

			// Aggregate owned and emote sets of edited users
			const editableSetIDs = (user.value as User).editor_of.map((ed) =>
				ed.user
					? (ed.permissions & User.EditorPermission.ManageEmoteSets) === User.EditorPermission.ManageEmoteSets
						? ed.user.emote_sets.filter((es) => es.id).map((es) => es.id)
						: ed.user.connections.filter((uc) => uc.emote_set_id).map((uc) => uc.emote_set_id)
					: [],
			);

			const editableSets =
				(editableSetIDs.length
					? editableSetIDs.reduce((a, b) => [...(a ?? []), ...(b ?? [])])?.map((v) => ({ id: v } as EmoteSet))
					: []) ?? [];

			// Start subscriptions on all editable sets
			const allOK = [] as Promise<EmoteSet>[];
			for (const set of [...usr.emote_sets, ...editableSets]) {
				const {
					onResult: onSetResult,
					result,
					loading,
				} = useQuery<GetEmoteSet>(GetEmoteSetMin, { id: set.id });

				const p = new Promise<EmoteSet>((ok) => {
					onSetResult(() => {
						watchObject(ObjectKind.EMOTE_SET, set);
					});

					watch(loading, (l) => !l && ok(result.value?.emoteSet as EmoteSet));
				});

				allOK.push(p);
			}

			Promise.all(allOK).then((sets) => {
				for (const set of sets) {
					if (!set) {
						continue;
					}

					actor.addEmoteSet(set);
				}
				actor.updateActiveEmotes();
			});
		});

		onError((err) => {
			actor.setUser(null);
			actor.showErrorModal(err);
		});
	}

	watch(authToken, () => fetch(), { immediate: true });
}
