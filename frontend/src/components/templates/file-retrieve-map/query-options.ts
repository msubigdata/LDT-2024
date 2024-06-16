import { queryOptions } from "@tanstack/react-query";

import { fileRequests } from "@/api";

const request = fileRequests.retrieveFile;

export const fileQueryOptions = (fileId: string) =>
  queryOptions({
    queryKey: [request.key, { fileId }],
    queryFn: () => request.fn(fileId),
    retry: false,
  });
