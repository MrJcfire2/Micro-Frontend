import { useOktaAuth } from "@okta/okta-react";

export default function SignOutButton() {
  const { oktaAuth } = useOktaAuth();
  const isAuthenticated =
    oktaAuth.authStateManager.getAuthState()?.isAuthenticated || false;

  console.log({ isAuthenticated });

  return (
    <button
      onClick={() => {
        oktaAuth.signOut();
      }}
    >
      Sign Out
    </button>
  );
}
