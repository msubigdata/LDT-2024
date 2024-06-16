import { useQuery } from "@tanstack/react-query";

import { cameraRequests } from "@/api";

const request = cameraRequests.getCameras;

export const useCams = () => {
  const {
    data: camsList,
    isLoading: camsLoading,
    ...rest
  } = useQuery({
    queryKey: request.key,
    queryFn: request.fn,
  });

  return { camsList, camsLoading, ...rest };
};
