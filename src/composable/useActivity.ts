import { UpdateActivity } from "@/assets/gql/mutation/Activity";
import { Common } from "@/structures/Common";
import { useMutation } from "@vue/apollo-composable";

export function useActivity(opt: UseActivityOptions): void {
	useMutation<UpdateActivity.Result, UpdateActivity.Variables>(UpdateActivity, {
		variables: {
			status: opt.status,
			type: {
				type: opt.type,
				name: opt.name,
			},
			object: opt.object
				? {
						kind: Common.ObjectKind[opt.object.kind],
						id: opt.object.id,
				  }
				: undefined,
		},
	}).mutate();
}

export interface UseActivityOptions {
	type: string;
	name: string;
	status: string;
	object?: {
		kind: keyof typeof Common.ObjectKind;
		id: string;
	};
}
