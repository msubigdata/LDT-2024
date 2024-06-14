import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import Logo from "@/assets/logo.svg?react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { appConfig } from "@/constants/app-config";

export const Route = createFileRoute("/_protected")({
  component: () => <ProtectedLayoutComponent />,
});

function ProtectedLayoutComponent() {
  return (
    <main className="flex h-full">
      <SideBar />
      <section className="container flex flex-1 flex-col">
        <AppBar />
        <Outlet />
      </section>
    </main>
  );
}

function SideBar() {
  return (
    <aside className="border-r bg-card">
      <Link to="/" className="flex h-20 select-none items-center justify-center gap-2.5 px-4">
        <Logo className="size-10" />
        <span className="font-bold">{appConfig.name}</span>
      </Link>

      <nav className="mt-4 w-64">
        <ul className="flex w-full flex-col">
          {appConfig.navLinks.map((m) => (
            <li key={m.to}>
              <Link
                className="flex w-full items-center justify-between gap-4 border-l-2 px-4 py-3 font-semibold text-muted-foreground transition-colors hover:text-foreground"
                to={m.to}
                activeProps={{ className: "bg-secondary/50 !text-foreground border-l-primary" }}
              >
                {m.title}
                <m.Icon size={20} strokeWidth={2} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function AppBar() {
  return (
    <div className="flex h-14 w-full items-center justify-end gap-4">
      <DropdownMenu>
        <DropdownMenu.Trigger className="flex items-center gap-2 text-muted-foreground">
          <Settings />
          <span>Настройки</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Billing</DropdownMenu.Item>
          <DropdownMenu.Item>Team</DropdownMenu.Item>
          <DropdownMenu.Item>Subscription</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
