import { Common } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { EmoteSet } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import { defineStore } from "pinia";
import { gql } from "graphql-tag";
import { useSubscription } from "@vue/apollo-composable";

export const useObjectWatch = defineStore("object-watch", {
	actions: {
		subscribeToObject<T extends Watchable>(kind: Common.ObjectKind, object: T): { stop: () => void } {
			const kindStr = Common.ObjectKind[kind];

			const { onResult, stop } = useSubscription(
				gql`
					subscription Watch${kindStr.charAt(0) + kindStr.toLowerCase().slice(1)}($id: ObjectID!) {
						object: ${kindStr.toLowerCase()}(id: $id) {
							id
							kind
							updated {
								key
								index
								nested
								old_value
								value
							}
						}
					}
				`,
				{ id: object.id },
			);

			onResult((res) => {
				ApplyFields(object, [...res.data.object.updated], true);
			});

			return { stop: () => stop() };
		},
	},
});

type Watchable = User | Emote | EmoteSet;

export interface ChangeMap {
	id: string;
	kind: Common.ObjectKind;
	actor: User;
	added: ChangeField[];
	updated: ChangeField[];
	removed: ChangeField[];
	pushed: ChangeField[];
	pulled: ChangeField[];
}

export interface ChangeField {
	key: string;
	index: number | null;
	nested: boolean;
	old_value: string | null;
	value: string | null;
}

function ApplyFields<T extends Watchable>(object: T, fields: ChangeField[], encoded?: boolean): T {
	if (encoded) {
		fields = fields.map((cf) => {
			cf.value = typeof cf.value === "string" ? window.atob(cf.value) : null;

			return cf;
		});
	}

	for (const cf of fields ?? []) {
		cf.value = typeof cf.value !== "undefined" && cf.value !== null ? JSON.parse(cf.value) : null;

		// Handle array change of a nested object
		if (cf.nested && typeof cf.index === "number") {
			const nestedFields = cf.value as unknown as ChangeField[];

			ApplyFields(
				(object[cf.key as keyof T] as unknown as (keyof T)[])[cf.index] as unknown as Watchable,
				nestedFields,
				false,
			);
		} else if (cf.nested) {
			// Handle change of nested property
			ApplyFields(object[cf.key as keyof T] as unknown as Watchable, cf.value as unknown as ChangeField[], false);
		} else if (typeof object !== "undefined" && object !== null) {
			// Handle key change
			object[cf.key as keyof T] = cf.value as unknown as T[keyof T];
		}
	}

	return object;
}
