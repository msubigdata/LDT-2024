import { Outlet } from "@tanstack/react-router";

export function PublicLayout() {
  return (
    <main className="h-full">
      <Outlet />
    </main>
  );
}
