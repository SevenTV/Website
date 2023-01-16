import gql from "graphql-tag";
import { Report } from "@/structures/Report";

export const reportsQuery = gql`
	query GetReports($status: ReportStatus, $limit: Int, $after_id: ObjectID) {
		reports(status: $status, limit: $limit, after_id: $after_id) {
			id
			target_kind
			target_id
			actor {
				id
				username
				display_name
				avatar_url
				style {
					color
				}
			}
			assignees {
				id
				username
				display_name
				avatar_url
				style {
					color
				}
			}
			status
			subject
			body
		}
	}
`;

export const reportQuery = gql`
	query GetReport($id: ObjectID!) {
		report(id: $id) {
			id
			target_kind
			target_id
			actor {
				id
				username
				display_name
				avatar_url
				style {
					color
				}
			}
			assignees {
				id
				username
				display_name
				avatar_url
				style {
					color
				}
			}
			status
			subject
			body
		}
	}
`;

export namespace reportsQuery {
	export interface Result {
		reports: Report[];
	}
	export interface Variables {
		status?: Report.Status;
		limit?: number;
		after_id?: string;
	}
}

export namespace reportQuery {
	export interface Result {
		report: Report;
	}
	export interface Variables {
		id: string;
	}
}
