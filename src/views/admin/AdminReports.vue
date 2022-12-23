<template>
	<div class="admin-reports">
		<template v-if="$route.name == 'AdminReportEditor'">
			<AdminReportEditor :report-id="$route.params.reportID || ''" />
		</template>

		<template v-if="$route.name == 'AdminReports'">
			<div class="filters">
				<div class="status-tabs">
					<div
						v-for="tab of statusTabs"
						:key="tab.id"
						:tab="tab.id"
						:class="{ active: $route.query.status === tab.id }"
						@click="() => void 0"
					>
						{{ tab.label }}
					</div>
				</div>
			</div>

			<div class="report-list">
				<div
					v-for="report of ctx.reports"
					:key="report.id"
					class="report-card"
					@click="() => openReport(report)"
				>
					<!-- Display users relevant to this report -->
					<div class="relevant-users">
						<div class="reporter report-user-list">
							<span>Reported by</span>
							<UserTag :user="report.actor" scale="1.25em" />
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
						<div
							v-if="report.target && report.target.user && report.target_kind == ObjectKind.USER"
							target="user"
						>
							<UserTag :user="report.target.user" scale="2em" />
						</div>
						<div v-if="report.target_kind == ObjectKind.EMOTE" target="emote">
							<img
								v-if="report.target && report.target.emote"
								:src="getImage(report.target.emote.host, ImageFormat.WEBP, 2)?.url"
							/>
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
					<!-- <Button color="primary" label="LOAD MORE" @click="loadMore" /> -->
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ObjectKind, getImage, ImageFormat } from "@/structures/Common";
import { Report } from "@/structures/Report";
import { useContext } from "@/composables/useContext";
import { useRouter } from "vue-router";
import UserTag from "@/components/utility/UserTag.vue";
import AdminReportEditor from "@/views/admin/AdminReportEditor.vue";

const ctx = useContext("ADMIN_REPORT");
if (!ctx) throw new Error("No context found");

// Query reports
const isEnd = ref(false);

// Define status filter tabs
const statusTabs = [
	{ id: "all", label: "All" },
	{ id: "open", label: "Open" },
	{ id: "assigned", label: "Assigned" },
	{ id: "closed", label: "Closed" },
] as StatusTab[];

// Navigation to specific report page
const router = useRouter();
const openReport = (report: Report) => router.push({ name: "AdminReportEditor", params: { report: report.id } });

interface StatusTab {
	id: string;
	label: string;
}
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-reports.scss";
</style>
