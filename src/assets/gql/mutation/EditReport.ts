import { Report } from "@structures/Report";
import gql from "graphql-tag";

export const EditReport = gql`
	mutation EditReport($id: ObjectID!, $data: EditReportInput!) {
		editReport(report_id: $id, data: $data) {
			id
			priority
			status
			assignees {
				id
				username
				avatar_url
				style {
					color
				}
			}
			subject
			body
		}
	}
`;

export interface EditReport {
	editReport: Report;
}

export namespace EditReport {
	export interface Variables {
		id: string;
		data: {
			status: Report.Status;
			assignee: string;
		};
	}
}
