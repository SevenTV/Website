import gql from "graphql-tag";

export const CreatePaint = gql`
	mutation CreateCosmeticPaint($def: CosmeticPaintInput!) {
		createCosmeticPaint(definition: $def)
	}
`;

export const UpdatePaint = gql`
	mutation UpdateCosmeticPaint($id: ObjectID!, $def: CosmeticPaintInput!) {
		cosmetics(id: $id) {
			updatePaint(definition: $def) {
				id
			}
		}
	}
`;

export interface CreatePaint {
	createCosmeticPaint: string;
}
