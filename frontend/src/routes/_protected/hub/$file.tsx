import { createFileRoute } from "@tanstack/react-router";

import { FileRetrieveHubTemplate } from "@/components/templates/file-retrieve-hub/template";
import { fileQueryOptions } from "@/components/templates/file-retrieve-map/query-options";
import { PostErrorComponent } from "@/components/templates/retrieve-not-found";

export const Route = createFileRoute("/_protected/hub/$file")({
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(fileQueryOptions(params.file));
  },
  errorComponent: PostErrorComponent,
  component: FileRetrieveHubTemplate,
});
