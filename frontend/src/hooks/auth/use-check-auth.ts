import { useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getRefreshToken } from "axios-jwt";

import { authRequests } from "@/api/auth";

const request = authRequests.checkAuth;

export const useCheckAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useSuspenseQuery({
    queryKey: request.key,
    queryFn: async () => {
      const refresh = await getRefreshToken();

      try {
        if (!refresh) {
          setAuthenticated(false);
          throw new Error("No refresh token found");
        }

        return request.fn({ refresh }).then((res) => {
          setAuthenticated(true);
          return { username: res };
        });
      } catch (error) {
        console.error("Не удалось проверить токен");
        // throw error;

        return null;
      }
    },
  });

  return { authenticated };
};
