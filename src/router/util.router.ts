import type { RouteLocationNormalizedLoaded } from "vue-router";

export function getFirstParam(route: RouteLocationNormalizedLoaded, param: string): string | undefined {
	const value = route.params[param];

	return value instanceof Array ? value[0] : value;
}
