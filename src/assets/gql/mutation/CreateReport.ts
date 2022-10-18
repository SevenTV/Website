import { Report } from "@/structures/Report";
import gql from "graphql-tag";

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
