import { createFileRoute } from "@tanstack/react-router";

import { fileQueryOptions } from "@/components/templates/file-retrieve-map/query-options";
import { FileRetrieveMapTemplate } from "@/components/templates/file-retrieve-map/template";
import { PostErrorComponent } from "@/components/templates/retrieve-not-found";

export const Route = createFileRoute("/_protected/map/$file")({
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(fileQueryOptions(params.file));
  },
  errorComponent: PostErrorComponent,
  component: FileRetrieveMapTemplate,
});
