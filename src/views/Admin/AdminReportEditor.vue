<template>
	<div v-if="report" class="admin-report-editor">
		<div class="report-head">
			<!-- Subject, status, reporter -->
			<div left>
				<h2 class="reporter head-item">
					<p>Reporter</p>
					<UserTag :clickable="true" :user="report.actor" scale="1em" />
				</h2>
				<h2 class="subject head-item">
					<p>Subject</p>
					{{ report.subject }}
				</h2>
				<h2 class="subject head-item">
					<p>Status</p>
					<span :status="report.status">{{ report.status }}</span>
				</h2>
			</div>
			<!-- Assignees -->
			<div v-if="report.assignees?.length > 0" right>
				<h2>
					<p>Assignees</p>
					<UserTag
						v-for="ass of report.assignees"
						:key="ass.id"
						:user="ass"
						scale="0.65em"
						text-scale="0.65em"
					/>
				</h2>
			</div>
		</div>

		<div class="body">
			<h3>Report Details</h3>
			<span> {{ report.body }} </span>
		</div>
		<div class="target-rendering">
			<h3>Reported {{ Report.NamedKind(report.target_kind).toLowerCase() }}</h3>
			<template v-if="report.target_kind == ObjectKind.EMOTE">
				<EmotePage
					:heading-only="true"
					:emote-i-d="report.target_id"
					:emote-data="JSON.stringify(report.target?.emote)"
				/>
			</template>
			<template v-if="report.target_kind == ObjectKind.USER">
				<UserPage :user-i-d="report.target_id" />
			</template>
		</div>
		<div class="spacer" />

		<div class="report-actions">
			<div class="inner-report-actions">
				<Button
					:color="isClosed ? 'accent' : 'warning'"
					:label="isClosed ? 'MARK AS OPEN' : 'MARK AS CLOSED'"
					@click="isClosed ? doMutation('open') : doMutation('close')"
				/>
				<Button
					:color="isAssigned ? 'warning' : 'primary'"
					:label="isAssigned ? 'UNASSIGN' : 'ASSIGN SELF'"
					@click="doMutation('setSelfAssignee')"
				/>
				<Button color="primary" label="ADD COMMENT" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { GetReport } from "@gql/reports/report";
import { Report } from "@structures/Report";
import { ObjectKind } from "@structures/Common";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { EditReport } from "@gql/mutation/EditReport";
import { useActor } from "@store/actor";
import { User } from "@structures/User";
import EmotePage from "@views/EmotePage/EmotePage.vue";
import UserPage from "@views/UserPage/UserPage.vue";
import UserTag from "@components/utility/UserTag.vue";
import Button from "@components/utility/Button.vue";

const props = defineProps({
	reportID: String,
	reportData: String,
});
const actorStore = useActor();
const clientUser = computed(() => actorStore.user);
const report = computed(() =>
	!result.value && props.reportData ? (JSON.parse(props.reportData) as Report) : (result.value?.report as Report),
);
const { result, refetch } = useQuery<GetReport>(GetReport, { id: props.reportID });
const isClosed = computed(() => report.value.status === Report.Status.CLOSED);
const isAssigned = computed(
	() => report.value.assignees.filter(({ id }) => clientUser.value && clientUser.value.id === id).length > 0,
);

const mutations = {
	close: {
		m: useMutation<EditReport>(EditReport),
		v: () => ({ id: props.reportID, data: { status: Report.Status.CLOSED } } as EditReport.Variables),
	},
	open: {
		m: useMutation<EditReport>(EditReport),
		v: () => ({ id: props.reportID, data: { status: Report.Status.OPEN } } as EditReport.Variables),
	},
	setSelfAssignee: {
		m: useMutation<EditReport>(EditReport),
		v: () =>
			({
				id: props.reportID,
				data: { assignee: `${isAssigned.value ? "-" : "+"}${(clientUser.value as User).id}` },
			} as EditReport.Variables),
	},
};
const doMutation = (name: keyof typeof mutations) => {
	const x = mutations[name];
	x.m.mutate(x.v()).then(() => refetch());
};
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-report-editor.scss";
</style>
