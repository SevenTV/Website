import { Badge, Paint } from "@/structures/Cosmetic";
import gql from "graphql-tag";

export const GetCosmetics = gql`
	query GetCosmestics($list: [ObjectID!]) {
		cosmetics(list: $list) {
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
			badges {
				id
				kind
				name
				tooltip
				tag
			}
		}
	}
`;

export interface GetCosmetics {
	cosmetics: {
		paints: Paint[];
		badges: Badge[];
	};
}
