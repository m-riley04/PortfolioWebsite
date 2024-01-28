import { ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create http link
const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
});

// Generate and set header with authorization details
const authLink = setContext((_, { headers }) => {
    // Get authorization token from the environment variable
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    // Return the headers
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        },
    };
});

// Generate client with authLink and httpLink
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})