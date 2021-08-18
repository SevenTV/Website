import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";

// eslint-disable-next-line no-console
console.log(process.env);
// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: `${process.env.VUE_APP_API}/v2/gql`,
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});
