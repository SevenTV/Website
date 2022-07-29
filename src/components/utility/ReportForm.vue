<template>
	<div class="report-form">
		<div class="heading">
			<span v-if="kind">
				<h3>Report {{ Report.NamedKind(kind) }}</h3>
				<p class="target-name">"{{ displayName }}"</p>
			</span>
			<Tooltip text="Close">
				<div class="close-btn" @click="emit('close')">
					<font-awesome-icon :icon="['far', 'times']" />
				</div>
			</Tooltip>
		</div>

		<!-- Step -1: Login required -->
		<div v-if="form.step === -1">
			<p>You must be logged in to report content.</p>
			<div class="action-button" selector="need-sign-in" @click="form.step = 0">
				<LoginButton />
			</div>
		</div>

		<!-- Step 1 -->
		<div v-if="form.step == 1" class="choices">
			<div v-for="choice of subjectChoices" :key="choice">
				<Radio v-model="form.subject" :item-i-d="choice" scale="1.25em" />
				<span>{{ t(choice) }}</span>
			</div>
			<div>
				<Radio v-model="form.subject" item-i-d="reporting.emote_reason.other" scale="1.25em" />
				<span> {{ t("reporting.emote_reason.other") }} </span>
			</div>
			<div v-if="isSubjectOther" class="other-choice">
				<TextInput v-model="form.otherSubject" :label="t('reporting.uncategorized_prompt')" />
			</div>
		</div>

		<!-- Step 2 -->
		<div v-if="form.step == 2" class="body">
			<span>{{ t(form.subject) }}{{ form.otherSubject && `: ${form.otherSubject}` }}</span>
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
				{{ t("reporting.success") }}.
				{{ t("reporting.notify") }}
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
			<span>{{ t("reporting.abuse_notice") }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useMutation } from "@vue/apollo-composable";
import { CreateReport } from "@gql/mutation/CreateReport";
import { Common } from "@/structures/Common";
import { Report } from "@structures/Report";
import type { Emote } from "@structures/Emote";
import type { User } from "@structures/User";
import Radio from "@components/form/Radio.vue";
import TextArea from "@components/form/TextArea.vue";
import TextInput from "@components/form/TextInput.vue";
import Button from "@components/utility/Button.vue";
import Tooltip from "@components/utility/Tooltip.vue";
import { useActorStore } from "@/store/actor";
import LoginButton from "./LoginButton.vue";

const { t, getLocaleMessage } = useI18n();

const props = defineProps({
	kind: Number as PropType<Common.ObjectKind>,
	target: Object as PropType<Emote | User | null>,
});

const emit = defineEmits(["close"]);

const form = reactive({
	step: 1,
	subject: "",
	otherSubject: "",
	body: "",
});

const actor = useActorStore();
if (!actor.id) {
	form.step = -1;

	const stop = watch(actor, (v) => {
		if (v.id) {
			form.step = 1;
			stop();
		}
	});
}

const subjectChoices =
	{
		[Common.ObjectKind.EMOTE]: [
			"reporting.emote_reason.i_made_this",
			"reporting.emote_reason.duplicate",
			"reporting.emote_reason.pornographic",
			"reporting.emote_reason.violence_gore",
			"reporting.emote_reason.i_appear_there",
			"reporting.emote_reason.offensive",
		],
		[Common.ObjectKind.USER]: [],

		[Common.ObjectKind.EMOTE_SET]: [],
		[Common.ObjectKind.ENTITLEMENT]: [],
		[Common.ObjectKind.MESSAGE]: [],
		[Common.ObjectKind.REPORT]: [],
		[Common.ObjectKind.BAN]: [],
		[Common.ObjectKind.ROLE]: [],
		[0]: [],
	}[props.kind ?? 0] ?? [];

const displayName = computed(() => (props.target as Emote).name ?? (props.target as User).display_name);
const isSubjectOther = computed(() => form.subject == "reporting.emote_reason.other");
const isFormValid = computed(() => (isSubjectOther.value ? form.otherSubject != "" : form.subject != ""));

const createReportMutation = useMutation<CreateReport>(CreateReport);
const createReport = () => {
	const locale = getLocaleMessage("en_US");
	const pth = form.subject.split(".").slice(1);
	const reasons = (locale.reporting as Record<string, string>)[pth[0]] as unknown as Record<string, string>;

	createReportMutation
		.mutate({
			data: {
				target_kind: props.kind,
				target_id: props.target?.id,
				subject: (reasons[pth[1]] ?? "") + (form.otherSubject && `: ${form.otherSubject}`),
				body: form.body,
			},
		})
		.then(() => form.step++);
};
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
		flex-direction: row;
		justify-content: space-between;

		h3 {
			text-transform: capitalize;
		}
		p.target-name {
			word-break: break-all;
			margin-bottom: 1em;
			@include themify() {
				color: darken(themed("color"), 24) !important;
			}
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

	.action-button[selector="need-sign-in"] {
		margin-top: 0.5em;
		font-size: 1.5em;
	}
}
</style>
