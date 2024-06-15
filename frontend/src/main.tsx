/* eslint-disable @typescript-eslint/no-non-null-assertion -- ignore assertion */
import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, ErrorComponent, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { ZodError } from "zod";

import "@/styles/index.css";

import { routeTree } from "./generated/routes";

export const queryClient = new QueryClient({
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

const rootElement = document.getElementById("root") as HTMLDivElement;

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 0,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
} else {
  throw new Error("Root element must be empty");
}
