import { Common } from "@/structures/Common";
import gql from "graphql-tag";

export const UpdateActivity = gql`
	mutation SendActivity($status: ActivityStatus!, $type: ActivityTypeInput, $object: ActivityObjectInput) {
		sendActivity(status: $status, type: $type, object: $object)
	}
`;

export namespace UpdateActivity {
	export interface Variables {
		status: string;
		type: {
			type: string;
			name: string;
		};
		object?: {
			kind: Common.ObjectKind;
			id: string;
		};
	}
	export interface Result {
		sendActivity: string;
	}
}
