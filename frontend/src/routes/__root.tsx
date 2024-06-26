import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { type AuthContext } from "@/components/providers/auth";
import { type ThemeProviderState } from "@/components/providers/theme";
import { NotFoundComponent } from "@/components/templates/not-found";

export interface RouterContext {
  auth: AuthContext;
  queryClient: QueryClient;
  theme?: ThemeProviderState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundComponent />,
});
