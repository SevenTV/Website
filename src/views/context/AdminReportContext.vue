<template>
	<RouterView />
</template>

<script setup lang="ts">
import { provide, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { useDataLoaders } from "@/store/dataloader";
import { reportQuery, reportsQuery } from "@/apollo/query/report.query";
import { getFirstParam } from "@/router/util.router";
import { ObjectKind } from "@/structures/Common";
import { Report } from "@/structures/Report";
import { ADMIN_REPORT_CONTEXT_KEY, AdminReportContext } from "@/composables/useContext";

const route = useRoute();

const ctx: AdminReportContext = reactive({
	reports: [],
	currentReportID: null,
	currentReport: null,
	status: Report.Status.OPEN,
	limit: 20,
});

provide(ADMIN_REPORT_CONTEXT_KEY, ctx);

watch(route, (r) => (ctx.currentReportID = getFirstParam(r, "report") ?? ""), { immediate: true });

const listQuery = useQuery<reportsQuery.Result, reportsQuery.Variables>(reportsQuery, () => ({
	status: ctx.status,
	limit: ctx.limit,
}));

const dataloader = useDataLoaders();

listQuery.onResult((res) => {
	ctx.reports = structuredClone(res.data.reports);

	for (let i = 0; i < ctx.reports.length; i++) {
		const report = ctx.reports[i];
		report.target = {};

		switch (report.target_kind) {
			case ObjectKind.EMOTE:
				dataloader.loadEmotes([report.target_id]).then((emotes) => {
					report.target!.emote = emotes[0];
				});
				break;

			default:
				break;
		}
	}
});

const { onResult: onReportResult } = useQuery<reportQuery.Result, reportQuery.Variables>(
	reportQuery,
	() => ({
		id: ctx.currentReportID ?? "",
	}),
	() => ({ enabled: !!ctx.currentReportID }),
);

onReportResult((res) => {
	ctx.currentReport = structuredClone(res.data.report);
});
</script>
