<template>
	<div class="activity">
		<div class="actor">
			<UserTag :user="log.actor" scale="1.5em" text-scale="1rem" :clickable="true"></UserTag>
			<span class="time">{{ getFormattedTimestamp(log.created_at) }}</span>
		</div>

		<div class="activity-list">
			<span v-for="c in changeStrings" :key="c.name" class="activity-describe">
				<span v-if="c.icon" class="activity-icon" :style="{ color: c.iconColor }">
					<Icon :icon="c.icon" />
				</span>

				<component
					:is="targetComponent"
					:target="c.variables.T"
					:name="c.name"
					:icon="c.icon"
					:variables="c.variables"
				/>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Component } from "vue";
import { useDataLoaders } from "@/store/dataloader";
import { AuditLog } from "@/structures/Audit";
import { ObjectKind } from "@/structures/Common";
import { Emote } from "@/structures/Emote";
import type { ActiveEmote, EmoteSet } from "@/structures/EmoteSet";
import type { User } from "@/structures/User";
import { HasBits } from "@/structures/util/BitField";
import { ConvertDecimalToHex, SetHexAlpha } from "@/structures/util/Color";
import UserTag from "@/components/utility/UserTag.vue";
import EmoteActivityVue from "./EmoteActivity.vue";
import UserActivityVue from "./UserActivity.vue";
import Icon from "../utility/Icon.vue";
import differenceInDays from "date-fns/fp/differenceInDays";
import formatDate from "date-fns/fp/format";
import formatDateDistance from "date-fns/fp/formatDistanceWithOptions";

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

const bgColor = props.log.actor.style.color ? ConvertDecimalToHex(props.log.actor.style.color) + SetHexAlpha(0.5) : 0;

const targetComponent = computed(() => {
	let co: Component | null = null;
	switch (props.log.target_kind) {
		case ObjectKind.EMOTE:
			co = EmoteActivityVue;
			break;
		case ObjectKind.USER:
			co = UserActivityVue;
			break;
		case ObjectKind.EMOTE_SET:
			co = UserActivityVue;
			break;
		default:
			break;
	}

	return co;
});

const dataloader = useDataLoaders();

