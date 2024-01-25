import { isAuthenticator } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import * as React from "react";

export type AuthContext = {
  isAuthenticated: boolean;
};

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { oktaAuth } = useOktaAuth();
  const isAuthenticated =
    oktaAuth.authStateManager.getAuthState()?.isAuthenticated || false;
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
