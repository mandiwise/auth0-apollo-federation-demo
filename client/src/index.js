import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import ApolloProviderWithAuth from "./apollo";

import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <ApolloProviderWithAuth>
        <App />
      </ApolloProviderWithAuth>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
