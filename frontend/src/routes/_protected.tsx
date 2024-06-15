import { createFileRoute } from "@tanstack/react-router";

import { ProtectedLayout } from "@/components/layouts/protected-layout";

export const Route = createFileRoute("/_protected")({
  component: () => <ProtectedLayoutComponent />,
});

function ProtectedLayoutComponent() {
  return <ProtectedLayout />;
}
