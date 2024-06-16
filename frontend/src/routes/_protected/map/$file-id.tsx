import { useEffect } from "react";

import { queryOptions, useQueryErrorResetBoundary, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, ErrorComponent, useRouter } from "@tanstack/react-router";

import { fileRequests } from "@/api";
import { Player } from "@/components/templates/player";
import { Button } from "@/components/ui/button";

import type { ErrorComponentProps } from "@tanstack/react-router";

const request = fileRequests.retrieveFile;

const mapQueryOptions = (mapId: string) =>
  queryOptions({
    queryKey: [request.key, { mapId }],
    queryFn: () => request.fn(mapId),
    retry: false,
  });

export const Route = createFileRoute("/_protected/map/$file-id")({
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(mapQueryOptions(params["file-id"]));
  },
  errorComponent: PostErrorComponent,
  component: PostComponent,
});

function PostComponent() {
  const fileId = Route.useParams()["file-id"];
  const { data: file } = useSuspenseQuery(mapQueryOptions(fileId));

  return (
    <div className="space-y-2 py-4">
      <h4 className="text-xl font-bold">{file.title}</h4>

      <Player />
    </div>
  );
}

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
