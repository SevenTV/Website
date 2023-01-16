import { LocalStorageKeys } from "@store/lskeys";
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client/core";

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: `${import.meta.env.VITE_APP_API_GQL}`,
});

// Set up auth
const authLink = new ApolloLink((op, next) => {
	const tkn = localStorage.getItem(LocalStorageKeys.TOKEN);

	if (tkn) {
		op.setContext({
			headers: {
				Authorization: `Bearer ${tkn}`,
			},
		});
	}
	return next(op);
});

const link = ApolloLink.from([authLink, httpLink]);

// Cache implementation
const cache = new InMemoryCache({
	typePolicies: {
		User: {
			fields: {
				roles: {
					merge(_, b) {
						return b;
					},
				},
			},
		},
		EmoteSet: {
			fields: {
				emotes: {
					merge(_, b) {
						return b;
					},
				},
			},
		},
		ChangeMap: {
			fields: {
				pulled: {
					merge(_, b) {
						return b;
					},
				},
				pushed: {
					merge(_, b) {
						return b;
					},
				},
			},
		},
	},
});

// Create the apollo client
export const apolloClient = new ApolloClient({
	link: link,
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
