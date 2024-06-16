import { getRouteApi, Link, Outlet, useRouter } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { appConfig } from "@/constants/app-config";

import { Icons } from "../modules/icons";
import { useAuthContext } from "../providers/auth";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

const routeApi = getRouteApi("/_protected");

export function ProtectedLayout() {
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
        <Icons.Logo />
        <span className="font-semibold text-[#009FE3]">{appConfig.name}</span>
      </Link>

      <Separator />

      <nav className="my-3 w-64 flex-1">
        <nav className="grid items-start gap-y-1.5 px-2 text-sm font-medium">
          {appConfig.navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              activeProps={{ className: "bg-muted hover:!text-muted-foreground" }}
            >
              {link.title}
              <link.Icon className="size-4" />
            </Link>
          ))}
        </nav>
      </nav>
    </aside>
  );
}

function AppBar() {
  const { logout, user } = useAuthContext();
  const router = useRouter();
  const navigate = routeApi.useNavigate();

  const handleLogout = () => {
    void logout().then(() => {
      void router.invalidate().then(() => {
        return navigate({ to: "/sign-in" });
      });
    });
  };

  return (
    <div className="flex h-14 w-full items-center justify-end gap-4">
      <DropdownMenu>
        <DropdownMenu.Trigger className="flex items-center gap-2 text-sm text-muted-foreground">
          <Settings className="size-5" />
          <span>Настройки</span>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content side="bottom" align="end" sideOffset={10}>
          <DropdownMenu.Label>{user?.username}</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Billing</DropdownMenu.Item>
          <DropdownMenu.Item>Team</DropdownMenu.Item>
          <DropdownMenu.Item>Subscription</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={handleLogout}>Выйти</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
