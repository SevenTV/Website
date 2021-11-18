<template>
	<div class="admin-report-editor" v-if="report">
		<div class="report-head">
			<h2 class="subject head-item">
				<p>Subject</p>
				{{ report.subject }}
			</h2>
			<h2 class="reporter head-item">
				<p>Reporter</p>
				<UserTag :user="report.reporter" scale="1em" />
			</h2>
		</div>

		<div class="target-rendering">
			<h3>Reported {{ report.target_kind.toLowerCase() }}</h3>
			<template v-if="report.target_kind == 'EMOTE'">
				<EmotePage
					:heading-only="true"
					:emoteID="report.target_id"
					:emote-data="JSON.stringify(report.target?.emote)"
				/>
			</template>
			<template v-if="report.target_kind == 'USER'">
				<UserPage :userID="report.target_id" />
			</template>
		</div>
		<div class="spacer" />

		<div class="report-actions">
			<div class="inner-report-actions">
				<h1>INTERACT</h1>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { GetReport } from "@/assets/gql/reports/report";
import { Report } from "@/structures/Report";
import { useQuery } from "@vue/apollo-composable";
import { computed, defineComponent } from "vue-demi";
import EmotePage from "../EmotePage/EmotePage.vue";
import UserPage from "../UserPage/UserPage.vue";
import UserTag from "@/components/utility/UserTag.vue";

export default defineComponent({
	components: { EmotePage, UserPage, UserTag },
	props: {
		reportData: String,
		reportID: String,
	},
	setup(props) {
		const report = computed(() =>
			props.reportData ? (JSON.parse(props.reportData) as Report) : (result.value?.report as Report)
		);
		const reportID = computed(() => props.reportID);
		const { result } = useQuery<GetReport>(GetReport, { id: reportID.value });
		return {
			report,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/admin/admin-report-editor.scss";
</style>
