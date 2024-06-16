import { getRouteApi, Link, Outlet, useLocation, useRouter } from "@tanstack/react-router";
import { PlusCircleIcon, Settings } from "lucide-react";
import { useToggle } from "usehooks-ts";

import { appConfig } from "@/constants/app-config";

import { Icons } from "../modules/icons";
import { useAuthContext } from "../providers/auth";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import { UploadDialog } from "./upload-dialog";

const routeApi = getRouteApi("/_protected");

export function ProtectedLayout() {
  return (
    <main className="flex h-full">
      <SideBar />
      <section className="flex flex-1 flex-col">
        <AppBar />
        <div className="container flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

function SideBar() {
  return (
    <aside className="shrink-0 border-r bg-card">
      <div className="flex h-14 flex-col justify-center border-b">
        <Link to="/" className="flex select-none items-center justify-center gap-2.5 px-4">
          <Icons.Logo className="size-6" />
          <span className="font-semibold text-[#009FE3]">{appConfig.name}</span>
        </Link>
      </div>

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
  const [openUploadDialog, toggleUploadDialog] = useToggle(false);
  const { logout, user } = useAuthContext();
  const router = useRouter();
  const navigate = routeApi.useNavigate();

  const { pathname } = useLocation();

  const handleLogout = () => {
    void logout().then(() => {
      void router.invalidate().then(() => {
        return navigate({ to: "/sign-in" });
      });
    });
  };

  const name = `${user?.first_name} ${user?.last_name}`;

  return (
    <div className="flex h-14 w-full shrink-0 items-center justify-between gap-4 border-b px-4">
      <div>{appConfig.navLinks.find((link) => link.to === pathname)?.title} </div>

      <div className="flex items-center gap-4">
        <Button
          size="sm"
          onClick={() => {
            toggleUploadDialog();
          }}
        >
          <PlusCircleIcon className="mr-2 size-4" /> Добавить материал
        </Button>
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button
              size="sm"
              onClick={() => {
                toggleUploadDialog();
              }}
              variant="ghost"
            >
              <Settings className="mr-2 size-4" /> Настройки
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content side="bottom" align="end" sideOffset={10}>
            <DropdownMenu.Label>{name}</DropdownMenu.Label>
            <DropdownMenu.Separator />

            <DropdownMenu.Item onClick={handleLogout}>Выйти</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>

      <UploadDialog
        onSubmit={(data) => {
          console.log(data);
        }}
        isLoading={false}
        open={openUploadDialog}
        onClose={toggleUploadDialog}
      />
    </div>
  );
}
