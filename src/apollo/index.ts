import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: `${import.meta.env.VITE_APP_API_GQL}`,
});

// WebSocket Transport
const wsLink = new WebSocketLink({
	uri: `${import.meta.env.VITE_APP_API_GQL_WS}`,
	options: {
		reconnect: true,
		connectionParams: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	},
});

// Set up auth
const authLink = new ApolloLink((op, next) => {
	const tkn = localStorage.getItem("token");
	if (tkn) {
		op.setContext({
			headers: {
				Authorization: `Bearer ${tkn}`,
			},
		});
	}
	return next(op);
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
	link: ApolloLink.from([authLink, wsLink, httpLink]),
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
