<template>
	<div class="report-form">
		<div class="heading">
			<h3>Report {{ kind?.toLowerCase() }} "{{ displayName }}"</h3>
			<Tooltip text="Close">
				<div class="close-btn" @click="$emit('close')">
					<font-awesome-icon :icon="['fas', 'times']" />
				</div>
			</Tooltip>
		</div>

		<!--  -->
		<div v-if="form.step == 1" class="choices">
			<div v-for="choice of subjectChoices" :key="choice">
				<Radio v-model="form.subject" :item-i-d="choice" scale="1.25em" />
				<span>{{ choice }}</span>
			</div>
			<div>
				<Radio v-model="form.subject" item-i-d="Something else" scale="1.25em" />
				<span> {{ $t("reporting.emote_reason.other") }} </span>
			</div>
			<div v-if="isSubjectOther" class="other-choice">
				<TextInput v-model="form.otherSubject" label="What's the matter?" />
			</div>
		</div>

		<div v-if="form.step == 2" class="body">
			<span>{{ form.subject }}{{ form.otherSubject && `: ${form.otherSubject}` }}</span>
			<div class="body-content">
				<span>Details (additional info and/or evidence for your report)</span>
				<TextArea v-model="form.body" :max-length="2000" />
				<span class="char-limit" :near="form.body.length > 1500" :full="form.body.length >= 2000">
					{{ form.body.length }} / 2000
				</span>
			</div>
		</div>
		<div v-if="form.step == 3" class="submitted">
			<span>
				Report submitted successfully. We may ask you for further information, so please check your inbox. We
				will notify you once a decision has been reached.
			</span>
		</div>

		<div class="actions">
			<Button
				v-if="form.step == 1"
				color="primary"
				label="Continue"
				:disabled="!isFormValid"
				@click="form.step++"
			/>
			<Button v-if="form.step == 2" color="primary" label="Submit Report" @click="createReport" />
		</div>

		<div class="abuse-notice">
			<span>{{ $t("reporting.abuse_notice") }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from "vue";
import { Report } from "@/structures/Report";
import { Emote } from "@/structures/Emote";
import { User } from "@/structures/User";
import { useI18n } from "vue-i18n";
import Radio from "../form/Radio.vue";
import TextInput from "../form/TextInput.vue";
import Button from "./Button.vue";
import TextArea from "../form/TextArea.vue";
import { useMutation } from "@vue/apollo-composable";
import { CreateReport } from "@/assets/gql/mutation/CreateReport";
import Tooltip from "./Tooltip.vue";

export default defineComponent({
	components: { Radio, TextInput, Button, TextArea, Tooltip },
	props: {
		kind: String as PropType<Report.TargetKind>,
		target: Object as PropType<Emote | User | null>,
	},
	setup(props) {
		const { t } = useI18n();
		const form = reactive({
			step: 1,
			subject: "",
			otherSubject: "",
			body: "",
		});
		const subjectChoices =
			{
				EMOTE: [
					t("reporting.emote_reason.i_made_this"),
					t("reporting.emote_reason.duplicate"),
					t("reporting.emote_reason.pornographic"),
					t("reporting.emote_reason.violence_gore"),
					t("reporting.emote_reason.i_appear_there"),
					t("reporting.emote_reason.offensive"),
				],
				USER: [],
				UNKNOWN: [],
			}[props.kind ?? "UNKNOWN"] ?? [];

		const displayName = computed(() => (props.target as Emote).name ?? (props.target as User).display_name);
		const isSubjectOther = computed(() => form.subject == t("reporting.emote_reason.other"));
		const isFormValid = computed(() => (isSubjectOther.value ? form.otherSubject != "" : form.subject != ""));

		const createReportMutation = useMutation<CreateReport>(CreateReport);
		const createReport = () => {
			createReportMutation
				.mutate({
					data: {
						target_kind: props.kind,
						target_id: props.target?.id,
						subject: form.subject + (form.otherSubject && `: ${form.otherSubject}`),
						body: form.body,
					},
				})
				.then(() => form.step++);
		};

		return {
			displayName,
			form,
			subjectChoices,
			isSubjectOther,
			isFormValid,
			createReport,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@scss/themes.scss";

.report-form {
	display: flex;
	flex-direction: column;
	padding: 1em;
	border-radius: 0.3em;
	width: 28em;

	.heading {
		display: flex;
		justify-content: space-between;

		h3 {
			text-transform: capitalize;
		}
		.close-btn {
			cursor: pointer;
			font-size: 1.5em;
			color: red;
			width: 1em;
			height: 1em;
		}
	}

	@include themify() {
		background-color: lighten(themed("backgroundColor"), 8);
		box-shadow: 6px 6px 1em themed("backgroundColor");
	}

	.choices {
		margin-top: 1em;

		> div {
			display: flex;
			align-items: center;
			flex-direction: row;
			margin-bottom: 0.5em;

			span {
				width: 24em;
				margin-left: 1em;
			}
		}
	}
	.other-choice {
		margin-left: 1em;
		margin-top: 1.5em;
	}

	.body {
		.body-content {
			margin-top: 1em;
		}

		.char-limit {
			color: gray;
			&[near="true"] {
				color: orange;
			}
			&[full="true"] {
				color: red;
			}
		}
	}

	.actions {
		display: flex;
		margin-top: 1em;
	}

	.abuse-notice {
		margin-top: 1em;
		color: gray;
		font-size: 0.66em;
	}
}
</style>
