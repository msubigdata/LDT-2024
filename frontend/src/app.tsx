/* eslint-disable @typescript-eslint/no-non-null-assertion -- ignore assertion */
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, ErrorComponent, RouterProvider } from "@tanstack/react-router";
import { ZodError } from "zod";

import { PageLoader } from "./components/modules/page-loader";
import { AuthProvider, useAuthContext } from "./components/providers/auth";
import { routeTree } from "./generated/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error instanceof ZodError) {
          return false;
        }

        return failureCount < 3;
      },
    },
  },
});

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 0,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!,
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuthContext();

  return <RouterProvider router={router} context={{ auth }} />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<PageLoader />}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  );
}
