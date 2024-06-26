/* eslint-disable @typescript-eslint/only-throw-error -- ignore throw */

import { createFileRoute, redirect } from "@tanstack/react-router";
import { isLoggedIn } from "axios-jwt";

import { ProtectedLayout } from "@/components/layouts/protected-layout";
import { PageLoader } from "@/components/modules/page-loader";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context, location }) => {
    const isLogged = await isLoggedIn();
    if (!context.auth.authenticated || !isLogged) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <ProtectedLayoutComponent />,
  loader: () => <PageLoader />,
});

function ProtectedLayoutComponent() {
  return <ProtectedLayout />;
}
