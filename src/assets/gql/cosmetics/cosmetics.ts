import { Paint } from "@/structures/Cosmetic";
import gql from "graphql-tag";

export const GetCosmetics = gql`
	query GetCosmestics {
		cosmetics {
			paints {
				id
				kind
				name
				function
				color
				angle
				shape
				image_url
				repeat
				stops {
					at
					color
				}
				shadows {
					x_offset
					y_offset
					radius
					color
				}
			}
		}
	}
`;

export interface GetCosmetics {
	cosmetics: {
		paints: Paint[];
	};
}
