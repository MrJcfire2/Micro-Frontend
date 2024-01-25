import {
  NotFoundRoute,
  Route,
  Router,
  redirect,
  rootRouteWithContext,
} from "@tanstack/react-router";
import App from "./App";
import Home from "./pages/Home";
import { LoginCallback } from "@okta/okta-react";
import LoginRedirect from "./pages/LoginRedirect";
// import AutoUnblockerApp from "autoUnblocker/AutoUnblockerApp";

interface RouterContext {
  auth: {
    isAuthenticated: boolean;
  };
}

const rootRoute = rootRouteWithContext<RouterContext>()({
  component: () => <App />,
});

const indexRoute = new Route({
  path: "/",
  getParentRoute: () => rootRoute,
  component: Home,
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

const loginRedirectRoute = new Route({
  path: "/login",
  getParentRoute: () => rootRoute,
  component: LoginRedirect,
});

const loginCallback = new Route({
  path: "/login/callback",
  getParentRoute: () => rootRoute,
  component: LoginCallback,
});

// const autoUnblockerRoute = new Route({
//   path: "/unblocker",
//   getParentRoute: () => rootRoute,
//   component: AutoUnblockerApp,
// });

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <p>Not Found</p>,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  // autoUnblockerRoute,
  loginRedirectRoute,
  loginCallback,
]);

export const router = new Router({
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
