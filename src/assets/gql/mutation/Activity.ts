import gql from "graphql-tag";

export const UpdateActivity = gql`
	mutation SendActivity($status: ActivityStatus!) {
		sendActivity(status: $status)
	}
`;

export namespace UpdateActivity {
	export interface Variables {
		status: string;
	}
	export interface Result {
		sendActivity: string;
	}
}
