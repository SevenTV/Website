<template>
	<div class="admin-reports">
		<template v-if="$route.name == 'AdminReportEditor' && selectedReport">
			<AdminReportEditor :reportID="selectedReport?.id" :reportData="JSON.stringify(selectedReport)" />
		</template>

		<template v-if="$route.name == 'AdminReports'">
			<div class="filters">
				<div class="status-tabs">
					<div
						:tab="tab.id"
						v-for="tab of statusTabs"
						:key="tab.id"
						:class="{ active: $route.query.status === tab.id }"
						@click="() => setTab(tab.id)"
					>
						{{ tab.label }}
					</div>
				</div>
			</div>

			<div class="report-list">
				<div class="single-report" v-for="report of reports" :key="report.id" @click="() => openReport(report)">
					<!-- Display users relevant to this report -->
					<div class="relevant-users">
						<div class="reporter report-user-list">
							<span>Reported by</span>
							<UserTag :user="report.reporter" scale="1.25em" />
						</div>
						<div class="assignees report-user-list" v-if="report.assignees?.length > 0">
							<span>Assigned to</span>
							<div class="assignee-list">
								<UserTag :user="ass" v-for="ass of report.assignees" :key="ass.id" scale="1em" />
							</div>
						</div>
					</div>

					<div class="user-content">
						<h3>{{ report.subject }}</h3>
						<p>{{ report.body }}</p>
					</div>

					<div class="target">
						<!-- Display Emote Target -->
						<div target="user" v-if="report.target_kind == 'USER'">
							<UserTag :user="report.target?.user" scale="2em" />
						</div>
						<div target="emote" v-if="report.target_kind == 'EMOTE'">
							<img :src="report.target?.emote?.links?.[0][1]" />
							<span> {{ report.target?.emote?.name }} </span>
						</div>
					</div>

					<div class="meta">
						<div class="status">
							<p class="status-colored" :status="report.status">{{ report.status }}</p>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { GetReports } from "@/assets/gql/reports/report";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { computed, defineComponent } from "vue-demi";
import { GetUser } from "@/assets/gql/users/user";
import { Report } from "@/structures/Report";
import { GetOneEmote } from "@/assets/gql/emotes/get-one";
import { useRoute, useRouter } from "vue-router";
import UserTag from "@/components/utility/UserTag.vue";
import AdminReportEditor from "./AdminReportEditor.vue";
import { apolloClient } from "@/apollo";

export default defineComponent({
	components: { UserTag, AdminReportEditor },
	setup() {
		const router = useRouter();
		const route = useRoute();
		const setTab = (status: string) => router.push({ path: router.currentRoute.value.fullPath, query: { status } });
		if (!route.query.status) setTab("all");

		// Query reports
		const { result } = useQuery<GetReports>(GetReports);
		const reports = computed(() => {
			const a = [];
			for (const r of result.value?.reports ?? []) {
				switch (r.target_kind) {
					case "USER":
						setTimeout(() => {
							provideApolloClient(apolloClient);
							useQuery<GetUser>(GetUser, { id: r.target_id }).onResult(
								(res) => (r.target = { user: res.data.user })
							);
						}, 0);
						break;
					case "EMOTE":
						setTimeout(() => {
							provideApolloClient(apolloClient);
							useQuery<GetOneEmote>(GetOneEmote, { id: r.target_id }).onResult(
								(res) => (r.target = { emote: res.data.emote })
							);
						}, 0);
						break;
				}
				a.push(r);
			}
			return a;
		});
		// Define status filter tabs
		const statusTabs = [
			{ id: "all", label: "All" },
			{ id: "open", label: "Open" },
			{ id: "assigned", label: "Assigned" },
			{ id: "close", label: "Closed" },
		] as StatusTab[];

		// Navigation to specific report page
		const selectedReport = computed(() => reports.value?.find((r) => r.id === route.params.reportID));
		const openReport = (report: Report) =>
			router.push({ name: "AdminReportEditor", params: { reportID: report.id } });

		return {
			reports,
			selectedReport,
			statusTabs,
			setTab,
			openReport,
		};
	},
});

interface StatusTab {
	id: string;
	label: string;
}
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-reports.scss";
</style>
