import { useEffect, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAccessToken, getRefreshToken } from "axios-jwt";

import { authRequests } from "@/api/auth";

const request = authRequests.checkAuth;

// НЕ ИСПОЛЬЗУЕТСЯ
export const useCheckAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const { isSuccess, isError } = useSuspenseQuery({
    queryKey: request.key,
    queryFn: async () => {
      const token = await getAccessToken();
      const refresh = await getRefreshToken();

      if (!refresh) {
        setAuthenticated(false);
        return null;
      }

      return request.fn({ refresh, token });
    },
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message === "No refresh token found") {
        return false;
      }
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (isError) {
      setAuthenticated(false);
    }
  }, [isError, setAuthenticated]);

  useEffect(() => {
    if (isSuccess) {
      setAuthenticated(true);
    }
  }, [isSuccess, setAuthenticated]);

  return { authenticated, setAuthenticated };
};
