import { type UserAuth } from "@/types/auth";

import { authTokensSchema, axiosInstance } from "./axios";

export const authRequests = {
  checkAuth: {
    key: ["CHECK_AUTH"],
    fn: (payload: { refresh?: string }) =>
      axiosInstance.post("/auth/token/verify/", payload).then(() => {
        // const user = await axiosInstance.get("/user/me");
        return "hello";
      }),
  },
  signIn: {
    key: ["SIGN_IN"],
    fn: (payload: UserAuth) =>
      axiosInstance.post("/auth/login", payload).then(async ({ data }) => {
        const tokens = await authTokensSchema.parseAsync(data);
        return tokens;
      }),
  },
};
