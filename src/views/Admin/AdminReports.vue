<template>
	<div class="admin-reports">
		<template v-if="$route.name == 'AdminReportEditor'">
			<AdminReportEditor
				:report-i-d="$route.params.reportID as string || ''"
				:report-data="JSON.stringify(selectedReport)"
			/>
		</template>

		<template v-if="$route.name == 'AdminReports'">
			<div class="filters">
				<div class="status-tabs">
					<div
						v-for="tab of statusTabs"
						:key="tab.id"
						:tab="tab.id"
						:class="{ active: $route.query.status === tab.id }"
						@click="() => setTab(tab.id)"
					>
						{{ tab.label }}
					</div>
				</div>
			</div>

			<div class="report-list">
				<div v-for="report of reports" :key="report.id" class="report-card" @click="() => openReport(report)">
					<!-- Display users relevant to this report -->
					<div class="relevant-users">
						<div class="reporter report-user-list">
							<span>Reported by</span>
							<UserTag :user="report.reporter" scale="1.25em" />
						</div>
						<div v-if="report.assignees?.length > 0" class="assignees report-user-list">
							<span>Assigned to</span>
							<div class="assignee-list">
								<UserTag v-for="ass of report.assignees" :key="ass.id" :user="ass" scale="1em" />
							</div>
						</div>
					</div>

					<div class="user-content">
						<h3>{{ report.subject }}</h3>
						<p>{{ report.body }}</p>
					</div>

					<div class="target">
						<!-- Display Emote Target -->
						<div v-if="report.target_kind == 'USER'" target="user">
							<UserTag :user="report.target?.user" scale="2em" />
						</div>
						<div v-if="report.target_kind == 'EMOTE'" target="emote">
							<img :src="report.target?.emote?.urls?.[0]" />
							<span> {{ report.target?.emote?.name }} </span>
						</div>
					</div>

					<div class="meta">
						<div class="status" :status="report.status">
							<p class="status-colored">{{ report.status }}</p>
						</div>
					</div>
				</div>

				<div v-if="!isEnd" class="load-more">
					<Button color="primary" label="LOAD MORE" @click="loadMore" />
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { GetReports } from "@/assets/gql/reports/report";
import { provideApolloClient, useLazyQuery, useQuery } from "@vue/apollo-composable";
import { computed, defineComponent, ref, watch } from "vue";
import { GetUser } from "@/assets/gql/users/user";
import { Report } from "@/structures/Report";
import { GetOneEmote } from "@/assets/gql/emotes/get-one";
import { useRoute, useRouter } from "vue-router";
import UserTag from "@/components/utility/UserTag.vue";
import AdminReportEditor from "./AdminReportEditor.vue";
import { apolloClient } from "@/apollo";
import Button from "@/components/utility/Button.vue";

export default defineComponent({
	components: { UserTag, AdminReportEditor, Button },
	setup() {
		const router = useRouter();
		const route = useRoute();
		const setTab = (status: string) => router.push({ path: router.currentRoute.value.fullPath, query: { status } });
		if (!route.query.status) setTab("open");
		const status = computed(
			() =>
				route.query.status &&
				(route.query.status !== "all" ? route.query.status.toString().toUpperCase() : null)
		);

		// Query reports
		let lastID = "";
		const limit = 25;
		const isEnd = ref(false);
		const { result, load, document } = useLazyQuery<GetReports>(GetReports, {
			status,
			limit,
		});
		const reports = computed(() => result.value?.reports ?? []);
		watch(result, (res) => {
			if (!res) {
				return;
			}

			const a = [];
			for (const r of res.reports ?? []) {
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
							useQuery<GetOneEmote>(GetOneEmote, { id: r.target_id }).onResult((res) =>
								res.data ? (r.target = { emote: res.data.emote }) : null
							);
						}, 0);
						break;
				}
				a.push(r);
			}

			if (a.length > 0) {
				lastID = a[a.length - 1]?.id;
			}
			if (a.length < limit) {
				isEnd.value = true;
			}
		});
		load(document.value, { status, limit });

		// Define status filter tabs
		const statusTabs = [
			{ id: "all", label: "All" },
			{ id: "open", label: "Open" },
			{ id: "assigned", label: "Assigned" },
			{ id: "closed", label: "Closed" },
		] as StatusTab[];

		// Navigation to specific report page
		const selectedReport = computed(() => reports.value?.find((r) => r.id === route.params.reportID));
		const openReport = (report: Report) =>
			router.push({ name: "AdminReportEditor", params: { reportID: report.id } });

		const loadMore = () => load(document.value, { status, limit, after_id: lastID });
		return {
			reports,
			selectedReport,
			statusTabs,
			setTab,
			openReport,
			loadMore,
			isEnd,
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
