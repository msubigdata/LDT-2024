import { userInfoSchema } from "@/types/auth";

import type { UserAuth } from "@/types/auth";

import { authTokensSchema, axiosInstance } from "./axios";

export const authRequests = {
  checkAuth: {
    key: ["CHECK_AUTH"],
    fn: (payload: { token?: string; refresh?: string }) => {
      return axiosInstance.post("/auth/token/verify/", payload);
    },
  },
  signIn: {
    key: ["SIGN_IN"],
    fn: (payload: UserAuth) =>
      axiosInstance.post("/auth/token/", payload).then(async ({ data }) => {
        const tokens = await authTokensSchema.optional().parseAsync(data);
        return tokens;
      }),
  },
  me: {
    key: ["USER_INFO"],
    fn: () =>
      axiosInstance.get("/auth/me/").then(({ data }) => userInfoSchema.optional().parse(data)),
  },
};
