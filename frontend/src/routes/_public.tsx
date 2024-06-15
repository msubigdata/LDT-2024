import { createFileRoute } from "@tanstack/react-router";

import { PublicLayout } from "@/components/layouts/public-layout";

export const Route = createFileRoute("/_public")({
  component: () => <PublicLayoutComponent />,
});

function PublicLayoutComponent() {
  return <PublicLayout />;
}
