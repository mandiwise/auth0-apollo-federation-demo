import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL
  });

  return new ApolloClient({ cache, link: httpLink });
}

const client = createApolloClient();

export default client;
