import { useOktaAuth } from "@okta/okta-react";
import { redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export default function LoginRedirect() {
  const { oktaAuth, authState } = useOktaAuth();
  const isAuthenticated = authState?.isAuthenticated;

  console.log({ isAuthenticated });

  useEffect(() => {
    if (isAuthenticated) {
      redirect({
        to: "/",
      });
    }
  }, [isAuthenticated]);

  if (isAuthenticated === undefined) return;

  oktaAuth.signInWithRedirect();
  // console.log("redirecting");
  return null;
}
