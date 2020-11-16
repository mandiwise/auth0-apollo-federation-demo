import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const cache = new InMemoryCache();

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL
  });

  return new ApolloClient({ cache, link: httpLink });
}

const client = createApolloClient();

export default client;
