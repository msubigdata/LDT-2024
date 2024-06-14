import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { ZodError } from "zod";

import "@/styles/index.css";
import { routeTree } from "./generated/routes";

const rootElement = document.getElementById("root") as HTMLDivElement;

const router = createRouter({
  routeTree,
  // with 'intent' preload, the router will preload the next route when the user hovers over a link,
  // see: https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#defaultpreload-property
  defaultPreload: "intent",
  // since we're using React Query, we don't want loader calls to ever be stale
  // this will ensure that the loader is always called when the route is preloaded or visited
  defaultStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

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
