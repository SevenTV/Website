import gql from "graphql-tag";
import { Report } from "@/structures/Report";

export const CreateReport = gql`
	mutation CreateReport($data: CreateReportInput!) {
		createReport(data: $data) {
			id
			subject
			body
		}
	}
`;

export interface CreateReport {
	createReport: Report;
}

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
