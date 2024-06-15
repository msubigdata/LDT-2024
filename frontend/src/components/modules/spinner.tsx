import { cn } from "@/utils/cn";

import { Icons } from "./icons";

export type SpinnerProps = React.SVGAttributes<SVGElement>;

export function Spinner({ className, ...rest }: SpinnerProps) {
  return (
    <Icons.Spinner
      className={cn("size-[1.5em] shrink-0 animate-spin text-inherit", className)}
      {...rest}
    />
  );
}
