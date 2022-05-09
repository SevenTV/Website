import { Report } from "@structures/Report";
import gql from "graphql-tag";

export const GetReports = gql`
	query GetReports($status: ReportStatus, $limit: Int, $after_id: String) {
		reports(status: $status, limit: $limit, after_id: $after_id) {
			id
			target_kind
			target_id
			reporter {
				id
				username
				display_name
				avatar_url
				tag_color
			}
			assignees {
				id
				username
				display_name
				avatar_url
				tag_color
			}
			status
			subject
			body
			notes
		}
	}
`;

export const GetReport = gql`
	query GetReport($id: String!) {
		report(id: $id) {
			id
			target_kind
			target_id
			reporter {
				id
				username
				display_name
				avatar_url
				tag_color
			}
			assignees {
				id
				username
				display_name
				avatar_url
				tag_color
			}
			status
			subject
			body
			notes
		}
	}
`;

export interface GetReports {
	reports: Report[];
}

export interface GetReport {
	report: Report;
}
