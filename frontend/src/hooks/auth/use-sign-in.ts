import { useMutation } from "@tanstack/react-query";

import { authRequests } from "@/api/auth";

export const useSignIn = () => {
  const mutation = useMutation({
    mutationKey: authRequests.signIn.key,
    mutationFn: authRequests.signIn.fn,
  });

  return { mutation };
};
