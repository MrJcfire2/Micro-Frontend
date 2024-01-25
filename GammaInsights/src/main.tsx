import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Security } from "@okta/okta-react";
import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";
import AppContainer from "./AppContainer.tsx";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-56954404.okta.com/oauth2/default",
  clientId: "0oa6uxuhjgXINkcUp5d7",
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ["openid", "profile", "email"],
});

const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
  console.log({ originalUri });
  console.log("test");
  window.location.replace(
    toRelativeUrl(originalUri || "/", window.location.origin)
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <AppContainer />
    </Security>
  </React.StrictMode>
);
