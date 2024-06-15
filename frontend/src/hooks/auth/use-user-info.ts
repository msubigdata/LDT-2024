import { useQuery } from "@tanstack/react-query";

import { authRequests } from "@/api/auth";
import { type UserInfo } from "@/types/auth";

import type { UseQueryOptions } from "@tanstack/react-query";

const request = authRequests.me;

export const useUserInfo = (
  options?: Omit<UseQueryOptions<unknown, unknown, UserInfo>, "queryKey">,
) => {
  const { data: userInfo, ...rest } = useQuery({
    ...options,
    queryKey: request.key,
    queryFn: request.fn,
  });

  return { userInfo, ...rest };
};
