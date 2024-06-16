import { useQuery } from "@tanstack/react-query";

import { locationRequests } from "@/api";

const request = locationRequests.getLocations;

export const useLocations = () => {
  const {
    data: locationList,
    isLoading: locationsLoading,
    ...rest
  } = useQuery({
    queryKey: request.key,
    queryFn: request.fn,
  });

  return { locationList, locationsLoading, ...rest };
};
