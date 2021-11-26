export const inBrowser = typeof window !== "undefined";

const conn = inBrowser && navigator.connection;
export const canPrefetch =
	inBrowser && (!conn || (((conn as any).effectiveType || "").indexOf("2g") === -1 && !(conn as any).saveData));

export const supportIntersectionObserver = inBrowser && window.IntersectionObserver;
