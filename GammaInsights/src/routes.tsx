import {
  NotFoundRoute,
  createRoute,
  createRouter,
  redirect,
  rootRouteWithContext,
} from "@tanstack/react-router";
import App from "./App";
import Home from "./pages/Home";
import { LoginCallback } from "@okta/okta-react";
import LoginRedirect from "./pages/LoginRedirect";
import AutoUnblockerApp from "autoUnblocker/AutoUnblockerApp";
// import LoginCallback from "./pages/LoginCallback";

interface RouterContext {
  auth: {
    isAuthenticated: boolean;
  };
}

const rootRoute = rootRouteWithContext<RouterContext>()({
  component: () => <App />,
});

const protectedRoute = createRoute({
  id: "index",
  getParentRoute: () => rootRoute,
  beforeLoad: ({ context }) => {
    console.log({ beforeLoadIsAuthenticated: context.auth.isAuthenticated });
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => protectedRoute,
  component: Home,
});

const marketsRoute = createRoute({
  path: "markets",
  getParentRoute: () => protectedRoute,
  component: () => <p>Markets</p>,
});

const loginRedirectRoute = createRoute({
  path: "login",
  getParentRoute: () => rootRoute,
  component: LoginRedirect,
});

const loginCallbackRoute = createRoute({
  path: "login/callback",
  getParentRoute: () => rootRoute,
  component: LoginCallback,
});

const autoUnblockerRoute = createRoute({
  path: "/unblocker",
  getParentRoute: () => rootRoute,
  component: AutoUnblockerApp,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <p>Not Found</p>,
});

const routeTree = rootRoute.addChildren([
  protectedRoute.addChildren([homeRoute, marketsRoute]),
  autoUnblockerRoute,
  loginRedirectRoute,
  loginCallbackRoute,
]);

export const router = createRouter({
  routeTree,
  notFoundRoute: notFoundRoute,
  context: {
    auth: {
      isAuthenticated: false,
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
