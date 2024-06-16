import { useQuery } from "@tanstack/react-query";

import { fileRequests } from "@/api";

const request = fileRequests.getFiles;

export const useFiles = () => {
  const {
    data: filesList,
    isLoading: filesLoading,
    ...rest
  } = useQuery({
    queryKey: request.key,
    queryFn: request.fn,
  });

  return { filesList, filesLoading, ...rest };
};
