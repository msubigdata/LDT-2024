import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";

import Logo from "@/assets/logo.svg?react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createRootRouteWithContext()({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundComponent />,
});

function NotFoundComponent() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      <Logo className="size-32" />
      <h1 className="text-center text-3xl font-bold">Страница не найдена</h1>

      <Link to="/" className={cn(buttonVariants({ variant: "default" }))}>
        Перейти на главную страница
      </Link>
    </div>
  );
}
