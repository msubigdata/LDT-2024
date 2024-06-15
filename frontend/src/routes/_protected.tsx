import { createFileRoute, redirect } from "@tanstack/react-router";

import { ProtectedLayout } from "@/components/layouts/protected-layout";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context, location }) => {
    // If the user is logged out, redirect them to the login page
    if (!context.auth.isAuthenticated) {
      redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
        throw: true,
      });
    }
  },
  component: () => <ProtectedLayoutComponent />,
});

function ProtectedLayoutComponent() {
  return <ProtectedLayout />;
}
