import { Common } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import { EmoteSet } from "@/structures/EmoteSet";
import { User } from "@/structures/User";
import { defineStore } from "pinia";
import { gql } from "graphql-tag";
import { useSubscription } from "@vue/apollo-composable";

export const useObjectWatch = defineStore("object-watch", {
	actions: {
		subscribeToObject<T extends Watchable>(
			kind: Common.ObjectKind,
			object: T,
			cb?: CallbackFn<T>,
		): { stop: () => void } {
			const kindStr = Common.ObjectKind[kind] as keyof typeof Common.ObjectKind;
			const cmd = {
				EMOTE: "emote",
				EMOTE_SET: "emoteSet",
			} as Record<keyof typeof Common.ObjectKind, string>;

			const random = Math.random().toString(36).substring(2, 15);
			const { onResult, stop } = useSubscription(
				gql`
					subscription WatchObject_${random}($id: ObjectID!) {
						object: ${cmd[kindStr]}(id: $id) {
							id
							kind
							updated {
								...UsedFields
							}
							pushed {
								...UsedFields
							}
							pulled {
								...UsedFields
							}
						}
					}
					fragment UsedFields on ChangeField {
						key
						index
						nested
						type
						old_value
						value
					}
				`,
				{ id: object.id },
				{ fetchPolicy: "network-only" },
			);

			onResult((res) => {
				ApplyFields(object, [...res.data.object.updated], true);
				ApplyFields(object, [...res.data.object.pushed], true);
				ApplyFields(object, [...res.data.object.pulled], true);

				if (typeof cb === "function") {
					cb(object);
				}
			});

			return { stop: () => stop() };
		},
	},
});

type CallbackFn<T> = (obj: T) => void;

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
	type: ChangeFieldType;
	old_value: string | null;
	value: string | null;
}

type ChangeFieldType = "string" | "number" | "boolean" | "json";

function ApplyFields<T extends Watchable>(object: T, fields: ChangeField[], encoded?: boolean): T {
	if (encoded) {
		fields = fields.map((cf) => {
			cf.old_value = typeof cf.value === "string" ? window.atob(cf.old_value ?? "") : null;
			cf.value = typeof cf.value === "string" ? window.atob(cf.value) : null;

			return cf;
		});
	}

	for (const cf of fields ?? []) {
		const x = Array(2);
		switch (cf.type) {
			case "number":
				x[0] = cf.old_value ? Number(cf.old_value) : null;
				x[1] = cf.value ? Number(cf.value) : null;
				break;
			case "boolean":
				x[0] = cf.old_value ? Boolean(cf.old_value === "true") : null;
				x[1] = cf.value ? Boolean(cf.value === "true") : null;
				break;
			case "string":
				x[0] = cf.old_value ?? null;
				x[1] = cf.value ?? null;
				break;
			default:
				x[0] = cf.old_value ? JSON.parse(cf.old_value) : null;
				x[1] = cf.value ? JSON.parse(cf.value) : null;
		}

		cf.old_value = x[0];
		cf.value = x[1];

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
		} else if (typeof cf.index === "number") {
			// Handle change at array index
			if (cf.value === null) {
				(object[cf.key as keyof T] as unknown as (keyof T)[]).splice(cf.index, 1);
			} else {
				(object[cf.key as keyof T] as unknown as (keyof T)[])[cf.index - 1] = cf.value as keyof T;
			}
		} else if (typeof object !== "undefined" && object !== null) {
			// Handle key change
			object[cf.key as keyof T] = cf.value as unknown as T[keyof T];
		}
	}

	return object;
}
