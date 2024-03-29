<template>
	<div v-if="ctx.currentReport" class="admin-report-editor">
		<div class="report-head">
			<!-- Subject, status, reporter -->
			<div left>
				<h2 class="reporter head-item">
					<p>Reporter</p>
					<UserTag :clickable="true" :user="ctx.currentReport.actor" scale="1em" />
				</h2>
				<h2 class="subject head-item">
					<p>Subject</p>
					{{ ctx.currentReport.subject }}
				</h2>
				<h2 class="subject head-item">
					<p>Status</p>
					<span :status="ctx.currentReport.status">{{ ctx.currentReport.status }}</span>
				</h2>
			</div>
			<!-- Assignees -->
			<div v-if="ctx.currentReport.assignees?.length > 0" right>
				<h2>
					<p>Assignees</p>
					<UserTag
						v-for="ass of ctx.currentReport.assignees"
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
			<span> {{ ctx.currentReport.body }} </span>
		</div>
		<div class="target-rendering">
			<h3>Reported {{ Report.NamedKind(ctx.currentReport.target_kind).toLowerCase() }}</h3>
			<template v-if="ctx.currentReport.target_kind == ObjectKind.EMOTE">
				<EmoteContext :emote-id="ctx.currentReport.target_id" :format="ImageFormat.WEBP" />
			</template>
			<template v-if="ctx.currentReport.target_kind == ObjectKind.USER">
				<UserPage :user-i-d="ctx.currentReport.target_id" />
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
import { computed, nextTick, onUnmounted, toRef } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useActor } from "@store/actor";
import { EditReport } from "@/apollo/mutation/report.mutation";
import { ImageFormat, ObjectKind } from "@/structures/Common";
import { Report } from "@/structures/Report";
import { User } from "@/structures/User";
import { useContext } from "@/composables/useContext";
import UserPage from "@/views/user/UserRoot.vue";
import Button from "@/components/utility/Button.vue";
import UserTag from "@/components/utility/UserTag.vue";
import EmoteContext from "../context/EmoteContext.vue";

const actorStore = useActor();
const clientUser = toRef(actorStore, "user");

const ctx = useContext("ADMIN_REPORT");
if (!ctx) throw new Error("No context provided");

const isClosed = computed(() => ctx.currentReport?.status === Report.Status.CLOSED);
const isAssigned = computed(
	() =>
		(ctx.currentReport?.assignees.filter(({ id }) => clientUser.value && clientUser.value.id === id).length ?? 0) >
		0,
);

const mutations = {
	close: {
		m: useMutation<EditReport>(EditReport),
		v: () => ({ id: ctx.currentReportID, data: { status: Report.Status.CLOSED } } as EditReport.Variables),
	},
	open: {
		m: useMutation<EditReport>(EditReport),
		v: () => ({ id: ctx.currentReportID, data: { status: Report.Status.OPEN } } as EditReport.Variables),
	},
	setSelfAssignee: {
		m: useMutation<EditReport>(EditReport),
		v: () =>
			({
				id: ctx.currentReportID,
				data: { assignee: `${isAssigned.value ? "-" : "+"}${(clientUser.value as User).id}` },
			} as EditReport.Variables),
	},
};
const doMutation = (name: keyof typeof mutations) => {
	const x = mutations[name];
	x.m.mutate(x.v()).then(() => {
		ctx.currentReportID = null;
		nextTick(() => {
			ctx.currentReportID = (ctx.currentReport as Report).id;
		});
	});
};

onUnmounted(() => (ctx.currentReport = null));
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-report-editor.scss";
</style>
