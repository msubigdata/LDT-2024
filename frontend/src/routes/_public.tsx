import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: () => <PublicLayoutComponent />,
});

function PublicLayoutComponent() {
  return (
    <div>
      <h1>Публичный Layout</h1>
      <Outlet />
    </div>
  );
}