const diffBits = (o: number, n: number, bit: number): "same" | "set" | "clear" => {
	if (o === n) {
		return "same";
	} else if (!HasBits(o, bit) && HasBits(n, bit)) {
		return "set";
	} else if (!HasBits(n, bit) && HasBits(o, bit)) {
		return "clear";
	}

	return "same";
};

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
							let t = props.target as Emote;

							if (v.o.listed !== v.n.listed) {
								const ver = t.versions[v.p];
								if (ver) {
									t = { ...t, id: ver.id, host: ver.host };
								}

								if (v.n.listed) {
									result.push({
										name: "emote_listing_approved",
										icon: "check",
										iconColor: "#0ae16e",
										variables: { T: t },
									});
								} else {
									result.push({
										name: "emote_listing_revoked",
										icon: "times",
										iconColor: "#dc0f46",
										variables: { T: t },
									});
								}
							}

							if (v.o.allow_personal !== v.n.allow_personal) {
								const ver = t.versions[v.p];
								if (ver) {
									t = { ...t, id: ver.id, host: ver.host };
								}

								if (v.n.allow_personal) {
									result.push({
										name: "emote_personal_use_validated",
										icon: "check",
										iconColor: "#0ae16e",
										variables: { T: t },
									});
								} else {
									result.push({
										name: "emote_personal_use_rejected",
										icon: "times",
										iconColor: "#dc0f46",
										variables: { T: t },
									});
								}
							}
						}

						break;
					case "tags":
						result.push({
							name: "emote_tags_updated",
							icon: "hashtag",
							variables: {
								T: props.target,
								O: [],
								N: (c.value.n as string[])?.map((s) => `#${s}`).join(", ") ?? "none",
							},
						});

						break;
					case "flags": {
						const n = c.value.n as unknown as number;
						const o = c.value.o as unknown as number;

						for (const bit of [Emote.Flags.PRIVATE, Emote.Flags.ZERO_WIDTH]) {
							const diff = diffBits(o, n, bit);
							const ico = {
								[Emote.Flags.PRIVATE]: ["lock", "unlock", "#878787", "#2dbe14"],
								[Emote.Flags.ZERO_WIDTH]: ["object-group", "object-ungroup", "goldenrod", "#998a5c"],
							}[bit as number];
							if (!ico) continue;

							switch (diff) {
								case "set":
									result.push({
										name: "emote_flag_added",
										icon: ico[0],
										iconColor: ico[2],
										variables: { T: props.target, FLAG: Emote.Flags[bit] },
									});
									break;
								case "clear":
									result.push({
										name: "emote_flag_removed",
										icon: ico[1],
										iconColor: ico[3],
										variables: { T: props.target, FLAG: Emote.Flags[bit] },
									});
									break;
								default:
									break;
							}
						}

						break;
					}
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

		case AuditLog.Kind.PROCESS_EMOTE:
			result.push({
				name: "emote_processed",
				icon: "rotate-right",
				variables: { T: props.target },
			});
			break;

		case AuditLog.Kind.UPDATE_EMOTE_SET: {
			const applyEmote = (v: ActiveEmote): void => {
				dataloader.loadEmotes([v.id]).then((emotes) => {
					v.data = emotes[0];
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
						for (const v of c.array_value.updated) {
							if (v.o.name !== v.n.name) {
								result.push({
									name: "emote_set_emote_renamed",
									icon: "pen",
									variables: { T: props.target, AE: v.n, O: v.o.name, N: v.n.name },
								});
							}

							applyEmote(v.n as ActiveEmote);
						}
						break;
					case "capacity":
						result.push({
							name: "emote_set_capacity_updated",
							icon: "box",
							variables: { T: props.target, O: c.value.o, N: c.value.n },
						});
						break;
					case "name":
						result.push({
							name: "emote_set_renamed",
							icon: "pen",
							variables: { T: props.target, O: c.value.o, N: c.value.n },
						});
						break;
				}
			}
			break;
		}

		case AuditLog.Kind.EDIT_USER: {
			const applyUser = (v: User.Editor): void => {
				dataloader.loadUsers([v.id]).then((users) => {
					v.user = users[0];
				});
			};

			for (const c of changes) {
				switch (c.key) {
					case "editors": {
						for (const v of c.array_value.added) {
							result.push({
								name: "user_editor_added",
								icon: "user-plus",
								variables: { U: v },
							});

							applyUser(v as User.Editor);
						}
						for (const v of c.array_value.updated) {
							result.push({
								name: "user_editor_updated",
								icon: "pen",
								variables: { U: v.n },
							});

							applyUser(v.n as User.Editor);
						}
						for (const v of c.array_value.removed) {
							result.push({
								name: "user_editor_removed",
								icon: "user-minus",
								variables: { U: v },
							});

							applyUser(v as User.Editor);
						}
						break;
					}
				}
			}
			break;
		}
	}

	return result;
};

const changeStrings = ref([] as DescribeChange[]);

changeStrings.value = getChangeStrings();

interface DescribeChange {
	name: string;
	icon?: string;
	iconColor?: string;
	variables: Record<string, string | object | undefined>;
}
</script>

<style scoped lang="scss">
@import "@scss/themes.scss";

.activity {
	padding: 0.5em;
	padding-right: 2em;

	border-left: 0.21em solid;
	border-color: v-bind("bgColor");

	.activity-icon {
		margin-right: 0.25em;
	}

	.actor {
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 0.925rem;
	}

	.activity-list {
		display: grid;
		gap: 1em;
	}

	.activity-describe {
		display: block;
		word-wrap: break-word;
		font-size: 0.85rem;
		margin-top: 0.25rem;
	}

	.time {
		font-style: italic;
		font-size: 0.75rem;
		padding: 0 0.5rem;

		@include themify() {
			color: mix(themed("backgroundColor"), themed("color"), 15%);
		}
	}
}
</style>
