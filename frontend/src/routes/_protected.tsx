import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import Logo from "@/assets/logo.svg?react";
import { appConfig } from "@/constants/app-config";

export const Route = createFileRoute("/_protected")({
  component: () => <ProtectedLayoutComponent />,
});

function ProtectedLayoutComponent() {
  return (
    <main className="flex h-full">
      <SideBar />
      <section className="flex flex-1 flex-col">
        <div className="flex w-full">
          <div>Account</div>
          <button type="button">Выйти</button>
        </div>

        <Outlet />
      </section>
    </main>
  );
}

function SideBar() {
  return (
    <aside className="border-r bg-card">
      <div className="flex h-20 items-center gap-2 px-4">
        <Logo className="size-10" />
        <strong className="">{appConfig.name}</strong>
      </div>

      <nav className="w-64">
        <ul className="flex w-full flex-col">
          {appConfig.navLinks.map((m) => (
            <li key={m.to}>
              <Link
                className="flex w-full items-center gap-4 border-l-2 px-4 py-3 font-semibold text-muted-foreground transition-colors hover:text-foreground"
                to={m.to}
                activeProps={{ className: "bg-secondary/50 !text-foreground border-l-primary" }}
              >
                <m.Icon size={20} strokeWidth={2} /> {m.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
