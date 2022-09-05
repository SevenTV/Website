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
	mutation UpdateUserCosmetics($user_id: ObjectID!, $update: UserCosmeticUpdate!) {
		user(id: $user_id) {
			cosmetics(update: $update)
		}
	}
`;

export namespace UpdateUserCosmetics {
	export interface Variables {
		user_id: string;
		update: {
			id: string;
			kind: string;
			selected: boolean;
		};
	}

	export interface Result {
		user: {
			cosmetics: (Paint | Badge)[];
		};
	}
}
