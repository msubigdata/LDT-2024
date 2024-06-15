import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

import { Icons } from "../modules/icons";
import { buttonVariants } from "../ui/button";

export function NotFoundComponent() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      <Icons.Logo className="size-32" />
      <h1 className="text-center text-3xl font-bold">Страница не найдена</h1>

      <Link to="/" className={cn(buttonVariants({ variant: "default" }))}>
        Перейти на главную страница
      </Link>
    </div>
  );
}
