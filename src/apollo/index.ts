import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from "@apollo/client/core";
// import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
// import { sha256 } from "crypto-hash";

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: `${import.meta.env.VITE_APP_API_GQL}/v3`,
	headers: {
		Authorization: () => {
			const tkn = localStorage.getItem("token");
			if (!tkn) return undefined;

			return `Bearer ${localStorage.getItem("token")}`;
		},
	},
});

// Set up auth
const authLink = new ApolloLink((op, next) => {
	const tkn = localStorage.getItem("token");
	const h = tkn ? `Bearer ${tkn}` : undefined;
	op.setContext({
		headers: {
			Authorization: h,
		},
	});
	return next(op);
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
	link: ApolloLink.from([
		authLink,
		/* createPersistedQueryLink({
			sha256,
			useGETForHashedQueries: true,
		}), */
		httpLink,
	]),
	cache,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "no-cache",
		},
		query: {
			fetchPolicy: "no-cache",
		},
	},
});
