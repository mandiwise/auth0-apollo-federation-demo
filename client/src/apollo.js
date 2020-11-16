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

function createApolloClient(accessToken) {
  const authLink = setContext((request, { headers }) => {
    return {
      headers: {
        ...headers,
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`
        })
      }
    };
  });

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL
  });

  return new ApolloClient({ cache, link: authLink.concat(httpLink) });
}

function ApolloProviderWithAuth({ children }) {
  const [accessToken, setAccessToken] = useState();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  // Need to fetch the access token in `useEffect`...

  const client = createApolloClient(accessToken);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloProviderWithAuth;
