import gql from "graphql-tag";

export const CreatePaint = gql`
	mutation CreateCosmeticPaint($def: CosmeticPaintInput!) {
		createCosmeticPaint(definition: $def)
	}
`;

export interface CreatePaint {
	createCosmeticPaint: string;
}
