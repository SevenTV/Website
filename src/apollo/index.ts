import { ApolloLink, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split } from "@apollo/client/core";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { LocalStorageKeys } from "@store/lskeys";

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: `${import.meta.env.VITE_APP_API_GQL}`,
});

// WebSocket Transport
export const wsClient = new SubscriptionClient(`${import.meta.env.VITE_APP_API_GQL_WS}`, {
	reconnect: true,
	connectionParams: () => {
		const tkn = localStorage.getItem(LocalStorageKeys.TOKEN);
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
		return def.kind === "OperationDefinition" && def.operation === "subscription";
	},
	wsLink,
	httpLink,
);

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

const link = ApolloLink.from([authLink, splitLink]);

export const reconnect = () => {
	wsClient.close(false, true);
};

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
