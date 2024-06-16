/* eslint-disable @typescript-eslint/no-non-null-assertion -- ignore assertion */
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, ErrorComponent, RouterProvider } from "@tanstack/react-router";
import { ZodError } from "zod";

import { PageLoader } from "./components/modules/page-loader";
import { AuthProvider, useAuthContext } from "./components/providers/auth";
import { ThemeProvider, useTheme } from "./components/providers/theme";
import { Toaster } from "./components/ui/sonner";
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
    theme: undefined!,
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
  const theme = useTheme();

  return <RouterProvider router={router} context={{ auth, theme, queryClient }} />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<PageLoader />}>
        <AuthProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <InnerApp />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  );
}
