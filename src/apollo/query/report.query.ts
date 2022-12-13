import { Report } from "@/structures/Report";
import gql from "graphql-tag";

export const GetReports = gql`
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

export const GetReport = gql`
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

export interface GetReports {
	reports: Report[];
}

export interface GetReport {
	report: Report;
}
