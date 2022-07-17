<template>
	<div class="activity">
		<div class="actor">
			<UserTag :user="log.actor" scale="2em" text-scale="1.125rem" :clickable="true"></UserTag>
			<span class="time">{{ getFormattedTimestamp(log.created_at) }}</span>
		</div>

		<span class="activity-list">
			<span v-for="c in getChangeStrings()" :key="c.name" class="activity-describe">
				<span v-if="c.icon" class="activity-icon">
					<font-awesome-icon :icon="['far', c.icon]" />
				</span>

				<component
					:is="targetComponent"
					:target="target"
					:name="c.name"
					:icon="c.icon"
					:variables="c.variables"
				/>
			</span>
		</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";
import { AuditLog } from "@/structures/Audit";
import { Common } from "@/structures/Common";
import { ConvertIntColorToHex } from "@/structures/util/Color";
import type { User } from "@/structures/User";
import type { Emote } from "@/structures/Emote";
import type { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import formatDate from "date-fns/fp/format";
import formatDateDistance from "date-fns/fp/formatDistanceWithOptions";
import differenceInDays from "date-fns/fp/differenceInDays";
import UserTag from "@components/utility/UserTag.vue";
import EmoteActivityVue from "./EmoteActivity.vue";
import UserActivityVue from "./UserActivity.vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { GetMinimalEmote } from "@/assets/gql/emotes/emote";

const props = defineProps<{
	log: AuditLog;
	target?: Emote | User | EmoteSet;
}>();

const now = () => new Date();
const getFormattedTimestamp = (timestamp: string) => {
	let result = "";
	const date = new Date(timestamp);

	if (differenceInDays(now())(date) === 0) {
		result = formatDateDistance({ addSuffix: true, includeSeconds: true }, now())(date);
	} else if (now().getFullYear() === date.getFullYear()) {
		result = formatDate("MMM. d, p")(date);
	} else {
		result = formatDate("MMM. d, y")(date);
	}

	return result;
};

const targetComponent = computed(() => {
	let co: Component | null = null;
	switch (props.log.target_kind) {
		case Common.ObjectKind.EMOTE:
			co = EmoteActivityVue;
			break;
		case Common.ObjectKind.USER:
			co = UserActivityVue;
			break;
		case Common.ObjectKind.EMOTE_SET:
			co = UserActivityVue;
			break;
		default:
			break;
	}

	return co;
});

const queryEmote = useLazyQuery(GetMinimalEmote, {}, {});
const getChangeStrings = (): DescribeChange[] => {
	const result = [] as DescribeChange[];

	const changes = props.log.changes.length > 0 ? props.log.changes : [{} as AuditLog.Change];
	switch (props.log.kind) {
		// Create Emote
		case AuditLog.Kind.CREATE_EMOTE:
			result.push({
				name: "emote_created",
				icon: "check",
				variables: {
					T: props.target,
				},
			});
			break;
		// Update Emote
		case AuditLog.Kind.UPDATE_EMOTE:
			for (const c of changes) {
				switch (c.key) {
					case "name":
						result.push({
							name: "emote_renamed",
							icon: "pen",
							variables: { T: props.target, O: c.value.o, N: c.value.n },
						});
						break;
					case "versions":
						for (const v of c.array_value.updated) {
							if (v.o.listed !== v.n.listed) {
								if (v.n.listed) {
									result.push({
										name: "emote_listing_approved",
										icon: "check",
										variables: { T: props.target },
									});
								} else {
									result.push({
										name: "emote_listing_revoked",
										icon: "times",
										variables: { T: props.target },
									});
								}
							}
						}

						break;
					default:
						result.push({
							name: "emote_updated",
							icon: "gear",
							variables: { T: props.target },
						});
				}
			}
			break;
		case AuditLog.Kind.DELETE_EMOTE:
			result.push({
				name: "emote_deleted",
				icon: "trash",
				variables: { T: props.target },
			});
			break;

		case AuditLog.Kind.UPDATE_EMOTE_SET: {
			const emoteIDs = new Set<string>();

			const applyEmote = (v: ActiveEmote): void => {
				if (emoteIDs.has(v.id)) {
					return;
				}

				emoteIDs.add(v.id);
				queryEmote.variables.value = { id: v.id };
				queryEmote.load();
				queryEmote.onResult((res) => {
					v.emote = res.data.emote;
				});
			};
			for (const c of changes) {
				switch (c.key) {
					case "emotes":
						for (const v of c.array_value.added) {
							result.push({
								name: "emote_set_emote_added",
								icon: "hexagon-plus",
								variables: { T: props.target, AE: v },
							});

							applyEmote(v as ActiveEmote);
						}
						for (const v of c.array_value.removed) {
							result.push({
								name: "emote_set_emote_removed",
								icon: "minus",
								variables: { T: props.target, AE: v },
							});

							applyEmote(v as ActiveEmote);
						}
						break;

					default:
						break;
				}
			}
		}
	}

	return result;
};

const bgColor = props.log.actor.tag_color ? ConvertIntColorToHex(props.log.actor.tag_color, 0.075) : 0;

interface DescribeChange {
	name: string;
	icon?: string;
	variables: Record<string, string | object | undefined>;
}
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.activity {
	display: block;
	flex-direction: column;
	margin-top: 0.5em;
	margin-bottom: 0.5em;
	padding: 0.5em;

	background-color: v-bind(bgColor);

	.activity-icon {
		margin-right: 0.25em;
	}

	.actor {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 0.25em;
	}

	.activity-describe {
		margin-left: 0.5em;
	}

	.time {
		text-align: right;
		font-size: small;
		font-style: italic;
		margin-left: 0.5em;

		@include themify() {
			color: mix(themed("backgroundColor"), themed("color"), 15);
		}
	}
}
</style>
