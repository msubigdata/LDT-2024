import { useEffect } from "react";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorComponent, useRouter } from "@tanstack/react-router";

import type { ErrorComponentProps } from "@tanstack/react-router";

import { Button } from "../ui/button";

export class PostNotFoundError extends Error {}

export function PostErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  if (error instanceof PostNotFoundError) {
    return <div>Страница не найдена</div>;
  }

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <Button
        onClick={() => {
          reset();
          void router.invalidate();
        }}
      >
        Повторить
      </Button>
      <ErrorComponent error={error} />
    </div>
  );
}
