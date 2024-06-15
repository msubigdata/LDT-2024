/* eslint-disable @typescript-eslint/only-throw-error -- ignore throw */

import { createFileRoute, redirect } from "@tanstack/react-router";

import { ProtectedLayout } from "@/components/layouts/protected-layout";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context, location }) => {
    console.log(context.auth, "- protected layout");
    if (!context.auth.authenticated) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <ProtectedLayoutComponent />,
});

function ProtectedLayoutComponent() {
  return <ProtectedLayout />;
}
