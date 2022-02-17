import { ApolloLink, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split } from "@apollo/client/core";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: `${import.meta.env.VITE_APP_API_GQL}`,
});

// WebSocket Transport
let wsConnected = false;
export const wsClient = new SubscriptionClient(`${import.meta.env.VITE_APP_API_GQL_WS}`, {
	reconnect: true,
	connectionParams: () => {
		const tkn = localStorage.getItem("token");
		if (tkn) {
			return {
				Authorization: `Bearer ${tkn}`,
			};
		}
	},
});

const wsLink = new WebSocketLink(wsClient);

const splitLink = split(
	({ query }) => {
		const def = getMainDefinition(query);
		return wsConnected || (def.kind === "OperationDefinition" && def.operation === "subscription");
	},
	wsLink,
	httpLink
);

wsClient.onConnected(() => (wsConnected = true));
wsClient.onDisconnected(() => (wsConnected = false));

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

const link = ApolloLink.from([authLink, splitLink]);

export const reconnect = async () => {
	wsClient.close(false, true);
	return new Promise((resolve) => wsClient.onConnected(() => resolve(undefined)));
};

// Cache implementation
const cache = new InMemoryCache();

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
