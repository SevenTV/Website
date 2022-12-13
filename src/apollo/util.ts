/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryReturn } from "@vue/apollo-composable";

export function onFirstResult<Q extends UseQueryReturn<any, any>>(query: Q): Promise<QueryResult<Q>> {
	return new Promise((resolve, reject) => {
		if (query.result.value) {
			resolve(query.result.value);
		}

		const { off: stopResult } = query.onResult((result) => {
			resolve(result.data);
			stopResult();
			stopError();
		});

		const { off: stopError } = query.onError(() => {
			reject();
			stopResult();
			stopError();
		});
	});
}

export type QueryResult<T> = T extends UseQueryReturn<infer R, any> ? R : never;
