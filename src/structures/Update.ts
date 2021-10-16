import set from "set-value";

/* eslint-disable @typescript-eslint/no-explicit-any */
function get(obj: any, field: string) {
	let val = obj;
	field.split(".").forEach((v) => (val = val[v]));
	return val;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const OrCompare = (item: any, comp: any): boolean => {
	if (typeof item !== typeof comp) return false;
	if (typeof item !== "object") return item === comp;
	const keys = Object.keys(comp);
	for (const k of keys) {
		if (typeof item[k] === "object") {
			const valid = OrCompare(item[k], comp[k]);
			if (!valid) return false;
		} else {
			return item[k] === comp[k];
		}
	}
	return false;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ApplyMutation = (object: any, update: Update) => {
	update.field = update.field.replaceAll("__", ".");
	let arry: any[];
	let modifyReq: ModifyRequest;
	let pullVal: any;
	switch (update.action) {
		case "set":
			set(object, update.field, JSON.parse(update.value));
			break;
		case "pull":
			arry = get(object, update.field);
			if (!arry) return;
			arry = arry.slice();
			pullVal = JSON.parse(update.value);
			for (let i = 0; i < arry.length; i++) {
				if (OrCompare(arry[i], pullVal)) {
					arry.splice(i, 1);
				}
			}
			set(object, update.field, arry);
			break;
		case "push":
			arry = get(object, update.field);
			if (!arry) arry = [];
			arry.push(JSON.parse(update.value));
			set(object, update.field, arry);
			break;
		case "modify":
			arry = get(object, update.field);
			if (!arry) return;
			modifyReq = JSON.parse(update.value);
			arry.forEach((value, index) => {
				for (const key in modifyReq.query) {
					if (key) {
						if (get(value, key) !== JSON.parse(modifyReq.query[key])) return;
					} else if (value !== JSON.parse(modifyReq.query[key])) return;
				}
				modifyReq.updates.forEach((v) => {
					if (v.field) return ApplyMutation(value, v);
					const updateField = { value };
					v.field = value;
					ApplyMutation(updateField, v);
					arry[index] = updateField.value;
				});
			});
			break;
		default:
			/* eslint-disable no-console */
			console.error("unknown operation", update);
	}
};

export interface Update {
	action: string;
	field: string;
	value: string;
}

interface ModifyRequest {
	updates: Update[];
	query: { [key: string]: string };
}
