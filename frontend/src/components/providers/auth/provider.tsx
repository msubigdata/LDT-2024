import { createContext, useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { type ReactNode } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from "axios-jwt";

import { authRequests } from "@/api/auth";
import { type AuthTokens } from "@/api/axios";
import { useUserInfo } from "@/hooks/auth/use-user-info";
import { type UserAuth, type UserInfo } from "@/types/auth";

import type { UseMutationResult } from "@tanstack/react-query";

export interface AuthContext {
  login: (data: UserAuth) => Promise<void>;
  logout: () => Promise<void>;
  authenticated: boolean;
  user?: UserInfo;
  loginMutation: UseMutationResult<AuthTokens | undefined, Error, UserAuth>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  useQuery({
    queryKey: authRequests.checkAuth.key,
    queryFn: async () => {
      const token = await getAccessToken();
      const refresh = await getRefreshToken();

      if (!refresh) {
        setAuthenticated(false);
        throw new Error("No refresh token found");
      }

      return authRequests.checkAuth
        .fn({ refresh, token })
        .then(() => {
          setAuthenticated(true);
          return null;
        })
        .catch(() => {
          setAuthenticated(false);
          return null;
        });
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

  const logout = useCallback(async () => {
    await clearAuthTokens().then(() => {
      setAuthenticated(false);
    });
  }, [setAuthenticated]);

  const { userInfo } = useUserInfo({ enabled: authenticated });

  // const { mutateAsync: signIn, ...rest } = useMutation({
  //   mutationKey: authRequests.signIn.key,
  //   mutationFn: authRequests.signIn.fn,
  // });

  const loginMutation = useMutation({
    mutationKey: authRequests.signIn.key,
    mutationFn: authRequests.signIn.fn,
  });

  const login = useCallback(
    async (data: UserAuth) => {
      return loginMutation.mutateAsync(data).then(async (tokens) => {
        if (tokens) {
          await setAuthTokens({
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
          });

          flushSync(() => {
            setAuthenticated(true);
          });
        }
      });
    },
    [loginMutation],
  );

  const memoContext = useMemo(
    () => ({ authenticated, login, logout, user: userInfo, loginMutation }),
    [authenticated, login, loginMutation, logout, userInfo],
  );

  return <AuthContext.Provider value={memoContext}>{children}</AuthContext.Provider>;
}

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const token = await getAccessToken();
//       const refresh = await getRefreshToken();

//       await authRequests.checkAuth.fn({ token, refresh }).then(() => {
//         setAuthenticated(true);
//       });
//     } catch (error) {
//       setAuthenticated(false);
//     }
//   };

//   void fetchData();
// }, [setAuthenticated]);

// export interface AuthContext {
//   login: (data: UserAuth) => Promise<void>;
//   loginLoading: boolean;
//   logout: () => Promise<void>;
//   authenticated: boolean;
//   user?: UserInfo;
// }

// export const AuthContext = createContext<AuthContext | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [authenticated, setAuthenticated] = useState(false);

//   useQuery({
//     queryKey: authRequests.checkAuth.key,
//     queryFn: async () => {
//       const token = await getAccessToken();
//       const refresh = await getRefreshToken();

//       if (!refresh) {
//         setAuthenticated(false);
//         return null;
//       }

//       return authRequests.checkAuth
//         .fn({ refresh, token })
//         .then(() => {
//           setAuthenticated(true);
//           console.log("then");
//           return null;
//         })
//         .catch(() => {
//           setAuthenticated(false);
//           console.log("catch");
//           return null;
//         });
//     },
//     retry: (failureCount, error) => {
//       if (error instanceof Error && error.message === "No refresh token found") {
//         return false;
//       }
//       if (error instanceof AxiosError && error.response?.status === 401) {
//         return false;
//       }
//       return failureCount < 3;
//     },
//   });

//   const logout = useCallback(async () => {
//     await clearAuthTokens().then(() => {
//       setAuthenticated(false);
//     });
//   }, [setAuthenticated]);

//   const { userInfo } = useUserInfo({ enabled: authenticated });

//   const { mutateAsync: signIn, isPending: loginLoading } = useMutation({
//     mutationKey: authRequests.signIn.key,
//     mutationFn: authRequests.signIn.fn,
//   });

//   const login = useCallback(
//     async (data: UserAuth) => {
//       await signIn(data).then(async (tokens) => {
//         if (tokens) {
//           await setAuthTokens({
//             accessToken: tokens.access,
//             refreshToken: tokens.refresh,
//           });

//           flushSync(() => {
//             setAuthenticated(true);
//           });
//         }
//       });
//     },
//     [setAuthenticated, signIn],
//   );

//   const memoContext = useMemo(
//     () => ({ authenticated, login, logout, loginLoading, user: userInfo }),
//     [authenticated, login, loginLoading, logout, userInfo],
//   );

//   return <AuthContext.Provider value={memoContext}>{children}</AuthContext.Provider>;
// }

// // useEffect(() => {
// //   const fetchData = async () => {
// //     try {
// //       const token = await getAccessToken();
// //       const refresh = await getRefreshToken();

// //       await authRequests.checkAuth.fn({ token, refresh }).then(() => {
// //         setAuthenticated(true);
// //       });
// //     } catch (error) {
// //       setAuthenticated(false);
// //     }
// //   };

// //   void fetchData();
// // }, [setAuthenticated]);
