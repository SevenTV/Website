import { Badge, Paint } from "@/structures/Cosmetic";
import gql from "graphql-tag";

export const CreatePaint = gql`
	mutation CreateCosmeticPaint($def: CosmeticPaintInput!) {
		createCosmeticPaint(definition: $def)
	}
`;

export interface CreatePaint {
	createCosmeticPaint: string;
}

export const UpdatePaint = gql`
	mutation UpdateCosmeticPaint($id: ObjectID!, $def: CosmeticPaintInput!) {
		cosmetics(id: $id) {
			updatePaint(definition: $def) {
				id
			}
		}
	}
`;

export const UpdateUserCosmetics = gql`
	mutation UpdateUserCosmetics($id: ObjectID!, $cosmetic_id: ObjectID!, $selected: Boolean) {
		user(id: $id) {
			cosmetics(id: $cosmetic_id, selected: $selected)
		}
	}
`;

export namespace UpdateUserCosmetics {
	export interface Variables {
		id: string;
		cosmetic_id: string;
		selected: boolean;
	}

	export interface Result {
		user: {
			cosmetics: (Paint | Badge)[];
		};
	}
}
