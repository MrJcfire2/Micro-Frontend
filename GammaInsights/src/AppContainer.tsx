import { useOktaAuth } from "@okta/okta-react";
import { router } from "./routes.tsx";
import { RouterProvider } from "@tanstack/react-router";

export default function AppContainer() {
  const { authState } = useOktaAuth();
  const isAuthenticated = authState?.isAuthenticated;

  if (isAuthenticated === undefined) return null;

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isAuthenticated,
        },
      }}
    />
  );
}
