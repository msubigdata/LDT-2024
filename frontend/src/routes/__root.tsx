import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { NotFoundComponent } from "@/components/templates/not-fount";

export interface Auth {
  login: (username: string) => void;
  logout: () => void;
  status: "loggedOut" | "loggedIn";
  username?: string;
}

export interface RouterContext {
  auth: Auth;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext()({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundComponent />,
});
